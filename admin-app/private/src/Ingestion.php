<?php
declare(strict_types=1);
namespace ITH\Admin;

/**
 * Call ONLY from the existing, trusted PHP quote-delivery handler after the
 * request has passed its validation and Brevo has confirmed acceptance.
 *
 * This function is not reachable through an unauthenticated public endpoint.
 * Idempotent request_id ensures retries do not duplicate records.
 * It never sends emails; existing delivery behaviour stays authoritative.
 */
function record_accepted_enquiry(array $validated, string $subject, string $messageBody): bool {
    $id = $validated['requestId'] ?? '';
    $request = $validated['request'] ?? null;
    $kind = is_array($request) ? ($request['kind'] ?? '') : '';
    $fields = is_array($request) ? ($request['fields'] ?? []) : [];
    if (!is_string($id) || !preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iD', $id)) return false;
    if (!in_array($kind, ['contact','transfer','driver','shore'], true) || !is_array($fields)) return false;
    $name = $fields['name'] ?? '';
    $email = $fields['email'] ?? '';
    if (!is_string($name) || !is_string($email) || $name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) return false;
    if (safe_length($name) > 120 || safe_length($email) > 254 || safe_length($subject) > 160 || safe_length($messageBody) > 10000) return false;
    $path = $validated['sourcePath'] ?? null;
    if ($path !== null && (!is_string($path) || strlen($path) > 500)) $path = null;
    try {
        $q = db()->prepare(
            'INSERT INTO admin_enquiries (request_id,kind,name,email,subject,body,source_path,payload_json,delivery_status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE request_id = request_id'
        );
        $q->execute([
            $id, $kind, $name, $email, $subject, $messageBody, $path,
            json_encode($validated, JSON_THROW_ON_ERROR), 'accepted',
        ]);
        return true;
    } catch (\Throwable $error) {
        // The inbox is supplemental. It must NEVER turn an accepted Brevo
        // email into a perceived delivery failure or trigger a duplicate send.
        error_log('ITH admin inbox write failed; existing email delivery remains authoritative.');
        return false;
    }
}
