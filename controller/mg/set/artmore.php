<?php
/**
 * 多图文回复
 */
require another();
$m = new Model('ret_art_more');
$m->order('id desc');
$p = new Pagination(5);
$res = $p->model_list($m);