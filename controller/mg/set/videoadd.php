<?php
require another();
$m = new Model('ret_video');
if(Request::get(1)){
	$m->find(Request::get(1));
	getkw('v', $m);
}
if($m->try_post()){
	if($m->has_id() && $m->id != Request::get(1)){
		die();
	}
	$kw = $m->kw;
	$m->save();
	savekw('v', $m);
	Redirect::to('video.html','保存成功');
}
