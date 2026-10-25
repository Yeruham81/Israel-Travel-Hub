<?php
declare(strict_types=1);
require_once dirname(__DIR__,2). '/.output/public/api/_internal/quote.php';
require_once dirname(__DIR__,2). '/.output/public/api/_internal/fx.php';

function verify(bool $ok,string $label): void {
    if (!$ok) {fwrite(STDERR,"FAIL ".$label."\n");exit(1);}
    echo "PASS ".$label."\n";
}
$meta=ith_options();
verify(count($meta['destinations']??[])>=4,'generated destinations available');
verify(count($meta['itineraries']['haifa']??[])>=1,'generated shore choices available');
$uuid='123e4567-e89b-42d3-a456-426614174000';
$dir=sys_get_temp_dir().'/ith-php-tests-'.bin2hex(random_bytes(5));
mkdir($dir,0700,true);
$cfg=['BREVO_API_KEY'=>'fake-test-key','QUOTE_DELIVERY_ENABLED'=>'true','STORAGE_DIR'=>$dir];
$server=['REQUEST_METHOD'=>'POST','HTTP_HOST'=>'preview.example','HTTP_ORIGIN'=>'https://preview.example','CONTENT_TYPE'=>'application/json','REMOTE_ADDR'=>'203.0.113.42'];
$fields=['name'=>'Jamie & Alex','email'=>'jamie@example.com','subject'=>'Airport question','message'=>"שלום Moshe\nPlease confirm pickup",'consent'=>true];
$contact=['requestId'=>$uuid,'sourcePath'=>'/about-moshe-barak/','sourceTitle'=>'About Moshe','website'=>'',
  'request'=>['kind'=>'contact','fields'=>$fields]];
$events=[];
$send=function(array $draft,string $key) use (&$events) {
    $events[]=['draft'=>$draft,'key'=>$key];
    return ['accepted'=>true];
};
[$code,$result]=ith_quote_request($cfg,$server,json_encode($contact),$send);
verify($code===200 && ($result['accepted']??false)===true && ($result['requestId']??'')===$uuid,'valid contact accepted');
verify(count($events)===1 && str_contains($events[0]['draft']['subject'],'Jamie & Alex'),'contact subject and delivery invoked');
verify(str_contains($events[0]['draft']['html'],'&amp;') && str_contains($events[0]['draft']['text'],'שלום'),'HTML escaped and unicode retained');
[$code,$result]=ith_quote_request($cfg,$server,json_encode($contact),$send);
verify($code===200 && count($events)===1,'reused UUID never resends');
$modified=$contact;$modified['sourcePath']='/another-page/';
verify(ith_quote_request($cfg,$server,json_encode($modified),$send)[0]===409,'UUID with changed details rejected');
$attacks=[
 ['fields_change'=>['consent'=>false]],
 ['fields_change'=>['email'=>"jamie@example.com\r\nBcc: bad@example.com"]],
 ['fields_change'=>['message'=>'']],
 ['root_change'=>['website'=>'spam']],
 ['root_change'=>['sourcePath'=>'/about/?secret=1']],
 ['root_change'=>['unsafe'=>'forged']],
];
foreach ($attacks as $index=>$attack) {
    $candidate=$contact;
    foreach ($attack['fields_change']??[] as $key=>$value) $candidate['request']['fields'][$key]=$value;
    foreach ($attack['root_change']??[] as $key=>$value) $candidate[$key]=$value;
    verify(ith_quote_request($cfg,$server,json_encode($candidate),$send)[0]===400,'forged payload '.($index+1).' rejected');
}
verify(ith_quote_request($cfg,array_replace($server,['HTTP_ORIGIN'=>'https://evil.example']),json_encode($contact),$send)[0]===403,'cross-origin rejected');
verify(ith_quote_request($cfg,array_replace($server,['CONTENT_TYPE'=>'text/plain']),json_encode($contact),$send)[0]===415,'non JSON rejected');
verify(ith_quote_request($cfg,$server,str_repeat('x',20001),$send)[0]===400,'oversized body rejected');

$date=(new DateTimeImmutable('tomorrow',new DateTimeZone('Asia/Jerusalem')))->format('Y-m-d');
$standard=['name'=>'Jamie','email'=>'jamie@example.com','phone'=>'+44 123','notes'=>'Hi','consent'=>true];
$forms=[
 ['kind'=>'transfer','fields'=>$standard+[
    'date'=>$date,'time'=>'14:30','flight'=>'LY315','destinationId'=>'other',
    'otherDestination'=>'Ein Gedi','address'=>'Hotel','passengers'=>'4','suitcases'=>'3','carryOns'=>'1',
 ]],
 ['kind'=>'driver','fields'=>$standard+[
    'serviceId'=>'multi-stop','date'=>$date,'time'=>'09:30',
    'pickup'=>'TLV','dropoff'=>'Jerusalem','passengers'=>'4','luggage'=>'3 bags','itinerary'=>'Caesarea',
 ]],
 ['kind'=>'shore','portId'=>'haifa','fields'=>$standard+[
    'country'=>'UK','ship'=>'Voyager','date'=>$date,'pickupTime'=>'08:30',
    'allAboardDate'=>$date,'allAboardTime'=>'17:30','itineraryId'=>'other',
    'otherItinerary'=>'Akko','passengers'=>'4',
 ]],
];
foreach($forms as $i=>$form) {
    $body=['requestId'=>sprintf('123e4567-e89b-42d3-a456-%012d',$i+1),'website'=>'',
      'sourcePath'=>'/transfers/','request'=>$form];
    verify(ith_validate_input($body,$meta)!==null,'valid '.$form['kind'].' schema');
    $draft=ith_quote_draft($body,$meta);
    verify(str_contains($draft['subject'],'Moshe Barak') && str_contains($draft['text'],'Sent from page:'),'valid '.$form['kind'].' email draft');
    if($form['kind']==='shore') {
       $bad=$body;$bad['request']['fields']['allAboardTime']='07:00';
       verify(ith_validate_input($bad,$meta)===null,'shore departure must precede ship deadline');
    }
}
$disabled=$cfg;$disabled['QUOTE_DELIVERY_ENABLED']=false;
verify(ith_quote_request($disabled,['REQUEST_METHOD'=>'GET'],'')[1]['available']===false,'not enabled without secret switch');
verify(ith_quote_request($disabled,$server,json_encode($contact))[0]===503,'no email sent if disabled');

$boi=['exchangeRates'=>[
 ['key'=>'USD','unit'=>1,'currentExchangeRate'=>3.2,'lastUpdate'=>gmdate('Y-m-d\TH:i:s\Z')],
 ['key'=>'EUR','unit'=>1,'currentExchangeRate'=>3.8,'lastUpdate'=>gmdate('Y-m-d\TH:i:s\Z')],
]];
$fetchCount=0;
$fxFetcher=function() use (&$fetchCount,$boi){$fetchCount++;return ['payload'=>$boi];};
[$status,$fx]=ith_currency_request($cfg,['REQUEST_METHOD'=>'GET'],$fxFetcher);
verify($status===200 && $fx['status']==='fresh' && abs($fx['rates']['ilsPerUnit']['USD']-3.2)<0.001,'BOI data parsed and cached');
[$status,$fx]=ith_currency_request($cfg,['REQUEST_METHOD'=>'GET'],$fxFetcher);
verify($status===200 && $fetchCount===1,'exchange rates not fetched on each visit');
verify(ith_currency_request($cfg,['REQUEST_METHOD'=>'POST'],$fxFetcher)[0]===405,'currency API read only');
$bad=$boi;$bad['exchangeRates'][1]['unit']=2;
verify(ith_boi_parse($bad,time())===null,'currency invalid units rejected');
verify(ith_boi_parse(['exchangeRates'=>[$boi['exchangeRates'][0]]],time())===null,'currency incomplete response rejected');

echo "ALL PHP TRIAL TESTS PASSED. No real mail or remote FX calls were made.\n";
