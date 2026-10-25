<?php
declare(strict_types=1);
require_once __DIR__ . '/shared.php';

const ITH_BOI_URL = 'https://www.boi.org.il/PublicApi/GetExchangeRates?asXml=false';
const ITH_FX_REFRESH = 86400;
const ITH_FX_RETRY = 900;
const ITH_FX_MAX_AGE = 604800;

function ith_fx_usable($value, int $now): bool {
    if (!is_array($value) || ($value['sourceId'] ?? '') !== 'fx-bank-of-israel' ||
        !ith_valid_date($value['publishedAt'] ?? null) ||
        !is_string($value['checkedAt'] ?? null) ||
        !is_array($value['ilsPerUnit'] ?? null)) return false;
    $published = strtotime($value['publishedAt'].'T00:00:00Z');
    $checked = strtotime($value['checkedAt']);
    if ($published === false || $checked === false || $published>$now+300 ||
        $checked>$now+300 || $checked<$published || ($now-$published)>ITH_FX_MAX_AGE) return false;
    foreach (['USD','EUR'] as $ccy) {
        $v=$value['ilsPerUnit'][$ccy]??null;
        if (!is_float($v) && !is_int($v)) return false;
        if ($v<=0 || $v>=1000 || !is_finite((float)$v)) return false;
    }
    return true;
}

function ith_boi_parse($value, int $now): ?array {
    if (!is_array($value) || !is_array($value['exchangeRates']??null)) return null;
    $rows=[];
    foreach (['USD','EUR'] as $ccy) {
        $matched = array_values(array_filter($value['exchangeRates'],static fn($row) => is_array($row) && ($row['key']??'')===$ccy));
        if (count($matched)!==1) return null;
        $r=$matched[0];
        if (($r['unit']??null)!==1 || !is_numeric($r['currentExchangeRate']??null) ||
            !is_float($r['currentExchangeRate']) && !is_int($r['currentExchangeRate']) ||
            !is_string($r['lastUpdate']??null)) return null;
        $date=substr($r['lastUpdate'],0,10);
        if (!ith_valid_date($date) || strtotime($r['lastUpdate'])===false) return null;
        $rows[$ccy]=['rate'=>(float)$r['currentExchangeRate'],'date'=>$date];
    }
    if ($rows['USD']['date']!==$rows['EUR']['date']) return null;
    $snapshot=['sourceId'=>'fx-bank-of-israel','publishedAt'=>$rows['USD']['date'],
      'checkedAt'=>gmdate('Y-m-d\TH:i:s\Z',$now),
      'ilsPerUnit'=>['USD'=>$rows['USD']['rate'],'EUR'=>$rows['EUR']['rate']]];
    return ith_fx_usable($snapshot,$now)?$snapshot:null;
}

function ith_boi_fetch(): array {
    $ch=curl_init(ITH_BOI_URL);
    if (!$ch) return ['error'=>true];
    curl_setopt_array($ch,[
      CURLOPT_RETURNTRANSFER=>true, CURLOPT_FOLLOWLOCATION=>false,
      CURLOPT_CONNECTTIMEOUT=>4,CURLOPT_TIMEOUT=>6,CURLOPT_MAXREDIRS=>0,
      CURLOPT_HTTPHEADER=>['Accept: application/json'],
      CURLOPT_SSL_VERIFYPEER=>true,CURLOPT_SSL_VERIFYHOST=>2,
      CURLOPT_ENCODING=>'',
    ]);
    $result=curl_exec($ch);$http=(int)curl_getinfo($ch,CURLINFO_RESPONSE_CODE);curl_close($ch);
    if (!is_string($result) || $http!==200 || strlen($result)>65536) return ['error'=>true];
    try {return ['payload'=>json_decode($result,true,32,JSON_THROW_ON_ERROR)];}
    catch (Throwable $e) {return ['error'=>true];}
}

/**
 * Shared disk cache with locking: protects the Bank of Israel endpoint from
 * receiving one request for every website visitor, even across PHP workers.
 */
function ith_currency_request(array $cfg, array $server, ?callable $fetcher = null, ?int $nowValue = null): array {
    if (($server['REQUEST_METHOD']??'GET')!=='GET') return [405,['error'=>'Method not allowed'],['Allow'=>'GET']];
    $now=$nowValue??time();
    $dir=(string)($cfg['STORAGE_DIR']??'');
    if (!$dir || (!is_dir($dir) && !@mkdir($dir,0700,true))) return [503,['rates'=>null,'status'=>'unavailable'],['Retry-After'=>'900']];
    $path=rtrim($dir,'/').'/exchange-rates.json';
    $fp=@fopen($path,'c+');
    if (!$fp) return [503,['rates'=>null,'status'=>'unavailable'],['Retry-After'=>'900']];
    @chmod($path,0600);
    try {
        if (!flock($fp,LOCK_EX)) return [503,['rates'=>null,'status'=>'unavailable'],['Retry-After'=>'900']];
        rewind($fp);
        $cache=json_decode(stream_get_contents($fp),true);
        if (!is_array($cache)) $cache=[];
        $latest=$cache['rates']??null;
        $good=ith_fx_usable($latest,$now);
        $next=(int)($cache['nextCheckAt']??0);
        $failed=($cache['lastCheckFailed']??true)===true;
        if ($next <= $now) {
            $upstream=($fetcher??'ith_boi_fetch')();
            $snapshot=is_array($upstream) && isset($upstream['payload']) ? ith_boi_parse($upstream['payload'],$now) : null;
            if ($snapshot && (!$good || $snapshot['publishedAt'] >= $latest['publishedAt'])) {
                $latest=$snapshot;$good=true;$failed=false;$next=$now+ITH_FX_REFRESH;
            } else {
                $failed=true;$next=$now+ITH_FX_RETRY;
            }
            $cache=['rates'=>$latest,'nextCheckAt'=>$next,'lastCheckFailed'=>$failed];
            rewind($fp);ftruncate($fp,0);
            fwrite($fp,json_encode($cache,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR));fflush($fp);
        }
        if (!ith_fx_usable($latest,$now)) return [503,['rates'=>null,'status'=>'unavailable'],['Retry-After'=>'900']];
        $status=$failed?'cached':'fresh';
        $remaining=max(0,strtotime($latest['checkedAt'])+ITH_FX_REFRESH-$now);
        $headers=$status==='fresh'
          ? ['Cache-Control'=>'public, max-age='.min(300,$remaining).', s-maxage='.min(3600,$remaining)]
          : ['Retry-After'=>'900'];
        return [200,['rates'=>$latest,'status'=>$status],$headers];
    } catch (Throwable $e) {
        error_log('exchange-rate.fetch-failed');
        return [503,['rates'=>null,'status'=>'unavailable'],['Retry-After'=>'900']];
    } finally { flock($fp,LOCK_UN);fclose($fp); }
}
