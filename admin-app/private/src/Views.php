<?php
declare(strict_types=1);
namespace ITH\Admin;

function render_header(string $title, ?array $user = null, string $page = 'dashboard'): void {
    $navigation = [
        'dashboard' => ['Overview', '▦'],
        'inbox' => ['Messages', '✉'],
        'consents' => ['Cookie consent', '◉'],
        'redirects' => ['301 redirects', '↪'],
        'seo' => ['SEO manager', '◎'],
        'backups' => ['Backups', '▤'],
        'jobs' => ['Automation & logs', '⚙'],
        'users' => ['Users & access', '♙'],
        'audit' => ['Audit trail', '≡'],
    ];
    ?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive">
<title><?=escape($title)?> · <?=escape(APP_NAME)?></title>
<link rel="stylesheet" href="/admin/assets/admin.css">
</head>
<body class="<?= $user ? 'logged-in' : 'login-screen' ?>">
<?php if ($user): ?>
<div class="admin-layout">
<aside class="sidebar" aria-label="Administration navigation">
  <div class="brand"><span class="brand-mark">IT</span><span>Israel Taxi & Travel<small>Administration</small></span></div>
  <nav>
    <?php foreach ($navigation as $id => [$label,$symbol]): if (!role_allows((string) $user['role'], $id)) continue; ?>
      <a href="/admin/?page=<?=escape($id)?>" class="<?= $id === $page ? 'current' : '' ?>" <?= $id === $page ? 'aria-current="page"' : '' ?>>
      <span class="nav-icon" aria-hidden="true"><?=escape($symbol)?></span><span><?=escape($label)?></span></a>
    <?php endforeach; ?>
  </nav>
  <div class="sidebar-foot"><a href="/" target="_blank" rel="noopener noreferrer">View website ↗</a></div>
</aside>
<div class="work-area">
<header class="topbar"><div><span class="eyebrow">Site operations</span><h1><?=escape($title)?></h1></div>
<div class="account"><span class="avatar"><?=escape(strtoupper(substr((string)$user['username'],0,1)))?></span><span class="account-label"><?=escape($user['username'])?><small><?=escape(ucwords(str_replace('_',' ',(string)$user['role'])))?></small></span>
<form method="post" action="/admin/"><?=csrf_field()?><input type="hidden" name="action" value="logout"><button class="logout" type="submit">Sign out</button></form></div></header>
<div class="main-content">
<?php if ($flash = consume_notice()): ?>
<div role="status" class="alert <?= $flash['type'] === 'error' ? 'alert-error' : '' ?>"><?=escape((string)$flash['message'])?></div>
<?php endif; ?>
<?php else: ?>
<?php endif; ?>
<?php
}
function render_footer(?array $user = null): void {
    if ($user) echo '</div><footer class="site-footer">Private administration · Activity is audited · Published content requires a reviewed deployment</footer></div></div>';
    echo '</body></html>';
}
function form_select(string $name, array $values, string $current): void {
    echo '<select name="'.escape($name).'">';
    foreach ($values as $value => $label) {
        echo '<option value="'.escape((string)$value).'" '.($current === (string)$value ? 'selected' : '').'>'.escape((string)$label).'</option>';
    }
    echo '</select>';
}
function render_login(?string $error = null): void {
    render_header('Sign in');
    ?><main class="login-card">
      <div class="login-brand"><span class="brand-mark">IT</span><span>Israel Taxi & Travel<small>Secure administration</small></span></div>
      <h1>Welcome back</h1><p class="muted">Sign in to manage the website, communications and operations.</p>
      <?php if ($error): ?><div class="alert alert-error" role="alert"><?=escape($error)?></div><?php endif; ?>
      <form method="post" action="/admin/" autocomplete="on">
        <?=csrf_field()?><input type="hidden" name="action" value="login">
        <label>Username<input type="text" name="username" autocomplete="username" maxlength="64" required autofocus></label>
        <label>Password<input type="password" name="password" autocomplete="current-password" required></label>
        <button type="submit" class="primary full-width">Sign in securely</button>
      </form>
      <p class="login-note">HTTPS only · Protected sessions · No public registration</p>
    </main><?php
    render_footer();
}
function render_dashboard(array $user): void {
    $new = query_count('admin_enquiries', "status = 'new'");
    $messages = query_count('admin_enquiries');
    $consents = query_count('admin_consent_events');
    $redirects = query_count('admin_redirects');
    $seo = query_count('admin_seo_overrides');
    $github = github_recent_runs();
    $failures = $github['connected'] ? count(array_filter($github['runs'], fn($run) => $run['status'] === 'failure')) : '—';
    $cards = [
        ['New messages', $new, 'inbox','Requires attention'],
        ['All enquiries', $messages, 'inbox','From server-side form logging'],
        ['Consent events', $consents, 'consents','Recorded choices'],
        ['Managed 301s', $redirects, 'redirects','Draft and approved'],
        ['SEO overrides', $seo, 'seo','Awaiting static export'],
        ['Job failures', $failures, 'jobs', $github['connected'] ? 'Last 30 GitHub runs' : 'Live monitor not connected'],
    ];
    ?><div class="notice-strip"><strong>Management workspace</strong><span> Data is shown only when its server-side source has been connected. No placeholder statistics are used.</span></div>
    <div class="stat-grid"><?php foreach ($cards as [$label,$count,$target,$note]): ?>
      <a class="stat-card" href="/admin/?page=<?=escape($target)?>"><span class="stat-label"><?=escape($label)?></span>
      <strong class="stat-value"><?=is_numeric($count) ? number_format((int)$count) : escape((string)$count)?></strong><span class="stat-note"><?=escape($note)?></span></a>
    <?php endforeach; ?></div>
    <div class="dashboard-grid">
      <section class="panel"><div class="panel-heading"><h2>Recent enquiries</h2><a href="/admin/?page=inbox">View all</a></div>
      <?php $rows=query_all('SELECT id,subject,kind,status,received_at FROM admin_enquiries ORDER BY received_at DESC LIMIT 6');
      if (!$rows): ?><p class="empty-state">No enquiry records yet. Existing Brevo email delivery is separate and must be connected server-side.</p>
      <?php else: ?><div class="table-scroll"><table><thead><tr><th>Subject</th><th>Form</th><th>Status</th><th>Received</th></tr></thead><tbody>
      <?php foreach ($rows as $row): ?><tr><td><a href="/admin/?page=inbox&amp;id=<?=(int)$row['id']?>"><?=escape($row['subject'])?></a></td><td><?=escape($row['kind'])?></td><td><span class="status"><?=escape($row['status'])?></span></td><td><?=escape($row['received_at'])?></td></tr><?php endforeach; ?>
      </tbody></table></div><?php endif; ?></section>
      <section class="panel"><div class="panel-heading"><h2>Operational health</h2><a href="/admin/?page=jobs">All workflows</a></div>
      <?php $rows=query_all('SELECT job_name,status,observed_at FROM admin_job_events ORDER BY observed_at DESC LIMIT 6');
      if (!$rows): ?><p class="empty-state">No workflow events have been connected. GitHub Actions is currently the source of record.</p>
      <?php else: ?><div class="activity-list"><?php foreach ($rows as $row): ?><div><span class="dot <?=$row['status']==='success'?'good':($row['status']==='failure'?'bad':'neutral')?>"></span><?=escape($row['job_name'])?><small><?=escape($row['status'])?> · <?=escape($row['observed_at'])?></small></div><?php endforeach; ?></div><?php endif; ?>
      </section>
    </div>
    <section class="panel"><div class="panel-heading"><h2>Integration status</h2></div>
    <div class="integration-grid">
      <div><strong>Enquiry inbox</strong><p>Database ready; existing PHP/Brevo handler must write accepted messages here.</p><span class="status warn">Awaiting integration</span></div>
      <div><strong>Consent ledger</strong><p>Database ready; public consent endpoint and privacy disclosure must be connected.</p><span class="status warn">Awaiting integration</span></div>
      <div><strong>SEO & redirects</strong><p>Edit and approve proposals here; deployment integration is needed to publish them.</p><span class="status warn">Review workflow required</span></div>
      <div><strong>Backups & GitHub jobs</strong><p>Read-only deployment backups and optional fine-grained GitHub Actions monitoring.</p><span class="status warn"><?= $github['connected'] ? 'GitHub monitor connected' : 'Configure GitHub read token' ?></span></div>
    </div></section><?php
}
function render_inbox(array $user): void {
    $id = (int) ($_GET['id'] ?? 0);
    if ($id > 0) {
        $r=query_one('SELECT * FROM admin_enquiries WHERE id = ?',[$id]);
        if (!$r) { echo '<p class="empty-state">Message not found.</p>';return; }
        ?><p><a href="/admin/?page=inbox">← Back to all messages</a></p>
        <section class="panel"><div class="panel-heading"><h2><?=escape($r['subject'])?></h2><span class="status"><?=escape($r['status'])?></span></div>
        <dl class="detail-grid"><div><dt>From</dt><dd><?=escape($r['name'])?> · <a href="mailto:<?=escape($r['email'])?>"><?=escape($r['email'])?></a></dd></div>
        <div><dt>Form</dt><dd><?=escape($r['kind'])?></dd></div>
        <div><dt>Source page</dt><dd><?=escape($r['source_path'])?></dd></div>
        <div><dt>Received</dt><dd><?=escape($r['received_at'])?></dd></div>
        <div><dt>Request reference</dt><dd><code><?=escape($r['request_id'])?></code></dd></div></dl>
        <pre class="message-body"><?=escape($r['body'])?></pre>
        <form method="post" class="editor-form"><?=csrf_field()?><input type="hidden" name="action" value="enquiry"><input type="hidden" name="id" value="<?=$id?>">
        <label>Workflow status<?php form_select('status',['new'=>'New','read'=>'Read','replied'=>'Replied','closed'=>'Closed'],(string)$r['status']);?></label>
        <label>Private note<textarea name="private_note" rows="4" maxlength="4000"><?=escape($r['private_note'])?></textarea></label>
        <button class="primary" type="submit">Save changes</button></form></section><?php
        return;
    }
    $rows=query_all('SELECT id,name,email,subject,kind,status,received_at FROM admin_enquiries ORDER BY received_at DESC LIMIT 200');
    ?><section class="panel"><div class="panel-heading"><h2>Incoming form messages</h2><span class="small-muted">Last 200 records</span></div>
    <?php if (!$rows): ?><p class="empty-state">No messages recorded yet. The existing quote-request PHP endpoint is not yet connected to this database; email delivery remains independent.</p>
    <?php else: ?><div class="table-scroll"><table><thead><tr><th>Date</th><th>Name</th><th>Subject</th><th>Form</th><th>Status</th></tr></thead><tbody>
    <?php foreach($rows as $r): ?><tr><td><?=escape($r['received_at'])?></td><td><?=escape($r['name'])?></td><td><a href="/admin/?page=inbox&amp;id=<?=(int)$r['id']?>"><?=escape($r['subject'])?></a></td><td><?=escape($r['kind'])?></td><td><span class="status"><?=escape($r['status'])?></span></td></tr><?php endforeach; ?></tbody></table></div><?php endif; ?></section><?php
}
function render_consents(): void {
    $stats=query_one('SELECT COUNT(*) AS total, SUM(analytics=1) AS analytics, SUM(external_content=1) AS external_content, SUM(marketing=1) AS marketing, SUM(advertising=1) AS advertising FROM admin_consent_events') ?: [];
    $rows=query_all('SELECT event_id,policy_version,analytics,external_content,marketing,advertising,source_path,recorded_at FROM admin_consent_events ORDER BY recorded_at DESC LIMIT 100');
    ?><div class="notice-strip"><strong>Privacy note</strong><span> The ledger stores category choices and timestamps, without visitor IP addresses or email. It is an event log, not proof of a visitor's identity.</span></div>
    <div class="stat-grid compact"><?php foreach(['total'=>'Recorded events','analytics'=>'Analytics accepted','external_content'=>'External content accepted','marketing'=>'Booking widgets accepted','advertising'=>'Advertising accepted'] as $key=>$label): ?><div class="stat-card"><span class="stat-label"><?=escape($label)?></span><strong class="stat-value"><?=number_format((int)($stats[$key]??0))?></strong></div><?php endforeach; ?></div>
    <section class="panel"><div class="panel-heading"><h2>Recent consent choices</h2><span class="small-muted">Last 100 events</span></div>
    <?php if (!$rows): ?><p class="empty-state">No events recorded. Consent is currently stored in visitors' browsers; server-side collection is not connected yet.</p>
    <?php else: ?><div class="table-scroll"><table><thead><tr><th>Date</th><th>Policy</th><th>Analytics</th><th>External</th><th>Booking</th><th>Advertising</th><th>Page</th></tr></thead><tbody>
    <?php foreach($rows as $r): ?><tr><td><?=escape($r['recorded_at'])?></td><td><?=escape($r['policy_version'])?></td><?php foreach(['analytics','external_content','marketing','advertising'] as $key): ?><td><?= (int)$r[$key]===1 ? 'Yes' : 'No' ?></td><?php endforeach; ?><td><?=escape($r['source_path'])?></td></tr><?php endforeach; ?></tbody></table></div><?php endif; ?></section><?php
}
function render_redirects(): void {
    $rows=query_all('SELECT * FROM admin_redirects ORDER BY updated_at DESC LIMIT 200');
    ?><div class="notice-strip"><strong>301 rule registry</strong><span> Rules can be saved and approved here. They do not change Apache redirects until the reviewed export is applied through GitHub.</span></div>
    <div class="split-grid"><section class="panel"><h2>Add or update 301 redirect</h2>
    <form class="editor-form" method="post"><?=csrf_field()?><input type="hidden" name="action" value="redirect">
    <label>Old path<input name="source_path" placeholder="/old-guide/" maxlength="500" required></label>
    <label>Destination path<input name="target_path" placeholder="/travel-blog/new-guide/" maxlength="500" required></label>
    <label>Approval<?php form_select('state',['draft'=>'Draft','approved'=>'Approved for export'],'draft');?></label>
    <button type="submit" class="primary">Save redirect</button></form></section>
    <section class="panel"><div class="panel-heading"><h2>Managed rules</h2><a href="/admin/?export=redirects">Download approved JSON</a></div>
    <?php if (!$rows): ?><p class="empty-state">No managed rules yet. Existing server rules continue to operate unchanged.</p>
    <?php else: ?><div class="table-scroll"><table><thead><tr><th>Source</th><th>Destination</th><th>State</th><th></th></tr></thead><tbody>
    <?php foreach($rows as $r): ?><tr><td><code><?=escape($r['source_path'])?></code></td><td><code><?=escape($r['target_path'])?></code></td><td><span class="status"><?=escape($r['state'])?></span></td>
    <td><form method="post" onsubmit="" class="inline-form"><?=csrf_field()?><input type="hidden" name="action" value="delete_redirect"><input type="hidden" name="source_path" value="<?=escape($r['source_path'])?>"><button class="text-danger" type="submit">Remove</button></form></td></tr><?php endforeach; ?></tbody></table></div><?php endif; ?></section></div><?php
}
function render_seo(): void {
    $rows=query_all('SELECT * FROM admin_seo_overrides ORDER BY updated_at DESC LIMIT 200');
    ?><div class="notice-strip"><strong>Static SEO publishing</strong><span> Page changes are proposals until approved JSON is integrated into the static build. Current live meta tags are not overridden from this database.</span></div>
    <section class="panel"><h2>Page SEO fields</h2><form method="post" class="editor-form seo-grid"><?=csrf_field()?><input type="hidden" name="action" value="seo">
    <label>Page path<input name="page_path" maxlength="500" placeholder="/travel-blog/uber-in-israel/" required></label>
    <label>Meta title<input name="meta_title" maxlength="140" required></label>
    <label class="wide">Meta description<textarea name="meta_description" maxlength="330" rows="3" required></textarea></label>
    <label>Open Graph title (optional)<input name="og_title" maxlength="140"></label>
    <label>Open Graph description (optional)<input name="og_description" maxlength="330"></label>
    <label>Robots<?php form_select('robots',['index,follow'=>'Index, follow','noindex,follow'=>'Noindex, follow','noindex,nofollow'=>'Noindex, nofollow'],'index,follow');?></label>
    <label>Approval<?php form_select('state',['draft'=>'Draft','approved'=>'Approved for export'],'draft');?></label>
    <div><button class="primary" type="submit">Save SEO fields</button></div></form></section>
    <section class="panel"><div class="panel-heading"><h2>Managed SEO changes</h2><a href="/admin/?export=seo">Download approved JSON</a></div>
    <?php if(!$rows): ?><p class="empty-state">No SEO overrides. The site's existing React metadata remains the source of truth.</p><?php else: ?><div class="table-scroll"><table><thead><tr><th>Page</th><th>Meta title</th><th>Robots</th><th>State</th><th></th></tr></thead><tbody><?php foreach($rows as $r): ?><tr><td><code><?=escape($r['page_path'])?></code></td><td><?=escape($r['meta_title'])?></td><td><?=escape($r['robots'])?></td><td><span class="status"><?=escape($r['state'])?></span></td><td><form class="inline-form" method="post"><?=csrf_field()?><input type="hidden" name="action" value="delete_seo"><input type="hidden" name="page_path" value="<?=escape($r['page_path'])?>"><button class="text-danger" type="submit">Remove</button></form></td></tr><?php endforeach; ?></tbody></table></div><?php endif; ?></section><?php
}
function render_jobs(): void {
    $github = github_recent_runs();
    ?><section class="panel"><div class="panel-heading"><h2>Live GitHub Actions</h2><a href="https://github.com/Yeruham81/Israel-Travel-Hub/actions" target="_blank" rel="noopener noreferrer">Open GitHub ↗</a></div>
    <?php if (!$github['connected']): ?><p class="empty-state"><?=escape($github['message'])?> No workflows are assumed successful when the connection is unavailable.</p>
    <?php else: ?><p class="muted small">Latest 30 GitHub runs, read directly using a server-only, read-only token.</p><div class="table-scroll"><table><thead><tr><th>Created</th><th>Workflow</th><th>Branch</th><th>Result</th><th>Run</th></tr></thead><tbody>
    <?php foreach($github['runs'] as $r): ?><tr><td><?=escape($r['created_at'])?></td><td><?=escape($r['name'])?></td><td><?=escape($r['branch'])?></td><td><span class="status"><?=escape($r['status'])?></span></td><td><a href="<?=escape($r['url'])?>" target="_blank" rel="noopener noreferrer">View ↗</a></td></tr><?php endforeach; ?></tbody></table></div><?php endif; ?></section>
    <?php $rows=query_all('SELECT * FROM admin_job_events ORDER BY observed_at DESC LIMIT 200'); ?>
    <section class="panel"><div class="panel-heading"><h2>Internal event archive</h2><span class="small-muted">Up to 200 imported events</span></div>
    <?php if (!$rows): ?><p class="empty-state">No internal event reports recorded. Live GitHub runs above are independent of this archive.</p>
    <?php else: ?><div class="table-scroll"><table><thead><tr><th>Observed</th><th>Job</th><th>Status</th><th>Details</th></tr></thead><tbody><?php foreach($rows as $r): ?><tr><td><?=escape($r['observed_at'])?></td><td><?=escape($r['job_name'])?></td><td><?=escape($r['status'])?></td><td><?=escape($r['details'])?></td></tr><?php endforeach; ?></tbody></table></div><?php endif; ?></section><?php
}
function render_backups(): void {
    $folders = local_deployment_backups();
    ?><div class="notice-strip"><strong>Backup safety</strong><span> Existing deployment backup folders are read directly from Hostinger outside public_html. Presence does not prove that a backup has been restore-tested.</span></div>
    <section class="panel"><div class="panel-heading"><h2>Hostinger deployment backups</h2><span class="small-muted">Last 30 directories, read-only</span></div>
    <?php if (!$folders): ?><p class="empty-state">No readable deployment backup directories found. This does not mean Hostinger account backups are absent.</p>
    <?php else: ?><div class="table-scroll"><table><thead><tr><th>Backup run</th><th>Last updated</th><th>Asset manifest</th></tr></thead><tbody>
    <?php foreach($folders as $folder): ?><tr><td><code><?=escape($folder['name'])?></code></td><td><?=escape($folder['modified_at'])?></td><td><?= $folder['manifest'] ? 'Present' : 'Not recorded' ?></td></tr><?php endforeach; ?></tbody></table></div><?php endif; ?></section>
    <?php $rows=query_all('SELECT * FROM admin_backups ORDER BY created_at DESC LIMIT 200'); ?>
    <section class="panel"><div class="panel-heading"><h2>Additional backup inventory</h2></div>
    <?php if (!$rows): ?><p class="empty-state">No additional backup inventory has been imported; restore and creation actions are not yet connected.</p>
    <?php else: ?><div class="table-scroll"><table><thead><tr><th>Created</th><th>Name</th><th>Type</th><th>Status</th><th>Last verified</th></tr></thead><tbody>
    <?php foreach($rows as $r): ?><tr><td><?=escape($r['created_at'])?></td><td><?=escape($r['backup_name'])?></td><td><?=escape($r['backup_kind'])?></td><td><span class="status"><?=escape($r['status'])?></span></td><td><?=escape($r['verified_at'] ?: 'Not verified')?></td></tr><?php endforeach; ?></tbody></table></div><?php endif; ?></section><?php
}
function render_users(array $user): void {
    $rows=query_all('SELECT id,username,role,active,created_at,last_login_at FROM admin_users ORDER BY id');
    ?><div class="split-grid"><section class="panel"><h2>Create administrator</h2><form method="post" class="editor-form" autocomplete="off">
    <?=csrf_field()?><input type="hidden" name="action" value="create_user">
    <label>Username<input name="username" autocomplete="off" minlength="3" maxlength="64" required></label>
    <label>Temporary password<input name="password" type="password" minlength="14" maxlength="200" autocomplete="new-password" required></label>
    <label>Access level<?php form_select('role',['admin'=>'Administrator','editor'=>'Editor','viewer'=>'Viewer'],'editor');?></label>
    <button type="submit" class="primary">Create user</button></form>
    <p class="muted small">Only the owner can manage accounts. Users are not allowed to sign up publicly.</p></section>
    <section class="panel"><h2>Existing accounts</h2><div class="account-list"><?php foreach($rows as $r): ?><div class="user-row">
    <div><strong><?=escape($r['username'])?></strong><small><?=escape($r['role'])?> · <?=((int)$r['active']===1?'Active':'Disabled')?> · Last sign-in: <?=escape($r['last_login_at']?:'Never')?></small></div>
    <?php if ((int)$r['id'] !== (int)$user['id'] && $r['role']!=='owner'): ?>
    <form method="post" class="inline-form"><?=csrf_field()?><input type="hidden" name="action" value="update_user"><input type="hidden" name="id" value="<?=(int)$r['id']?>">
    <?php form_select('role',['admin'=>'Admin','editor'=>'Editor','viewer'=>'Viewer'],(string)$r['role']); ?>
    <label class="inline-check"><input type="checkbox" name="active" value="1" <?=((int)$r['active']===1?'checked':'')?>> Active</label>
    <button type="submit" class="secondary">Update</button></form>
    <form method="post" class="inline-form"><?=csrf_field()?><input type="hidden" name="action" value="reset_password"><input type="hidden" name="id" value="<?=(int)$r['id']?>"><input name="password" type="password" autocomplete="new-password" placeholder="New password (14+)" minlength="14" maxlength="200" required><button class="secondary" type="submit">Reset</button></form>
    <?php endif; ?></div><?php endforeach; ?></div></section></div><?php
}
function render_audit(): void {
    $rows=query_all('SELECT a.occurred_at,a.action,a.module,a.item_id,a.details_json,u.username FROM admin_audit a LEFT JOIN admin_users u ON u.id=a.actor_id ORDER BY a.occurred_at DESC LIMIT 200');
    ?><section class="panel"><div class="panel-heading"><h2>Security and management audit</h2><span class="small-muted">Last 200 events</span></div>
    <?php if(!$rows): ?><p class="empty-state">No administrative changes yet.</p><?php else: ?><div class="table-scroll"><table><thead><tr><th>Date</th><th>User</th><th>Module</th><th>Action</th><th>Item</th></tr></thead><tbody><?php foreach($rows as $r): ?><tr><td><?=escape($r['occurred_at'])?></td><td><?=escape($r['username']?:'System')?></td><td><?=escape($r['module'])?></td><td><?=escape($r['action'])?></td><td><?=escape($r['item_id'])?></td></tr><?php endforeach; ?></tbody></table></div><?php endif; ?></section><?php
}
function render_module(string $page, array $user): void {
    switch ($page) {
        case 'dashboard': render_dashboard($user); break;
        case 'inbox': render_inbox($user); break;
        case 'consents': render_consents(); break;
        case 'redirects': render_redirects(); break;
        case 'seo': render_seo(); break;
        case 'jobs': render_jobs(); break;
        case 'backups': render_backups(); break;
        case 'users': render_users($user); break;
        case 'audit': render_audit(); break;
        default: echo '<p class="empty-state">Unknown page.</p>';
    }
}
