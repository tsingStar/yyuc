<?php
/**
 * 全局启动函数
 */
function yyuc_start(){
	//记录访问日志
	//Log::error(Request::ip().'：'.$_SERVER['HTTP_USER_AGENT'].'-'.Request::url());	
}

/**
 * 项目title
 */
$Pname = 'Model';
/**
 * 项目Logo
 */
$Logo = '/img/logo.png';
/**
 * 标签shortcut icon
 */
$Icon = '/img/biaoqian.ico';
/**
 * 背景Background
 */
$Background = '/img/beijing.jpg';
/**
 * 邮件img
 */
$Email_img = Conf::$remote_path.'img/youjian.png';
/**
 * 分享图片
 */
$Share_img = '/img/share.png';

/**
 * 设置登录
 */
function set_login($u,$tomg = false){
	Session::set('uid',$u->id);
	Session::set('un',$u->un);
	Session::set('role',$u->role);
	Session::set('st',$u->theme);
	if($tomg !==false){
		Redirect::to('/mg/',$tomg);
	}
}

/**
 * 链接目标的表单选择
 */
function commontarget($m,$url){
	$html='<select class="target_url3" onchange="target_set3(this)" style="display:none;"><option value="">-请选择-</option></select>';
	$html.='<input class="input-xlarge target_url4" type="text" onblur="target_set4(this)" style="margin-top:5px;" placeholder="形如：http://www.demo.com"/>';
	$html.='<input class="input-xlarge target_url5" type="text" onblur="target_set5(this)" style="display:none;margin-top:5px;" placeholder="形如：010-85899800"/>';
	$html.=$m->hidden($url,'class="target_theurl"');
	return $html;
}

/**
 * 根据commontarget设置的值获取真实的url
 */
function targeturl($url,$adduid = false){
	$url = trim($url);
	if($url==''){
		return 'javascript:;';
	}
	$turl = strtolower($url);
	$rurl = (strpos($turl, 'http')===0 || strpos($turl, '/')===false) ? $url : (Conf::$http_path.'wap/'.$url.'.html');
	if($adduid){
		if(strpos($rurl, '?')){
			return $rurl.'&uid='.Session::get('uid');
		}else{
			return $rurl.'?uid='.Session::get('uid');
		}
	}else{
		return $rurl;
	}
}
function U($url){
	return targeturl($url);
}

/**
 * 获得微信Token
 */
function WX_gettoken(){
	$wx_set = new Model('wx_set');
	$wx_set->find();
	
	$wxtoken = Cache::get('UHQQ_wxtoken');
	if($wxtoken){
		return $wxtoken;
	}
	$res = HttpCurl::quickget('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$wx_set->appId.'&secret='.$wx_set->appSecret);
	if($res){
		$res = @json_decode($res);
		$wxtoken = $res->access_token;
		if($wxtoken){
			Cache::set('UHQQ_wxtoken',$wxtoken,3600);
			return $wxtoken;
		}
	}
	return null;
}

/**
 * 获得微信jsapi_ticket
 */
function WX_getjsapi(){
	$wx_set = new Model('wx_set');
	$wx_set->find();
	
	$wx_jsapi = Cache::get('UHQQ_wx_jsapi');
	
	$re_array['appId']=$wx_set->appId;
	if($wx_jsapi){
		$re_array['wx_jsapi']=$wx_jsapi;
		return $re_array;
	}
	$token=WX_gettoken();
	$res = HttpCurl::quickget("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={$token}&type=jsapi");
	if($res){
		$res = @json_decode($res);
		$ticket = $res->ticket;
		if($ticket){
			Cache::set('UHQQ_wx_jsapi',$ticket,1200);
			$re_array['wx_jsapi']=$ticket;
			return $re_array;
		}
	}
	return null;
}

/**
 * 微信分享参数
 */
function WX_shareapi(){
	$url='http://'.$_SERVER['HTTP_HOST'].'/'.$_SERVER['REQUEST_URI'];
	$jsapi=WX_getjsapi();
	$timestamp=time();
	$nonceStr=md5(time());
	$str="jsapi_ticket={$jsapi['wx_jsapi']}&noncestr={$nonceStr}&timestamp={$timestamp}&url={$url}";
	$signature=sha1($str);
	$re_api=array();
	$re_api['timestamp']=$timestamp;
	$re_api['nonceStr']=$nonceStr;
	$re_api['signature']=$signature;
	$re_api['appId']=$jsapi['appId'];
	return $re_api;
}

/**
 * 随机生成32位字符串
 * @return string 生成的字符串
 */
function getNonceStr($length = 32){
	$chars = "abcdefghijklmnopqrstuvwxyz0123456789";
	$str ="";
	for ( $i = 0; $i < $length; $i++ )  {
		$str .= substr($chars,mt_rand(0,strlen($chars)-1),1);
	}
	return $str;
}

/**
 * 根据openid查看用户是否关注公众号并获得用户信息
 * @param $xi	openid
 */
function WX_getUser($xi){
	$token=WX_gettoken();
	$res = HttpCurl::get_contents("https://api.weixin.qq.com/cgi-bin/user/info?access_token=$token&openid=$xi&lang=zh_CN");
	$res = json_decode($res);
	return $res;
}


/**
 * 生成参数二维码
 * @param string $key 参数值
 * @return string 返回图片相对路径
 */
function create_qrcode($key){
	$pre = "code";	//参数前缀
	$access_token = WX_gettoken();
	$qrcode = '{"action_name":"QR_LIMIT_STR_SCENE","action_info":{"scene":{"scene_str":"'.trim($pre).'@'.$key.'"}}}';
	$res = HttpCurl::quickpost('https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token='.$access_token,$qrcode);
	$res = @json_decode($res);
	$codeImg = $key.'.png';
	$fileName = Conf::$local_remote .'ufile/qrcode/';
	if (!file_exists($fileName)){
		File::creat_dir($fileName);
	}
	QRcode::png($res->url,$fileName .'/'.$codeImg,'M',8,3,array(360,360));
	return '/ufile/qrcode/'.$codeImg;
}

/**
 * 登录用户的文件夹路径
 */
function upath($path = ''){
	return 'ufile/'.Session::get('uid').'/'.$path;
}

/**
 * 弹出警告
 */
function alert($msg){
	Response::exejs("layer.msg('".$msg."',1,-1);");
}

/**
 * 获取年月日格式日期
 */
function dateToTime(){	//把日期转换成时间堆截
	$d = date('Y-m-d');
	$year=((int)substr("$d",0,4));//取得年份
	$month=((int)substr("$d",5,2));//取得月份
	$day=((int)substr("$d",8,2));//取得几号
	return $year.'年'.$month.'月'.$day.'日';
}

/**
 * 获取上传图片的相对路径（pub下）
 * @param $url 图片网络路径
 */
function get_pic_uri($url){
	$rp = Conf::$remote_path;
	$uri = str_replace($rp,'/',$url);
	return $uri;
}

/**
 * 字符串按长度分割到数组，支持中文
 * @param $string
 * @param $len
 */
function mbStrSplit ($string, $len=1) {
	$start = 0;
	$strlen = mb_strlen($string);
	while ($strlen) {
		$array[] = mb_substr($string,$start,$len,"utf8");
		$string = mb_substr($string, $len, $strlen,"utf8");
		$strlen = mb_strlen($string);
	}
	return $array;
}


/**
 * 微信消息模板
 * @param	$typ		模板类型:1申请店铺成功,2有人回复
 * @param 	$xid		发送消息的用户ID
 * @param 	$id			数据ID
 * @param $template_id	消息模板ID
 * @return boolean
 */
function WX_TEP_MSG($typ,$xid,$id,$template_id){
	$top_color = "#FF0000";
	$con_color = "#000";
	$rem_color = "#173177";

	$keyarr=array();
	$keyarr['touser'] = $xid;
	$keyarr['template_id'] = $template_id;
	$keyarr['url']= '';
	$keyarr['topcolor'] = $top_color;

	$data=array();
	if($typ == '1'){
		$o = new Model('yun_shop_set');
		$o->find($id);
		$data['first']=array('value'=>'您申请的店铺已审批。','color'=>$con_color);
		$data['keyword1']=array('value'=>'开店申请审批','color'=>$rem_color);
		$data['keyword2']=array('value'=>'通过','color'=>$rem_color);
		$data['remark']=array('value'=>'您申请的店铺已审批通过，请登录PC端店长管理后台管理您的店铺。店铺网址：'.Conf::$http_path.'yunshopadmin/login.html，用户名：'.$o->un.'，密码：'.$o->pwd.'。如有疑问请到学子客QQ群联系管理员，感谢您的支持。','color'=>$con_color);
	}else if($typ == '2'){
		$o=new Model('yun_shop_order');
		$o->find($id);

		$con = json_decode($o->content);
		$str = '';
		foreach($con as $v){
			$str .= $v->name.' X '.$v->count.' ;';
		}

		$data['first']=array('value'=>'您有新的订单。','color'=>$con_color);
		$data['keyword1']=array('value'=>$o->orderno,'color'=>$rem_color);
		$data['keyword2']=array('value'=>$str,'color'=>$rem_color);
		$data['keyword3']=array('value'=>$o->total.'元','color'=>$rem_color);
		$data['keyword4']=array('value'=>$o->address,'color'=>$rem_color);
		$data['keyword5']=array('value'=>'姓名：'.$o->name.' 电话：'.$o->tel,'color'=>$rem_color);
		$data['remark']=array('value'=>'您有新的订单，详情请登录PC端店长管理后台查看订单。如有疑问请到学子客QQ群联系管理员，感谢您的支持。','color'=>$con_color);
	}

	$token = WX_gettoken();
	$keyarr['data']=$data;
	$res = HttpCurl::quickpost('https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$token,json_encode($keyarr));
	$res=json_decode($res);
	if($res->errmsg=="ok"){
		return $res->msgid;
	}else{
		return false;
	}
}

/**
 * 用户提现自动转账
 * @param $id 用户提现表记录ID
 */
function wx_transfer($id){
	require_once YYUC_FRAME_PATH.'plugin/tool.php';
	
	$tx = new Model('tixian');
	$tx->find($id);
	$pay = new Model('wx_set');
	$pay->find(1);

	$mch_appid = $pay->appId;;
	$mchid = $pay->mchId;//商户号
	$nonce_str = md5(time());//随机数
	$partner_trade_no = $tx->ordno;//商户订单号
	$openid = $tx->xid;//用户唯一标识
	$check_name = 'NO_CHECK';//校验用户姓名选项，NO_CHECK：不校验真实姓名 FORCE_CHECK：强校验真实姓名（未实名认证的用户会校验失败，无法转账）OPTION_CHECK：针对已实名认证的用户才校验真实姓名（未实名认证用户不校验，可以转账成功）
	$re_user_name = $tx->name;//用户姓名
	$amount = intval($tx->money*100);//金额（以分为单位，必须大于100）
	$desc = '推广费提现';//描述
	$spbill_create_ip = Request::ip();//请求ip
	//封装成数据
	$dataArr = array();
	$dataArr['amount'] = $amount;
	$dataArr['check_name'] = $check_name;
	$dataArr['desc'] = $desc;
	$dataArr['mch_appid'] = $mch_appid;
	$dataArr['mchid'] = $mchid;
	$dataArr['nonce_str'] = $nonce_str;
	$dataArr['openid'] = $openid;
	$dataArr['partner_trade_no'] = $partner_trade_no;
	$dataArr['re_user_name'] = $re_user_name;
	$dataArr['spbill_create_ip'] = $spbill_create_ip;
	$sign = getSign($dataArr,$pay->partnerKey);
	$data ="<xml>
			<mch_appid><![CDATA[".$mch_appid."]]></mch_appid>
			<mchid><![CDATA[".$mchid."]]></mchid>
			<nonce_str><![CDATA[".$nonce_str."]]></nonce_str>
			<partner_trade_no><![CDATA[".$partner_trade_no."]]></partner_trade_no>
			<openid><![CDATA[".$openid."]]></openid>
			<check_name><![CDATA[".$check_name."]]></check_name>
			<re_user_name><![CDATA[".$re_user_name."]]></re_user_name>
			<amount><![CDATA[".$amount."]]></amount>
			<desc><![CDATA[".$desc."]]></desc>
			<spbill_create_ip><![CDATA[".$spbill_create_ip."]]></spbill_create_ip>
			<sign><![CDATA[".$sign."]]></sign>
			</xml>";

	$zs1 = Conf::$local_remote."apiclient_cert.pem";
	$zs2 = Conf::$local_remote."apiclient_key.pem";
	$ch = curl_init();
	curl_setopt($ch,CURLOPT_TIMEOUT,60);
	curl_setopt($ch,CURLOPT_URL,'https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers');
	curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
	curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,false);
	curl_setopt($ch,CURLOPT_SSLCERTTYPE,'PEM');
	curl_setopt($ch,CURLOPT_SSLCERT,$zs1);
	curl_setopt($ch,CURLOPT_SSLKEYTYPE,'PEM');
	curl_setopt($ch,CURLOPT_SSLKEY,$zs2);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml'));
	curl_setopt($ch,CURLOPT_POST, 1);
	curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
	$info = curl_exec($ch);
	if(curl_errno($ch)){
		echo 'Errno'.curl_error($ch);
	}
	curl_close($ch);
	$re = xmlToArray($info);

	$l = new Model('tx_log');
	$l->find(array('ordno'=>$tx->ordno));
	$l->name = $tx->name;
	$l->money = $tx->money;
	$l->ordno = $tx->ordno;
	if($re['return_code'] =='SUCCESS'){
		if($re['result_code'] =='SUCCESS'){
			$l->ctime = $re['payment_time'];
			$l->msg = '提现成功';
			$l->save();
			return 'ok';
		}else{
			$l->ctime = date('Y-m-d H:i:s');
			$l->msg = $re['return_msg'];
			$l->save();
			return $re['return_msg'];
		}
	}else{
		$l->ctime = date('Y-m-d H:i:s');
		$l->msg = $re['err_code_des'];
		$l->save();
		return $re['err_code_des'];
	}
}
