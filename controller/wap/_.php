<?php
$ui = Request::get('uid',Session::get('ui'));
$xi = Request::get('xid',Session::get('xi'));

if(!empty($xi)){
	Session::set('xi',$xi);
}
if(!empty($ui)){
	Session::set('ui',$ui);
}
if(!empty($ui) && (empty($xi))){
	if(strpos($_SERVER["HTTP_USER_AGENT"],"MicroMessenger")){
		//此处判断是否开启高级接口
		if(empty($_POST)){
			$wx_set = new Model('wx_set');
			$wx_set->find();
			if($wx_set->wapi){
				$hcprevdata = array();
				$hcprevdata['snsapi_base_url'] = 'http://'.$_SERVER ['HTTP_HOST'].'/'.$_SERVER["REQUEST_URI"];
				$hcprevdata['snsapi_base_appid'] = $wx_set->appId;
				$hcprevdata['snsapi_base_appsec'] = $wx_set->appSecret;
				$hcprevdata['uid'] = $ui;
				$tempid = $ui.'_'.uniqid();

				if(!Cache::set($tempid, $hcprevdata,60)){
					if(!Cache::set($tempid, $hcprevdata,60)){
						if(!Cache::set($tempid, $hcprevdata,60)){
							die('请求失败，请返回后重新点击进入！ ！');
						}
					}
				}
				//获取用户授权
 				Redirect::to('https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$wx_set->appId.'&redirect_uri='.urlencode(Conf::$http_path).'wxapi%2Fbase.html&response_type=code&scope=snsapi_base&state='.$tempid.'#wechat_redirect');
			}
		}
	}
}
