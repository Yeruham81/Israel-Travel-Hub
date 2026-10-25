<?php
declare(strict_types=1);
/* Offline PHP parity and safety tests: never contact Brevo or Bank of Israel. */
require_once dirname(__DIR__, 2).'/hostinger-php/quote.php';
require_once dirname(__DIR__, 2).'/hostinger-php/fx.php';
function check(bool $ok, string $message): void {
    if (!$ok) { fwrite(STDERR,"FAIL: ".$message."\n");exit(1); }
}
function payload(string $kind): array {
    $fields = match ($kind) {
      'contact' => ['name'=>'Sample Traveler', 'email'=>'sample@example.org', 'subject'=>'Airport question',
        'message'=>'Testing an internal PHP validator.', 'consent'=>true],
      'transfer' => ['name'=>'Sample Traveler','email'=>'sample@example.org','phone'=>'',
        'date'=>date('Y-m-d', strtotime('+6 months')), 'time'=>'11:30','flight'=>'LY012',
        'destinationId'=>'other','otherDestination'=>'Ein Gedi', 'address'=>'Hotel',
        'passengers'=>'2','suitcases'=>'1','carryOns'=>'0','notes'=>'','consent'=>true],
      'driver' => ['name'=>'Sample Traveler','email'=>'sample@example.org','phone'=>'',
        'serviceId'=>'multi-stop','date'=>date('Y-m-d', strtotime('+6 months')), 'time'=>'',
        'pickup'=>'Tel Aviv','dropoff'=>'Jerusalem','passengers'=>'2','luggage'=>'',
        'itinerary'=>'Visit the Old City','notes'=>'','consent'=>true],
      'shore' => ['name'=>'Sample Traveler','email'=>'sample@example.org','phone'=>'','country'=>'US',
        'ship'=>'Test Vessel','date'=>date('Y-m-d', strtotime('+6 months')),
        'pickupTime'=>'08:00','allAboardDate'=>date('Y-m-d', strtotime('+6 months')),
        'allAboardTime'=>'18:00','itineraryId'=>'other','otherItinerary'=>'Caesarea',
        'passengers'=>'2','notes'=>'','consent'=>true],
    };
    return ['requestId'=>sprintf('%s-%s-4%s-%s-%s', bin2hex(random_bytes(4)),
      bin2hex(random_bytes(2)),substr(bin2hex(random_bytes(2)),1),
      'a'.substr(bin2hex(random_bytes(2)),1),bin2hex(random_bytes(6))),
      'website'=>'','sourcePath'=>'/private-driver/','sourceTitle'=>'Private driver in Israel',
      'request'=>array_merge(['kind'=>$kind,'fields'=>$fields],$kind==='shore'?['portId'=>'haifa']:[])];
}

$storage = sys_get_temp_dir().'/ith-php-smoke-'.bin2hex(random_bytes(5));
check(mkdir($storage, 0700), 'make private temporary storage');
$config=['BREVO_API_KEY'=>'FAKE-DO-NOT-SEND','QUOTE_DELIVERY_ENABLED'=>'true','STORAGE_DIR'=>$storage];
$headers=['REQUEST_METHOD'=>'POST','HTTP_HOST'=>'local.test','HTTP_ORIGIN'=>'https://local.test',
  'CONTENT_TYPE'=>'application/json', 'REMOTE_ADDR'=>'203.0.113.10'];
$options=ith_options();
check(isset($options['destinations'],$options['driver'],$options['itineraries']['haifa']), 'build-generated options imported');
$sent=0;
$sender=function(array $draft,string $key)use(&$sent):array {
    $sent++;
    check($key==='FAKE-DO-NOT-SEND', 'test key never leaves test callback');
    check(str_starts_with($draft['subject'],'Moshe Barak - Taxi & Travel in Israel / '),'correct email subject');
    check(str_contains($draft['text'],'Sent from page: '),'source included');
    check(str_contains($draft['html'],'<strong>Name:</strong>'),'safe HTML');
    return ['accepted'=>true];
};
foreach(['contact','transfer','driver','shore'] as $kind) {
    $input=payload($kind);
    check(ith_validate_input($input,$options)!==null,'valid '.$kind.' accepted');
    $result=ith_quote_request($config,$headers,json_encode($input,JSON_THROW_ON_ERROR),$sender);
    check($result[0]===200&&$result[1]['requestId']===$input['requestId'],'successful '.$kind.' quote');
    $again=ith_quote_request($config,$headers,json_encode($input),$sender);
    check($again[0]===200,'idempotent retry of '.$kind);
}
check($sent===4,'one callback per unique UUID');
$bad=payload('contact');$bad['request']['fields']['consent']=false;
check(ith_validate_input($bad,$options)===null,'consent enforced');
$bad=payload('transfer');$bad['request']['fields']['destinationId']='untrusted';
check(ith_validate_input($bad,$options)===null,'destination allowlist enforced');
$bad=payload('contact');$bad['website']='bot-field';
check(ith_validate_input($bad,$options)===null,'honeypot enforced');
$bad=payload('contact');$bad['request']['fields']['email']="inject@example.org\r\nBcc: someone@elsewhere.example";
check(ith_validate_input($bad,$options)===null,'mail header injection blocked');
$bad=payload('contact');$bad['request']['fields']['message']=str_repeat('A',4001);
check(ith_validate_input($bad,$options)===null,'message length restricted');
$base=json_encode(payload('contact'),JSON_THROW_ON_ERROR);
$cross=$headers;$cross['HTTP_ORIGIN']='https://attacker.test';
check(ith_quote_request($config,$cross,$base,$sender)[0]===403,'cross-origin refused');
$wrong=$headers;$wrong['CONTENT_TYPE']='text/plain';
check(ith_quote_request($config,$wrong,$base,$sender)[0]===415,'content type enforced');
$disabled=$config;$disabled['QUOTE_DELIVERY_ENABLED']='false';
check(ith_quote_request($disabled,$headers,$base,$sender)[0]===503,'disabled by default');
check(ith_quote_request($config,['REQUEST_METHOD'=>'GET'],'',$sender)[1]['available']===true,'GET availability true');
$rates = [
 'exchangeRates'=>[
   ['key'=>'USD','unit'=>1,'currentExchangeRate'=>3.35,'lastUpdate'=>gmdate('Y-m-d\TH:i:s\Z')],
   ['key'=>'EUR','unit'=>1,'currentExchangeRate'=>3.72,'lastUpdate'=>gmdate('Y-m-d\TH:i:s\Z')],
 ]];
$upstreamCalls=0;
$fxFetcher=function()use(&$upstreamCalls,$rates){$upstreamCalls++;return ['payload'=>$rates];};
$fx=ith_currency_request($config,['REQUEST_METHOD'=>'GET'],$fxFetcher);
check($fx[0]===200&&$fx[1]['status']==='fresh','fresh Bank of Israel snapshot');
check($fx[1]['rates']['ilsPerUnit']['USD']===3.35,'USD amount maintained');
$cached=ith_currency_request($config,['REQUEST_METHOD'=>'GET'],$fxFetcher);
check($cached[0]===200&&$upstreamCalls===1,'PHP cache reused and no redundant upstream call');
check(ith_currency_request($config,['REQUEST_METHOD'=>'POST'],$fxFetcher)[0]===405,'FX read-only');
foreach(glob($storage.'/*')?:[] as $file) unlink($file);
rmdir($storage);
echo "PHP API trial passed: 4 form types, idempotency, validation, origins, BOI cache and method guards.\n";
