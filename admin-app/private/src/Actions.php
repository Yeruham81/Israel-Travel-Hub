<?php
declare(strict_types=1);
namespace ITH\Admin;

use RuntimeException;

function handle_action(array $user): never {
    assert_post_csrf();
    $action = text_input('action', 50);
    $id = (int) ($_POST['id'] ?? 0);
    $actor = (int) $user['id'];

    if ($action === 'logout') {
        logout();
        header('Location: /admin/', true, 303);
        exit;
    }
    if ($action === 'enquiry') {
        require_permission($user, 'inbox');
        $status = allowed(text_input('status', 16), ['new','read','replied','closed']);
        $note = text_input('private_note', 4000);
        if ($id < 1 || !query_one('SELECT id FROM admin_enquiries WHERE id = ?', [$id])) {
            throw new RuntimeException('Unknown enquiry.');
        }
        db()->prepare('UPDATE admin_enquiries SET status = ?, private_note = ? WHERE id = ?')->execute([$status, $note, $id]);
        audit($actor, 'update', 'inbox', (string) $id, ['status' => $status]);
        notice('Enquiry updated.');
        redirect('inbox', ['id' => $id]);
    }
    if ($action === 'redirect') {
        require_permission($user, 'redirects');
        if ($user['role'] === 'viewer') throw new RuntimeException('Read-only role.');
        $source = assert_path(text_input('source_path', 500));
        $dest = assert_redirect_destination($source, text_input('target_path', 500));
        $state = allowed(text_input('state', 16), ['draft','approved']);
        if ($state === 'approved' && !in_array($user['role'], ['owner','admin'], true)) {
            throw new RuntimeException('Only administrators can approve publication.');
        }
        // Prevent direct and indirect loops within the managed redirects.
        $visited = [$source => true];
        $next = $dest;
        for ($i = 0; $i < 32; $i++) {
            if (isset($visited[$next])) throw new RuntimeException('A redirect loop was detected.');
            $visited[$next] = true;
            $row = query_one('SELECT target_path FROM admin_redirects WHERE source_path = ? AND state = "approved"', [$next]);
            if (!$row) break;
            $next = (string) $row['target_path'];
            if ($i === 31) throw new RuntimeException('Redirect chain is too long.');
        }
        db()->prepare('INSERT INTO admin_redirects (source_path, target_path, state, updated_by) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE target_path = VALUES(target_path), state = VALUES(state), updated_by = VALUES(updated_by)')
            ->execute([$source, $dest, $state, $actor]);
        audit($actor, 'upsert', 'redirects', $source, ['target_path' => $dest, 'state' => $state]);
        notice('Redirect saved to the management registry. Applying it to Apache requires the reviewed deployment step.');
        redirect('redirects');
    }
    if ($action === 'delete_redirect') {
        require_permission($user, 'redirects');
        $path = assert_path(text_input('source_path', 500));
        db()->prepare('DELETE FROM admin_redirects WHERE source_path = ?')->execute([$path]);
        audit($actor, 'delete', 'redirects', $path);
        notice('Redirect removed from the management registry. Publish reviewed rules to apply this change.');
        redirect('redirects');
    }
    if ($action === 'seo') {
        require_permission($user, 'seo');
        $path = assert_path(text_input('page_path', 500));
        if (str_starts_with($path, '/admin') || str_starts_with($path, '/api/')) {
            throw new RuntimeException('System paths cannot receive editorial SEO overrides.');
        }
        $title = text_input('meta_title', 140);
        $desc = text_input('meta_description', 330);
        if (safe_length($title) < 10 || safe_length($desc) < 30) throw new RuntimeException('Please enter a useful title and description.');
        $ogTitle = text_input('og_title', 140);
        $ogDesc = text_input('og_description', 330);
        $robots = allowed(text_input('robots', 30), ['index,follow','noindex,follow','noindex,nofollow']);
        $state = allowed(text_input('state', 16), ['draft','approved']);
        if ($state === 'approved' && !in_array($user['role'], ['owner','admin'], true)) {
            throw new RuntimeException('Only administrators can approve publication.');
        }
        db()->prepare(
            'INSERT INTO admin_seo_overrides (page_path,meta_title,meta_description,og_title,og_description,robots,state,updated_by) VALUES (?,?,?,?,?,?,?,?)
             ON DUPLICATE KEY UPDATE meta_title=VALUES(meta_title),meta_description=VALUES(meta_description),og_title=VALUES(og_title),og_description=VALUES(og_description),robots=VALUES(robots),state=VALUES(state),updated_by=VALUES(updated_by)'
        )->execute([$path,$title,$desc,$ogTitle ?: null,$ogDesc ?: null,$robots,$state,$actor]);
        audit($actor, 'upsert', 'seo', $path, ['state' => $state, 'robots' => $robots]);
        notice('SEO fields saved. Static HTML is updated only after the approved export is integrated into the build.');
        redirect('seo');
    }
    if ($action === 'delete_seo') {
        require_permission($user, 'seo');
        $path = assert_path(text_input('page_path', 500));
        db()->prepare('DELETE FROM admin_seo_overrides WHERE page_path = ?')->execute([$path]);
        audit($actor, 'delete', 'seo', $path);
        notice('SEO override removed from the registry. A build is still required.');
        redirect('seo');
    }
    if ($action === 'create_user') {
        require_permission($user, 'users');
        create_user($actor, text_input('username', 64), password_input('password'), text_input('role', 20));
        notice('New user created.');
        redirect('users');
    }
    if ($action === 'update_user') {
        require_permission($user, 'users');
        update_user($actor, $id, text_input('role', 20), isset($_POST['active']) && $_POST['active'] === '1');
        notice('User permissions updated. Previous sessions are invalidated.');
        redirect('users');
    }
    if ($action === 'reset_password') {
        require_permission($user, 'users');
        change_user_password($actor, $id, password_input('password'));
        notice('Password changed. Previous sessions are invalidated.');
        redirect('users');
    }
    throw new RuntimeException('Unknown administrative action.');
}

function export_registry(array $user, string $type): never {
    if (!in_array($type, ['redirects', 'seo'], true)) throw new RuntimeException('Unknown export.');
    require_permission($user, $type);
    if ($type === 'redirects') {
        $rows = query_all('SELECT source_path, target_path, http_status FROM admin_redirects WHERE state = ? ORDER BY source_path', ['approved']);
    } else {
        $rows = query_all('SELECT page_path, meta_title, meta_description, og_title, og_description, robots FROM admin_seo_overrides WHERE state = ? ORDER BY page_path', ['approved']);
    }
    $export = [
        'format' => 'ith-admin-approved-v1',
        'module' => $type,
        'generated_at' => gmdate('c'),
        'records' => $rows,
        'warning' => 'Export is review input only. Publishing to the live static site requires a validated GitHub deployment.',
    ];
    header('Content-Type: application/json; charset=utf-8');
    header('Content-Disposition: attachment; filename="ith-approved-' . $type . '.json"');
    header('Cache-Control: no-store');
    echo json_encode($export, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR);
    exit;
}
