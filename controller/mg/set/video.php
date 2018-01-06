<?php
require another();
$m = new Model('ret_video');
$m->order('id');
$p = new Pagination();
$res = $p->model_list($m);