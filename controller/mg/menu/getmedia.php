<?php
$errbiao = array('40054'=>'不合法的子菜单按钮url域名','-1'=>'系统繁忙','0'=>'请求成功','40001'=>'获取access_token时AppSecret错误，或者access_token无效','40002'=>'不合法的凭证类型','40003'=>'不合法的OpenID','40004'=>'不合法的媒体文件类型','40005'=>'不合法的文件类型','40006'=>'不合法的文件大小','40007'=>'不合法的媒体文件id','40008'=>'不合法的消息类型','40009'=>'不合法的图片文件大小','40010'=>'不合法的语音文件大小','40011'=>'不合法的视频文件大小','40012'=>'不合法的缩略图文件大小','40013'=>'不合法的APPID','40014'=>'不合法的access_token','40015'=>'不合法的菜单类型','40016'=>'不合法的按钮个数','40017'=>'不合法的按钮个数','40018'=>'不合法的按钮名字长度','40019'=>'不合法的按钮KEY长度','40020'=>'不合法的按钮URL长度','40021'=>'不合法的菜单版本号','40022'=>'不合法的子菜单级数','40023'=>'不合法的子菜单按钮个数','40024'=>'不合法的子菜单按钮类型','40025'=>'不合法的子菜单按钮名字长度','40026'=>'不合法的子菜单按钮KEY长度','40027'=>'不合法的子菜单按钮URL长度','40028'=>'不合法的自定义菜单使用用户','40029'=>'不合法的oauth_code','40030'=>'不合法的refresh_token','40031'=>'不合法的openid列表','40032'=>'不合法的openid列表长度','40033'=>'不合法的请求字符，不能包含\uxxxx格式的字符','40035'=>'不合法的参数','40038'=>'不合法的请求格式','40039'=>'不合法的URL长度','40050'=>'不合法的分组id','40051'=>'分组名字不合法','41001'=>'缺少access_token参数','41002'=>'缺少appid参数','41003'=>'缺少refresh_token参数','41004'=>'缺少secret参数','41005'=>'缺少多媒体文件数据','41006'=>'缺少media_id参数','41007'=>'缺少子菜单数据','41008'=>'缺少oauth code','41009'=>'缺少openid','42001'=>'access_token超时','42002'=>'refresh_token超时','42003'=>'oauth_code超时','43001'=>'需要GET请求','43002'=>'需要POST请求','43003'=>'需要HTTPS请求','43004'=>'需要接收者关注','43005'=>'需要好友关系','44001'=>'多媒体文件为空','44002'=>'POST的数据包为空','44003'=>'图文消息内容为空','44004'=>'文本消息内容为空','45001'=>'多媒体文件大小超过限制','45002'=>'消息内容超过限制','45003'=>'标题字段超过限制','45004'=>'描述字段超过限制','45005'=>'链接字段超过限制','45006'=>'图片链接字段超过限制','45007'=>'语音播放时间超过限制','45008'=>'图文消息超过限制','45009'=>'接口调用超过限制','45010'=>'创建菜单个数超过限制','45015'=>'回复时间超过限制','45016'=>'系统分组，不允许修改','45017'=>'分组名字过长','45018'=>'分组数量超过上限','46001'=>'不存在媒体数据','46002'=>'不存在的菜单版本','46003'=>'不存在的菜单数据','46004'=>'不存在的用户','47001'=>'解析JSON/XML内容错误','48001'=>'api功能未授权','50001'=>'用户未授权该api','40120'=>'button类型错误','40119'=>'button类型错误');

$wx_set = new Model('wx_set');
$wx_set->find();

if(trim($wx_set->wappid)=='' || trim($wx_set->wappsec)==''){
	Response::write('nosec');
}
$tk = WX_gettoken();
if(!$tk){
	Response::write('nosec');
}


//素材删除
if(Request::get(1)=="del"){
	$media_id=Request::get('media_id');
	if(!$media_id){
		Response::write('参数错误');
	}
	$url_d="https://api.weixin.qq.com/cgi-bin/material/del_material?access_token=".$tk;
	$pem=array();
	$pem['media_id']=$media_id;
	$res_d=HttpCurl::quickpost($url_d, json_encode($pem));
	$res_d = json_decode($res_d,true);
	if($res_d['errcode']!=0){
		Response::write($res_d['errmsg']);
	}else{
		Response::write('ok');
	}
}
if(Request::get(1)=="loadmore"){
	$pagenum=intval(Request::post('pagenum'));
	$url = 'https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token='.$tk;
	$keyarr=array();
	$keyarr['type']='news';
	$keyarr['offset']=$pagenum*10;
	$keyarr['count']=10;
	$res=HttpCurl::quickpost($url, json_encode($keyarr));
	$res = json_decode($res,true);
	$rearr=array();
	if(intval($res['total_count']) <=0){
		$rearr['status']=0;
	}else{
		$rearr['status']=1;
		$data=array();
		foreach ($res['item'] as $k=> $value) {
			$data[$k]['title']=$value['content']['news_item'][0]['title'];
			$data[$k]['mid']=$value['media_id'];
			$data[$k]['typ']= (count($value['content']['news_item'])>1) ? "多图文":'单图文';
		}
		
		$rearr['data']=$data;
	}
	Response::json($rearr);
	
}
if(Request::get('list')=="media"){
	Page::view('medialist');
}

$url = 'https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token='.$tk;
$keyarr=array();
$keyarr['type']='news';
$keyarr['offset']=0;
$keyarr['count']=10;
$res=HttpCurl::quickpost($url, json_encode($keyarr));
$res = json_decode($res,true);
$medias=array();
if(intval($res['total_count']) <=0){
	toast('您还没有图文素材');
}else{
$medias=$res['item'];
}
