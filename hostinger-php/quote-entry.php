<?php
declare(strict_types=1);
require_once __DIR__ . '/../_internal/quote.php';
$cfg = ith_config();
$raw = file_get_contents('php://input', false, null, 0, 20001);
try {
    [$status, $body, $extra] = ith_quote_request($cfg, $_SERVER, is_string($raw)?$raw:'');
    ith_json($body, $status, $extra??[]);
} catch (Throwable $e) {
    error_log('php quote entry failed');
    ith_json(['error'=>'Message sending is temporarily unavailable. Please try again later.'],503);
}
