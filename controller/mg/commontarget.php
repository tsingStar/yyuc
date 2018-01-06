<?php
$where=array();
if('one'==Request::get(1)){
	$m = new Model('action_mapn');
	$pid = Request::post('pid');
	$where['m']=$pid;
	$res = $m->where($where)->order('ord,id')->list_all_array();
	Response::json($res);
}elseif('two'==Request::get(1)){
	$m = new Model('action_mapn');
	$pid = Request::post('pid');
	$id = Request::post('id');
	$where['m']=$pid;
	$where['n']=$id;
	$m->find($where);
	if($m->tn){
		$mm = new Model($m->tn);
		if($m->tn=='webs'){
			$mm->order('ord,id desc');
		}else{
			$mm->order('id desc');
		}
		$res = $mm->field('id,tit')->list_all_array();
		Response::json($res);
	}
	Response::json(array());
}