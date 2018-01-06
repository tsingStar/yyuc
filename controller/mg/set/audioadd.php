<?php
/**
 * 添加语音回复
 */
require another();
$m = new Model('ret_audio');
if(Request::get(1)){
	$m->find(Request::get(1));
	getkw('a', $m);
}
if($m->try_post()){
	if($m->has_id() && $m->id != Request::get(1)){
		die();
	}
	$kw = $m->kw;
	$m->save();
	savekw('a', $m);
	Redirect::to('audio.html','保存成功');
}
