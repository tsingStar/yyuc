<?php
Page::$need_view = false;
$fn = Request::post('fn');
$pn = Request::post('pn');
$path = Conf::$local_remote.upath($fn);
@unlink($path.'/'.basename($pn));
Response::write('ok');
