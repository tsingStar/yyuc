<!doctype html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta names="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<title><?php echo $Pname; ?></title><script type="text/javascript" src="http://www.model.com/@system/js/jquery.js"></script><script type="text/javascript">window.yyuc_remotepath = "http://www.model.com/";window.yyuc_jspath = "http://www.model.com/@system/";</script><script type="text/javascript" src="http://www.model.com/@system/js/yyuc.js"></script>
<link rel="stylesheet" href="/css/bootstrap.min.css">
<link rel="stylesheet" href="/css/bootstrap-responsive.min.css">
<link rel="stylesheet" href="/css/icheck/all.css">
<link rel="stylesheet" href="/css/themes.css">
<link rel="stylesheet" href="/css/style.css">
<link rel="shortcut icon" href="<?php echo $Icon; ?>"/>
<script type="text/javascript" src="/js/icheck/jquery.icheck.min.js"></script>
<script type="text/javascript" src="/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/flat/layer/layer.js"></script>
<script type="text/javascript">
	$(function() {
		if (window.parent != window) {
			try {
				if (window.parent.location.href.indexOf('uhqq.com')) {
					window.parent.location.href = location.href;
				}
			} catch (e) {

			}
		}
		$('.wrapper').css('opacity', 0);
		pprsize();
		setTimeout(function() {
			$('#manbak').animate({
				opacity : 0.9
			}, 1000);
		}, 500);

	});
	$(window).resize(function() {
		pprsize();
	});
	function pprsize() {
		$('#manbak').width($(window).width());
		$('#manbak').height($(window).height());
		$('.wrapper').stop().animate(
				{
					top : ($(window).height() / 2
							- $('.wrapper:visible').height() / 2 + 200)
							+ 'px',
					opacity : 0.9
				}, 900);
	}
</script>
<style>
.auth_forget a {
	background: #078cd1 !important;
	color: #fff !important;
}

.auth_forget a:hover {
	background: #2675C0 !important;
}
</style>
</head>
<body class='login'>
	<img src="<?php echo $Background; ?>" id="manbak" style="position:absolute;left:0px;top:0px;z-index:-1;opacity:0;" />
	<div class="wrapper" style="top: -500px;" id="wrapper1">
		<h1>
			<a style="font-size:29px;"><img src="<?php echo $Logo; ?>" class='retina-ready' width="59" height="49"><?php echo $Pname; ?></a>
		</h1>
		<div class="login-body">
			<h2>后台登录</h2>
			<form action="login.html" method='post' class='form-validate'>
				<div class="control-group">
					<div class="email controls">
						<input type="text" name='un' placeholder="用户名/邮箱" class="input-block-level" data-rule-required="true" data-rule-email="true" autocomplete="off">
					</div>
				</div>
				<div class="control-group">
					<div class="pw controls">
						<input type="password" name="pwd" placeholder="密码" class="input-block-level" data-rule-required="true" autocomplete="off">
					</div>
				</div>
				<div class="submit">
					<div class="remember">
						<table>
							<tr>
								<td>
									<label for="remember" style="margin-top: 8px;">记住登录状态&nbsp;&nbsp;</label>
								</td>
								<td>
									<input type="checkbox" name="rem" class='icheck-me' data-skin="square" data-color="blue" id="remember" value="1">
								</td>
							</tr>
							<tr>
						</table>
					</div>
					<button type="submit" class='btn btn-primary' style="float: right;">
						<i class="icon-ok-sign"></i>&nbsp;&nbsp;登录
					</button>
				</div>
			</form>
			<div class="forget">
				<a href="find.html"><span>忘记密码了?</span></a>
			</div>
		</div>
	</div>
</body>
</html>