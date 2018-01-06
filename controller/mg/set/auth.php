<?php
require_once YYUC_FRAME_PATH.'fun/leftmenu.php';
$index = $menu_index;
$roles = new Model('roles');
// $parr = $roles->where(array('id@<>'=>'1'))->map_array('id', 'tit');
$parr = $roles->map_array('id', 'tit');
$kk = Request::get('bmid');
if(!$kk){
	$kk = key($parr);
}
if($kk){
	$qxarr = $_POST['qxarr'];
	$parts2 = new Model('roles');
	$parts2->find($kk);
	if($qxarr){	
		$parts2->qxarr = json_encode($qxarr);
		$parts2->save();
		alert('保存成功');
	}else{
		$qxarrs = $parts2->qxarr;
		if(trim($qxarrs)!=''){
			$qxarr = json_decode($qxarrs);
			
		}else{
			$qxarr = array();
		}
	}
}
	
