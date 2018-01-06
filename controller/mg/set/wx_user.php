<?php
/**
 * 微信用户管理
*/
$u = new Model('user');
$tj = new SampleModel();

$gz_arr = array(''=>'全部','0'=>'取消关注','1'=>'正在关注');

$where = array();
if(Request::post()){
	$tj->load_from_post();
	if(trim($tj->unick) != ''){
		$where['unick'] = trim($tj->unick);
	}
	if(trim($tj->gz) != ''){
		$where['gz'] = trim($tj->gz);
	}
}

$p = new Pagination(15,3,false);
$ps = $p->model_list($u->where($where)->order('gz desc,ctime desc'));
foreach($ps as $k=>$v){
	if($v->tj != '0'){
		$u->find(array('xid'=>$v->tj));
		$ps[$k]->tj = $u->unick;
	}
}