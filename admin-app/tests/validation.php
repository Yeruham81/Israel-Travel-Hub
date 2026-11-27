<?php
declare(strict_types=1);
namespace ITH\Admin;

require dirname(__DIR__) . '/private/src/Core.php';
require dirname(__DIR__) . '/private/src/Auth.php';

function verify(bool $condition, string $message): void {
    if (!$condition) { fwrite(STDERR, "FAIL: $message\n"); exit(1); }
}
function rejects(callable $callback): bool {
    try { $callback(); return false; }
    catch (\RuntimeException $error) { return true; }
}
verify(role_allows('owner', 'users'), 'Only owners may manage users');
verify(!role_allows('admin', 'users'), 'Administrators cannot add owner accounts');
verify(role_allows('editor', 'seo'), 'Editors can prepare SEO');
verify(!role_allows('viewer', 'redirects'), 'Viewers cannot modify redirects');
verify(!role_allows('editor', 'backups'), 'Editors cannot access backups');

verify(assert_path('/travel-blog/uber-in-israel/') === '/travel-blog/uber-in-israel/', 'Standard guide URL');
verify(rejects(fn() => assert_path('//external/')), 'Protocol-relative URLs blocked');
verify(rejects(fn() => assert_path('/../../secret')), 'Traversal URLs blocked');
verify(rejects(fn() => assert_path('/path?query=1')), 'Queries blocked in redirect paths');
verify(rejects(fn() => assert_redirect_destination('/foo/', '/foo/')), 'Self-redirect blocked');
verify(rejects(fn() => assert_redirect_destination('/admin/', '/foo/')), 'Admin redirect blocked');
verify(rejects(fn() => assert_redirect_destination('/foo/', '/api/secret/')), 'API redirect blocked');
verify(rejects(fn() => allowed('super_admin', ['admin','editor','viewer'])), 'Unsupported role blocked');
verify(rejects(fn() => validate_new_user('bad name', 'a-long-test-password', 'editor')), 'Invalid user handle blocked');
verify(rejects(fn() => validate_new_user('validname', 'short', 'editor')), 'Weak account password blocked');

verify(strpos(file_get_contents(dirname(__DIR__) . '/web/.htaccess'), 'DirectoryIndex index.php') !== false, 'PHP entrypoint configured');
fwrite(STDOUT, "PASS: PHP admin roles, path safety, passwords and entrypoint security\n");
