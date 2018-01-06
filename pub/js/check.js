/**
 * 手机号验证
 */
function checkPhone(str){
	var check=/^1[3|4|5|7|8]\d{9}$/;
	if(check.test(str)){
		return true;
	}else{
		return false;
	}
}

/**
 * 整数验证
 */
function checkRate(str){  
	var check = /^[1-9]+[0-9]*$/;  
	if(check.test(str)){
		return true;
	}else{
		return false;
	}  
} 

/**
 * 验证码验证
 */
function checkYzm(str){  
	var check = /^[0-9]{6}$/;  
	if(check.test(str)){
		return true;
	}else{
		return false;
	}  
}

/**
 * 金钱数量验证
 */
function checkMoney(str){
	var check = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
	if(check.test(str)){
		return true;
	}else{
		return false;
	}  
}


