<?php
//微信企业支付方法

/**
 * 生成签名sign
 * @param $Obj 企业支付数据数组(不包含sign)
 * @param $key	商户号partnerKey
 * @return 字符串
 */
function getSign($Obj,$key) {
	foreach($Obj as $k=>$v) {
		$Parameters[$k] = $v;
	}
	// 签名步骤一：按字典序排序参数
	ksort($Parameters);
	$String = formatBizQueryParaMap($Parameters,false);
	// 签名步骤二：在string后加入KEY
	$String = $String."&key=".$key;
	// 签名步骤三：MD5加密
	$String = md5($String);
	// 签名步骤四：所有字符转为大写
	$result_ = strtoupper ($String);
	return $result_;
}

/**
 * 格式化数组，将数组转换成url键值参数字符串
 */
function formatBizQueryParaMap($paraMap,$urlencode) {
	$buff = "";
	ksort($paraMap);
	foreach($paraMap as $k=>$v){
		if($urlencode){
			$v = urlencode($v);
		}
		$buff .= $k."=".$v."&";
	}
	$reqPar;
	if(strlen($buff)>0){
		$reqPar = substr($buff,0,strlen($buff)-1);
	}
	return $reqPar;
}

/**
 * XML转数组
 * @param $xml
 * @return 转换的数组
 */
function xmlToArray($xml){
	libxml_disable_entity_loader(true);
	$values = json_decode(json_encode(simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA)),true);
	return $values;
}
