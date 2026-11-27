<?php
declare(strict_types=1);

namespace ITH\Admin;

use RuntimeException;

function login(string $username, string $password): bool {
    if (!preg_match('/^[a-zA-Z][a-zA-Z0-9_.-]{2,63}$/D', $username) || strlen($password) > 512) return false;
    $cfg = config();
    $subject = hash_hmac('sha256', strtolower($username) . '|' . (string) ($_SERVER['REMOTE_ADDR'] ?? ''), (string) ($cfg['audit_hmac_secret'] ?? ''));
    if (strlen((string) ($cfg['audit_hmac_secret'] ?? '')) < 32) {
        throw new RuntimeException('Secure login limiter is not configured.');
    }
    $window = query_one(
        'SELECT COUNT(*) AS attempts FROM admin_login_attempts WHERE subject_hash = ? AND attempted_at > (NOW() - INTERVAL 15 MINUTE)',
        [$subject]
    );
    if ((int) ($window['attempts'] ?? 0) >= 6) return false;
    $user = query_one('SELECT * FROM admin_users WHERE username = ? AND active = 1 LIMIT 1', [$username]);
    // Balance response timing even if no account exists.
    $fallback = '$2y$12$abcdefghijklmnopqrstuvCQJ2M3z1fv88arzyMfhJitD9VMllofW';
    $valid = password_verify($password, $user['password_hash'] ?? $fallback);
    if (!$valid || !$user) {
        db()->prepare('INSERT INTO admin_login_attempts (subject_hash) VALUES (?)')->execute([$subject]);
        return false;
    }
    db()->prepare('DELETE FROM admin_login_attempts WHERE subject_hash = ?')->execute([$subject]);
    db()->prepare('UPDATE admin_users SET last_login_at = NOW() WHERE id = ?')->execute([(int) $user['id']]);
    session_regenerate_id(true);
    $_SESSION = [
        'user_id' => (int) $user['id'],
        'auth_version' => (int) $user['auth_version'],
        'created' => time(), 'last_seen' => time(),
        'csrf' => bin2hex(random_bytes(32)),
    ];
    audit((int) $user['id'], 'login', 'users', (string) $user['id']);
    return true;
}

function logout(): void {
    $id = $_SESSION['user_id'] ?? null;
    if (is_int($id)) audit($id, 'logout', 'users', (string) $id);
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', ['expires' => time() - 3600, 'path' => $p['path'], 'secure' => true, 'httponly' => true, 'samesite' => 'Strict']);
    }
    session_destroy();
}

function validate_new_user(string $username, string $password, string $role): void {
    if (!preg_match('/^[a-zA-Z][a-zA-Z0-9_.-]{2,63}$/D', $username)) {
        throw new RuntimeException('Username must be 3–64 characters, starting with a letter.');
    }
    if (strlen($password) < 14 || strlen($password) > 200) {
        throw new RuntimeException('Use a unique password of 14–200 characters.');
    }
    allowed($role, ['admin','editor','viewer']);
}

function create_user(int $actor, string $username, string $password, string $role): void {
    validate_new_user($username, $password, $role);
    $hash = password_hash($password, PASSWORD_DEFAULT);
    db()->prepare('INSERT INTO admin_users (username, password_hash, role) VALUES (?, ?, ?)')->execute([$username, $hash, $role]);
    audit($actor, 'create', 'users', (string) db()->lastInsertId(), ['role' => $role]);
}

function update_user(int $actor, int $targetId, string $role, bool $active): void {
    if ($actor === $targetId) throw new RuntimeException('You cannot change your own administrative access.');
    allowed($role, ['admin','editor','viewer']);
    $target = query_one('SELECT id, role FROM admin_users WHERE id = ?', [$targetId]);
    if (!$target || $target['role'] === 'owner') throw new RuntimeException('The owner account cannot be modified here.');
    db()->prepare('UPDATE admin_users SET role = ?, active = ?, auth_version = auth_version + 1 WHERE id = ?')
        ->execute([$role, $active ? 1 : 0, $targetId]);
    audit($actor, 'update', 'users', (string) $targetId, ['role' => $role, 'active' => $active]);
}

function change_user_password(int $actor, int $targetId, string $password): void {
    if (strlen($password) < 14 || strlen($password) > 200) {
        throw new RuntimeException('Use a unique password of 14–200 characters.');
    }
    $target = query_one('SELECT id, role FROM admin_users WHERE id = ?', [$targetId]);
    if (!$target || ($target['role'] === 'owner' && $targetId !== $actor)) {
        throw new RuntimeException('Unknown user or protected owner account.');
    }
    db()->prepare('UPDATE admin_users SET password_hash = ?, auth_version = auth_version + 1 WHERE id = ?')
        ->execute([password_hash($password, PASSWORD_DEFAULT), $targetId]);
    audit($actor, 'reset_password', 'users', (string) $targetId);
    if ($targetId === $actor) {
        $_SESSION['auth_version'] = (int) $_SESSION['auth_version'] + 1;
        session_regenerate_id(true);
    }
}
