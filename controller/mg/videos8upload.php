<?php
set_time_limit(0);
Page::$need_view = false;
Upload::save_upload_file(upath('videos/'.date('YmdHis').'_'.rand(10,99)));
