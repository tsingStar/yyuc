<?php
/**
 * 添加单图文回复
 */
require another();
$m = new Model('ret_art_one');
if(Request::get(1)){
	$m->find(Request::get(1));
	getkw('o', $m);
}
if($m->try_post()){
	if($m->has_id() && $m->id != Request::get(1)){
		die();
	}
	$kw = $m->kw;
	$m->save();
	savekw('o', $m);
	Redirect::to('artone.html','保存成功');
}
