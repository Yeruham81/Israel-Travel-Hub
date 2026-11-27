<?php
declare(strict_types=1);
namespace ITH\Admin;

/**
 * Optional live GitHub Actions monitor. Uses a fine-grained, READ-ONLY token
 * in the private server configuration. No GitHub secret reaches the browser.
 */
function github_recent_runs(): array {
    $cfg = config();
    $token = $cfg['github_read_token'] ?? null;
    if (!is_string($token) || $token === '') {
        return ['connected' => false, 'runs' => [], 'message' => 'Configure a read-only GitHub Actions token to enable live monitoring.'];
    }
    if (!function_exists('curl_init')) {
        return ['connected' => false, 'runs' => [], 'message' => 'Server PHP cURL extension is unavailable.'];
    }
    $handle = curl_init('https://api.github.com/repos/Yeruham81/Israel-Travel-Hub/actions/runs?per_page=30');
    if ($handle === false) return ['connected' => false, 'runs' => [], 'message' => 'GitHub monitor could not initialize.'];
    curl_setopt_array($handle, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 3,
        CURLOPT_TIMEOUT => 7,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_HTTPHEADER => [
            'Accept: application/vnd.github+json',
            'X-GitHub-Api-Version: 2022-11-28',
            'Authorization: Bearer ' . $token,
            'User-Agent: Israel-Travel-Hub-Admin',
        ],
    ]);
    $json = curl_exec($handle);
    $status = (int) curl_getinfo($handle, CURLINFO_HTTP_CODE);
    curl_close($handle);
    if (!is_string($json) || $status !== 200) {
        return ['connected' => false, 'runs' => [], 'message' => 'GitHub could not be reached with the configured read-only token.'];
    }
    $payload = json_decode($json, true);
    if (!is_array($payload) || !is_array($payload['workflow_runs'] ?? null)) {
        return ['connected' => false, 'runs' => [], 'message' => 'Unexpected GitHub response.'];
    }
    $runs = [];
    foreach ($payload['workflow_runs'] as $item) {
        if (!is_array($item)) continue;
        $url = (string) ($item['html_url'] ?? '');
        if (!preg_match('~^https://github\.com/Yeruham81/Israel-Travel-Hub/actions/runs/\d+$~D', $url)) continue;
        $runs[] = [
            'name' => substr((string)($item['name'] ?? 'Workflow'), 0, 160),
            'status' => substr((string)($item['conclusion'] ?: $item['status'] ?: 'unknown'), 0, 24),
            'branch' => substr((string)($item['head_branch'] ?? ''), 0, 100),
            'created_at' => substr((string)($item['created_at'] ?? ''), 0, 50),
            'url' => $url,
        ];
    }
    return ['connected' => true, 'runs' => $runs, 'message' => null];
}

/** Read existing verified-site deployment backup DIRECTORY metadata only. */
function local_deployment_backups(): array {
    $root = dirname(__DIR__, 2) . '/deployment-backups';
    if (!is_dir($root) || is_link($root) || !is_readable($root)) return [];
    $entries = scandir($root);
    if (!is_array($entries)) return [];
    $result = [];
    foreach ($entries as $name) {
        if (!preg_match('/^\d{8,15}-[1-9]\d{0,2}$/D', $name)) continue;
        $folder = $root . '/' . $name;
        if (!is_dir($folder) || is_link($folder)) continue;
        $result[] = [
            'name' => $name,
            'modified_at' => gmdate('Y-m-d H:i:s', (int)filemtime($folder)) . ' UTC',
            'manifest' => is_file($folder . '/.asset-manifest'),
        ];
    }
    usort($result, fn($a,$b) => strcmp($b['name'], $a['name']));
    return array_slice($result, 0, 30);
}
