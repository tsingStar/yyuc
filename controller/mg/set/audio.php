<?php
/**
 * 语音回复
 */
require another();
$m = new Model('ret_audio');
$m->order('id');
$p = new Pagination();
$res = $p->model_list($m);