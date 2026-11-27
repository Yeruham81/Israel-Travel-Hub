<?php
declare(strict_types=1);
namespace ITH\Admin;

use RuntimeException;
use PDO;

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}
require dirname(__DIR__) . '/src/Core.php';
require dirname(__DIR__) . '/src/Auth.php';

function cli_prompt(string $message, bool $secret = false): string {
    fwrite(STDOUT, $message);
    $tty = function_exists('posix_isatty') && posix_isatty(STDIN);
    if ($secret && $tty) system('stty -echo');
    try { $s = fgets(STDIN); }
    finally {
        if ($secret && $tty) {
            system('stty echo');
            fwrite(STDOUT, PHP_EOL);
        }
    }
    if ($s === false) throw new RuntimeException('Input cancelled.');
    return rtrim($s, "\r\n");
}
try {
    $schema = file_get_contents(dirname(__DIR__) . '/schema.sql');
    if ($schema === false || strlen($schema) < 1000) throw new RuntimeException('Schema file missing.');
    $conn = db();
    foreach (preg_split('/;\s*(?:\r?\n|$)/', $schema) as $statement) {
        if (trim($statement) !== '') $conn->exec($statement);
    }

    $exists = query_one('SELECT id FROM admin_users WHERE role = ? LIMIT 1', ['owner']);
    if ($exists) {
        fwrite(STDOUT, "Database schema checked. Owner account already exists; no account changes.\n");
        exit(0);
    }
    $name = cli_prompt('Initial owner username: ');
    $password = cli_prompt('Initial owner password (minimum 14 characters; hidden): ', true);
    if (!preg_match('/^[a-zA-Z][a-zA-Z0-9_.-]{2,63}$/D', $name) || strlen($password) < 14 || strlen($password) > 200) {
        throw new RuntimeException('Invalid owner username or password.');
    }
    $stmt = $conn->prepare('INSERT INTO admin_users (username, password_hash, role, active) VALUES (?, ?, ?, 1)');
    $stmt->execute([$name, password_hash($password, PASSWORD_DEFAULT), 'owner']);
    unset($password);
    fwrite(STDOUT, "Initial owner created. Next: open https://<site>/admin/ over HTTPS.\n");
} catch (\Throwable $error) {
    fwrite(STDERR, "Setup could not complete: " . $error->getMessage() . PHP_EOL);
    exit(1);
}
