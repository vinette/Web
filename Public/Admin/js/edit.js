$(function () {

	//头像上传 Uploadify 插件
	$('#face').uploadify({
		swf : PUBLIC + '/Uploadify/uploadify.swf',	//引入Uploadify核心Flash文件
		uploader : uploadUrl,	//PHP处理脚本地址
		width : 120,	//上传按钮宽度
		height : 30,	//上传按钮高度
		buttonImage : PUBLIC + '/Uploadify/browse-btn.png',	//上传按钮背景图地址
		fileTypeDesc : 'Image File',	//选择文件提示文字
		fileTypeExts : '*.jpeg; *.jpg; *.png; *.gif',	//允许选择的文件类型
		formData : {'session_id' : sid},
		//上传成功后的回调函数
		onUploadSuccess : function (file, data, response) {
			//alert(data);
			eval('var data = ' + data);
			if (data.status) {
				$('#face-img').attr('src', ROOT + '/Uploads/Face/' + data.path.max);
				$('input[name=face180]').val(data.path.max);
				$('input[name=face80]').val(data.path.medium);
				$('input[name=face50]').val(data.path.mini);
			} else {
				alert(data.msg);
			}
		}
	});
	
	
	
	/**
	 * 收藏
	 */
	$('.keep').click(function () {
		var wid = $(this).attr('wid');
		var keepUp = $(this).next();
		var msg = '';

		$.post(keepUrl, {wid : wid}, function (data) {
			if (data == 1) {
				msg = '收藏成功';
			}

			if (data == -1) {
				msg = '已收藏';
			}

			if (data == 0) {
				msg = '收藏失败';
			}

			keepUp.html(msg).fadeIn();
			setTimeout(function () {
				keepUp.fadeOut();
			}, 3000);

		}, 'json');
		
	});



});