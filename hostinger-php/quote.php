<?php
declare(strict_types=1);
require_once __DIR__ . '/shared.php';

function ith_quote_draft(array $payload, array $opts): array {
    $r = $payload['request']; $f = $r['fields']; $kind = $r['kind'];
    $line = static fn(string $name): string => ith_trimline($f[$name]);
    $name = $line('name');
    $subject = 'Moshe Barak - Taxi & Travel in Israel / ' . $name;
    $body = ['Name: ' . $name, 'Email: ' . $line('email')];
    if ($kind === 'contact') {
        $body = ['Name: '.$name, 'Email: '.$line('email'), 'Subject: '.$line('subject'),
          '', 'Message:', trim($f['message']), '',
          'I consent to sharing these details with Moshe Barak for this inquiry.'];
    } elseif ($kind === 'transfer') {
        $destination = $opts['destinations'][$f['destinationId']] ?? trim($f['otherDestination']);
        $body = array_merge($body, [
          'Phone / WhatsApp: '.($line('phone') ?: 'Not supplied'),
          'Pickup: Ben Gurion Airport (TLV)', 'Destination: '.ith_trimline($destination),
          'Hotel / address: '.($line('address') ?: 'To be confirmed'),
          'Flight arrival: '.$f['date'].' at '.$f['time'].' (Israel local time)',
          'Flight number: '.($line('flight') ?: 'To be confirmed'),
          'Passengers: '.$f['passengers'], 'Suitcases: '.$f['suitcases'],
          'Carry-ons: '.$f['carryOns'], '', 'Additional requests / child seats:',
          trim($f['notes']) ?: 'None specified', '',
          'I consent to sharing these details with Moshe Barak for this inquiry.']);
    } elseif ($kind === 'driver') {
        $body = array_merge($body, [
          'Phone / WhatsApp: '.($line('phone') ?: 'Not supplied'),
          'Service: '.$opts['driver'][$f['serviceId']],
          'Pickup date: '.$f['date'],
          'Preferred pickup time: '.($line('time') ?: 'To be agreed').' (Israel local time)',
          'Pickup: '.$line('pickup'), 'Final drop-off: '.$line('dropoff'),
          'Passengers: '.$f['passengers'],
          'Luggage: '.($line('luggage') ?: 'To be confirmed'), '',
          'Stops, approximate timing and priorities:',
          trim($f['itinerary']) ?: 'Direct journey between the addresses above.', '',
          'Additional requests:', trim($f['notes']) ?: 'None specified', '',
          'I consent to sharing these details with Moshe Barak for this inquiry.']);
    } else {
        $port = $r['portId'];
        $itinerary = $opts['itineraries'][$port][$f['itineraryId']] ?? trim($f['otherItinerary']);
        $body = array_merge($body, [
          'Phone / WhatsApp: '.($line('phone') ?: 'Not supplied'),
          'Country: '.($line('country') ?: 'Not supplied'),
          'Departure & return port: '.$opts['ports'][$port].' Port',
          'Cruise ship: '.$line('ship'), 'Excursion date: '.$f['date'],
          'Expected disembarkation: '.$f['pickupTime'].' (Israel local time)',
          "Ship's all-aboard deadline: ".$f['allAboardDate'].' at '.$f['allAboardTime'].' (Israel local time)',
          'Requested itinerary: '.ith_trimline($itinerary),
          'Passengers: '.$f['passengers'], '',
          'Priorities, child seats, mobility needs or additional requests:',
          trim($f['notes']) ?: 'None specified', '',
          'I consent to sharing these details with Moshe Barak for this inquiry.']);
    }
    $sent = (new DateTimeImmutable('now', new DateTimeZone('Asia/Jerusalem')))->format('d F Y, H:i') . ' (Israel time)';
    $text = 'Sent from page: '.($payload['sourceTitle'] ?? $payload['sourcePath'])
       . "\n\n" . implode("\n", $body)
       . "\n\n---\nWebsite: Israel Taxi & Travel\nForm: ".$kind
       . "\nSubmitted: ".$sent."\nRequest reference: ".$payload['requestId'];
    return ['subject'=>$subject, 'text'=>$text, 'html'=>ith_html_email($text),
      'replyTo'=>trim($f['email']), 'senderName'=>$name, 'requestId'=>$payload['requestId']];
}

/**
 * Actual Brevo API call: fixed recipient/sender, explicit TLS verification,
 * redirects disabled, timeout bounded, and never expose provider text.
 * Return a safe error code; caller retains the idempotency result in a lock file.
 */
function ith_brevo_send(array $draft, string $apiKey): array {
    $email = 'reservations@israel-taxi.com';
    $payload = [
      'sender' => ['email'=>$email, 'name'=>$draft['senderName']],
      'to' => [['email'=>$email]],
      'replyTo' => ['email'=>$draft['replyTo']],
      'subject'=>$draft['subject'], 'textContent'=>$draft['text'],
      'htmlContent'=>$draft['html'],
      'headers' => ['idempotencyKey'=>$draft['requestId'], 'X-Mailin-custom'=>'request-reference:'.$draft['requestId']],
    ];
    try { $body = json_encode($payload, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE); }
    catch (Throwable $e) { return ['error'=>'BREVO_RUNTIME']; }
    $ch = curl_init('https://api.brevo.com/v3/smtp/email');
    if ($ch === false) return ['error'=>'BREVO_RUNTIME'];
    curl_setopt_array($ch, [
      CURLOPT_POST=>true, CURLOPT_POSTFIELDS=>$body,
      CURLOPT_HTTPHEADER=>['api-key: '.$apiKey, 'Accept: application/json', 'Content-Type: application/json'],
      CURLOPT_RETURNTRANSFER=>true, CURLOPT_FOLLOWLOCATION=>false,
      CURLOPT_CONNECTTIMEOUT=>6, CURLOPT_TIMEOUT=>20,
      CURLOPT_SSL_VERIFYPEER=>true, CURLOPT_SSL_VERIFYHOST=>2,
      CURLOPT_MAXREDIRS=>0,
    ]);
    $response = curl_exec($ch);
    $httpCode = (int)curl_getinfo($ch,CURLINFO_RESPONSE_CODE);
    $err = curl_errno($ch);
    curl_close($ch);
    if ($response === false) return ['error'=>($err === CURLE_OPERATION_TIMEDOUT ? 'BREVO_TIMEOUT' : 'BREVO_NETWORK')];
    if ($httpCode !== 201) {
        $reason = match (true) {
            $httpCode >= 300 && $httpCode < 400 => 'BREVO_REDIRECT',
            $httpCode === 401 => 'BREVO_UNAUTHORIZED',
            $httpCode === 403 => 'BREVO_FORBIDDEN',
            $httpCode === 429 => 'BREVO_RATE_LIMIT',
            $httpCode >= 500 => 'BREVO_PROVIDER',
            default => 'BREVO_REJECTED',
        };
        if ($httpCode === 400) {
            $details = json_decode($response, true);
            if (is_array($details) && ($details['code'] ?? '') === 'invalid_sender') $reason = 'BREVO_SENDER';
        }
        return ['error'=>$reason];
    }
    $answer = json_decode($response,true);
    if (!is_array($answer) || !is_string($answer['messageId'] ?? null) || trim($answer['messageId']) === '') {
        return ['error'=>'BREVO_RESPONSE'];
    }
    return ['accepted'=>true];
}

function ith_quote_request(array $cfg, array $server, string $raw, ?callable $sender = null): array {
    $method = $server['REQUEST_METHOD'] ?? 'GET';
    if ($method === 'GET') return [200, ['available'=>ith_quote_enabled($cfg)]];
    if ($method !== 'POST') return [405,['error'=>'Method not allowed'],['Allow'=>'GET, POST']];
    $host = strtolower((string)($server['HTTP_HOST'] ?? ''));
    $origin = $server['HTTP_ORIGIN'] ?? '';
    if (!is_string($origin) || !str_starts_with($origin,'https://') ||
        parse_url($origin, PHP_URL_HOST) !== explode(':',$host)[0] ||
        rtrim($origin,'/') !== 'https://'.$host ||
        ($server['HTTP_SEC_FETCH_SITE'] ?? '') === 'cross-site')
        return [403,['error'=>'Invalid request origin']];
    if (strtolower(trim(explode(';', (string)($server['CONTENT_TYPE'] ?? ''))[0])) !== 'application/json')
        return [415,['error'=>'Expected JSON']];
    if (!ith_quote_enabled($cfg)) return [503,['error'=>'Message sending is temporarily unavailable. Please try again later.']];
    if (strlen($raw)>20000) return [400,['error'=>'Please check your request details.']];
    try { $input = json_decode($raw,true,32,JSON_THROW_ON_ERROR); } catch (Throwable $e) { return [400,['error'=>'Please check your request details.']]; }
    $options = ith_options();
    $payload = ith_validate_input($input, $options);
    if (!$payload) return [400,['error'=>'Please check your request details.']];
    $draft = ith_quote_draft($payload,$options);
    // Writable store outside public_html is required: without a cross-request
    // ledger, retries could produce multiple customer emails after a timeout.
    $dir = (string)($cfg['STORAGE_DIR'] ?? '');
    if (!$dir || (!is_dir($dir) && !@mkdir($dir,0700,true))) return [503,['error'=>'Message sending is temporarily unavailable. Please try again later.']];
    $file = @fopen(rtrim($dir,'/').'/quote-requests.json','c+');
    if (!$file) return [503,['error'=>'Message sending is temporarily unavailable. Please try again later.']];
    @chmod(rtrim($dir,'/').'/quote-requests.json',0600);
    try {
        if (!flock($file,LOCK_EX)) return [503,['error'=>'Message sending is temporarily unavailable. Please try again later.']];
        rewind($file);
        $ledger = json_decode(stream_get_contents($file),true);
        if (!is_array($ledger)) $ledger = ['recent'=>[],'limits'=>[]];
        foreach (['recent','limits'] as $key) if (!isset($ledger[$key]) || !is_array($ledger[$key])) $ledger[$key]=[];
        $now=time();
        foreach ($ledger['recent'] as $key=>$val) if (($val['expires'] ?? 0)<=$now) unset($ledger['recent'][$key]);
        foreach ($ledger['limits'] as $key=>$val) if (($val['expires'] ?? 0)<=$now) unset($ledger['limits'][$key]);
        $fingerprint=hash('sha256',json_encode(['request'=>$payload['request'],'sourcePath'=>$payload['sourcePath'],'sourceTitle'=>$payload['sourceTitle']??null]));
        $id=$payload['requestId'];
        if (isset($ledger['recent'][$id])) {
            $previous=$ledger['recent'][$id];
            if ($previous['fingerprint'] !== $fingerprint) return [409,['error'=>'Edited details need a new request reference.']];
            return [$previous['http'], $previous['body']];
        }
        $keys=['email:'.hash('sha256',strtolower($draft['replyTo']))];
        if (!empty($server['REMOTE_ADDR'])) $keys[]='ip:'.hash('sha256',$server['REMOTE_ADDR']);
        if (count($ledger['recent'])>=200 || count($ledger['limits'])>=500) return [429,['error'=>'Too many requests. Please try later or use email.'],['Retry-After'=>'600']];
        foreach ($keys as $key) if (($ledger['limits'][$key]['count']??0)>=5) return [429,['error'=>'Too many requests. Please try later or use email.'],['Retry-After'=>'600']];
        foreach ($keys as $key) {
            $prior=$ledger['limits'][$key]??['count'=>0,'expires'=>$now+600];
            $prior['count']++; $ledger['limits'][$key]=$prior;
        }
        // Keep the lock while sending to serialize same-request concurrent
        // arrivals. Requests are rare; a 20-second max bounds the lock period.
        $send = $sender ?? 'ith_brevo_send';
        $delivered = $send($draft,$cfg['BREVO_API_KEY']);
        if (($delivered['accepted']??false)===true) {
            $status=200; $body=['accepted'=>true,'requestId'=>$id];
        } else {
            $status=502; $body=['error'=>'Email delivery could not be confirmed. Please contact me before sending the same message again.',
                'requestId'=>$id,'deliveryCode'=>$delivered['error']??'BREVO_PROVIDER'];
        }
        $ledger['recent'][$id]=['fingerprint'=>$fingerprint,'http'=>$status,'body'=>$body,'expires'=>$now+600];
        rewind($file);ftruncate($file,0);
        fwrite($file,json_encode($ledger,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR));
        fflush($file);
        return [$status,$body];
    } catch (Throwable $e) {
        error_log('quote-delivery.failed (PHP bridge; no personal data logged)');
        return [503,['error'=>'Message sending is temporarily unavailable. Please try again later.']];
    } finally { flock($file,LOCK_UN);fclose($file); }
}
