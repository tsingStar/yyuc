<?php
$image = new Model('images');
$image->find(Session::get('uid'));
if(!$image->has_id()){
	$image->insert(array('id'=>Session::get('uid')));
}

$initfn = Session::get('O_imagesfn','f0');
$m = new SampleModel();