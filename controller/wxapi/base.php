<?php
//基本信息登录
$code = Request::get('code');
$state = Request::get('state');
$pcdaya = Cache::get($state);
if(!$pcdaya){
	Cache::remove($state);
	die('请求失败，请返回后重新点击进入！,缓存过期');
}

$res = HttpCurl::quickget('https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$pcdaya['snsapi_base_appid'].'&secret='.$pcdaya['snsapi_base_appsec'].'&code='.$code.'&grant_type=authorization_code');

if($res){
	$res = json_decode($res);
	if(!$res->openid){
		$res = HttpCurl::quickget('https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$pcdaya['snsapi_base_appid'].'&secret='.$pcdaya['snsapi_base_appsec'].'&code='.$code.'&grant_type=authorization_code');
		$res = json_decode($res);
	}
	if($res->openid){
		$regi=set_first_us($u,$res->openid);
		$tzurl = $pcdaya['snsapi_base_url'];
		$tzurlone = explode('?', $tzurl);
		$tzurltwo = trim($tzurlone[1]);
		$tzurlone = $tzurlone[0];
		$tzurltwo = explode('#', $tzurltwo);
		$tzurlps = explode('&', $tzurltwo[0]);
		$csarrs = array();
		foreach ($tzurlps as $tzurlpz){
			$tzurlpzs = explode('=', $tzurlpz);
			$csarrs[$tzurlpzs[0]] = $tzurlpzs[1];
		}
		if(isset($csarrs['sssid'])){
			$csarrs['oldsssid'] = $csarrs['sssid'];
			unset($csarrs['sssid']);
		}
		$csarrs['wxrel'] = 'mp.weixin.qq.com';
		$csarrs['xid'] = $res->openid;
		$csarrs['uid'] = $pcdaya['uid'];
		if($regi=="no_subscribe"){
			$csarrs['subscribe'] ='n';
		}else{
			$csarrs['subscribe'] = 'y';
		}
		$csarrpams = array();
		foreach ($csarrs as $k=>$v){
			$csarrpams[] = $k.'='.$v;
		}
		Redirect::to($tzurlone.'?'.implode('&', $csarrpams));
	}else{
		Session::set('nowapi',1);
		die('客户信息验证失败，请重试或联系微信管理员！');
	}
}


//高级接口权限的公众号直接获得用户信息
function set_first_us($u,$xid){
	if(!$u->wapi){
		return false;
	}
	$wxtoken = WX_gettoken();
	if($wxtoken){
		$res = HttpCurl::quickget('https://api.weixin.qq.com/cgi-bin/user/info?access_token='.$wxtoken.'&openid='.$xid.'&lang=zh_CN');
		$res = json_decode($res);
		if($res){
			if($res->errcode){
				$wxtoken = WX_gettoken();
				$res = HttpCurl::quickget('https://api.weixin.qq.com/cgi-bin/user/info?access_token='.$wxtoken.'&openid='.$xid.'&lang=zh_CN');
				$res = json_decode($res);
			}
			if($res->subscribe ){
				return true;
			}elseif ($res->subscribe=='0'){
				return "no_subscribe";
			}
		}else{

			return true;
		}
	}else{
		return false;
	}
}