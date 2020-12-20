<?php
    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','xmyx');
// if (mysqli_connect_errno($con)) 
//     { 
//         echo "连接 MySQL 失败: " . mysqli_connect_error(); 
//     } else{
//         echo "连接 MySQL 成功 " ; 
//     }
    $start = $_GET['start'];
    $len = $_GET['len'];
    # 设置SQL语句
    $sql = "SELECT * FROM `data` LIMIT $start,$len";
    # 执行SQL语句
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('error' . mysqli_error());
    }
    # 数据的处理
    $dataArr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($dataArr,$row);
        $row = mysqli_fetch_assoc($res);
    }
    print_r(json_encode($dataArr,JSON_UNESCAPED_UNICODE));
?>