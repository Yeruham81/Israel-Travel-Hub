<?php
declare(strict_types=1);
use function ITH\Admin\{config, db, web_security};

require dirname(__DIR__, 2) . '/private-admin/src/Core.php';

web_security();
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST', true, 405);
    echo '{"accepted":false}';
    exit;
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = strtolower(explode(':', (string)($_SERVER['HTTP_HOST'] ?? ''))[0]);
$originParts = parse_url($origin);
if (!$originParts || ($originParts['scheme'] ?? '') !== 'https' || strtolower((string)($originParts['host'] ?? '')) !== $host) {
    http_response_code(403);
    echo '{"accepted":false}';
    exit;
}
$length = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($length < 0 || $length > 2048 || !str_starts_with(strtolower((string)($_SERVER['CONTENT_TYPE'] ?? '')), 'application/json')) {
    http_response_code(415);
    echo '{"accepted":false}';
    exit;
}
$raw = file_get_contents('php://input', false, null, 0, 2049);
if (!$raw || strlen($raw) > 2048) {
    http_response_code(400);
    echo '{"accepted":false}';
    exit;
}
$data = json_decode($raw, true);
if (!is_array($data) || array_is_list($data)) {
    http_response_code(400);
    echo '{"accepted":false}';
    exit;
}
$id = $data['eventId'] ?? '';
$categories = $data['categories'] ?? null;
$policy = $data['policyVersion'] ?? '';
$path = $data['sourcePath'] ?? null;
if (!is_string($id) || !preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iD', $id)
    || !is_array($categories) || !is_string($policy) || !preg_match('/^[a-zA-Z0-9_.-]{1,32}$/D', $policy)
    || ($path !== null && (!is_string($path) || strlen($path) > 500 || !preg_match('~^/[^?#]*$~D', $path)))) {
    http_response_code(400);
    echo '{"accepted":false}';
    exit;
}
foreach (['analytics','external','marketing','advertising'] as $name) {
    if (!array_key_exists($name, $categories) || !is_bool($categories[$name])) {
        http_response_code(400);
        echo '{"accepted":false}';
        exit;
    }
}
try {
    $cfg = config();
    $secret = (string) ($cfg['audit_hmac_secret'] ?? '');
    if (strlen($secret) < 32) throw new RuntimeException('Server configuration incomplete');
    $source = hash_hmac('sha256', (string) ($_SERVER['REMOTE_ADDR'] ?? ''), $secret);
    $pdo = db();
    $count = $pdo->prepare('SELECT COUNT(*) FROM admin_consent_rate_limits WHERE source_hash = ? AND recorded_at > (NOW() - INTERVAL 5 MINUTE)');
    $count->execute([$source]);
    if ((int) $count->fetchColumn() >= 30) {
        http_response_code(429);
        header('Retry-After: 300');
        echo '{"accepted":false}';
        exit;
    }
    $pdo->prepare('INSERT INTO admin_consent_rate_limits (source_hash) VALUES (?)')->execute([$source]);
    $pdo->prepare(
        'INSERT INTO admin_consent_events (event_id,policy_version,analytics,external_content,marketing,advertising,source_path)
         VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE event_id=event_id'
    )->execute([
        $id, $policy, (int)$categories['analytics'], (int)$categories['external'],
        (int)$categories['marketing'], (int)$categories['advertising'], $path,
    ]);
    // Keep rate-limit identifiers short-lived, without collecting plaintext IPs.
    if (random_int(1, 50) === 1) {
        $pdo->exec('DELETE FROM admin_consent_rate_limits WHERE recorded_at < (NOW() - INTERVAL 1 DAY)');
    }
    http_response_code(202);
    echo '{"accepted":true}';
} catch (Throwable $error) {
    error_log('ITH consent ledger unavailable.');
    http_response_code(503);
    echo '{"accepted":false}';
}
