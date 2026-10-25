<?php
declare(strict_types=1);

/**
 * Hostinger Premium PHP bridge; no Vite/Node process required at runtime.
 * The same paths are used by the existing React browser clients.
 * No secrets belong in public_html, Git, or VITE_* build variables.
 */
date_default_timezone_set('UTC');

function ith_json(array $payload, int $status = 200, array $headers = []): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    header('X-Robots-Tag: noindex, nofollow');
    header('Referrer-Policy: no-referrer');
    foreach ($headers as $key => $value) header($key . ': ' . $value);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
}

function ith_config(): array {
    $root = isset($_SERVER['DOCUMENT_ROOT']) && is_string($_SERVER['DOCUMENT_ROOT'])
        ? rtrim($_SERVER['DOCUMENT_ROOT'], '/\\') : '';
    // Hostinger site-specific secret file is one level ABOVE public_html.
    $private = $root !== '' ? dirname($root) . '/ith-hostinger-config.php' : '';
    $config = [];
    if ($private !== '' && is_file($private)) {
        $loaded = require $private;
        if (is_array($loaded)) $config = $loaded;
    }
    $config['BREVO_API_KEY'] = $config['BREVO_API_KEY'] ?? getenv('BREVO_API_KEY') ?: '';
    $config['QUOTE_DELIVERY_ENABLED'] = $config['QUOTE_DELIVERY_ENABLED'] ?? getenv('QUOTE_DELIVERY_ENABLED') ?: 'false';
    $config['STORAGE_DIR'] = $config['STORAGE_DIR'] ?? ($root !== '' ? dirname($root) . '/ith-private-cache' : sys_get_temp_dir() . '/ith-private-cache');
    return $config;
}

function ith_quote_enabled(array $cfg): bool {
    return ($cfg['QUOTE_DELIVERY_ENABLED'] === true || $cfg['QUOTE_DELIVERY_ENABLED'] === 'true')
      && is_string($cfg['BREVO_API_KEY']) && trim($cfg['BREVO_API_KEY']) !== ''
      && extension_loaded('curl');
}

function ith_options(): array {
    $data = @file_get_contents(__DIR__ . '/form-options.json');
    $parsed = is_string($data) ? json_decode($data, true) : null;
    return is_array($parsed) ? $parsed : [];
}

function ith_has_exact_keys(array $input, array $keys): bool {
    $existing = array_keys($input);
    sort($existing);
    sort($keys);
    return $existing === $keys;
}

function ith_error(string $message, int $status = 400): void {
    ith_json(['error' => $message], $status);
}

function ith_length(string $text): int {
    if (function_exists('mb_strlen')) return mb_strlen($text, 'UTF-8');
    return preg_match_all('/./us', $text) ?: strlen($text);
}

function ith_trimline(string $text): string {
    return trim(preg_replace('/[\r\n]+/u', ' ', $text) ?? '');
}

function ith_html_email(string $text): string {
    $labels = ['Sent from page', 'Name', 'Email', 'Subject', 'Message',
      'Phone / WhatsApp', 'Pickup', 'Destination', 'Hotel / address',
      'Flight arrival', 'Flight number', 'Passengers', 'Suitcases',
      'Carry-ons', 'Additional requests / child seats', 'Service', 'Pickup date',
      'Preferred pickup time', 'Final drop-off', 'Luggage',
      'Stops, approximate timing and priorities', 'Additional requests',
      'Country', 'Departure & return port', 'Cruise ship', 'Excursion date',
      'Expected disembarkation', "Ship's all-aboard deadline",
      'Requested itinerary',
      'Priorities, child seats, mobility needs or additional requests',
      'Website', 'Form', 'Submitted', 'Request reference'];
    $out = [];
    foreach (preg_split('/\r?\n/', $text) as $line) {
        $matched = false;
        foreach ($labels as $label) {
            if (str_starts_with($line, $label . ':')) {
                $out[] = '<strong>' . htmlspecialchars($label . ':', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')
                  . '</strong>' . htmlspecialchars(substr($line, strlen($label) + 1), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
                $matched = true;
                break;
            }
        }
        if (!$matched) $out[] = htmlspecialchars($line, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }
    return '<!doctype html><html><body><div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#1a2d42;">'
      . implode('<br>', $out) . '</div></body></html>';
}

function ith_israel_now(?int $now = null): array {
    $date = (new DateTimeImmutable('@' . ($now ?? time())))->setTimezone(new DateTimeZone('Asia/Jerusalem'));
    return ['date' => $date->format('Y-m-d'), 'time' => $date->format('H:i')];
}

function ith_valid_date($date): bool {
    if (!is_string($date) || !preg_match('/^\d{4}-\d{2}-\d{2}$/D', $date)) return false;
    $d = DateTimeImmutable::createFromFormat('!Y-m-d', $date, new DateTimeZone('UTC'));
    return $d !== false && $d->format('Y-m-d') === $date;
}
function ith_valid_time($time): bool {
    return is_string($time) && preg_match('/^(?:[01][0-9]|2[0-3]):[0-5][0-9]$/D', $time) === 1;
}
function ith_valid_count(string $value, int $min, int $max): bool {
    return preg_match('/^\d{1,3}$/D', $value) === 1 && (int)$value >= $min && (int)$value <= $max;
}
function ith_valid_email(string $email): bool {
    return strlen($email) <= 254 && filter_var($email, FILTER_VALIDATE_EMAIL) !== false
        && preg_match('/[<>,;\r\n]/', $email) !== 1;
}

function ith_validate_input($payload, array $meta, ?int $now = null): ?array {
    if (!is_array($payload) || !array_key_exists('request', $payload)) return null;
    $top = ['requestId','website','sourcePath','request'];
    if (array_key_exists('sourceTitle', $payload)) $top[] = 'sourceTitle';
    if (!ith_has_exact_keys($payload, $top)) return null;
    if (!is_string($payload['requestId']) || !preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iD', $payload['requestId'])) return null;
    if (!is_string($payload['website']) || ith_length($payload['website']) > 200 || $payload['website'] !== '') return null;
    if (!is_string($payload['sourcePath']) || strlen($payload['sourcePath']) > 300 || !preg_match('~^/[a-zA-Z0-9/_-]*$~D', $payload['sourcePath'])) return null;
    if (isset($payload['sourceTitle']) && (!is_string($payload['sourceTitle']) ||
      trim($payload['sourceTitle']) === '' || ith_length($payload['sourceTitle']) > 300 ||
      preg_match('/[\x00-\x1F\x7F]/', $payload['sourceTitle']))) return null;
    $req = $payload['request'];
    if (!is_array($req) || !isset($req['kind'], $req['fields']) || !is_string($req['kind']) || !is_array($req['fields'])) return null;
    $kind = $req['kind'];
    if (!in_array($kind, ['transfer', 'driver', 'contact', 'shore'], true)) return null;
    $keys = ['kind','fields'];
    if ($kind === 'shore') $keys[] = 'portId';
    if (!ith_has_exact_keys($req, $keys)) return null;
    if ($kind === 'shore' && (!is_string($req['portId']) || !in_array($req['portId'], ['haifa','ashdod'], true))) return null;
    $fieldKeys = match ($kind) {
        'transfer' => ['name','email','phone','date','time','flight','destinationId','otherDestination','address','passengers','suitcases','carryOns','notes','consent'],
        'driver' => ['name','email','phone','serviceId','date','time','pickup','dropoff','passengers','luggage','itinerary','notes','consent'],
        'shore' => ['name','email','phone','country','ship','date','pickupTime','allAboardDate','allAboardTime','itineraryId','otherItinerary','passengers','notes','consent'],
        default => ['name','email','subject','message','consent'],
    };
    if (!ith_has_exact_keys($req['fields'], $fieldKeys)) return null;
    $f = $req['fields'];
    foreach ($f as $key => $value) {
        if ($key === 'consent') { if ($value !== true) return null; continue; }
        if (!is_string($value) || ith_length($value) > ($kind === 'contact' && $key === 'message' ? 4000 : 1500)) return null;
    }
    if (trim($f['name']) === '' || ith_length($f['name']) > 120 || !ith_valid_email(trim($f['email']))) return null;
    $today = ith_israel_now($now);
    if ($kind === 'contact') {
        if (trim($f['subject']) === '' || ith_length($f['subject']) > 160 ||
            trim($f['message']) === '' || ith_length($f['message']) > 4000) return null;
        return $payload;
    }
    if (!ith_valid_date($f['date']) || $f['date'] < $today['date']) return null;
    if ($kind !== 'driver' || $f['time'] !== '') {
        if ($kind === 'shore') $t = $f['pickupTime']; else $t = $f['time'];
        if (!ith_valid_time($t) || ($f['date'] === $today['date'] && $t < $today['time'])) return null;
    }
    if (!ith_valid_count($f['passengers'], 1, 99) || ith_length($f['phone']) > 50 || ith_length($f['notes']) > 1500) return null;
    if ($kind === 'transfer') {
        if (!isset($meta['destinations']) || (!isset($meta['destinations'][$f['destinationId']]) && $f['destinationId'] !== 'other')) return null;
        if ($f['destinationId'] === 'other' && trim($f['otherDestination']) === '') return null;
        if (!ith_valid_time($f['time']) || !ith_valid_count($f['suitcases'],0,40) ||
          !ith_valid_count($f['carryOns'],0,40) || ith_length($f['address']) > 250 ||
          ith_length($f['flight']) > 30 || ith_length($f['otherDestination']) > 120) return null;
    } elseif ($kind === 'driver') {
        if (!isset($meta['driver'][$f['serviceId']]) || trim($f['pickup']) === '' ||
          trim($f['dropoff']) === '' || ith_length($f['pickup']) > 250 ||
          ith_length($f['dropoff']) > 250 || ith_length($f['luggage']) > 250) return null;
        if (in_array($f['serviceId'], ['day-hire','multi-stop'], true) && trim($f['itinerary']) === '') return null;
    } else {
        $port = $req['portId'];
        if (trim($f['ship']) === '' || ith_length($f['ship']) > 120 ||
            ith_length($f['country']) > 100 || ith_length($f['otherItinerary']) > 250 ||
            !ith_valid_time($f['allAboardTime']) || !ith_valid_date($f['allAboardDate']) ||
            $f['allAboardDate'].'T'.$f['allAboardTime'] <= $f['date'].'T'.$f['pickupTime']) return null;
        if (!isset($meta['itineraries'][$port][$f['itineraryId']]) && $f['itineraryId'] !== 'other') return null;
        if ($f['itineraryId'] === 'other' && trim($f['otherItinerary']) === '') return null;
    }
    return $payload;
}
