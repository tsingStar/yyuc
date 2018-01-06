<?php
/**
 * 此方法是框架访问权限验证的钩子方法<br/>
 * $uri 为请求的URL的相对路径<br/>
 * 如:http://www.yyuc.com/admin/set/index.html 则$uri为:admin/set/index<br/>
 * $uri为实际的控制器路径，而并非用户真实的请求路径(开启自定义路由的情况下两者并不相同)
 * @param $uri
 */
function access_validations($uri){
	$lastdate = Redirect::last_data();
	if(strpos($uri, 'mg/')===0){
		if(trim(Session::get('uid'))==''){
			if(Cookie::has('ui')){
				$u = new Model('admins');
				$u->find(Cookie::get('ui'));
				if(md5($u->pwd.$u->id.Conf::$management_center_password)==Cookie::get('up')){
					set_login($u);
				}else{
					Redirect::to('/logout');
				}
			}else{
				Redirect::to('/logout');
			}
		}
		if(is_string($lastdate)){
			Response::exejs("if(layer){layer.msg('".$lastdate."', 1, -1)}else{_.toast('".$lastdate."')};");
		}
		/**
		 * 访问权限验证
		 */
		if($no_qxarr=Session::get('no_qxarr')){
			if($no_qxarr && count($no_qxarr)>0){
				$_role_auth=false;
				foreach ($no_qxarr as $val) {
					if(strpos($uri, $val) == true){
						$_role_auth=true;
					}
				}
				if($_role_auth){
					Redirect::to_301('/no.html');
				}
			}
		}
	}/* else if(strpos($uri, 'wap/')===0){
		require another();
		if(!$xi){
			Redirect::to_301('/no.html');
		}
	} */
}
/**
 * 数据执行校验
 *
 * @param DBDes $dbdes
 */
function db_validations($dbdes){

}

/**
 *  404挽救
 */
function rescue_404($url){
	
}
/*****************自定义的页面验证写在此处*******************/

?>
