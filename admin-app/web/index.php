<?php
declare(strict_types=1);

use function ITH\Admin\{web_security, session_start_securely, current_user, render_login,
    render_header, render_module, render_footer, assert_post_csrf, text_input,
    login, handle_action, export_registry, require_permission, notice, redirect};

$privateSrc = dirname(__DIR__, 2) . '/private-admin/src/';
require_once $privateSrc . 'Core.php';
require_once $privateSrc . 'Auth.php';
require_once $privateSrc . 'Actions.php';
require_once $privateSrc . 'Views.php';

web_security();
session_start_securely();

try {
    $user = current_user();
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
        $action = text_input('action', 50);
        if ($action === 'login') {
            assert_post_csrf();
            $username = text_input('username', 64);
            $password = text_input('password', 512);
            if (login($username, $password)) redirect('dashboard');
            http_response_code(401);
            render_login('Incorrect username or password, or too many attempts. Please retry later.');
            exit;
        }
        if (!$user) {
            http_response_code(401);
            render_login('Your session has expired. Sign in again.');
            exit;
        }
        try {
            handle_action($user);
        } catch (RuntimeException $error) {
            notice($error->getMessage(), 'error');
            redirect(in_array($_GET['page'] ?? '', ['dashboard','inbox','redirects','seo','users'], true) ? $_GET['page'] : 'dashboard');
        } catch (PDOException $error) {
            error_log('ITH admin database operation failed.');
            notice('The operation could not be saved. No changes were confirmed.', 'error');
            redirect('dashboard');
        }
    }

    if (!$user) {
        render_login();
        exit;
    }
    $export = $_GET['export'] ?? null;
    if (is_string($export)) export_registry($user, $export);
    $module = $_GET['page'] ?? 'dashboard';
    if (!is_string($module) || !in_array($module, ['dashboard','inbox','consents','redirects','seo','jobs','backups','users','audit'], true)) {
        http_response_code(404);
        $module = 'dashboard';
    }
    require_permission($user, $module);
    $titles = [
        'dashboard'=>'Dashboard','inbox'=>'Messages','consents'=>'Cookie consent',
        'redirects'=>'301 redirects','seo'=>'SEO manager','jobs'=>'Automation & logs',
        'backups'=>'Backups','users'=>'Users & access','audit'=>'Audit trail',
    ];
    render_header($titles[$module], $user, $module);
    render_module($module, $user);
    render_footer($user);
} catch (Throwable $error) {
    error_log('ITH admin controller error: ' . get_class($error));
    if (!headers_sent()) http_response_code(503);
    echo '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="robots" content="noindex"><title>Admin temporarily unavailable</title><body><main style="max-width:40rem;margin:5rem auto;font-family:system-ui"><h1>Administration temporarily unavailable</h1><p>A secure service or database configuration is unavailable. Please check the private setup and server logs.</p></main></body></html>';
}
