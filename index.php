<?php
// 系统入口

// if( $_SERVER['HTTP_HOST'] != 'jobsminer.cc' && $_SERVER['HTTP_HOST'] != 'www.jobsminer.cc' ){
// 	header( "HTTP/1.1 301 Moved Permanently" ) ;
// 	header("Location: http://www.jobsminer.cc");
// 	exit;
// }



if(version_compare(PHP_VERSION,'5.3.0','<'))  die('require PHP > 5.3.0 !');

/**
 * 系统调试设置
 * 项目正式部署后请设置为false
 */
define ( 'APP_DEBUG', true );
define ( 'SEND_EMAIL', true );
//define('APP_DEBUG',TRUE); // 开启调试模式
define('APP_DEBUG',false);     // 关闭调试模式就不会记录日志
/**
 * 应用目录设置
 * 安全期间，建议安装调试完成后移动到非WEB目录
 */
define ( 'APP_PATH', './App/' );


/**
 * 缓存目录设置
 * 此目录必须可写，建议移动到非WEB目录
 */
define ( 'RUNTIME_PATH', './Run/' );
define('APP_DEBUG',TRUE); // 开启调试模式	
	

define('WEB_PATH',dirname(__FILE__) );
define( "WEB_URL", "http://".$_SERVER['HTTP_HOST'].'/');//__ROOT__

//检测是否来自手机
//define('IS_WAP',check_wap()?1:0 );
define('IS_WAP',0 );

// check if wap
function check_wap(){    
    
    $is_wap = 0;
    
    // 先检查是否为wap代理，准确度高
    if( isset($_SERVER['HTTP_VIA']) && stristr($_SERVER['HTTP_VIA'],"wap") ){
        $is_wap = true;
    }
    // 检查浏览器是否接受 WML.
    elseif(strpos(strtoupper($_SERVER['HTTP_ACCEPT']),"VND.WAP.WML") > 0){
        $is_wap = true;
    }
    //检查USER_AGENT
    elseif(preg_match('/(blackberry|configuration\/cldc|hp |hp-|htc |htc_|htc-|iemobile|kindle|midp|mmp|motorola|mobile|nokia|opera mini|opera |Googlebot-Mobile|YahooSeeker\/M1A1-R2D2|android|iphone|ipod|mobi|palm|palmos|pocket|portalmmm|ppc;|smartphone|sonyericsson|sqh|spv|symbian|treo|up.browser|up.link|vodafone|windows ce|xda |xda_)/i', $_SERVER['HTTP_USER_AGENT'])){
        $is_wap = true;
    }
    else{
        $is_wap = false;
    }
    
    define('IS_WAP_FACT',$is_wap?1:0 );
    
    if($is_wap){
        session_start();
        //print_r($_SESSION);exit;
        if( isset($_REQUEST['viewTools']) && in_array($_REQUEST['viewTools'], array("pc","mobile"))){
            $_SESSION['viewTools'] = $_REQUEST['viewTools'];
            //session("viewTools",$_REQUEST['viewTools']);
            if($_REQUEST['viewTools']=="mobile"){
                return true;
            }
            else return false;
        }
        else if( isset($_SESSION['viewTools']) && in_array($_SESSION['viewTools'], array("pc","mobile"))){
        //else if( session('viewTools') && in_array(session('viewTools'), array("pc","mobile"))){
            if($_SESSION['viewTools']=="mobile"){
                return true;
            }
            else return false;
        }
        
        
        return true;
    }
    else return false;
    
}

/**
 * 引入核心入口
 */
require './Cron/ThinkPHP.php';