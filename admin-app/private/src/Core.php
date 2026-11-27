<?php
declare(strict_types=1);

namespace ITH\Admin;

use PDO;
use RuntimeException;

const APP_NAME = 'Israel Taxi & Travel · Admin';

function config(): array {
    static $config = null;
    if ($config !== null) return $config;
    $file = dirname(__DIR__) . '/config.php';
    if (!is_file($file)) throw new RuntimeException('Admin configuration is missing.');
    $data = require $file;
    if (!is_array($data)) throw new RuntimeException('Admin configuration is invalid.');
    foreach (['db_dsn', 'db_user', 'db_password'] as $key) {
        if (!array_key_exists($key, $data)) throw new RuntimeException('Missing admin configuration field.');
    }
    return $config = $data;
}

function db(): PDO {
    static $db = null;
    if ($db !== null) return $db;
    $cfg = config();
    return $db = new PDO((string) $cfg['db_dsn'], (string) $cfg['db_user'], (string) $cfg['db_password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
}

function web_security(): void {
    if (PHP_SAPI === 'cli') return;
    // Hostinger serves this webroot over HTTPS. Never accept credentials over HTTP.
    $https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    if (!$https && (int) ($_SERVER['SERVER_PORT'] ?? 0) !== 443) {
        http_response_code(503);
        header('Content-Type: text/plain; charset=utf-8');
        echo 'Admin requires HTTPS.';
        exit;
    }
    header('Cache-Control: no-store, private, max-age=0');
    header('Pragma: no-cache');
    header('X-Robots-Tag: noindex, nofollow, noarchive');
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: no-referrer');
    header('Permissions-Policy: camera=(), microphone=(), geolocation=()');
    header("Content-Security-Policy: default-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self'");
    header('Content-Type: text/html; charset=utf-8');
}

function session_start_securely(): void {
    if (session_status() === PHP_SESSION_ACTIVE) return;
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.use_trans_sid', '0');
    ini_set('session.cookie_httponly', '1');
    session_name('ith_admin_session');
    session_set_cookie_params([
        'lifetime' => 0, 'path' => '/admin/', 'secure' => true,
        'httponly' => true, 'samesite' => 'Strict',
    ]);
    session_start();
    if (!isset($_SESSION['created'])) $_SESSION['created'] = time();
    if (time() - (int) $_SESSION['created'] > 1200) {
        session_regenerate_id(true);
        $_SESSION['created'] = time();
    }
    if (isset($_SESSION['last_seen']) && time() - (int) $_SESSION['last_seen'] > 1800) {
        $_SESSION = [];
        session_regenerate_id(true);
    }
    $_SESSION['last_seen'] = time();
}

function escape(?string $s): string {
    return htmlspecialchars($s ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
function safe_length(string $s): int {
    return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s);
}
function text_input(string $key, int $max = 255): string {
    $value = $_POST[$key] ?? '';
    if (!is_string($value) || safe_length($value) > $max) {
        throw new RuntimeException('Invalid value: ' . $key);
    }
    return trim($value);
}
function password_input(string $key): string {
    $value = $_POST[$key] ?? null;
    if (!is_string($value) || strlen($value) > 200) throw new RuntimeException('Invalid password length.');
    return $value; // Do not trim user-selected passwords.
}
function allowed(string $value, array $values): string {
    if (!in_array($value, $values, true)) throw new RuntimeException('Invalid selection.');
    return $value;
}
function csrf_token(): string {
    return $_SESSION['csrf'] ??= bin2hex(random_bytes(32));
}
function csrf_field(): string {
    return '<input type="hidden" name="csrf" value="' . escape(csrf_token()) . '">';
}
function assert_post_csrf(): void {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') throw new RuntimeException('Invalid HTTP method.');
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $host = $_SERVER['HTTP_HOST'] ?? '';
    if ($origin !== '') {
        $parts = parse_url($origin);
        if (($parts['scheme'] ?? '') !== 'https' || ($parts['host'] ?? '') !== explode(':', $host)[0]) {
            throw new RuntimeException('Invalid request origin.');
        }
    }
    $input = $_POST['csrf'] ?? null;
    if (!is_string($input) || !hash_equals(csrf_token(), $input)) throw new RuntimeException('Session expired. Reload and retry.');
}
function redirect(string $page = 'dashboard', array $params = []): never {
    header('Location: /admin/?' . http_build_query(['page' => $page] + $params), true, 303);
    exit;
}

function current_user(): ?array {
    $id = $_SESSION['user_id'] ?? null;
    $sessionVersion = $_SESSION['auth_version'] ?? null;
    if (!is_int($id) || !is_int($sessionVersion)) return null;
    $q = db()->prepare('SELECT id, username, role, active, auth_version FROM admin_users WHERE id = ? LIMIT 1');
    $q->execute([$id]);
    $user = $q->fetch();
    if (!$user || !(bool) $user['active'] || (int) $user['auth_version'] !== $sessionVersion) {
        unset($_SESSION['user_id'], $_SESSION['auth_version']);
        return null;
    }
    return $user;
}
function role_allows(string $role, string $permission): bool {
    $rules = [
        'owner' => ['dashboard', 'inbox', 'consents', 'redirects', 'seo', 'jobs', 'backups', 'users', 'audit'],
        'admin' => ['dashboard', 'inbox', 'consents', 'redirects', 'seo', 'jobs', 'backups', 'audit'],
        'editor' => ['dashboard', 'inbox', 'redirects', 'seo'],
        'viewer' => ['dashboard', 'inbox', 'consents', 'jobs', 'backups'],
    ];
    return in_array($permission, $rules[$role] ?? [], true);
}
function require_permission(array $user, string $module): void {
    if (!role_allows((string) $user['role'], $module)) {
        http_response_code(403);
        throw new RuntimeException('You do not have permission to access this module.');
    }
}
function audit(?int $userId, string $action, string $module, ?string $item = null, array $details = []): void {
    $q = db()->prepare('INSERT INTO admin_audit (actor_id, action, module, item_id, details_json) VALUES (?, ?, ?, ?, ?)');
    $q->execute([$userId, $action, $module, $item, json_encode($details, JSON_THROW_ON_ERROR)]);
}
function notice(string $message, string $type = 'success'): void {
    $_SESSION['flash'] = ['message' => $message, 'type' => $type];
}
function consume_notice(): ?array {
    $n = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);
    return is_array($n) ? $n : null;
}
function assert_path(string $value): string {
    if (strlen($value) > 500 || !preg_match('~^/(?!/)[a-zA-Z0-9/_-]*/?$~D', $value) || str_contains($value, '..')) {
        throw new RuntimeException('Use a local path, e.g. /travel-blog/uber-in-israel/.');
    }
    return $value;
}
function assert_redirect_destination(string $from, string $to): string {
    $to = assert_path($to);
    if ($to === $from) throw new RuntimeException('Source and destination must differ.');
    foreach (['/admin', '/api'] as $blocked) {
        if (str_starts_with($from, $blocked) || str_starts_with($to, $blocked)) {
            throw new RuntimeException('Admin and API paths cannot be redirected.');
        }
    }
    return $to;
}
function query_all(string $sql, array $params = []): array {
    $q = db()->prepare($sql);
    $q->execute($params);
    return $q->fetchAll();
}
function query_one(string $sql, array $params = []): ?array {
    $q = db()->prepare($sql);
    $q->execute($params);
    return $q->fetch() ?: null;
}
function query_count(string $table, string $where = '1=1'): int {
    // Only internal code passes table and expression names; never user input.
    return (int) db()->query("SELECT COUNT(*) FROM $table WHERE $where")->fetchColumn();
}
