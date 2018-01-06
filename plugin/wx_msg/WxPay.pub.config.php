<?php
/**
* 	配置账号信息
*/

class WxPayConfPub
{
	//=======【基本信息设置】=====================================
	//微信公众号身份的唯一标识。审核通过后，在微信发送的邮件中查看
	public  static $APPID = 'wx8888888888888888';
	//受理商ID，身份标识
	public  static $MCHID = '18888887';
	//商户支付密钥Key。审核通过后，在微信发送的邮件中查看
	public  static $KEY = '48888888888888888888888888888886';
	//JSAPI接口中获取openid，审核后在公众平台开启开发模式后可查看
	public  static $APPSECRET = '48888888888888888888888888888887';
	
	//=======【JSAPI路径设置】===================================
	//获取access_token过程中的跳转uri，通过跳转将code传入jsapi支付页面
	public  static $JS_API_CALL_URL = 'http://www.xxxxxx.com/demo/js_api_call.php';
	
	//=======【证书路径设置】=====================================
	//证书路径,注意应该填写绝对路径
	public  static $SSLCERT_PATH = '/xxx/xxx/xxxx/WxPayPubHelper/cacert/apiclient_cert.pem';
	public  static $SSLKEY_PATH = '/xxx/xxx/xxxx/WxPayPubHelper/cacert/apiclient_key.pem';
	
	//=======【异步通知url设置】===================================
	//异步通知url，商户根据实际开发过程设定
	public  static $NOTIFY_URL = 'http://www.xxxxxx.com/demo/notify_url.php';

	//=======【curl超时设置】===================================
	//本例程通过curl使用HTTP POST方法，此处可修改其超时时间，默认为30秒
	public  static $CURL_TIMEOUT = 30;
}
	
?>