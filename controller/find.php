<?php
/**
 * 密码找回-1
 */
$m = new SampleModel();
$msg = '';
$email = '';
if(Request::post('uemail')){
	$m->try_post();
	if($m->vercodeok()){
	$email = Request::post('uemail');
	$emails = explode('@', $email);
	if(strpos($email, '@')!==false){
		$u = new Model('admins');
		$u->find(array('email'=>$email));
		if(!$u->has_id()){
			Response::exejs("layer.msg('密码找回失败，请核实邮箱信息的正确性！', 2, -1);");
		}else{
			$http = conf::$http_path;
			$val = urlencode(String::encryption($u->email.'@@@'.$u->pwd));
			
			$nr = <<<EOT
			
{$u->name},您好：<br/>
您刚刚提交了找回密码的申请，请点击以下验证链接重置您的密码。<br/>
<a href="{$http}findpwd.html?ver={$val}">{$http}findpwd.html?ver={$val}</a><br>
(如果该链接无法点击，请将链接地址完整的复制到浏览器的地址栏中进行访问)<br>
<br>
<br>
这是一封系统自动发出的邮件，请不要直接回复。<br>
如有疑问与客服联系。<br>
如果您并未执行密码找回操作，请删除此邮件！<br>
			
EOT;
$html = file_get_contents(YYUC_FRAME_PATH.'view/'.Conf::$view_folder.'/_email.html');
$html = str_replace('@tit@','密码找回',$html);
$html = str_replace('@con@',$nr,$html);
$html = str_replace('微销宝-提供国内最优秀的公众平台技术服务支持',"人家-XXXXXXX",$html);
$html = str_replace('微销宝',"人家",$html);
$html = str_replace('北京悠狐网络技术公司荣誉之作',"北京悠狐网络技术公司",$html);
SendMail::normal_send('findpwd',$email,'密码找回',$html);
$msg = '密码重置方式已发送至您的邮箱，请<a href="http://mail.'.$emails[1].'">登录邮箱</a>查看！';
		}
	}else{
	Response::exejs("layer.msg('邮箱地址不正确', 1, -1);");
	}
}else{
	Response::exejs("layer.msg('验证码输入不正确', 1, -1);");
}
}