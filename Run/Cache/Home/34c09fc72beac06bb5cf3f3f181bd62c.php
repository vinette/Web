<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<meta charset="UTF-8">

<title><?php if($page_title) echo $page_title;else echo C('WEB_SITE_TITLE'); ?> </title>
<meta name="keywords" content="<?php echo C('WEB_SITE_KEYWORD');?>">
<meta name="description" content="<?php echo C('WEB_SITE_DESCRIPTION');?>">
<meta name="baidu-site-verification" content="tPqpxinOFC" />
<link rel="stylesheet" type="text/css"  href="/Public/Home/css/common.css" />
<link rel="stylesheet" type="text/css"  href="/Public/Home/css/reset.css" />
<link rel="shortcut icon" type="image/ico" href="/favicon.ico">

<script type="text/javascript" src="/Public/Home/js/jquery.1.10.1.min.js" ></script>
<script type="text/javascript" src="/Public/Home/js/jquery.lib.min.js"></script>

<script src="/Public/Home/js/ajaxfileupload.js" type="text/javascript"></script>

<!--New delete-->

<link rel="stylesheet" type="text/css"  href="/Public/Home/css/external.min.css" />

<script type="text/javascript" src="/Public/Home/js/company/jobs.js"></script>        
<script type="text/javascript" src="/Public/Home/js/company/company.js"></script>         
<script type="text/javascript" src="/Public/Home/js/core.min.js"></script> 
<script type="text/javascript" src="/Public/Home/js/popup.js"></script> 

  
<!--New delete-->
<script type='text/javascript'>
    //var address = "<?php echo ($user["location"]); ?>";
   // var constellation = "<?php echo ($user["constellation"]); ?>";
    var PUBLIC = '/Public';
    var uploadUrl = '<?php echo U("Common/uploadFace");?>';
		var URL='<?php echo U("Company/keep");?>';
		var cancelKeep = '<?php echo U("cancelKeep");?>';
    var sid = '<?php echo session_id();?>';
    var ROOT = '';
</script>
<script type="text/javascript">
(function(){
	var ThinkPHP = window.Think = {
		"ROOT"   : "", //当前网站地址
		"APP"    : "", //当前项目地址
		"PUBLIC" : "/Public", //项目公共目录地址
		"DEEP"   : "<?php echo C('URL_PATHINFO_DEPR');?>", //PATHINFO分割符
		"MODEL"  : ["<?php echo C('URL_MODEL');?>", "<?php echo C('URL_CASE_INSENSITIVE');?>", "<?php echo C('URL_HTML_SUFFIX');?>"],
		"VAR"    : ["<?php echo C('VAR_MODULE');?>", "<?php echo C('VAR_CONTROLLER');?>", "<?php echo C('VAR_ACTION');?>"]
	}
})();
//var ctx = "";

var ctx = "<?php echo (WEB_URL); ?>";
var rctx = "<?php echo (WEB_URL); ?>";
var pctx = "<?php echo (WEB_URL); ?>";

/* var frontLogin = "http://www.xxxxx.com/frontLogin.do";
var frontLogout = "http://www.xxxxx.com/frontLogout.do";
var frontRegister = "http://www.xxxxx.com/frontRegister.do"; */

</script>

<script type="text/javascript">
 $(document).ready(function(){
  var uid = $('input[name="jm_login_uid"]').val();
   if (uid) {
    var jm_cookie = document.cookie;
    window.localStorage.setItem("jm_login", jm_cookie);
   }

   $('.header #top-logo').hover( function(){
      $this.toggleClass('icebear-y');
   });

   $('.top_nav .li_p').hover( function(){
      $('#top-logo').toggleClass('icebear-p');
      $('.header').toggleClass('header-p');
   });

   $('.top_nav .li_g').hover( function(){
      $('#top-logo').toggleClass('icebear-g');
      $('.header').toggleClass('header-g');
   });

     $('.top_nav .li_o').hover( function(){
      $('#top-logo').toggleClass('icebear-o');
      $('.header').toggleClass('header-o');
   });

   //   $('.user_nav').hover( function(){
   //    $('.user_nav .user_nav_drop').toggleClass('dn');
   // });
  
 }); 

</script>
</head>


<body>
<div id="body">
<input type="hidden" name="jm_login_uid" value="<?php $user = session('user_auth'); echo $user['uid'];?>" />
<?php if($show_nav == 1): ?><div class="num_box">
	<div class="num" id="num_00">
    
      <div class="header <?php echo ($cur_top_nav["company"]); ?> <?php echo ($cur_top_nav["install"]); ?> <?php echo ($cur_top_nav["news"]); ?>">
        <div class="w960">
          <div class="logo">
            <a <?php echo ($cur_top_nav["plugin"]); ?> href="/index.html">
              <div id="top-logo" class="logo icebear-y" /></div>
            </a>
          </div>
          
          
          <?php if(is_login()): if(getUsersSession('type')==1){ ?>
          
          	<!-- <div class="nav"><a <?php echo ($cur_top_nav["job"]); ?> href="/Jobs/index.html">职位</a><a <?php echo ($cur_top_nav["company"]); ?> href="/Company/info.html">我的公司</a><a <?php echo ($cur_top_nav["resume"]); ?> href="/Company/interview.html">简历管理</a><a <?php echo ($cur_top_nav["post"]); ?> href="/Company/createPost.html">发布职位</a></div> -->
               <ul class="top_nav">
                <li class="li_p"><a  href="/Company/companylist.html">名企网申</a></li>
                <li class="li_g"><a  href="/install/install.html">安装教程</a></li>
                <li class="li_o"><a href="/News/about.html">关于我们</a></li>
              </ul>
               <!--  <a <?php echo ($cur_top_nav["resume"]); ?> href="/Resume/myresume.html">我的简历</a> -->
                 <!--  <a <?php echo ($cur_top_nav["install"]); ?> href="/Install/install.html">安装教程</a>
                <a <?php echo ($cur_top_nav["news"]); ?> href="/News/about.html">关于我们</a> -->
              </div>
          		
          	<?php }else{ ?> 
          	
          		<!-- <div class="nav"><a <?php echo ($cur_top_nav["job"]); ?> href="/Jobs/index.html">职位</a><a <?php echo ($cur_top_nav["company"]); ?> href="/Company/index.html">公司</a><a <?php echo ($cur_top_nav["video"]); ?> href="/Video/index.html">宣讲会</a><a <?php echo ($cur_top_nav["resume"]); ?> href="/Resume/myresume.html">我的简历</a><a <?php echo ($cur_top_nav["collections"]); ?> href="/User/collections.html">我的收藏</a></div>  -->
              <div class="nav">
               <ul class="top_nav">
                <li class="li_p"><a  href="/Company/companylist.html">名企网申</a></li>
                <li class="li_g"><a  href="/install/install.html">安装教程</a></li>
                <li class="li_o"><a href="/News/about.html">关于我们</a></li>
              </ul>
               <!-- <a <?php echo ($cur_top_nav["plugin"]); ?> href="/Plugin/plugin.html">功能介绍</a>
                <a <?php echo ($cur_top_nav["install"]); ?> href="/Install/install.html">安装教程</a>
                <a <?php echo ($cur_top_nav["company"]); ?> href="/Company/companylist.html">网申时间表</a>
                <a <?php echo ($cur_top_nav["news"]); ?> href="/News/about.html">关于我们</a>
                 <a <?php echo ($cur_top_nav["resume"]); ?> href="/Resume/myresume.html">我的简历</a> -->
              </div>
          		
          	<?php } ?>
          
          	<div class="login">
            <!-- <?php $user = session('user_auth');var_dump($user) ;?> -->
                <div class="icous"><?php $user = session('user_auth'); echo $user['uid'];?>
                    <div class="inusnav">
                      <em></em>
                      <a href="/User/index.html">设置</a>
                      <a href="<?php echo U('User/logout');?>">登出</a>
                    </div>
                </div> 
                <ul class="top-right">
                 
                  <?php if(getUsersSession('type')==0){ ?>
                    <li><a  href="/Resume/myresume.html">网申简历</a></li>
                    <li><a  href="/User/keep">我的收藏</a></li>
                  <?php } ?>

                </ul>

          <!--   <div class="index_donwload_container"> -->
         
              
	          	<!--  <div class="icous">
                    <div class="inusnav">
                      <em></em>
                      <?php if(getUsersSession('type')==0){ ?>

                      <a href="/User/delivery.html">投递管理</a>
                      <?php } ?>
                      <a href="/User/index.html">账号设置</a>
                      <a href="<?php echo U('User/logout');?>">退出</a>
                    </div>
                </div>  -->
               <!--  <a href="#plugindownload" class="index_downlaod inline cboxElement" title="请选择你当前的浏览器（更多浏览器正在努力开发中）">立即下载</a> -->
	          </div>
          
          <?php else: ?>
          
	          <!-- <div class="nav"><a <?php echo ($cur_top_nav["job"]); ?> href="/Jobs/index.html">职位</a><a <?php echo ($cur_top_nav["company"]); ?> href="/Company/index.html">公司</a><a <?php echo ($cur_top_nav["video"]); ?> href="/Video/index.html">宣讲会</a><a <?php echo ($cur_top_nav["post"]); ?> href="/Company/createPost.html">发布职位</a></div> -->

            <div class="nav">
            
              <ul class="top_nav">
                <li class="li_p"><a  href="/Company/companylist.html">名企网申</a></li>
                <li class="li_g"><a  href="/install/install.html">安装教程</a></li>
                <li class="li_o"><a href="/News/about.html">关于我们</a></li>
              </ul>
              <!-- <a <?php echo ($cur_top_nav["plugin"]); ?> href="/Plugin/plugin.html">功能介绍</a>
              <a <?php echo ($cur_top_nav["install"]); ?> href="/Install/install.html">安装教程</a>
              <a <?php echo ($cur_top_nav["company"]); ?> href="/Company/companylist.html">网申时间表</a>
              <a <?php echo ($cur_top_nav["news"]); ?> href="/News/about.html">关于我们</a> -->
            </div>

	          <div class="login"> 
            <!-- <div class="index_donwload_container"> -->
	         <!--  <a href="#plugindownload" class="index_downlaod inline cboxElement" title="请选择你当前的浏览器（更多浏览器正在努力开发中）">立即下载</a> -->
  	          <ul class="top-nologin">
               <!--  <li><a  href="<?php echo U('User/login');?>">登录</a></li>  -->
                <li><a href="<?php echo U('User/register');?>">注册</a></li> 
                <li><a id="various1" href="#inline1" href="<?php echo U('User/login');?>">登录</a></li>  
                
                <!-- <li><a  href="/Resume/myresume.html">网申简历</a></li>
                <li><a  href="/Collectonlineapp/index">我的收藏</a></li> -->
              </ul>
            
	          </div><?php endif; ?> <div class="clr"></div>
          
          </div>
         
        </div>
      
	</div>

</div>

<script type="text/javascript" src="/Public/Home/js/jquery.1.10.1.min.js" ></script>
<script type="text/javascript" src="/Public/Home/js/jquery.lib.min.js"></script>

<script src="/Public/Home/js/ajaxfileupload.js" type="text/javascript"></script>

<!--New delete-->
<link rel="stylesheet" type="text/css" href="/Public/Home/css/fontscss.css" />
<link rel="stylesheet" type="text/css"  href="/Public/Home/css/external.min.css" />
<script type="text/javascript" src="/Public/Home/js/company/jobs.js"></script>        
<script type="text/javascript" src="/Public/Home/js/company/company.js"></script>         
<script type="text/javascript" src="/Public/Home/js/core.min.js"></script> 
<script type="text/javascript" src="/Public/Home/js/popup.js"></script> 
<!-- <link rel="stylesheet" type="text/css"  href="/Public/Home/css/reg.css" />
 -->
<!--  <link rel="stylesheet" type="text/css" href="/Public/Home/css/loginformstyle.css" />
<link rel="stylesheet" type="text/css" href="/Public/Home/css/animate-custom.css" /> -->

<script type="text/javascript" src="/Public/Home/js/jquery.fancybox.pack.js"></script> 
<link rel="stylesheet" type="text/css" href="/Public/Home/css/jquery.fancybox.css" />
<style type="text/css">
    #loginWarpper {
        padding: 20px 35px;
    }
    #loginWarpper a{
        color: #482929;
        text-decoration: none;
    }
    #loginWarpper .login_logo{
       margin:  auto 0;
    }
    input.pupbtn{
        /*width: 100% !important;*/
        background-color: #e5e5e5;
        width: 390px;
        height: 42px;
        padding: 0 10px;
        margin: 10px 0;
        color: #482929;
        border:0px;
    }

    #loginForm input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
        background-color: #e5e5e5 !important;
        -webkit-box-shadow: 0 0 0px 1000px #e5e5e5 inset; 
        color: #482929;
    }

    #submitLogin {
        width: 100%;
        padding: 12px 0;
        margin: 10px 0 20px 0;
    }
    @font-face {
      font-family: 'Nucleo Outline';
      src:url('../fonts/nucleo-outline/nucleo-outline.eot');
      src:url('../fonts/nucleo-outline/nucleo-outline.eot') format('embedded-opentype'),
        url('../fonts/nucleo-outline/nucleo-outline.woff2') format('woff2'),
        url('../fonts/nucleo-outline/nucleo-outline.woff') format('woff'),
        url('../fonts/nucleo-outline/nucleo-outline.ttf') format('truetype'),
        url('../fonts/nucleo-outline/nucleo-outline.svg') format('svg');
      font-weight: normal;
      font-style: normal;
    }
    
    .icon-login::before {
        z-index: 10;
        display: inline-block;
        margin: 0 20px 0 20px;
        vertical-align: middle;
        text-transform: none;
        font-weight: normal;
        font-variant: normal;
        font-size: 1.3em;
        font-family: 'Nucleo Outline';
        line-height: 1;
        speak: none;
        -webkit-backface-visibility: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>

<div id="content">
    <div style="display: none;">
        <div id="inline1" style="width:460px;height:350px;overflow:auto;">
            <div  id="loginWarpper" class="popup" >
             <a class="hiddenanchor" id="toregister"></a>
                <a class="hiddenanchor" id="tologin"></a>
                <div id="">
                    <div class="login_wrapper"> 
                        <div class="login_logo" style="text-align:center"> 
                            <a href="/"><img src="/Public/Home/images/xunlu_logo.png" /></a>
                        </div> 

                        <input type="hidden" id="resubmitToken" value="" /> 
                        <div class=""> 
                        <form id="loginForm" class="loginForm" action="<?php echo U('User/logintest');?>" method="post">
                         <input class="pupbtn" type="text" id="email" name="email" value="" tabindex="1" placeholder="请输入登录邮箱地址" /> 
                         <input class="pupbtn" type="password" id="password" name="password" tabindex="2" placeholder="请输入密码" errormsg="密码为6-20位" nullmsg="请填写密码" datatype="*6-20"/> 
                         <span class="error" style="display:none;" id="beError"></span> 
                          <div class="clr"></div>

                         <input type="submit" id="submitLogin" class="mybtn"  value="登录" /> 
                         <input type="hidden" id="callback" name="callback" value="" /> 
                         <input type="hidden" id="authType" name="authType" value="" /> 
                         <input type="hidden" id="signature" name="signature" value="" /> 
                         <input type="hidden" id="timestamp" name="timestamp" value="" /> 
                        <div>
                            <div style="float:left"><a href="/User/findPassword" class="rt" >忘记密码？</a> </div>
                            <div style="float:right">
                                <a id="test_reg" href="<?php echo U('User/register');?>" >没有帐号？立即注册></a>
                            </div>
                            <div class="clr"></div> 
                        </div>

                        </form> 
                      
                       </div> 
                       <div class="login_box_btm"></div> 
                 
                    </div>
                    
                </div>
            </div> 
        </div>
    
    </div>


    
</div>
<div style="text-align:center;clear:both">
</div>
    <script type="text/javascript">
    $(document).ready(function() {
        $("#various1").fancybox({
            helpers : {
                overlay : {
                    css : {
                        'background' : 'rgba(255, 215, 50, 0.9)',
                        'overlayOpacity'    : 0.9
                    }
                }
            }
        });
        // $("#test_reg").fancybox({
        //     helpers : {
        //         overlay : {
        //             css : {
        //                 'background' : 'rgba(255, 215, 50, 0.9)',
        //                 'overlayOpacity'    : 0.9
        //             }
        //         }
        //     }
        // });
    });
    var login_from = "<?php echo $_GET[md]; ?>";
        $(document)
            .ajaxStart(function(){
                $("#submitLogin").addClass("log-in").attr("disabled", true);
            })
            .ajaxStop(function(){
                $("#submitLogin").removeClass("log-in").attr("disabled", false);
            });


        $("#loginForm").submit(function(){
            $("#beError").hide();
            var self = $(this);
            $.post(self.attr("action"), self.serialize(), success, "json");
            return false;

            function success(data){
                if(data.status){
                    if(login_from == "min"){
                        window.close(); 
                        parent.location.reload();
                    }
                    else window.location.href = data.url;
                } else {
                    //self.find(".Validform_checktip").text(data.info);
                    $("#beError").show();
                    $("#beError").text(data.info);
                    //刷新验证码
                    //$(".reloadverify").click();
                }
            }
        });

        $(function(){
            var verifyimg = $(".verifyimg").attr("src");
            $(".reloadverify").click(function(){
                if( verifyimg.indexOf('?')>0){
                    $(".verifyimg").attr("src", verifyimg+'&random='+Math.random());
                }else{
                    $(".verifyimg").attr("src", verifyimg.replace(/\?.*$/,'')+'?'+Math.random());
                }
            });
        });
    </script>

<script type="text/javascript" src="/Public/Home/js/query.1.10.1.min.js"></script> 
<script type="text/javascript" src="/Public/Home/js/bootstrap.min.js"></script> 
	  
<div style="display:none;"> 
    <style>
    .clear {clear: both;}
    .jm_plugindownload {padding: 30px 50px;}
    .jm_plugindownload p{padding-bottom: 40px;}
    .btn-browser-container {width: 475px; clear: both;}
    .popup{ padding:0;} 
    .btn-browser{ margin: 10px 0;  padding: 10px 20px 10px 10px;  width: 180px;  height: 40px; line-height: 40px; border: 1px solid #dbdbdb;border-radius: 5px;} 
    .btn-browser span {width: 50px; height: 50px; display: inline-block;}
    .btn-browser span img{vertical-align:middle;}
    .btn-disabled {background-color: #f5f5f5;}
    .btn-chrome{float: left;} 
    .btn-ie{float: right;}  
    .btn-liebao{float: left;} 
    .btn-360{float: right;} 
    
    </style>
    <div id="plugindownload" class="popup" style="">
        <div class="jm_plugindownload">
            <div class="btn-browser-container">
                <a class="btn-browser btn-chrome" target="_blank" href="/Install/install.html"><span><img src="/Uploads/Plugin/chrome.png"></span>Chrome 浏览器</a>
                <a class="btn-browser btn-ie" target="_blank" href="https://ext.chrome.360.cn/webstore/detail/cjbbilalppleefkdldcnjggncniphbjf"><span><img src="/Uploads/Plugin/ie.png"></span>360 安全浏览器</a>
            </div>
            <div class="btn-browser-container">
                <a class="btn-browser btn-liebao btn-disabled"><span><img src="/Uploads/Plugin/liebao.png"></span>即将上线</a>
                <a class="btn-browser btn-360 " target="_blank" href="https://ext.chrome.360.cn/webstore/detail/cjbbilalppleefkdldcnjggncniphbjf"><span><img src="/Uploads/Plugin/360.png"></span>360 极速浏览器</a>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</div><?php endif; ?>

<link rel="stylesheet" type="text/css" href="/Public/Home/css/reset.css"/>
<link rel="stylesheet" type="text/css" href="/Public/Home/css/myresume.css"/>
<style>li{ list-style:none;}</style>
<script>
$(function(){
    $(".btn_showprogress").click(function(){
          $(this).find("i").toggleClass("transform");
		  $(this).parent("div").siblings(".progress_status").slideToggle(200);
    });
});
</script>



<div id="container">
    <div class="mr_myresume_l bgf9">
    
          <div class="tounav">
             <a <?php echo ($amenu[0]); ?> href="/User/delivery/type/0.html">全部</a><em>|</em>
             <a <?php echo ($amenu[1]); ?> href="/User/delivery/type/1.html">投递成功</a><em>|</em>
             <a <?php echo ($amenu[2]); ?> href="/User/delivery/type/2.html">被查看<i></i></a><em>|</em>
             <a <?php echo ($amenu[3]); ?> href="/User/delivery/type/3.html">待沟通</a><em>|</em>
             <a <?php echo ($amenu[4]); ?> href="/User/delivery/type/4.html">通知面试</a><em>|</em>
             <a <?php echo ($amenu[-1]); ?> href="/User/delivery/type/-1.html">不合适</a>
             <a class="shuaxin" href="javascript:window.location.reload()"></a>
          </div>
          
       <div class="toucet">
         
     <ul class="my_delivery">
     
	     <?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i; $result = getApplyLog($v['aid'],$v['apply_log']); ?>
	     	
	     	<li>
            <div class="d_item">
                <h2 title="<?php echo ($v["zhiwei_mingcheng"]); ?>"><a href="/Jobs/info/id/<?php echo ($v["jid"]); ?>.html?source=rec" target="_blank"><em><?php echo ($v["zhiwei_mingcheng"]); ?></em><span>（<?php echo ($v["yuexin_min"]); ?>k-<?php echo ($v["yuexin_max"]); ?>k）</span></a></h2>
                <div class="clear">
                </div>
                <a href="/Company/info/id/<?php echo ($v["company_id"]); ?>/.html" target="_blank" class="d_jobname" title="<?php echo ($v["company_name"]); ?>"><?php echo ($v["company_name"]); ?> <span>[<?php echo ($v["gongzuo_chengshi"]); ?>]</span></a><span class="d_time"><?php echo (showdate($v["addtime"])); ?></span>
                <div class="clear">
                </div>
                <div class="d_resume">
                    使用简历： <span><?php if($v["resume_name"] == ''): ?>在线简历<?php else: echo ($v["resume_name"]); endif; ?></span>
                </div>
                <a href="javascript:;" class="btn_showprogress"><span><?php echo getResumeStatus($v['status'],$v['isread'],$v['view_contact']); ?></span><i></i></a>
            </div>
            
              <div class="progress_status dn">
              
              <?php if($result['step']==1){ ?>
              
              	<ul class="status_steps">                	
                    <li class="status_done status_1">1</li>
                    <li class="status_line status_line_grey"><span></span></li>
                    <li class="status_grey status_2"><span>2</span></li>
                    <li class="status_line status_line_grey"><span></span></li>
                    <li class="status_grey"><span>3</span></li>
                    <li class="status_line status_line_grey"><span></span></li>
                    <li class="status_grey"><span>4</span></li>
                </ul>
                <ul class="status_text clearfixs">
                    <li>投递成功</li>
                    <li class="status_text_2">简历被查看</li>
                    <li class="status_text_3">待沟通</li>
                    <li class="status_text_4 status_text_6">面试</li>
                </ul>
                
              <?php }elseif($result['step']==2){ ?>
              
              	<ul class="status_steps">
                    <li class="status_done status_1">1</li>
                    <li class="status_line status_line_done"><span></span></li>
                    <li class="status_done status_2"><span>2</span></li>
                    <li class="status_line status_line_grey"><span></span></li>
                    <li class="status_grey"><span>3</span></li>
                    <li class="status_line status_line_grey"><span></span></li>
                    <li class="status_grey"><span>4</span></li>
                </ul>
                <ul class="status_text clearfixs">
                    <li>投递成功</li>
                    <li class="status_text_2">简历被查看</li>
                    <li class="status_text_3">待沟通</li>
                    <li class="status_text_4 status_text_6">面试</li>
                </ul>
              
              <?php }elseif($result['step']==3){ ?>
              
              	<ul class="status_steps">
                    <li class="status_done status_1">1</li>
                    <li class="status_line status_line_done"><span></span></li>
                    <li class="status_done status_2"><span>2</span></li>
                    <li class="status_line status_line_done"><span></span></li>
                    <li class="status_done"><span>3</span></li>
                    <li class="status_line status_line_grey"><span></span></li>
                    <li class="status_grey"><span>4</span></li>
                </ul>
                <ul class="status_text clearfixs">
                    <li>投递成功</li>
                    <li class="status_text_2">简历被查看</li>
                    <li class="status_text_3">待沟通</li>
                    <li class="status_text_4 status_text_6">面试</li>
                </ul>
               
               <?php }elseif($result['step']==4){ ?>
              
              	<ul class="status_steps">
                    <li class="status_done status_1">1</li>
                    <li class="status_line status_line_done"><span></span></li>
                    <li class="status_done status_2"><span>2</span></li>
                    <li class="status_line status_line_done"><span></span></li>
                    <li class="status_done"><span>3</span></li>
                    <li class="status_line status_line_done"><span></span></li>
                    <li class="status_done"><span>4</span></li>
                </ul>
                <ul class="status_text clearfixs">
                    <li>投递成功</li>
                    <li class="status_text_2">简历被查看</li>
                    <li class="status_text_3">待沟通</li>
                    <li class="status_text_4 status_text_6">面试</li>
                </ul>     
                
              <?php }elseif($result['step']==10){ ?>              
              	<ul class="status_steps">
                    <li class="status_done status_1">1</li>
                    <li class="status_line status_line_done"><span></span></li>
                    <li class="status_done"><span>2</span></li>
                </ul>
                <ul class="status_text clearfixs clr">
                    <li>投递成功</li>
                    <li class="status_text_2">&nbsp;&nbsp;不合适</li>
                </ul>              
              
              <?php } ?>
                
                
                <ul class="status_list">
                   
                   <?php echo ($result["content"]); ?>
                    
                </ul>
                  <a href="javascript:;" class="btn_closeprogress"></a>
                </div>
       		</li><?php endforeach; endif; else: echo "" ;endif; ?>
         
              
     </ul>
            
            
          </div>
         
    </div>
    
<!-- 板块右侧 -->    
    <div class="mr_myresume_r">
      <div class="jllfnav">
        <a class="nav1" href="/Resume/myresume.html">在线简历</a>
        <a class="nav2" href="/Resume/otherResume.html">附件简历<em><?php echo ($resumeCount); ?></em></a>
        <a class="nav3 cur3" href="/User/delivery.html">投递管理</a>
      </div>
    </div>
    
    
</div>

</div><!-- end #body-->

<?php if($show_nav == 1): ?><div class="clear"></div>

<?php if($show_foot!==0){ ?>

<div class="w960">

    <input type="hidden" id="resubmitToken" value="" />
    <a id="backtop" title="回到顶部" rel="nofollow"></a>


    <!--我要反馈按钮-->
   <!--  <div id="product-fk">
        <div id="feedback-icon">
        <div class="fb-icon"></div>
        <span>我要反馈</span>
        <em class="error dn fk-limit">今天已经反馈足够多了，给产品经理点时间消化下吧~<i></i></em>
        <em class="error dn fk-suc">&nbsp;&nbsp;反馈提交成功！</em>
    </div>
    </div> -->

     <style type="text/css">
     #footer{ position: relative; color: #482929}
     #product-kf {width: 50px;
        height: 50px;
        position: fixed;
        bottom: 80px;
        margin-left: 1000px;
        cursor: pointer;
        z-index: 21;
    }
    #kefu-icon {position: relative;}
    #kefu-icon .fb-icon {width: 30px; height: 30px;  margin: 0 auto; background: url(http://www.jobsminer.cc/Public/Home/images/feedback.png) no-repeat; display: block;}
    #kefu-icon:hover .fb-icon{ background-position: 0px -31px;}
    #kefu-icon:hover span{ color: #F9753E;}
    #kefu-icon span{font-size: 12px; color: #555;/* display: block; width: 60px;position: absolute;left: 0; bottom: -15px;*/}
    #product-fknew{ display: inline-block;}
    #footer .fk-suc{position: absolute; bottom: -20px; left: 0;}
    #footer .abnav{    position: absolute;top: 18px;left: 50%;margin-left: -130px;}
    #footer .abnav a {color:#482929}
    </style>
    <div id="product-kf">
        <div id="kefu-icon">
            <div class="fb-icon"></div>
            <span>在线客服</span>
        </div>
    </div> 
    <script type="text/javascript">
         $('#product-kf').bind('click',function(){
                window.open('http://wpa.qq.com/msgrd?v=3&uin=2535357251&site=qq&menu=yes');
         });
    </script>
    
</div>




<div class="clr"></div>
<div id="footer">
	<div class="w960">
    <div class="lf"> <?php echo C('COPYRIGHT');?> </div>
         <div class="abnav center">
           
            <a href="/News/about.html" target="_bank">关于我们</a><a  target="_bank" href="/News/help.html">帮助中心</a>
            <!-- <a href="/?viewTools=mobile">移动版</a> -->
            <div id="product-fknew">
                <div id="feedback-iconnew">
                    <div class="fb-icon"></div>
                    <a>我要反馈</a>
                    <span></span>
                    <em class="error dn fk-limit">今天已经反馈足够多了，给产品经理点时间消化下吧~<i></i></em>
                    <em class="error dn fk-suc">反馈提交成功！</em>
                </div>
            </div>

            <div id="feedback-con">
                <div class="pfb-pho-close">
                    <div class="pfb-pho"></div>
                    <div class="pfb-close"></div>
                </div>
                <em class="error dn"><span>你还没填任何反馈呢</span><i></i></em>
                <form id="product-fb">
                    <div class="pfb-txt">
                        <textarea placeholder="我是jobsminer的产品经理小飞机，如果你在网站使用时遇到问题或者对网站功能有趣的建议，请告诉我！也许过几天你的想法会变成现实哦~（200字以内）" maxlength="200"></textarea>
                    </div>
                    <div class="pfb-email" style="height:60px;">
                        <input type="text" name="email" placeholder="你的邮箱，方便及时给您回复（选填）"/>
                        <span class="ensure">确定</span>
                    </div>
                </form>
                <input type="hidden" id="login-email" value="quentin@015guan.com">
            </div>
            <script src="/Public/Home/js/core.min.js" type="text/javascript"></script>
        </div>
       <!--  <div class="bdsharebuttonbox">
           <div class="ft_share">
                <span class="dn" id="share_jd2">分享到微信</span>
                <div class="jd_share_success2">
                <img src="http://seo.zgboke.com/qr/0_1_4_<?php echo 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>_cdn.png" />
               <img src="/images/ebg/code.png">
                </div>
            </div>
            <a href="<?php echo C('SINA_URL');?>" class="bds_tsina" target="_bank" title="分享到新浪微博"></a>
            <a href="<?php echo C('FB_URL');?>" class="bds_fbook" target="_bank" title="分享到Facebook"></a>
         </div> -->
         <div class="rt"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <?php echo C("WEB_SITE_ICP"); ?></div>
    </div>
</div>

<?php } endif; ?>

<a href="#0" class="cd-popup-trigger"></a>

<div class="cd-popup" role="alert">
	<div class="cd-popup-container">
		 <iframe src="/User/login.html?md=min" frameborder="0" width="650" height="350" scrolling="no"></iframe>
		<a href="#0" class="cd-popup-close img-replace"></a>
	</div> <!-- cd-popup-container -->
</div> <!-- cd-popup -->

<script type="text/javascript" src="/Public/Home/js/login_min.js"></script>

<script type="text/javascript">
 $('#login_minpop').bind('click',function(){
        $.colorbox({inline:true, href:"#login_min"});
 });
/* $(function(){
	$(".picbig").each(function(i){
		var cur = $(this).find('.img-wrap').eq(0);
		var w = cur.width();
		var h = cur.height();
	   $(this).find('.img-wrap img').LoadImage(true, w, h,'{IMG_PATH}msg_img/loading.gif');
	});
}) */

//$("#user_collection_btn").click(function(){

function user_collection(id,type,flag,refresh){
    //flag:1职位2公司3宣讲会
    //type：0取消1收藏

    //$("#btn_collect").attr('disabled',"true");

    if(!id || !flag){
        alert("参数无效");
        //$("#btn_add").removeAttr("disabled");
        return false;
    }
    if(type!=0 && type!=1 ){
    	alert("参数无效");
        //$("#btn_add").removeAttr("disabled");
        return false;
    }

    $.ajax({
        type:"POST",
        url:ctx +"User/collectAdd",
        data:{id:id,type:type,flag:flag},
        dataType:'json',
        beforeSend:function(){
        },
        success:function(data){
        	//data = $.parseJSON( data );
            if(data.success){
                alert(data.msg);
                if(refresh){
                	window.location.reload();
                }
                return false;
            }
            else {
            	
            	if(data.content.do_type==-1){
            		//event.preventDefault();
            		//$('.cd-popup').addClass('is-visible');
            		$(".cd-popup-trigger").trigger("click");
            		//$.colorbox({inline:true, href:"#login_min"});
            		//window.location.href="/User/login/?ref=/Jobs/info/id/<?php echo ($info["jid"]); ?>";
            	}
            	else alert(data.message);

            }
            return false;
            //$("#btn_collect").removeAttr("disabled");
        }   ,
        //调用执行后调用的函数
        complete: function(XMLHttpRequest, textStatus){
        	//$("#btn_collect").removeAttr("disabled");
        	//return false;
        },
        //调用出错执行的函数
        error: function(){
        	//$("#btn_collect").removeAttr("disabled");
            alert("收藏失败，请稍后再试");
            return false;
        }
     });

}

//});


</script>

<script>
$(".icous").hover(function(){$(this).find(".inusnav").slideDown(200);},function(){$(this).find(".inusnav").slideUp(50);});
</script>
<script>
	// 关闭
	//3s tips消失
	var global = {}
	global.email = "<?php echo C($Think.session.email);?>";
	global.usertoken = $.cookie('user_trace_token');
</script>

<script>
	$(document).click(function(){
		$(".ft_share").removeClass('share_open2');
		$(".ft_share").removeClass("share_click2");
		$(".ft_share").removeClass("share_hover2");
	});
	//微信分享
	$('.ft_share').click(function(event){
		$(this).unbind("mouseover");
		$(this).unbind("mouseout");
		if($(this).hasClass("share_open2")){
			$(this).removeClass('share_open2');
			$(this).removeClass("share_click2");
			$(this).removeClass("share_hover2");
		}else{
			$(this).addClass('share_open2');
			$(this).addClass("share_click2");
			$(this).find("span#share_jd2").addClass("dn") ;
		}
		/*$(this).find("span#share_jd2").addClass("dn") ;*/
		event.stopPropagation();
	});
</script>
<script>
with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~ (-new Date() / 36e5)];
</script>
<!-- 页面footer钩子，一般用于加载插件JS文件和JS代码 -->
<?php echo hook('pageFooter', 'widget');?>



<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?552852c7a726f8c3ec23f071d05ebe95";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>


</body>
</html>