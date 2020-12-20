<?php
    $uid=$_GET['id'];
    $type=$_GET['type'];
    $description=$_GET['description'];
    $img=$_GET['img'];
    $price=$_GET['price'];
    $con = mysqli_connect('localhost','root','123456','xmyx');
    $sql = "SELECT * FROM `data` WHERE `uid` = '$uid'";//连接数据库的id匹配
    $res = mysqli_query($con,$sql);
    $row = mysqli_fetch_assoc($res);
    if(!$row){
        print_r("数据库没有改数据，则添加改数据");
        $sql1 = "INSERT INTO `data` (`id`, `type`, `img`,`uid`,`description`,`price`) VALUES (NULL,'$type','$img','$uid', '$description','$price')";
        $res1 = mysqli_query($con,$sql1);
    }else{
        print_r("数据空有该数据");
    };
?>