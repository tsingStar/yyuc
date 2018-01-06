<?php
$u = new Model('admins');
$tj = new SampleModel();

if('del'==Request::get(1)){
	$id = Request::post('id');
	$u->find($id);
	if($u->has_id()){
		$u->remove();
		Response::write('ok');
	}else{
		Response::write('no');
	}
}

$condition = array();
$where = $tj->load_array_from_get();
if(isset($where['relun'])){
	$condition['relun@~'] = trim($where['relun']);
	unset($where['relun']);
}
if(isset($where['tel'])){
	$condition['tel@~'] = trim($where['tel']);
	unset($where['tel']);
}
$condition['id@<>'] = '1';
$p = new Pagination();
$res = $p->model_list($u->where($condition));

$part = new Model('roles');
$part_a = $part->where(array('id@<>'=>'1'))->map_array('id', 'tit');
