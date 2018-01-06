<?php

/**
* 	微信支付新推出的js sdk
*/
class JsSdk {

  private $appId;
 	private $uid;
  private $appSecret;

  public function __construct($appId, $appSecret, $uid) {
    $this->appId = $appId;
    $this->uid = $uid;
    $this->appSecret = $appSecret;
  }

  public function getSignPackage() {
  	$wx_jsapi=WX_getjsapi($this->uid);
//   	Log::error("WX_getjsapi".$wx_jsapi['wx_jsapi']);
//     $jsapiTicket = $this->getJsApiTicket();
  	$jsapiTicket=$wx_jsapi['wx_jsapi'];
    // 注意 URL 一定要动态获取，不能 hardcode.
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $url = "$protocol$_SERVER[HTTP_HOST]/$_SERVER[REQUEST_URI]";

    $timestamp = time();
    $nonceStr = $this->createNonceStr();

    // 这里参数的顺序要按照 key 值 ASCII 码升序排序
    $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

    $signature = sha1($string);

    $signPackage = array(
      "appId"     => $this->appId,
      "nonceStr"  => $nonceStr,
      "timestamp" => $timestamp,
      "url"       => $url,
      "signature" => $signature,
      "rawString" => $string
    );
    return $signPackage; 
  }

  private function createNonceStr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
      $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
  }

  private function getJsApiTicket() {
    // jsapi_ticket 应该全局存储与更新，以下代码以写入到文件中做示例 $this->appId
  	$data=Cache::get("JsApiTicket".$this->appId);
  	$data=json_decode($data);
  	if($data->expire_time < time()){
  		$accessToken = $this->getAccessToken();
  		$url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
  		$res = json_decode($this->httpGet($url));
  		$ticket = $res->ticket;
  		if ($ticket) {
  			$data->expire_time = time() + 7000;
  			$data->jsapi_ticket = $ticket;
  			Cache::set("JsApiTicket".$this->appId,json_encode($data),7100);
  		}
  	} else {
      $ticket = $data->jsapi_ticket;
    }
//     Log::error("=====JsApiTicket======".$this->appId."===========".$ticket);
    return $ticket;
  }

  private function getAccessToken() {
    // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
  	$data=Cache::get("JsApiToken".$this->appId);
  	$data=json_decode($data);
  	if ($data->expire_time < time()) {
  		$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
  		$res = json_decode($this->httpGet($url));
  		$access_token=$res->access_token;
  		if ($access_token) {
  			$data->expire_time = time() + 7000;
  			$data->access_token = $access_token;
  			Cache::set("JsApiToken".$this->appId,json_encode($data),7100);
  		}
  	}else {
      $access_token = $data->access_token;
    
    }
//     Log::error("======access_token==".$this->appId."===========".$access_token);
    return $access_token;
  }

  private function httpGet($url) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_URL, $url);

    $res = curl_exec($curl);
    curl_close($curl);

    return $res;
  }
}
