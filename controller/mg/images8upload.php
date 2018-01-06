<?php
Page::$need_view = false;
$path = Request::post('fnrel');
Upload::save_upload_file(upath($path.'/'.date('YmdHis').'_'.rand(10,99)));
