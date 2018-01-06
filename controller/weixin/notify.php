<?php
require_once YYUC_FRAME_PATH.'plugin/wx_msg/CommonUtilPub.php';
require_once YYUC_FRAME_PATH.'plugin/wx_msg/WxPay.pub.config.php';
require_once YYUC_FRAME_PATH.'plugin/wx_msg/WxpayServerPub.php';

//订单ID
$id = Request::get(1);

$wx_set=new Model('wx_set');
$wx_set->find();
WxPayConfPub::$APPID = $wx_set->appId;
WxPayConfPub::$MCHID = $wx_set->mchid;
WxPayConfPub::$KEY = $wx_set->partnerKey;
WxPayConfPub::$APPSECRET = $wx_set->appSecret;


//使用通用通知接口
$notify = new WxpayServerPub();
//存储微信的回调
$xml = $GLOBALS['HTTP_RAW_POST_DATA'];
$notify->saveData($xml);
//验证签名，并回应微信。
//对后台通知交互时，如果微信收到商户的应答不是成功或超时，微信认为通知失败，
//微信会通过一定的策略（如30分钟共8次）定期重新发起通知，
//尽可能提高通知的成功率，但微信不保证通知最终能成功。
if($notify->checkSign() == FALSE){
	$notify->setReturnParameter("return_code","FAIL");//返回状态码
	$notify->setReturnParameter("return_msg","签名失败");//返回信息
}else{
	$notify->setReturnParameter("return_code","SUCCESS");//设置返回码
}
$returnXml = $notify->returnXml();
//==商户根据实际情况设置相应的处理流程，此处仅作举例=======

//订单表，查看该用户是否已经下过单
if($notify->checkSign() == TRUE){
	//Log::error("【验证通过】:\n");
	if ($notify->data["return_code"] == "FAIL"||$notify->data["result_code"] == "FAIL") {
		//此处应该更新一下订单状态，商户自行增删操作
 		//Log::error("微信支付【通信出错】:\n".$xml."\n");
	}else{
		$ord = new Model('order');
		$ord->find($id);
		if($ord->sta == 1){
			foreach(json_decode($ord->content) as $v){
				$ids[] = $v->cpid;
			}
			
			//会员等级
			$cp = new Model('cp');
			$u = new Model('user');
			$u->find(array('xid'=>$ord->xid));
			$lv1 = $cp->max('lv',array('id'=>$ids));
			$zps = $cp->where(array('id'=>$ids,'zp@<>'=>''))->list_column_data('zp');
			$lv2 = $cp->max('lv',array('id'=>zps));
			if($lv1 > 0 || $lv2 > 0){
				if($lv1 >= $lv2){
					$u->update(array('hylv'=>$lv1));
				}else{
					$u->update(array('hylv'=>$lv2));
				}
			}
			
			//提成
			if($u->tj != '0'){
				$u1 = new Model('user');
				$u1->find(array('xid'=>$u->tj));
				$u1->update(array('yye'=>$u1->yye+$ord->total,'tgf'=>$u1->tgf+get_tc('lv1')*$ord->total,'ktx'=>$u1->ktx+get_tc('lv1')*$ord->total));
			}
			if($u1->tj != '0'){
				$u2 = new Model('user');
				$u2->find(array('xid'=>$u1->tj));
				$u2->update(array('yye'=>$u2->yye+$ord->total,'tgf'=>$u2->tgf+get_tc('lv2')*$ord->total,'ktx'=>$u2->ktx+get_tc('lv2')*$ord->total));
			}
			if($u2->tj != '0'){
				$u3 = new Model('user');
				$u3->find(array('xid'=>$u2->tj));
				$u3->update(array('yye'=>$u3->yye+$ord->total,'tgf'=>$u3->tgf+get_tc('lv3')*$ord->total,'ktx'=>$u3->ktx+get_tc('lv3')*$ord->total));
			}
			
			//修改订单状态
			$ord->update(array('sta'=>2));
		}
	}
}
else{
	//此处应该更新一下订单状态，商户自行增删操作
 	//Log::error("微信支付【支付失败】:\n".$xml."\n");
}
echo $returnXml;