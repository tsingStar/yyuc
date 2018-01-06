<?php
//取得关键字
function getkw($typ,$m){
	$r =new Model('key_replays');
	$res = $r->field('kw')->where(array('rid'=>$m->id,'rtyp'=>$typ))->list_all();
	$kw = array();
	foreach ($res as $rr){
		$kw[] = $rr->kw;
	}
	$m->kw = implode(',', $kw);
	return $m->kw;
}
//保存关键字
function savekw($typ,$m){
	$id = $m->id;
	$kw = $m->kw;
	$kwms = $m->kwms;
	$kw = trim($kw);
	$m =new Model('key_replays');
	$m->delete(array('rid'=>$id,'rtyp'=>$typ));
	if($kw == ''){
		return;
	}
	$keys = explode(',', $kw);
	$keys = array_unique($keys);
	foreach ($keys as $k=>$v){
		if($m->has(array('kw'=>$v))){
			$m->update(array('kw'=>$v),array('rid'=>$id,'rtyp'=>$typ,'ms'=>$kwms));
		}else{
			$m->insert(array('rid'=>$id,'rtyp'=>$typ,'kw'=>$v,'ms'=>$kwms));
		}
	}
}
$ppms = array('1'=>'完全匹配','2'=>'模糊匹配');