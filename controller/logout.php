<?php
/**
 * 用户退出
 */
Session::clear();
Cookie::clear();
Redirect::to('index','成功退出');