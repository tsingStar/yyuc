<?php
$menu_index = array (
		array (
			'name' => '<b class="glyphicon-user"></b>&nbsp;用户中心',
			'sub' => array (
				array (
					'name' => '基本信息',
					'file' => 'set/account' 
				),
				array (
					'name' => '修改密码',
					'file' => 'set/setpwd' 
				)
			) 
		),
 		array (
 			'name' => '<b class="icon-comments-alt"></b>&nbsp;微信配置',
 			'sub' => array (
 				array (
 					'name' => '微信配置',
					'file' => 'set/wxaccount'
 				),
 				array (
 					'name' => '文字回复',
 					'file' => 'set/text'
				),
 				array (
 					'name' => '单图文回复',
					'file' => 'set/artone'
 				),
 				array (
					'name' => '多图文回复',
 					'file' => 'set/artmore'
				),
					
				array (
 					'name' => '语音回复',
 					'file' => 'set/audio'
 				),
 				array (
 					'name' => '视频回复',
					'file' => 'set/video'
				),
 				array (
 					'name' => '首次关注和其他回复',
 					'file' => 'set/follow'
				),
 				array (
					'name' => '菜单设计',
					'file' => 'menu/set'
 				)
 			)
		),
		array (
			'name' => '<b class="icon-folder-open-alt"></b>&nbsp;Model',
			'sub' => array (
				array (
					'name' => '微信用户管理',
					'file' => 'set/wx_user'
				)
			)
		),
		array (
			'name' => '<b class="icon-sitemap"></b>&nbsp;后台用户管理',
			'sub' => array (
				array (
					'name' => '角色管理',
					'file' => 'set/role' 
				),
				array (
					'name' => '角色访问权限',
					'file' => 'set/auth' 
				),
				array (
					'name' => '用户管理',
					'file' => 'set/user' 
				) 
			) 
		)
);
$indexurl = "/mg/set/account.html";