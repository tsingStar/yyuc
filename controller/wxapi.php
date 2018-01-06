<?php
$wechatObj = new wechatApi();

$uid = Request::get(1);
$wx_set = new Model('wx_set');
$wx_set->find($uid);

//如果 开启融合第三方 token 选择默认的第三方token
$tk = $wx_set->token;
$needsb43jm = false;
if($wechatObj->valid($tk)){
	if($GLOBALS["HTTP_RAW_POST_DATA"]){
		$postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
		$postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
		$entyp = $postObj->Encrypt;//错误消息
		if(trim($entyp)!=''){
			$needsb43jm = true;
			$jm43 = md5($tk).md5(md5($tk));
			$jm43 = substr($jm43, 0, 43);
			$msg_signature = Request::get('msg_signature');
			$array = array($entyp, $tk, Request::get('timestamp'), Request::get('nonce'));
			sort($array, SORT_STRING);
			$str = implode($array);
			$sha = sha1($str);
			if($msg_signature !=$sha){
// 				Log::error('混乱提交');
				die('混乱提交');
			}
			$pc = new Prpcrypt($jm43);
			$result = $pc->decrypt($entyp, $wx_set->appId);
			if ($result[0] != 0) {
// 				Log::error('解码失败');
				die('解码失败');
			}
			$msg = $result[1];
			$postObj = simplexml_load_string($msg, 'SimpleXMLElement', LIBXML_NOCDATA);
		}
		$xid = $postObj->FromUserName;//用户openid		
		$typ = $postObj->MsgType;//消息类型
		$gn = $postObj->ToUserName;//微信公众号原始ID
		if(trim($wx_set->wgn=='')){//更新微信配置信息
			$wx_set->update(array('id'=>$uid),array('wgn'=>$gn));
		}
		$user = new Model('user');
		if($typ == 'text'){//普通文本消息(关键字)
			$kw = trim($postObj->Content);
			auto_replay($kw);
		}elseif($typ=='event'){//事件消息
			if('subscribe'==$postObj->Event){//关注
				if(trim($postObj->EventKey)!=''){//带参数
					$pam = $postObj->EventKey;//参数:qrscene_
					if (strpos($pam,'qrscene_code@')===0){//获取到参数	
						$code = substr($pam,13);
						set_first_us($wx_set,$xid,$code);
					}
				}else{//关注
					set_first_us($wx_set,$xid);
				}
				//关注自动回复
				$ft = new Model('follow');
				$ft->find();
				auto_replay($ft->kw);
			}elseif('unsubscribe'==$postObj->Event){//取消关注
				$user->find(array('xid'=>$xid));
				if ($user->has_id()){
					$user->update(array('gz'=>0));
				}
			}elseif('CLICK'==$postObj->Event){//自定义菜单
				$kw = String::decryption($postObj->EventKey);//自定义菜单接口中KEY值
			}elseif('SCAN'==$postObj->Event){//已关注
				$pam = $postObj->EventKey;//创建二维码时的二维码scene_id
				$ticket = $postObj->Ticket;//二维码的ticket,可用来换取二维码图片
			}elseif('LOCATION'==$postObj->Event){//上报地理位置
				$jd = floatval($postObj->Longitude);//经度
				$wd = floatval($postObj->Latitude);//纬度
				$jq = floatval($postObj->Precision);//精确度
			}
		}elseif($typ=='location'){//地理位置消息
			$jd = floatval($postObj->Location_Y);//经度
			$wd = floatval($postObj->Location_X);//纬度
			$sf = floatval($postObj->Location_X);//地图缩放大小
			$wz = floatval($postObj->Location_X);//地理位置信息
		}elseif($typ=='image'){//图片消息
			$url = $postObj->PicUrl;	//图片链接
			$mid = $postObj->MediaId;	//图片消息媒体id,可以调用多媒体文件下载接口拉取数据
		}elseif($typ=='voice'){//语音消息
			$mid = $postObj->MediaId;//语音消息媒体id,可以调用多媒体文件下载接口拉取数据				
			if(trim($postObj->Recognition)!=''){
				$kw = $postObj->Recognition;//语音识别结果
			}
		}elseif($typ=='video'){//视频消息
			$mid = $postObj->MediaId;//视频消息媒体id,可以调用多媒体文件下载接口拉取数据			
			$picmid =  $postObj->ThumbMediaId;//视频消息缩略图的媒体id,可以调用多媒体文件下载接口拉取数据
		}elseif($typ=='link'){//链接消息
			$url = $postObj->Url;//消息链接			
			$tit = $postObj->Title;//消息链接
			$des = $postObj->Description;//消息描述	
		}
	}else{
		$wx_set->update(array('id'=>$uid),array('wok'=>'1'));
	}
}
die();

/**
 * 高级接口权限的公众号直接获得用户信息
 * @param $wx_set	公众号配置信息
 * @param $xid	用户openid
 */
function set_first_us($wx_set,$xid,$code=0){
	global $wx_set,$xid;
	if(!$wx_set->wapi){
		return;
	}
	$wxtoken = WX_gettoken();
	if($wxtoken){
		$res = HttpCurl::quickget('https://api.weixin.qq.com/cgi-bin/user/info?access_token='.$wxtoken.'&openid='.$xid.'&lang=zh_CN');
		if($res){
			$res = json_decode($res);
			if($res->errcode){
				$wxtoken = WX_gettoken();
				$res = HttpCurl::quickget('https://api.weixin.qq.com/cgi-bin/user/info?access_token='.$wxtoken.'&openid='.$xid.'&lang=zh_CN');
				$res = json_decode($res);
			}
			if($res->subscribe ){
				$user = new Model('user');
				$user->find(array('xid'=>$xid));
				if($user->has_id()){
					$user->gz = 1;
				}
				$user->tj = $code;
				$user->xid = $xid;
				$user->unick = $res->nickname;
				$user->upic = $res->headimgurl;
				$user->ctime = date('Y-m-d H:i:s',"$res->subscribe_time");
				$user->save();
			}
		}
	}
}

/**
 * 执行curl 
 * @param $url 地址
 * @param $postdata 发送的数据
 */
function re_curl($url,$postdata){
	$header[]="Content-Type: text/xml; charset=utf-8";
	$header[]="User-Agent: Apache/1.3.26 (Unix)";
	$header[]="Connection: keep-alive";
	$header[]="Content-Length: ".strlen($postdata);
	//初始化curl
	$curl = curl_init();
	curl_setopt( $curl, CURLOPT_HTTPHEADER,$header);
	curl_setopt ( $curl, CURLOPT_URL, $url); // 要访问的地址
	curl_setopt ( $curl, CURLOPT_SSL_VERIFYPEER, 0 ); // 对认证证书来源的检查
	curl_setopt ( $curl, CURLOPT_SSL_VERIFYHOST, 1 ); // 从证书中检查SSL加密算法是否存在
	curl_setopt ( $curl, CURLOPT_POST, 1 ); // 发送一个常规的Post请求
	curl_setopt ( $curl, CURLOPT_POSTFIELDS,$postdata); // Post提交的数据包
	curl_setopt ( $curl, CURLOPT_TIMEOUT, 30 ); // 设置超时限制防止死循环
	curl_setopt ( $curl, CURLOPT_HEADER, 0 ); // 显示返回的Header区域内容
	curl_setopt ( $curl, CURLOPT_RETURNTRANSFER, 1 ); // 获取的信息以文件流的形式返回
	$tmpInfo = curl_exec($curl);// 执行操作
	curl_close($curl);
	return $tmpInfo;
}

//根据关键词选择回复
function auto_replay($kw){
	if(!replay_by_kw($kw)){
		//replay_by_kw(true);
	}
}
function replay_by_kw($kw=''){
	if(trim($kw)==''){
		return false;
	}
	$isnokw = false;
	if($kw===true){
		$isnokw = true;
		$ft = new Model('follow');
		$ft->find();
		$kw = $ft->nokw;
	}
	$rep = new Model('key_replays');
	$rep->order('ms')->find(array('kw'=>$kw));
	if(!$rep->rid){
		$rreps = $rep->where(array('ms'=>'2'))->list_all();
		foreach ($rreps as $re){			
			if(strpos($kw, $re->kw)!==false){
				$rep = $re;
				break;
			}
		}
	}
	if($rep->rtyp=='t'){
		$m = new Model('ret_text');
		$m->find($rep->rid);
		if($m->has_id()){
			response_text($m->con);
			return true;
		}
	}elseif($rep->rtyp=='o'){
		$m = new Model('ret_art_one');
		$m->find($rep->rid);
		if($m->has_id()){
			response_oneart($m->tit,$m->des,getVallink(targeturl($m->url)),$m->img);
			return true;
		}
	}elseif($rep->rtyp=='m'){
		$m = new Model('ret_art_more');
		$m->find($rep->rid);
		if($m->has_id()){
			response_more($m);
			return true;
		}
	}elseif($rep->rtyp=='a'){
		$m = new Model('ret_audio');
		$m->find($rep->rid);
		if($m->has_id()){
			response_more($m);
			return true;
		}
	}elseif($rep->rtyp=='v'){
		$m = new Model('ret_video');
		$m->find($rep->rid);
		if($m->has_id()){
			response_more($m);
			return true;
		}
	}			
	return false;
}

//文字回复
function response_text($txt){
	global $postObj;
	$textTpl = 
		"<xml>
			<ToUserName><![CDATA[%s]]></ToUserName>
			<FromUserName><![CDATA[%s]]></FromUserName>
			<CreateTime>%s</CreateTime>
			<MsgType><![CDATA[%s]]></MsgType>
			<Content><![CDATA[%s]]></Content>
			<FuncFlag>0</FuncFlag>
		</xml>";
	$res = sprintf($textTpl, $postObj->FromUserName, $postObj->ToUserName, time(), "text", trim($txt));
	todoResponse($res);
}

//单图文回复
function response_oneart($tit,$con,$link,$pic=null){
	global $postObj;
	$textTpl = 
		"<xml>
			<ToUserName><![CDATA[%s]]></ToUserName>
			<FromUserName><![CDATA[%s]]></FromUserName>
			<CreateTime>%s</CreateTime>
			<MsgType><![CDATA[%s]]></MsgType>
			<ArticleCount>%s</ArticleCount>
			<Articles>ITEM</Articles>
		</xml>";
	$resstr =  sprintf($textTpl, $postObj->FromUserName, $postObj->ToUserName, time(), "news", 1);
	if($pic!=null){
		$subitem = 
			"<item>
				<Title><![CDATA[%s]]></Title>
				<Description><![CDATA[%s]]></Description>
				<PicUrl><![CDATA[%s]]></PicUrl>
				<Url><![CDATA[%s]]></Url>
			</item>";
		$item=sprintf($subitem, $tit, $con, $pic, $link);
	}else{
		$subitem = 
			"<item>
				<Title><![CDATA[%s]]></Title>
				<Description><![CDATA[%s]]></Description>
				<Url><![CDATA[%s]]></Url>
			</item>";
		$item=sprintf($subitem, $tit, $con,$link);
	}
	$resstr = str_replace('ITEM', $item, $resstr);
	todoResponse($resstr);
}

//多图文回复
function response_more($res){
	global $postObj;
	$textTpl =
	"<xml>
			<ToUserName><![CDATA[%s]]></ToUserName>
			<FromUserName><![CDATA[%s]]></FromUserName>
			<CreateTime>%s</CreateTime>
			<MsgType><![CDATA[%s]]></MsgType>
			<ArticleCount>%s</ArticleCount>
			<Articles>ITEM</Articles>
		</xml>";
	$allnum = 1;
	for($i=1;$i<9;$i++){
		$ttit = 'tit'.$i;
		if(trim($res->$ttit)!=''){
			$allnum++;
		}
	}
	$resstr =  sprintf($textTpl, $postObj->FromUserName, $postObj->ToUserName, time(), "news", $allnum);
	$item = '';
	$subitem =
	"<item>
			<Title><![CDATA[%s]]></Title>
			<PicUrl><![CDATA[%s]]></PicUrl>
			<Url><![CDATA[%s]]></Url>
		</item>";
	for($i=0;$i<=$allnum;$i++){
		$ii = $i==0?'':$i;
		$ttit = 'tit'.$ii;
		$timg = 'img'.$ii;
		$turl = 'url'.$ii;
		$item.=sprintf($subitem,$res->$ttit,$res->$timg, getVallink(targeturl($res->$turl)));
	}
	$resstr = str_replace('ITEM', $item, $resstr);
	todoResponse($resstr);
}
// function response_morearts($res){
// 	global $postObj;
// 	$fromUsername = $postObj->FromUserName;
// 	$toUsername = $postObj->ToUserName;
// 	$textTpl = 
// 		"<xml>
// 			<ToUserName><![CDATA[%s]]></ToUserName>
// 			<FromUserName><![CDATA[%s]]></FromUserName>
// 			<CreateTime>%s</CreateTime>
// 			<MsgType><![CDATA[%s]]></MsgType>
// 			<ArticleCount>%s</ArticleCount>
// 			<Articles>ITEM</Articles>
// 		</xml>";
// 	$resstr =  sprintf($textTpl, $fromUsername, $toUsername, time(), "news", count($res));
// 	$item = '';
// 	$subitem = 
// 		"<item>
// 			<Title><![CDATA[%s]]></Title>
// 			<PicUrl><![CDATA[%s]]></PicUrl>
// 			<Url><![CDATA[%s]]></Url>
// 		</item>";
// 	foreach ($res as $r){
// 		$item.=sprintf($subitem, $r['tit'],$r['pic'], $r['url']);
// 	}
// 	$resstr = str_replace('ITEM', $item, $resstr);
// 	todoResponse($resstr);
// }

//接收微信推送信息
class wechatApi{
	public function valid($tk){
		$echoStr = $_GET["echostr"];
		if($this->checkSignature($tk)){
			echo $echoStr;
			return true;
		}
		return false;
	}
	private function checkSignature($token){
		$signature = $_GET["signature"];
		$timestamp = $_GET["timestamp"];
		$nonce = $_GET["nonce"];
		$tmpArr = array($token, $timestamp, $nonce);
		sort($tmpArr,SORT_STRING);
		$tmpStr = implode( $tmpArr );
		$tmpStr = sha1( $tmpStr );
		if( $tmpStr == $signature ){
			return true;
		}else{
			return false;
		}
	}
}

//回复输出
function todoResponse($str){
	global $needsb43jm,$u,$pc;
	if(!$needsb43jm){
		echo $str;
	}else{
		//加密
		$array = $pc->encrypt($str, $u->wappid);
		$ret = $array[0];
		if ($ret != 0) {
			die('加密错误');
		}
		$timeStamp = time();
		$nonce = rand(100000,999999);
		$encrypt = $array[1];
		//生成安全签名
		$array = array($encrypt, $u->wtoken, $timeStamp, $nonce.'');
		sort($array, SORT_STRING);
		$str = implode($array);
		$signature = sha1($str);
		//生成发送的xml
		$format = 
			"<xml>
				<Encrypt><![CDATA[%s]]></Encrypt>
				<MsgSignature><![CDATA[%s]]></MsgSignature>
				<TimeStamp>%s</TimeStamp>
				<Nonce><![CDATA[%s]]></Nonce>
			</xml>";
		$res = sprintf($format, $encrypt, $signature, $timeStamp, $nonce);
		echo $res;
	}
}

//获得处理后的链接
function getVallink($link){
	global $postObj,$uid;
	if(strpos($link, 'javascript:;')!==false){
		return "";
	}
	$addpos = '?';
	if(strpos($link, '?')!==false){
		$addpos = '&';
	}
	return $link.$addpos.'xid='.$postObj->FromUserName.'&uid='.$uid.'&qquh=mp.weixin.qq.com&fu'.rand(100,999).'=mj'.rand(1000000,9999999);
}

/**
 * 根据两点间的经纬度计算距离
 * @param float $lat 纬度值
 * @param float $lng 经度值
 */
function get_distance_by_lng_lat($lng1,$lat1,$lng2,$lat2){
	$earthRadius = 6367000; //地球半径
	//位置1
	$lat1 = ($lat1 * pi() ) / 180;
	$lng1 = ($lng1 * pi() ) / 180;
	//位置2
	$lat2 = ($lat2 * pi() ) / 180;
	$lng2 = ($lng2 * pi() ) / 180;
	//使用 http://en.wikipedia.org/wiki/haversine_formula 计算距离
	$calcLongitude = $lng2 - $lng1;
	$calcLatitude = $lat2 - $lat1;
	$stepOne = pow(sin($calcLatitude / 2), 2) + cos($lat1) * cos($lat2) * pow(sin($calcLongitude / 2), 2);  $stepTwo = 2 * asin(min(1, sqrt($stepOne)));
	$calculatedDistance = $earthRadius * $stepTwo;
	return round($calculatedDistance);
}
/////////////////下面是微信信息加解密用到的类
class PKCS7Encoder{
	public static $block_size = 32;
	/**
	 * 对需要加密的明文进行填充补位
	 * @param $text 需要进行填充补位操作的明文
	 * @return 补齐明文字符串
	 */
	function encode($text){
		$block_size = PKCS7Encoder::$block_size;
		$text_length = strlen($text);
		//计算需要填充的位数
		$amount_to_pad = PKCS7Encoder::$block_size - ($text_length % PKCS7Encoder::$block_size);
		if ($amount_to_pad == 0) {
			$amount_to_pad = PKCS7Encoder::block_size;
		}
		//获得补位所用的字符
		$pad_chr = chr($amount_to_pad);
		$tmp = "";
		for ($index = 0; $index < $amount_to_pad; $index++) {
			$tmp .= $pad_chr;
		}
		return $text . $tmp;
	}
	/**
	 * 对解密后的明文进行补位删除
	 * @param decrypted 解密后的明文
	 * @return 删除填充补位后的明文
	 */
	function decode($text){
		$pad = ord(substr($text, -1));
		if ($pad < 1 || $pad > 32) {
			$pad = 0;
		}
		return substr($text, 0, (strlen($text) - $pad));
	}
}

/**
 * Prpcrypt class
 * 提供接收和推送给公众平台消息的加解密接口.
 */
class Prpcrypt{
	public $key;
	function Prpcrypt($k){
		$this->key = base64_decode($k."=");
	}
	/**
	 * 对明文进行加密
	 * @param string $text 需要加密的明文
	 * @return string 加密后的密文
	 */
	public function encrypt($text, $appid){
		try {
			//获得16位随机字符串，填充到明文之前
			$random = $this->getRandomStr();
			$text = $random.pack("N",strlen($text)).$text.$appid;
			// 网络字节序
			$size = mcrypt_get_block_size(MCRYPT_RIJNDAEL_128,MCRYPT_MODE_CBC);
			$module = mcrypt_module_open(MCRYPT_RIJNDAEL_128,'',MCRYPT_MODE_CBC,'');
			$iv = substr($this->key, 0, 16);
			//使用自定义的填充方式对明文进行补位填充
			$pkc_encoder = new PKCS7Encoder();
			$text = $pkc_encoder->encode($text);
			mcrypt_generic_init($module, $this->key, $iv);
			//加密
			$encrypted = mcrypt_generic($module, $text);
			mcrypt_generic_deinit($module);
			mcrypt_module_close($module);
			//print(base64_encode($encrypted));
			//使用BASE64对加密后的字符串进行编码
			return array(0, base64_encode($encrypted));
		} catch (Exception $e) {
			//print $e;
			return array(1, null);
		}
	}
	/**
	 * 对密文进行解密
	 * @param string $encrypted 需要解密的密文
	 * @return string 解密得到的明文
	 */
	public function decrypt($encrypted,$appid){
		try {
			//使用BASE64对需要解密的字符串进行解码
			$ciphertext_dec = base64_decode($encrypted);
			$module = mcrypt_module_open(MCRYPT_RIJNDAEL_128,'',MCRYPT_MODE_CBC,'');
			$iv = substr($this->key, 0, 16);
			mcrypt_generic_init($module, $this->key, $iv);
			//解密
			$decrypted = mdecrypt_generic($module, $ciphertext_dec);
			mcrypt_generic_deinit($module);
			mcrypt_module_close($module);
		} catch (Exception $e) {
			return array(2, null);
		}
		try {
			//去除补位字符
			$pkc_encoder = new PKCS7Encoder();
			$result = $pkc_encoder->decode($decrypted);
			//去除16位随机字符串,网络字节序和AppId
			if (strlen($result) < 16)
				return "";
			$content = substr($result, 16, strlen($result));
			$len_list = unpack("N", substr($content, 0, 4));
			$xml_len = $len_list[1];
			$xml_content = substr($content, 4, $xml_len);
			$from_appid = substr($content, $xml_len + 4);
		} catch (Exception $e) {
			//print $e;
			return array(3, null);
		}
		if ($from_appid != $appid)
			return array(4, null);
		return array(0, $xml_content);
	}

	/**
	 * 随机生成16位字符串
	 * @return string 生成的字符串
	 */
	function getRandomStr(){
		$str = "";
		$str_pol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
		$max = strlen($str_pol) - 1;
		for ($i = 0; $i < 16; $i++) {
			$str .= $str_pol[mt_rand(0, $max)];
		}
		return $str;
	}
}