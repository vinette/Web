<?php

$l = $_GET["link"];


function my_curl($url)
{
        $ch=curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//设置否输出到页面
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30 ); //设置连接等待时间
        curl_setopt($ch, CURLOPT_ENCODING, "gzip" ); //设置为客户端支持gzip压缩
        $data=curl_exec($ch);//将获取到的网页放到一个变量中
        curl_close($ch);
        return "$data";
}

$install=$_GET["install"];

if($install != "yes")
{
   $r = array();
   $r["url"] = "http://haiwai.etao.com/ajax/price_curve.htm?link=".$l;
   echo "wl_price_generator_url_notify(".json_encode($r).")";
}
else
{
   $r = array();
   $r["url"] = "http://haiwai.etao.com/ajax/price_curve.htm?link=".$l;
   echo json_encode($r);
   # echo my_curl("http://haiwai.etao.com/ajax/price_curve.htm?link=".$l);

}
?>
