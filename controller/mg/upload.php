<?php
/**
 * 大文件上传--文件片段
 * 
 *省略了文件接收判断isset部分
 *当前目录下建立一个uploads文件夹
 *接收文件名时进行转码，防止中文乱码。
 */
Page::ignore_view();
$target = Conf::$local_remote.upath('videos').'/'.iconv("utf-8","gbk",$_POST["name"]) . '-' . $_POST['index'];
move_uploaded_file($_FILES['file']['tmp_name'], $target);
sleep(1);