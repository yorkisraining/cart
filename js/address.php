<?php
	header("Content-Type: text/plain;charset=utf-8");
//	
//	// 返回请求方法
//	// get则用search(); post用create()
//	if($_SERVER["REQUEST_METHOD"] == 'GET') {
//		search();
//	} elseif($_SERVER["REQUEST_METHOD"] == 'POST') {
//		create();
//	}
//	
//	function search() {
		//获取json文件中的数据
		$json_string = file_get_contents('address.json');
		
		// 把JSON字符串转成PHP数组
		$data = json_decode($json_string, true);

		// 显示出来看看
		var_dump($data);
//	}
	
?>