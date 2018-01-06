<?php
/**
 * 文字回复
 */
require another();
$m = new Model('ret_text');
$m->order('id');
$p = new Pagination();
$res = $p->model_list($m);