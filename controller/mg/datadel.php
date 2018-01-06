<?php
/**
 * 删除
 */
$id = Request::post('id');
$tn = Request::post('tn');
$m = new Model($tn);
$m->field('id')->find($id);

$m->remove();
if(strpos($tn, 'ret_')===0){
	//删除多余的关键字
	$rep = new Model('key_replays');
	$typ = $tn=='ret_text'?'t':($tn=='ret_art_one'?'o':($tn=='ret_art_more'?'m':($tn=='ret_audio'?'a':'v')));
	$rep->delete(array('rid'=>$m->id,'rtyp'=>$typ));
}
Response::write('ok');