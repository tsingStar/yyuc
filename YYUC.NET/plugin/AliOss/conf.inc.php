<?php
define('OSS_ACCESS_ID', Conf::$alioss_accesskey);
define('OSS_ACCESS_KEY', Conf::$alioss_accesssecret);
define('OSS_ENDPOINT',Conf::$alioss_host);

define('OSS_TEST_BUCKET', '');

//是否记录日志
define('ALI_LOG', FALSE);

//自定义日志路径，如果没有设置，则使用系统默认路径，在./logs/
//define('ALI_LOG_PATH','');

//是否显示LOG输出
define('ALI_DISPLAY_LOG', FALSE);

//语言版本设置
define('ALI_LANG', 'zh');
