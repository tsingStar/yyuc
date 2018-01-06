<?php 
class Users extends Model {
	//此处定义虚拟字段
	//public $virtual_field = null;
	/**
	* 构造函数
	*/
	function __construct($postid=''){
		parent::__construct('users',$postid);		
	}

	/**
	* 数据入库之前的合法性验证
	*/
	public function validate(){
		
	}

	/**
	* 根据数据库的数据进行虚拟字段的填充
	*/
	public function fill_virtual_field(){
	
	}

	
	/**
	* 根据模型中的虚拟字段回填数据库字段数据
	*/
	public function fill_entity_field(){
		
	}
}