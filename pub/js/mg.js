//表单提交的验证
function modelsubmit(){
	$('form').validate(function(m){
		$('.err-inline').remove();
	    if(m.length>0){
	        for(var i=0;i<m.length;i++){
	 			var ntip = $('<span class="help-inline err-inline" style="color:red">'+(m[i].m===false?'该项内容不能为空':m[i].m.join(','))+'</span>');
	            $(m[i].e).after(ntip.show());
	            $(m[i].e).one('blur',function(){
	            	$(this).next('.err-inline').remove();
	            });
	        }
	    }else{
	    	$('form').submit();
	    }
	});
}
//播放视频
function playJiaocheng($key,$txt){
	window.picsetpopdiv = $.layer({
		    type : 2,
		    title : $txt,
		    move : ['.xubox_title' , true],
		    iframe : { src : 'http://www.uhqq.com/jcvideo-'+$key+'.html'},
		    area : ['854px' , '532px'],
		    offset : ['100px','50%']
		});
}
function initpicbtn(){
	$('.picsetbtn').unbind().click(function(){
		var pel = $(this).parent();
		window.picsetimg = pel.find('img');
		window.picsetinput = pel.find('input');
		window.picsetbak = null;
		return poppicsetif();
	});
	$('.videosetbtn').unbind().click(function(){
		var pel = $(this).parent();
		window.picsetimg = pel.find('video');
		window.picsetinput = pel.find('input');
		window.picsetbak = null;
		return popvideosetif();
	});
	$('.picsetbtns').unbind().click(function(){
		var pel = $(this).parent();
		window.picsetinput = pel.find('input');
		window.picsetbak = eval('window.'+$(this).attr('callback'));
		window.picsetimg = 'more';
		return poppicsetif();
	});
}
$(function(){
	//图片选择
	initpicbtn();
	//图标选择
	$('.logdivset').click(function(){
		window.logarea = $(this);
		window.logtag = null;
		return poplogsetif();
	});
	
	$('form').submit(function(){
		return valnull($(this));
	});
	if($(".chosen-select").size()>0){
		$(".chosen-select").chosen({no_results_text: "Oops, nothing found!"});
	}
	//警告关闭
	$('button[data-dismiss="alert"]').click(function(){
		$(this).parent().slideUp();
	});
});

function poplogsetif(){
	window.logsetpopdiv = $.layer({
	    type : 2,
	    title : false,
	    iframe : {src : '/mg/logs.html'},
	    area : ['480px' , '420px'],
	    offset : ['100px','50%']
	});
	return false;
}
function poppicsetif(){
	var top = $(window).height()>900 ? '100px' : ($(window).height()>800?'40px':'0px');
	window.picsetpopdiv = $.layer({
	    type : 2,
	    title : '图片资源库',
	    move : ['.xubox_title' , true],
	    iframe : {src : '/mg/images.html'},
	    area : ['700px' , '515px'],
	    offset : [top,'50%']
	});
	return false;
}

function popvideosetif(){
	var top = $(window).height()>900 ? '100px' : ($(window).height()>800?'40px':'0px');
	window.picsetpopdiv = $.layer({
	    type : 2,
	    title : '视频资源库',
	    move : ['.xubox_title' , true],
	    iframe : {src : '/mg/videos.html'},
	    area : ['700px' , '515px'],
	    offset : [top,'50%']
	});
	return false;
}

//富文本图片选择
function picdealplug(btn){	
	
	window.picsetinput =null;
	window.picsetbak = null;
	
	window.picsetimg = null;
	window.picsetinput = $(btn).parent().prev('input');
	window.picsetpopdiv = $.layer({
	    type : 2,
	    title : false,
	    iframe : {src : '/mg/images.html'},
	    area : ['700px' , '520px'],
	    offset : ['100px','50%']
	});
	return false;
}

//数据删除
function deldata(id,tn,msg1,msg2){
	if(!msg1){
		msg1 = '确定删除此条信息吗?';
	}
	if(!msg2){
		msg2 = '删除成功！';
	}
	layer.confirm(msg1, function(){
		_.ajax('/mg/datadel.html',{id:id,tn:tn},function(){
			layer.msg(msg2,1,1);
			setTimeout(function(){
				location.reload(true);
			},888);
		});		
	});
}
//支付成功
function pay_back(){
	layer.msg('支付完成<span id="ztwcdtmpspan">5</span>秒钟后跳转...',10,10);
	setInterval(function(){
		var ii = parseInt($('#ztwcdtmpspan').html());
		$('#ztwcdtmpspan').html(ii-1);
		if(ii<=1){
			location.href = location.href+'ok';
		}		
	},1000);
}
//非空校验
function valnull(jo){
	var valres = true;
	jo.find('input[required="required"],select[required="required"],textarea[required="required"],.required').each(function(){
		if($.trim($(this).val())=='' && $(this).is(':visible')){
			valres = false;
			if(!$(this).attr('obackgroundColor')){
				$(this).attr('obackgroundColor',$(this).css('backgroundColor'));				
			}
			$(this).css('backgroundColor','yellow');
			$(this).one('focus',function(){
				$(this).css('backgroundColor',$(this).attr('obackgroundColor'));
			});
		}
	});
	if(!valres){
		layer.msg('请将必填项补充完整');
	}
	return valres;
}

//加载通用链接2级
function target_set1(o,fun){
	var jpo = $(o).parent();
	var val = $(o).val();
	jpo.find('.target_url4,.target_url5').val('').hide();
	jpo.find('.target_url2,.target_url3').html('').hide();
	jpo.find('.target_theurl').val('').trigger('change');
	if(val==''){
		jpo.find('.target_theurl').val('').trigger('change');
		if(fun){
			fun();
		}
	}else if(val=='mylink'){
		jpo.find('.target_url4').css('display','block');		
		if(fun){
			fun();
		}
	}else if(val=='mytel'){
		jpo.find('.target_url5').css('display','block');		
		if(fun){
			fun();
		}
	}else if(val=='myscript'){
		jpo.find('.target_url2').html('<option value="">-未选择-</option>');
		jpo.find('.target_url2').append('<option value="javascript:history.go(-1);">页面后退</option>');
		jpo.find('.target_url2').append('<option value="javascript:history.go(1);">页面前进</option>');
		jpo.find('.target_url2').css('display','block');
		if(fun){
			fun();
		}
	}else{
		jpo.find('.target_url2').html('<option value="">-未选择-</option>');
		jpo.find('.target_url3').html('<option value="">-未选择-</option>');
		_.ajaxcache('/mg/commontarget-one.html',{pid:$(o).val()},function(m){
			for(var i=0;i<m.length;i++){
				var mm = m[i];
				if(mm.islist != '1'){
					mm.n = '@'+mm.n;
				}
				jpo.find('.target_url2').append('<option value="'+mm.n+'">'+mm.des+'</option>');
			}
			jpo.find('.target_url2').css('display','block');
			if(fun){
				fun();
			}
		});	
	}	
}

//加载通用链接3级
function target_set2(o,fun,isjsweb){
	var jpo = $(o).parent();
	var val = $.trim($(o).val());
	jpo.find('.target_url4').val('');
	jpo.find('target_url3').html('');
	jpo.find('.target_url3,.target_url4').hide();
	jpo.find('.target_theurl').val('').trigger('change');	
	if(val==''){
		if(fun){
			fun();
		}
	}else if(val.indexOf('@')==0){
		jpo.find('.target_theurl').val(jpo.find('.target_url1').val()+val.replace('@','/')).trigger('change');
		if(fun){
			fun();
		}
	}else if(val.indexOf('javascript')==0){
		jpo.find('.target_theurl').val(val).trigger('change');
		if(fun){
			fun();
		}
	}else if(val=='web' && isjsweb){
		jpo.find('.target_url3').html('<option value="">-未选择-</option>');
		//此处填写页面选取
		$('#leftul').children('li.p').each(function(){
			jpo.find('.target_url3').append('<option value="'+$(this).attr('id')+'">'+$(this).find('span').text()+'</option>');
		});
		jpo.find('.target_url3').css('display','block');
		if(fun){
			fun();
		}
	}else{
		jpo.find('.target_url3').html('<option value="">-未选择-</option>');
		_.ajaxcache('/mg/commontarget-two.html',{pid:jpo.find('.target_url1').val(),id:$(o).val()},function(m){
			for(var i=0;i<m.length;i++){
				var mm = m[i];
				jpo.find('.target_url3').append('<option value="'+mm.id+'">'+mm.tit+'</option>');
			}
			jpo.find('.target_url3').css('display','block');
			if(fun){
				fun();
			}
		});	
	}	
}
//设置内容
function target_set3(o,fun){
	if($(o).is(':hidden') && !fun){
		return;
	}
	var jpo = $(o).parent();
	var val = $(o).val();
	jpo.find('.target_theurl').val(jpo.find('.target_url1').val()+'/'+jpo.find('.target_url2').val()+'-'+val).trigger('change');
	if($.isFunction(fun)){
		fun();
	}
}
function target_set4(o,fun){
	if($(o).is(':hidden') && !fun){
		return;
	}
	var jpo = $(o).parent();
	var val = $.trim($(o).val());
	if(val!='' && val.indexOf('http')!=0){
		layer.msg('目标链接格式不正确',1);
		$(o).val('')
		jpo.find('.target_theurl').val('').trigger('change');
	}else{
		jpo.find('.target_theurl').val(val).trigger('change');
		if($.isFunction(fun)){
			fun();
		}
	}	
}
function target_set5(o,fun){
	if($(o).is(':hidden') && !fun){
		return;
	}
	var jpo = $(o).parent();
	var val = $.trim($(o).val());
	if(val!='' && !/\d+/.test(val)){
		layer.msg('电话号码格式不正确',1);
		$(o).val('')
		jpo.find('.target_theurl').val('').trigger('change');
	}else{
		jpo.find('.target_theurl').val('tel:'+val).trigger('change');
		if($.isFunction(fun)){
			fun();
		}
	}	
}
function fill_target_set(o){
	var jpo = $(o).parent();
	var val = $(o).val();
	tofill_target_set(jpo,val);
}
function tofill_target_set(jpo,val){
	if(val==''){
		jpo.find('.target_url1').val('');
		target_set1(jpo.find('.target_url1')[0]);
	}else if(val.toLowerCase().indexOf('http')==0){
		jpo.find('.target_url1').val('mylink');
		target_set1(jpo.find('.target_url1')[0],function(){
			jpo.find('.target_url4').val(val);
			target_set4(jpo.find('.target_url4')[0],true);
		});
	}else if(val.toLowerCase().indexOf('tel:')==0){
		jpo.find('.target_url1').val('mytel');
		target_set1(jpo.find('.target_url1')[0],function(){
			val = val.split(':');
			jpo.find('.target_url5').val(val[1]);
			target_set5(jpo.find('.target_url5')[0],true);
		});
	}else if(val.toLowerCase().indexOf('javascript:')==0){
		jpo.find('.target_url1').val('myscript');
		target_set1(jpo.find('.target_url1')[0],function(){
			jpo.find('.target_url2').val(val)
			target_set2(jpo.find('.target_url2')[0]);
		});
	}else{
		var vals = val.split('/');
		var val2 = vals[1];
		jpo.find('.target_url1').val(vals[0]);
		target_set1(jpo.find('.target_url1')[0],function(){
			if(val2.indexOf('-')==-1){
				jpo.find('.target_url2').val('@'+val2.replace('@',''));
				target_set2(jpo.find('.target_url2')[0]);
			}else{
				var val3 = val2.split('-');
				jpo.find('.target_url2').val(val3[0]);
				target_set2(jpo.find('.target_url2')[0],function(){					
					jpo.find('.target_url3').val(val3[1]);
					target_set3(jpo.find('.target_url3')[0],true);
				});
			}
		});
	}
}

//添加瀑布流	
function addpbl(csrc,cdest){
	$('.'+csrc).each(function(){
		var o = addpbl_getdest(cdest);
		$(o).append(this);
	});
}
function addpbl_getdest(cdest){
	var h = 9999999;
	var o = null;
	$('.'+cdest).each(function(){
		var hh = $(this).height();
		if(h>hh){
			o = this;
			h = hh;
		}
	});
	return o;
}


$(function(){
	$('.target_theurl').each(function(){
		fill_target_set(this);
	});
});


//业务操作

function starthd(id,tn){
	_.ajax('/mg/act/hdact-1.html',{id:id,tn:tn},function(m){
		if(m=='ok'){
			_.goto(location.href);
		}
	});
}
function stophd(id,tn){
	_.ajax('/mg/act/hdact-0.html',{id:id,tn:tn},function(m){
		if(m=='ok'){
			_.goto(location.href);
		}
	});
}

//查询排序
function sortquert(s){
	$('#ftquery').val(s);
	$('#tquery').submit();
}
//显示关注者详细信息
function showusrdetail(id){
	window.udetailpopdiv = $.layer({
	    type : 2,
	    title : false,
	    iframe : { src : '/mg/u/detail-'+id+'.html'},
	    area : ['500px' , '420px'],
	    offset : ['100px','50%']
	});
}
//标记使用门店
function signuse(tn,hid,id){
	window.udetailpopdiv = $.layer({
	    type : 2,
	    title : false,
	    iframe : { src : '/mg/signuse-'+tn+'-'+hid+'-'+id+'.html'},
	    area : ['350px' , '160px'],
	    offset : ['100px','50%']
	});
}
//显示预留奖项
function yljx(id,tn){
	window.uyllpopdiv = $.layer({
	    type : 2,
	    title : false,
	    iframe : { src : '/mg/act/yljx-'+tn+'-'+id+'.html'},
	    area : ['600px' , '420px'],
	    offset : ['100px','50%']
	});
}
function phoneview(url){
	window.ejsetpopdiv = $.layer({
	    type : 2,
	    title : false,
	    iframe : { src : url},
	    area : ['350px' , '600px'],
	    offset : ['15px','50%']
	});
	return false;
}