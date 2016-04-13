<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<meta charset="UTF-8">

<title><?php if($page_title) echo $page_title;else echo C('WEB_SITE_TITLE'); ?> </title>
<meta name="keywords" content="<?php echo C('WEB_SITE_KEYWORD');?>">
<meta name="description" content="<?php echo C('WEB_SITE_DESCRIPTION');?>">

<link rel="stylesheet" type="text/css"  href="/Public/Home/css/common.css" />
<link rel="stylesheet" type="text/css"  href="/Public/Home/css/reset.css" />
<link rel="shortcut icon" type="image/ico" href="/favicon.ico">

<script type="text/javascript" src="/Public/Home/js/jquery.1.10.1.min.js" ></script>
<script type="text/javascript" src="/Public/Home/js/jquery.lib.min.js"></script>

<script src="/Public/Home/js/ajaxfileupload.js" type="text/javascript"></script>


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


</head>


<body>
<div id="body">

<?php if($show_nav == 1): ?><div class="num_box">
	<div class="num" id="num_00">
    
      <div class="header">
        <div class="w960">
          <div class="logo"><a href="/index.html"><img src="/Public/Home/images/logo.gif" /></a></div>
          
          
          <?php if(is_login()): if(getUsersSession('type')==1){ ?>
          
          		<div class="nav"><a <?php echo ($cur_top_nav["job"]); ?> href="/Jobs/index.html">职位</a><a <?php echo ($cur_top_nav["company"]); ?> href="/Company/info.html">我的公司</a><a <?php echo ($cur_top_nav["resume"]); ?> href="/Company/interview.html">简历管理</a><a <?php echo ($cur_top_nav["post"]); ?> href="/Company/createPost.html">发布职位</a></div>
          		
          	<?php }else{ ?>
          	
          		<div class="nav"><a <?php echo ($cur_top_nav["job"]); ?> href="/Jobs/index.html">职位</a><a <?php echo ($cur_top_nav["company"]); ?> href="/Company/index.html">公司</a><a <?php echo ($cur_top_nav["video"]); ?> href="/Video/index.html">宣讲会</a><a <?php echo ($cur_top_nav["resume"]); ?> href="/Resume/myresume.html">我的简历</a><a <?php echo ($cur_top_nav["collections"]); ?> href="/User/collections.html">我的收藏</a></div>
          		
          		
          	<?php } ?>
          
          	<div class="login">
	          	<div class="icous">
                    <div class="inusnav">
                      <em></em>
                      <?php if(getUsersSession('type')==0){ ?>
                      <a href="/User/delivery.html">投递管理</a>
                      <?php } ?>
                      <a href="/User/index.html">账号设置</a>
                      <a href="<?php echo U('User/logout');?>">退出</a>
                    </div>
                </div>
	          </div>
          
          <?php else: ?>
          
	          <div class="nav"><a <?php echo ($cur_top_nav["job"]); ?> href="/Jobs/index.html">职位</a><a <?php echo ($cur_top_nav["company"]); ?> href="/Company/index.html">公司</a><a <?php echo ($cur_top_nav["video"]); ?> href="/Video/index.html">宣讲会</a><a <?php echo ($cur_top_nav["post"]); ?> href="/Company/createPost.html">发布职位</a></div>
	          <div class="login">
	          
	          <a class="sty"  href="<?php echo U('User/login');?>">登录</a><a class="sty" href="<?php echo U('User/register');?>">注册</a>
	          </div><?php endif; ?>
          
          </div>
          <div class="clr"></div>
        </div>
      
	</div>

</div><?php endif; ?>

<link rel="stylesheet" type="text/css"  href="/Public/Home/css/list.css" />


<!-- ======== 职位收藏开始 ========== -->
<div class="w960 mt30">
    <div class="lw240 scang">
        <a href="/User/collections" <?php echo ($lmenu[1]); ?>>我收藏的职位</a>
        <a href="/User/collections/type/2" <?php echo ($lmenu[2]); ?>>我收藏的公司</a>
        <a href="/User/collections/type/3" <?php echo ($lmenu[3]); ?>>我收藏的宣讲会</a>
    </div>

    <div class="rw680">

	<?php if($type==2){ ?>

		<!-- 公司列表开始-->
	     <div class="listbox" style="margin:0">
	     
	     	<?php if(!$list)echo '<div class="nocenter"><span><img src="/Public/Home/images/empty.png" />暂时还没有收藏的公司，快去收藏把！</span></div>'; ?>
	     	
	       <ul>

	       	<?php if(is_array($list)): $k = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($k % 2 );++$k;?><li <?php if($key%3== '0'): ?>class="clr"<?php endif; ?>>
	               <h5>
	                  <a class="comtl lf" href="/Company/info/id/<?php echo ($v["uid"]); ?>" target="_blank"><?php echo ($v["company_short_name"]); ?></a>
	                  <a class="rt" href="/Company/info/id/<?php echo ($v["uid"]); ?>" target="_blank">[<?php echo ($v["company_city"]); ?>]</a>
	                  <div class="clr"></div>
	               </h5>
	               <a  href="/Company/info/id/<?php echo ($v["uid"]); ?>" target="_blank" class="comlogo">
	                  <?php if($v["logo"] != ''): ?><img src="<?php echo ($v["logo"]); ?>" alt="<?php echo ($v["company_short_name"]); ?>" height="190" width="190">
	                  <?php else: ?>
	                      <img src="/Public/Home/images/logo_default.png" alt="<?php echo ($v["company_short_name"]); ?>" height="190" width="190"><?php endif; ?>
	                  <em></em>
	                  <h4><?php echo ($v["hangye"]); ?></h4>
	               </a>
	               <div class="zhiwei">
	                 <?php if(is_array($v["jobs_arr"])): $i = 0; $__LIST__ = $v["jobs_arr"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vv): $mod = ($i % 2 );++$i;?><a href="/Jobs/info/id/<?php echo ($vv["jid"]); ?>/source/company_list" target="_bank"><?php echo ($vv["zhiwei_mingcheng"]); ?></a><?php endforeach; endif; else: echo "" ;endif; ?>
	               </div>
                   <a href="javascript:void(0);" onclick="user_collection(<?php echo ($v["toid"]); ?>,0,2,1)" class="mybtn qxsc">取消收藏</a>
	          </li><?php endforeach; endif; else: echo "" ;endif; ?>


	       </ul>
	     </div>
	     <!-- 公司列表结束-->

	<?php }elseif($type==3){ ?>

		<!-- 宣讲会列表开始-->
	     <div class="xjlist bgf9" style="padding:10px 20px 30px 20px;">
         
         <?php if($list){ ?>
	      <table class="bgfff" width="100%" border="0" cellpadding="0" cellspacing="0">
	            <tr class="bgf9">
	              <td class="xjpl" width="160">日期</td>
	              <td width="70">时间</td>
                  <td width="90">参与企业</td>
	              <td>地点</td>
	              <td width="32">收藏</td>
	           </tr>

				<?php if(is_array($list)): $k = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($k % 2 );++$k;?><tr <?php if($k%2== '0'): ?>class="bgf9"<?php endif; ?>>
	              <td class="xjpl"><?php echo ($v["date_ymd"]); ?>(周<?php echo getWeekName($v['date_ymd']); ?>)</td>
	              <td><?php echo ($v["date_time"]); ?></td>
                   <td><a target="_blank" href="<?php if($v['com_id'])echo '/Company/info/id/'.$v['com_id'];else echo $v['com_url']; ?>"><?php echo ($v["company"]); ?></a></td>
	              <td>
	               <?php echo (getplacebyid($v["cid"])); ?>，<?php echo (getschoolbyid($v["sid"])); ?>，<br />
	               <?php echo ($v["address"]); ?>
	              </td>
	              <td><a class="mystar" href="javascript:void(0);" onclick="user_collection(<?php echo ($v["toid"]); ?>,0,3,1)" title="取消收藏"></a></td>
	           </tr><?php endforeach; endif; else: echo "" ;endif; ?>
	           
	           <?php }else{ ?>
                  <div class="nocenter"><span><img src="/Public/Home/images/empty.png" />暂时还没有收藏的宣讲会，快去收藏把！</span></div>
               <?php } ?>


	       </table>

	     </div>
	     <!-- 列表结束-->

	<?php }else{ ?>

		<!-- 职位列表开始-->
	     <div class="listjob bgf9" style="margin:0;">
	       <ul>

	       	<?php if(is_array($list)): $k = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($k % 2 );++$k;?><li <?php if($k%2== '0'): ?>class="bgfff"<?php endif; ?>>
	           <a href="/Company/info/id/<?php echo ($v["uid"]); ?>"><img src="<?php echo ($v["logo"]); ?>" /></a>
	           <div class="info">
	             <a href="/Jobs/info/id/<?php echo ($v["jid"]); ?>" class="til"><?php echo ($v["zhiwei_mingcheng"]); ?></a><font class="f16">[<?php echo ($v["gongzuo_chengshi"]); ?>]</font><br />
	             月薪：<?php echo ($v["yuexin_min"]); ?>-<?php echo ($v["yuexin_max"]); ?> k&nbsp;&nbsp;&nbsp;经验：<?php echo ($v["gongzuo_jingyan"]); ?>&nbsp;&nbsp;&nbsp;学历要求：<?php echo ($v["xueli"]); ?><br />
	             职位诱惑：<?php echo ($v["zhiwei_youhuo"]); ?>
	             <span><a class="til" href="/Company/info/id/<?php echo ($v["uid"]); ?>"><?php echo ($v["company_short_name"]); ?></a> - <?php echo ($v["hangye"]); ?></span>
	           </div>
	            <a href="javascript:void(0);" onclick="user_collection(<?php echo ($v["toid"]); ?>,0,1,1)" class="mybtn shenq">取消收藏</a>
	          </li><?php endforeach; endif; else: echo "" ;endif; ?>
	          
	          <?php if(!$list)echo '<div class="nocenter"><span><img src="/Public/Home/images/empty.png" />暂时还没有收藏的职位，快去收藏把！</span></div>'; ?>


	       </ul>
	     </div>
	     <!-- 职位列表结束-->


	<?php } ?>



    </div>

</div>


</div><!-- end #body-->

<?php if($show_nav == 1): ?><div class="clear"></div>

<?php if($show_foot!==0){ ?>

<div class="w960">

    <input type="hidden" id="resubmitToken" value="" />
    <a id="backtop" title="回到顶部" rel="nofollow"></a>


    <!--我要反馈按钮-->
    <div id="product-fk">
        <div id="feedback-icon">
        <div class="fb-icon"></div>
        <span>我要反馈</span>
        <em class="error dn fk-limit">今天已经反馈足够多了，给产品经理点时间消化下吧~<i></i></em>
        <em class="error dn fk-suc">&nbsp;&nbsp;反馈提交成功！</em>
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




<div class="clr"></div>
<div id="footer">
	<div class="w960">
         <div class="abnav lf">
           <a href="/News/about.html" target="_bank">关于我们</a><a  target="_bank" href="/News/help.html">帮助中心</a><a href="/?viewTools=mobile">移动版</a>
         </div>
         <div class="bdsharebuttonbox">
           <div class="ft_share">
                <span class="dn" id="share_jd2">分享到微信</span>
                <div class="jd_share_success2">
                <img src="http://seo.zgboke.com/qr/0_1_4_<?php echo 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>_cdn.png" />
                </div>
            </div>
            <a href="<?php echo C('SINA_URL');?>" class="bds_tsina" target="_bank" title="分享到新浪微博"></a>
            <a href="<?php echo C('FB_URL');?>" class="bds_fbook" target="_bank" title="分享到Facebook"></a>
         </div>
         <div class="rt"><?php echo C('COPYRIGHT');?> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <?php echo C("WEB_SITE_ICP"); ?></div>
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