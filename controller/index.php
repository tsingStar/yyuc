<?php
/**
 * 框架入口
 */
if(Session::has('uid')){
	Redirect::to('/mg/index');
}else{
	Redirect::to('/login');
}
