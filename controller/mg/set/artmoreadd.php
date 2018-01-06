<?php
/**
 * 添加多图文回复
 */
require another();
$m = new Model('ret_art_more');
if(Request::get(1)){
	$m->find(Request::get(1));

	getkw('m', $m);
}
if($m->try_post()){
	if($m->has_id() && $m->id != Request::get(1)){
		die();
	}
	$kw = $m->kw;
	$m->save();
	savekw('m', $m);
	Redirect::to('artmore.html','保存成功');
}
