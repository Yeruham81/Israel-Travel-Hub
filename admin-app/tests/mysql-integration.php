<?php
declare(strict_types=1);
namespace ITH\Admin;

require dirname(__DIR__) . '/private/src/Core.php';
require dirname(__DIR__) . '/private/src/Auth.php';
require dirname(__DIR__) . '/private/src/Actions.php';
require dirname(__DIR__) . '/private/src/Operations.php';
require dirname(__DIR__) . '/private/src/Ingestion.php';
require dirname(__DIR__) . '/private/src/Views.php';

function check(bool $value, string $message): void {
    if (!$value) { fwrite(STDERR, "FAIL: $message\n"); exit(1); }
}
session_start_securely();
$owner = query_one('SELECT * FROM admin_users WHERE username = ?', ['siteowner']);
check((bool)$owner, 'Owner was initialized');
check(password_verify('Test-Only-Secure-Passphrase-123!', $owner['password_hash']), 'Owner password is hashed');
check(login('siteowner', 'Test-Only-Secure-Passphrase-123!'), 'Correct login works');
check(!login('siteowner', 'bad-password'), 'Wrong password is rejected');
$identity = current_user();
check((bool)$identity && $identity['role'] === 'owner', 'Owner session is verified');

create_user((int)$owner['id'], 'temporaryeditor', 'Another-Secure-Test-Password-1234', 'editor');
$editor = query_one('SELECT * FROM admin_users WHERE username = ?', ['temporaryeditor']);
check((bool)$editor && $editor['role'] === 'editor', 'Owner can create editor');
update_user((int)$owner['id'], (int)$editor['id'], 'viewer', false);
$editor = query_one('SELECT * FROM admin_users WHERE id = ?', [$editor['id']]);
check($editor['role'] === 'viewer' && (int)$editor['active'] === 0, 'Owner can disable access');

$input = [
    'requestId' => '19e1a26c-2a3f-488c-a809-77373cf73f12',
    'sourcePath' => '/travel-blog/uber-in-israel/',
    'request' => ['kind' => 'contact', 'fields' => ['name' => 'Demo', 'email' => 'demo@example.com']],
];
check(record_accepted_enquiry($input, 'Enquiry subject', 'Test-only enquiry body'), 'Server-side inbox accepts validated records');
check(record_accepted_enquiry($input, 'Enquiry subject', 'Test-only enquiry body'), 'Idempotent enquiry retry');
check(query_count('admin_enquiries') === 1, 'Retry does not duplicate inbox record');

ob_start();
render_header('Dashboard', $identity, 'dashboard');
render_dashboard($identity);
render_footer($identity);
$html = ob_get_clean();
check(str_contains($html, 'Dashboard') && str_contains($html, 'New messages'), 'Dashboard renders live database data');
check(!str_contains($html, 'Test-Only-Secure-Passphrase'), 'Passwords never render');

$github = github_recent_runs();
check($github['connected'] === false, 'Unconfigured external workflows are not reported as healthy');
fwrite(STDOUT, "PASS: MySQL tables, owner sign-in, staff permissions, contact inbox idempotency and dashboard rendering\n");
