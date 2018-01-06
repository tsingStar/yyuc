<?php
Page::$need_view = false;
$pn = Request::post('pn');
$path = Conf::$local_remote.upath('videos');
@unlink($path.'/'.basename($pn));
Response::write('ok');
