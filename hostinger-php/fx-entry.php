<?php
declare(strict_types=1);
require_once __DIR__ . '/../_internal/fx.php';
$cfg = ith_config();
try {
    [$status,$body,$extra] = ith_currency_request($cfg,$_SERVER);
    ith_json($body,$status,$extra??[]);
} catch (Throwable $e) {
    error_log('php currency entry failed');
    ith_json(['rates'=>null,'status'=>'unavailable'],503,['Retry-After'=>'900']);
}
