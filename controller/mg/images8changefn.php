<?php
Page::$need_view = false;
$fn = Request::post('fn');
$val = Request::post('val');
$image = new Model('images');
$image->update(array('id'=>Session::get('uid')),array($fn=>$val));

Response::write('ok');
