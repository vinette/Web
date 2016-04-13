function handleFrames() {
	try {
		$.each(Array.prototype.slice.call(window.frames), function(a, b) {
			b.document.body.onclick = function() {
				b.top.document.body.click()
			}
		})
	} catch (a) {}
}
function initMceMr() {
	$("textarea.tinymce") && $("textarea.tinymce").tinymce({
		script_url: ctx + "Public/Home/js/tinymce/jscripts/tiny_mce/tiny_mce.js",
		theme: "advanced",
		language: "zh-cn",
		plugins: "paste,autolink,lists,style,layer,save,advhr,advimage,advlink,iespell,inlinepopups,preview,media,searchreplace,contextmenu,fullscreen,noneditable,visualchars,nonbreaking",
		theme_advanced_buttons1: "bullist,numlist",
		theme_advanced_toolbar_location: "top",
		theme_advanced_toolbar_align: "left",
		theme_advanced_statusbar_location: "none",
		theme_advanced_resizing: !1,
		paste_auto_cleanup_on_paste: !0,
		paste_as_text: !0,
		auto_cleanup_word: !0,
		paste_remove_styles: !0,
		contextmenu: "copy cut paste",
		force_br_newlines: !0,
		force_p_newlines: !1,
		apply_source_formatting: !1,
		remove_linebreaks: !1,
		convert_newlines_to_brs: !0,
		content_css: ctx + "Public/Home/js/tinymce/examples/css/content.css",
		template_external_list_url: "lists/template_list.js",
		external_link_list_url: "lists/link_list.js",
		template_replace_values: {
			username: "Some User",
			staffid: "991234"
		},
		onchange_callback: function(a) {
			tinyMCE.triggerSave();
			var b = tinyMCE.get(a.id).getContent();
			if (b.length > 0) try {
				$("#" + a.id).valid()
			} catch (c) {}
		}
	})
}
function initMceMr1() {
	$("textarea.tinymce1") && $("textarea.tinymce1").tinymce({
		script_url: ctx + "Public/Home/js/tinymce/jscripts/tiny_mce/tiny_mce.js",
		theme: "advanced",
		language: "zh-cn",
		plugins: "paste,autolink,lists,style,layer,save,advhr,advimage,advlink,iespell,inlinepopups,preview,media,searchreplace,contextmenu,fullscreen,noneditable,visualchars,nonbreaking",
		theme_advanced_buttons1: "bullist,numlist",
		theme_advanced_toolbar_location: "top",
		theme_advanced_toolbar_align: "left",
		theme_advanced_statusbar_location: "none",
		theme_advanced_resizing: !1,
		paste_auto_cleanup_on_paste: !0,
		paste_as_text: !0,
		auto_cleanup_word: !0,
		paste_remove_styles: !0,
		contextmenu: "copy cut paste",
		force_br_newlines: !0,
		force_p_newlines: !1,
		apply_source_formatting: !1,
		remove_linebreaks: !1,
		convert_newlines_to_brs: !0,
		content_css: ctx + "Public/Home/js/tinymce/examples/css/content.css",
		template_external_list_url: "lists/template_list.js",
		external_link_list_url: "lists/link_list.js",
		template_replace_values: {
			username: "Some User",
			staffid: "991234"
		},
		onchange_callback: function(a) {
			tinyMCE.triggerSave();
			var b = tinyMCE.get(a.id).getContent();
			if (b.length > 0) try {
				$("#" + a.id).valid()
			} catch (c) {}
		}
	})
}
function validateChange(a) {
	var b = $(a),
		c = b.parents("form").validate().element(b);
	c && b.parent().css("margin-bottom", "0")
}
function img_check(o, action_url, id) {
	var _obj = $(o),
		obj = $("#" + id),
		oNext = obj.next(),
		oPrev = obj.prev();
	this.AllowExt = ".jpg,.gif,.jpeg,.png,.pjpeg", this.FileExt = obj.val().substr(obj.val().lastIndexOf(".")).toLowerCase(), 0 != this.AllowExt && -1 == this.AllowExt.indexOf(this.FileExt) ? errorTips("请上传jpg、gif、png格式头像，大小不超过2M") : ($("#" + id + "_error").text("").hide(), $.ajaxFileUpload({
		url: action_url,
		secureuri: !1,
		fileElementId: id,
		data: {
			companyLogo: obj.val(),
			workId: oMoudle.workId
		},
		dataType: "text",
		success: function(rs) {
			var data, imgSrc;
			oMoudle.workId = "", data = eval("(" + rs + ")"), data.success ? (imgSrc = ctx + "/" + data.content, oPrev.removeClass("active").addClass("up"), oNext.css({
				width: 120,
				height: 120
			}).attr("src", imgSrc), $("#selfDescription").find(".mr_headimg").attr("src", imgSrc)) : errorTips("上传失败，请重新上传", "上传头像")
		},
		error: function() {
			errorTips("上传失败，请重新上传", "上传头像")
		}
	}))
}
function file_check(obj, action_url, id) {
	var userId;
	return 2 == uploadFlag ? !1 : (uploadFlag = 2, $("#loadingImg").css("visibility", "visible"), obj = $("#" + id), userId = $("#userid").val(), this.AllowExt = ".doc,.docx,.pdf", this.FileExt = obj.val().substr(obj.val().lastIndexOf(".")).toLowerCase(), "" == obj.val() ? ($("#loadingImg").css("visibility", "hidden"), !1) : (0 != this.AllowExt && -1 == this.AllowExt.indexOf(this.FileExt) ? (errorTips("只支持word、pdf格式文件，请重新上传"), $("#resumeUpload").val(""), $("#loadingImg").css("visibility", "hidden"), uploadFlag = 1) : $.ajaxFileUpload({
		type: "POST",
		url: action_url,
		secureuri: !1,
		fileElementId: id,
		data: {
			userId: userId
		},
		dataType: "text",
		success: function(jsonStr) {
			var json, isShowDefault;
			uploadFlag = 1, json = eval("(" + jsonStr + ")"), $("#loadingImg").css("visibility", "hidden"), json.success ? ($.ajax({
				url: ctx + "Resume/setDefaultResume",
				type: "POST",
				data: {
					type: "0"
				}
			}).done(function(a) {
				a = $.parseJSON( a );
				//console.log(a.msg);
				//a.success ? $("#default_resume").val("默认投递：附件简历") : alert(a.msg)
			}), $(".mr_uploaded .mr_up_main a").text(json.content.nearbyName).attr("title", "下载" + json.content.nearbyName), $(".mr_uploaded .mr_up_main p").text(json.content.time), isShowDefault = $("#isShowDefault"), "0" == isShowDefault.val() ? $(".mr_uploaded .mr_set_default").hide() : $(".mr_uploaded .mr_set_default").show(), $(".mr_uploaded").show(), $.colorbox({
				inline: !0,
				href: $("div#uploadFileSuccess"),
				title: "上传附件简历"
			})) : -1 == json.code ? $.colorbox({
				inline: !0,
				href: $("div#fileResumeUpload"),
				title: "附件简历上传失败"
			}) : -2 == json.code ? $.colorbox({
				inline: !0,
				href: $("div#fileResumeUploadSize"),
				title: "附件简历上传失败"
			}) : (uploadFlag = 1, errorTips("简历上传失败，请重新上传"), $("#loadingImg").css("visibility", "hidden"))
		},
		error: function() {
			errorTips("简历上传失败，请重新上传"), $("#loadingImg").css("visibility", "hidden"), uploadFlag = 1, $(".btn_s").click(function() {
				window.location.reload()
			}), $("#colorbox").on("click", "#cboxClose", function() {
				"uploadFile" == $(this).siblings("#cboxLoadedContent").children("div").attr("id") && window.location.reload()
			})
		}
	}), void 0))
}
function getStrLen(a) {
	var c, d, b = 0;
	for (c = 0; c < a.length; c++) d = a.charCodeAt(c), b += isDbcCase(d) ? 1 : 2;
	return b
}
function isDbcCase(a) {
	return a >= 32 && 127 >= a ? !0 : a >= 65377 && 65439 >= a ? !0 : !1
}
function popQR() {
	$.ajax({
		url: ctx + "Public/qr/qrcode.jpg",
		type: "GET"
	}).done(function(a) {
		a.success && $(".dropdown_menu img").attr("src", a.content)
	})
}
function updateRatioRM(a, b) {//alert(a);alert(b);
	var d, c = 250 * (a / 100);
	d = 250 * (b / 100), $(".mr_solid").animate({
		width: c
	}), $(".mr_dashed").animate({
		width: d
	}), $(".mr_top .mr_bfb").text(a + "%")
}
function updateResumeTime(a) {
	$(".upResumeTime").text(a)
}
function initTitlePosition() {
	var a = parseInt($("#customBlock .cust_title").width()) / 2;
	$("#customBlock .cust_title").css("margin-left", -parseInt(.65 * a))
}
function switchResumeStatus(a, b, c) {
	$.colorbox.close(), $.ajax({
		url: ctx + "/mycenter/openMyResume.json",
		type: "POST",
		async: !1,
		data: {
			openStatus: a
		},
		dataType: "json"
	}).done(function(a) {
		var d, e, f;
		if (clearTimeout(f), d = $(".openresume_tip"), 1 == a.state) d.hide(), e = $(".succ-fail"), 1 == a.content.data.openStatus ? (c.eq(0).attr("checked", "checked"), $(b).removeClass("toggle-off"), e.find("p").text("已开启PLUS"), e.show()) : (c.eq(1).attr("checked", "checked"), $(b).addClass("toggle-off"), e.find("p").text("已关闭PLUS"), e.show()), f = setTimeout(function() {
			e.stop().hide(), openFlag = !0
		}, 3e3);
		else {
			if (405 == a.state) return $(".open_resume_notice").show(), !1;
			alert(a.message)
		}
	})
}
var amountScore, oMoudle, oMoudleScore, oDelMoudle, oMdScore, uploadFlag, openFlag, toggleHandler, projectTitle = $(".mr_jobe_list .l2 .projectTitle");
projectTitle.each(function() {
	var a = $(this),
		b = a.width();
	a.find("span").css("left", b + 5)
}), amountScore = parseInt($.trim($(".mr_bfb").text())), oMoudle = {
	workId: "",
	eduId: ""
}, oMoudleScore = {
	expectJobsScore: "",
	projectExpScore: "",
	workShowScore: "",
	skillScore: "",
	myRemarkScore: ""
}, oMdScore = {
	expectJobsScore: globals.expectJobsScore,
	skillScore: globals.skillScore,
	projectExpScore: globals.projectExperienceScore,
	workShowScore: globals.workShowScore,
	myRemarkScore: globals.myRemarkScore
}, $(function() {
	function g() {
		var a = $(".mr_job_des .mr_expjob_content"),
			b = /&nbsp/g,
			c = $.trim(a.text()).replace(b, "");
		"" != c && $(".mr_job_des").removeClass("dn")
	}
	function h() {
		$.validator.addMethod("uptextInMce", function(a) {
			var f, c = tinyMCE.get("upjobContent").getContent().replace(/<.*?>/g, ""),
				d = getStrLen(c),
				e = 0;
			for (f = 0; d > f; f++) a.charCodeAt(f) < 27 || a.charCodeAt(f) > 126 ? e += 2 : e++;
			return 1600 >= e || 0 == e ? !0 : !1
		}, "请输入1600字以内的工作内容"), $.validator.classRuleSettings.uptextInMce = {
			uptextInMce: !0
		}
	}
	function j(a, b) {
		var c = "";
		$.ajax({
			type: "POST",
			async: !1,
			url: ctx + "Company/searchCompanyLs",
			data: {
				kd: a
			},
			dataType: "json"
		}).done(function(a) {
			c = a
		}), $(b).autocomplete({
			source: c
		})
	}
	function l(a, b) {
		var c = "";
		$.ajax({
			type: "POST",
			async: !1,
			url: ctx + "Jobs/listLs",
			data: {
				pl: a
			},
			dataType: "json"
		}).done(function(a) {
			a.success && (c = a.content.result)
		}), $(b).autocomplete({
			source: c
		})
	}
	function m() {
		var a = $(".mr_sns a");
		a.eq(a.length - 1).addClass(), a.each(function() {
			var f, b = $(this).data("sns"),
				c = $(this),
				d = c.find("span");
			switch (d.find("em"), parseInt(b)) {
			case 1:
				f = document.createTextNode("Twitter"), c.addClass("sns1");
				break;
			case 2:
				f = document.createTextNode("Dribbble"), c.addClass("sns2");
				break;
			case 3:
				f = document.createTextNode("Behance"), c.addClass("sns3");
				break;
			case 4:
				f = document.createTextNode("LinkedIn"), c.addClass("sns4");
				break;
			case 5:
				f = document.createTextNode("Quora"), c.addClass("sns5");
				break;
			case 6:
				f = document.createTextNode("Github"), c.addClass("sns6");
				break;
			case 7:
				f = document.createTextNode("知乎"), c.addClass("sns7");
				break;
			case 8:
				f = document.createTextNode("LOFTER"), c.addClass("sns8");
				break;
			case 9:
				f = document.createTextNode("UI中国"), c.addClass("sns9");
				break;
			case 10:
				f = document.createTextNode("新浪微博"), c.addClass("sns10");
				break;
			case 11:
				f = document.createTextNode("SegmentFault"), c.addClass("sns11");
				break;
			case 12:
				f = document.createTextNode("StackoverFlow"), c.addClass("sns12")
			}
			d.prepend($(f)).css("marginLeft", -(d.width() + 20) / 2 + "px")
		})
	}
	function o(a) {
		var c, d, b = 0;
		for (c = 0; c < a.length; c++) d = a.charCodeAt(c), d >= 1 && 126 >= d || d >= 65376 && 65439 >= d ? b++ : b += 2;
		return b
	}
	function q(a, b, c) {
		var g, d = $("#workExperience .list_show .mr_jobe_list"),
			e = $("#educationalBackground .list_show .mr_jobe_list"),
			f = $(".toggle");
		a ? 0 == d.length || 0 == e.length ? (g = "2", s(f, c, g)) : r(c) : 0 == e.length ? (g = "2", s(f, c, g)) : ($(".openresume_tip").hide(), r(c))
	}
	function r(a) {
		globals.isOpenResume = a ? "3" : "0"
	}
	function s(a, b, c) {
		switch ($(".openresume_tip").hide(), a.addClass("toggle-off"), $(".openresume_tip").hide(), globals.isOpenResume = c, c) {
		case "2":
			$(".unopen").show();
			break;
		case "3":
			$(".firstset").show()
		}
		globals.isFirstOpen = b;
		var d = a.find("input");
		d.eq(0).attr("checked", "checked")
	}
	function t(a) {
		return a.stopPropagation(), !1
	}
	function x(a, b, c, d) {
		var e, f, g;
		if (y(), oDelMoudle.parent().parent().removeClass("md_flag").addClass("dn"), $("#" + b).addClass("dn"), "customBlock" != b) {
			switch (b) {
			case "expectJob":
				globals.hasExpectJobs = !1;
				break;
			case "skillsAssess":
				globals.hasSkillEvaluates = !1;
				break;
			case "selfDescription":
				globals.hasSelf = !1;
				break;
			case "worksShow":
				globals.hasWorkShows = !1
			}
			0 == c ? (e = parseInt($.trim($(".mr_bfb").text())), f = amountScore - e, g = parseInt(d.content.infoCompleteStatus.score), $(".mr_top .mr_bfb").text(g + "%"), amountScore = f + g, sb(b, 1)) : sb(b, 1)
		} else $("#customTitleName").val("");
		$(".hide_md").each(function() {
			var c = $(this).data("md");
			c == b && $(this).addClass("").removeClass("mr_hide")
		}), 9 == $(".md_flag").length ? $(".mr_module_add").addClass("dn") : $(".mr_module_add").removeClass("dn"), a.parents(".mr_md_del").remove()
	}
	function y() {
		switch (d) {
		case "olinfoForm":
			$(".mr_p_info").show(), $("#olinfoForm .mr_info_edit").addClass("dn");
			break;
		case "addJobForm":
			$("#addJobForm .mr_cancel").trigger("click");
			break;
		case "upJobForm":
			$("#upJobForm .mr_cancel").trigger("click");
			break;
		case "addEduForm":
			$("#addEduForm .mr_cancel").trigger("click");
			break;
		case "upEduForm":
			$("#upEduForm .mr_cancel").trigger("click");
			break;
		case "addProForm":
			$("#addProForm .mr_cancel").trigger("click");
			break;
		case "upProForm":
			$("#upProForm .mr_cancel").trigger("click");
			break;
		case "addWorksShowUploadForm":
			$("#addWorksShowUploadForm .mr_cancel").trigger("click");
			break;
		case "upWorksShowUploadForm":
			$("#upWorksShowUploadForm .mr_cancel").trigger("click");
			break;
		case "upSelfForm":
			$("#upSelfForm .mr_cancel").trigger("click");
			break;
		case "upExpJobForm":
			$("#upExpJobForm .mr_cancel").trigger("click");
			break;
		case "upCustomForm":
			$("#upCustomForm .mr_cancel").trigger("click");
			break;
		case "updateSkill":
			$("#skillsAssess .mr_moudle_content .mr_cancel").trigger("click");
			break;
		default:
			return
		}
		mb(), d = "", f = !1
	}
	function z(a, b) {
		1 == b && y();
		var c = $("#" + a).offset();
		switch (a) {
		case "expectJob":
			1 == b && $("#expectJob .mr_head_r").trigger("click");
			break;
		case "workExperience":
			1 == b && $("#workExperience .mr_head_r").trigger("click");
			break;
		case "projectExperience":
			1 == b && $("#projectExperience .mr_head_r").trigger("click");
			break;
		case "educationalBackground":
			1 == b && $("#educationalBackground .mr_head_r").trigger("click");
		case "selfDescription":
			1 == b && $("#selfDescription .mr_head_r").trigger("click");
			break;
		case "worksShow":
			1 == b && $("#worksShow .mr_head_r").trigger("click");
			break;
		case "customBlock":
			1 == b && $("#customBlock .mr_head_r").trigger("click");
			break;
		case "skillsAssess":
			1 == b && $("#skillsAssess .mr_head_r").trigger("click");
			break;
		case "baseinfo":
			1 == b && $("#baseinfo .mr_head_r").trigger("click");
			break;
		default:
			return
		}
		$("body,html").animate({
			scrollTop: c.top
		}, 400, function() {
			$("#" + a).animate({
				borderColor: "#e46a4a"
			}, 300, function() {
				$(this).animate({
					borderColor: "transparent"
				})
			})
		})
	}
	function A(a, b) {
		if (!a) {
			$(".openresume_tip").hide(), $(".unopen").show(), $(".toggle").addClass("toggle-off"), globals.isOpenResume = "2", globals.isFirstOpen = b;
			var c = $(".toggle").find("input");
			c.eq(0).attr("checked", "checked")
		}
	}
	function K(a) {
		a.find("table.mceToolbarRow1 td:nth-child(2)").addClass("ulolBorder"), a.find("table.mceToolbarRow1 td:nth-child(3)").addClass("ulolBorder")
	}
	function L() {
		B.rules.jobContent = {
			required: !1,
			tinymceLength: [0, 800]
		}, B.messages.jobContent = {
			tinymceLength: "请输入1600字以内的工作内容"
		}, $("#addJobForm").submit(function() {
			tinyMCE.triggerSave(!0)
		}).validate({
			rules: B.rules,
			messages: B.messages,
			errorPlacement: function(a, b) {
				"hidden" == b.attr("type") ? ($(b).parent().css("margin-bottom", "20px"), a.appendTo($(b).parent())) : "jobContent" == b.attr("id") ? $(b).parent().after(a) : a.insertAfter($(b).parent())
			},
			submitHandler: function(a) {
				var b = globals.resumeId,
					c = $("img.logo_u", a).attr("src"),
					d = $('input[name="companyName"]', a).val(),
					e = $('input[name="positionName"]', a).val(),
					f = $('input[name="startTime"]', a).val(),
					g = $('input[name="endTime"]', a).val(),
					h = $("#jobContent", a).val(),
					i = globals.token,
					j = !1;
				"" != $.trim(c) && (j = !0), $(a).find(":submit").val("保存中...").attr("disabled", !0), $.ajax({
					url: ctx + "Resume/workExperience",
					type: "post",
					data: {
						id: b,
						companyLogo: c,
						companyName: d,
						positionName: e,
						startDate: f,
						endDate: g,
						workContent: h,
						resubmitToken: i,
						isUploadLogo: j
					},
					dataType: "json"
				}).done(function(b) {
					var c, d, e, f, g, h, i, j, k;
					if(b.success){
						$("#show_no_resume").hide();
					}
					globals.token = b.resubmitToken, b.success ? (c = b.content.isOpenMyResume, d = $(".toggle"), e = b.content.firstOpen, globals.isFirstOpen = e, c && ($(".openresume_tip").hide(), globals.isFirstOpen ? (globals.isOpenResume = "3", $(".firstset").show()) : globals.isOpenResume = d.hasClass("toggle-off") ? "0" : "1"), W(b), M(), $("img.logo_u", a).css({
						width: 0,
						height: 0
					}), $("div.up", a).removeClass("up"), updateResumeTime(b.content.refreshTime), f = b.content.infoCompleteStatus.score, g = parseInt($.trim($(".mr_bfb").text())), h = amountScore - g + f, updateRatioRM(f, h), B.obj.find(".mr_head_r").trigger("click"), i = b.content.workExperiences, O(i), j = B.obj.find(".mr_empty_add"), j.not(":hidden") && j.hide(), k = $(".mr_module .flag_work"), k.is(":hidden") || k.addClass("dn")) : alert(b.msg), $(a).find(":submit").val("保 存").attr("disabled", !1), G.reset(), H.reset()
				})
			}
		})
	}
	function M() {
		var a = $("#addJobForm");
		$("#companyLogo", a).val(""), $("img.logo_u", a).attr("src", ""), $("#companyName", a).val(""), $("#positionName", a).val(""), $("#startTime", a).val(""), $(".mr_btn", a).val(""), $("#endTime", a).val(""), $("#jobContent", a).val("")
	}
	function N() {
		B.rules.jobContent = {
			tinymceLength: [0, 800]
		}, B.messages.jobContent = {
			tinymceLength: "请输入1600字以内的工作内容"
		}, $("#upJobForm").submit(function() {
			tinyMCE.triggerSave(!0)
		}).validate({
			rules: B.rules,
			messages: B.messages,
			errorPlacement: function(a, b) {
				"hidden" == b.attr("type") ? ($(b).parent().css("margin-bottom", "20px"), a.appendTo($(b).parent())) : "upjobContent" == b.attr("id") ? $(b).parent().after(a) : a.insertAfter($(b).parent())
			},
			submitHandler: function(a) {
				var b = globals.token,
					c = globals.resumeId,
					d = $("#mr_expid").val(),
					e = $("img.logo_u", a).attr("src"),
					f = $('input[name="companyName"]', a).val(),
					g = $('input[name="positionName"]', a).val(),
					h = $('input[name="startTime"]', a).val(),
					i = $('input[name="endTime"]', a).val(),
					j = tinyMCE.get("upjobContent").getContent(),
					k = $("input[name='companyLogoHide']", a).val(),
					l = !1;
				k != e && (l = !0), $(a).find(":submit").val("保存中...").attr("disabled", !0), $.ajax({
					url: ctx + "Resume/workExperience",
					type: "post",
					data: {
						id: c,
						companyLogo: e,
						companyName: f,
						positionName: g,
						startDate: h,
						endDate: i,
						workContent: j,
						resubmitToken: b,
						expid: d,
						isUploadLogo: l
					},
					dataType: "json"
				}).done(function(b) {
					var c, d, e, f;4
					if(b.success){
						$("#show_no_resume").hide();
					}
					globals.token = b.resubmitToken, b.success ? (W(b), updateResumeTime(b.content.refreshTime), c = b.content.infoCompleteStatus.score, d = parseInt($.trim($(".mr_bfb").text())), e = amountScore - d + c, updateRatioRM(c, e), $(".mr_cancel", a).trigger("click"), f = b.content.workExperiences, O(f)) : alert(b.msg), $(a).find(":submit").val("保 存").attr("disabled", !1)
				})
			}
		})
	}
	function O(a) {
		var c, b = "";
		for (c = 0; c < a.length; c++) b += '<div class="mr_jobe_list">', b += '	<div class="clearfixs">', b += '		<div class="mr_content_l">', a[c].companyLogo && (b += '			<div class="l1">', b += '				<img src="' + ctx + "/" + a[c].companyLogo + '" alt="公司logo"/>', b += "			</div>"), b += '			<div class="l2">', b += "				<h4>" + a[c].companyName + "</h4>", b += "				<span>" + a[c].positionName + "</span>", b += "			</div>", b += "		</div>", b += '<div class="mr_content_r">', b += '<div class="mr_edit mr_c_r_t" data-expid="' + a[c].id + '" data-logo="' + a[c].companyLogo + '" data-comname="' + a[c].companyName + '" data-posname="' + a[c].positionName + '" data-startime="' + a[c].startDate + '" data-endtime="' + a[c].endDate + '" data-content="' + a[c].workContent + '">', b += "<i></i><em>编辑</em>", b += "</div>", b += "<span>" + a[c].startDate + "</span><span> — </span><span>" + a[c].endDate + "</span>", b += "</div>", b += "</div>", b += '<div class="mr_content_m">' + (a[c].workContent || "") + "</div>", b += "</div>";
		B.obj.find(".list_show").html(b)
	}
	function Q() {
		P.obj.find(".ul_edubg").on("click", "li", function(a) {
			var b, c;
			a.stopPropagation(), b = $(this).parent().parent(), b.prev().val($(this).text()), b.prev().prev().val($(this).text()), b.hide(), $(".select_color").removeClass("select_color"), c = $(this).parents("form").validate().element(b.prev().prev()), c && (b.next().hide(), $(this).parents(".mr_timed_div").css("margin-bottom", "0"))
		})
	}
	function R() {
		P.obj.find(".ul_eduy").on("click", "li", function(a) {
			var b, c;
			a.stopPropagation(), b = $(this).parent().parent(), b.prev().val($(this).text()), b.prev().prev().val($(this).text()), b.hide(), $(".select_color").removeClass("select_color"), c = $(this).parents("form").validate().element(b.prev().prev()), c && (b.next().hide(), $(this).parents(".mr_timed_div").css("margin-bottom", "0"))
		})
	}
	function S(a) {
		var b = a;
		$('input[name="schoolName"]', b).val(""), $('input[name="positionName"]', b).val(""), $('input[name="degree_val"]', b).val(""), $('input[name="degree_text"]', b).val(""), $('input[name="graduate"]', b).val(""), $('input[name="graduate_text"]', b).val("")
	}
	function T() {
		$("#addEduForm").validate({
			rules: P.rules,
			messages: P.messages,
			errorPlacement: function(a, b) {
				P.errorPlacement(a, b)
			},
			submitHandler: function(a) {
				var b = globals.resumeId,
					c = $('input[name="schoolName"]', a).val(),
					d = $('input[name="positionName"]', a).val(),
					e = $('input[name="degree_val"]', a).val(),
					f = $('input[name="graduate"]', a).val(),
					g = globals.token;
				$(a).find(":submit").val("保存中...").attr("disabled", !0), $.ajax({
					url: ctx + "Resume/educationExperience",
					type: "post",
					data: {
						id: b,
						schoolName: c,
						professional: d,
						education: e,
						endYear: f,
						resubmitToken: g
					},
					dataType: "json"
				}).done(function(b) {
					var c, d, e, f, g, h, i, j, k;
					if(b.success){
						$("#show_no_edu").hide();
					}
					b.success ? (c = b.content.isOpenMyResume, d = $(".toggle"), e = b.content.firstOpen, globals.isFirstOpen = e, c && ($(".openresume_tip").hide(), globals.isFirstOpen ? (globals.isOpenResume = "3", $(".firstset").show()) : globals.isOpenResume = d.hasClass("toggle-off") ? "0" : "1"), W(b), globals.token = b.resubmitToken, S(a), updateResumeTime(b.content.refreshTime), f = b.content.infoCompleteStatus.score, g = parseInt($.trim($(".mr_bfb").text())), h = amountScore - g + f, updateRatioRM(f, h), P.obj.find(".mr_head_r").trigger("click"), i = b.content.educationExperiences, V(i), j = P.obj.find(".mr_empty_add"), j.not(":hidden") && j.hide(), k = $(".mr_module .flag_edu"), k.is(":hidden") || k.addClass("dn")) : alert(b.msg), $(a).find(":submit").val("保 存").attr("disabled", !1)
				})
			}
		})
	}
	function U() {
		$("#upEduForm").validate({
			rules: P.rules,
			messages: P.messages,
			errorPlacement: function(a, b) {
				P.errorPlacement(a, b)
			},
			submitHandler: function(a) {
				var b = globals.resumeId,
					c = $('input[name="schoolName"]', a).val(),
					d = $('input[name="positionName"]', a).val(),
					e = $('input[name="degree_val"]', a).val(),
					f = $('input[name="graduate"]', a).val(),
					g = globals.token;
				$(a).find(":submit").val("保存中...").attr("disabled", !0), $.ajax({
					url: ctx + "Resume/educationExperience",
					type: "POST",
					data: {
						id: b,
						schoolName: c,
						professional: d,
						education: e,
						endYear: f,
						resubmitToken: g,
						eduid: oMoudle.eduId
					},
					dataType: "json"
				}).done(function(b) {
					var c, d, e, f;
					if(b.success){
						$("#show_no_edu").hide();
					}
					b.success ? (W(b), globals.token = b.resubmitToken, S(a), updateResumeTime(b.content.refreshTime), c = b.content.infoCompleteStatus.score, d = parseInt($.trim($(".mr_bfb").text())), e = amountScore - d + c, updateRatioRM(c, e), $(".mr_cancel", a).trigger("click"), f = b.content.educationExperiences, V(f)) : alert(b.msg)
				})
			}
		})
	}
	function V(a) {
		var c, b = "";
		for (c = 0; c < a.length; c++) b += '<div class="clearfixs mb46 mr_jobe_list">', b += '<div class="mr_content_l">', "" != a[c].schoolBadge && (b += '<div class="l1">', b += '<img src="' + ctx + "/" + a[c].schoolBadge + '" />', b += "</div>"), b += '<div class="l2">', b += "<h4>" + a[c].schoolName + "</h4>", b += "<span>" + a[c].education + " · " + a[c].professional + "</span>", b += "</div>", b += "</div>", b += '<div class="mr_content_r">', b += '<div class="mr_edit mr_c_r_t" data-eduid = "' + a[c].id + '" data-schoolname = "' + a[c].schoolName + '" data-edu = "' + a[c].education + '" data-pro = "' + a[c].professional + '" data-date = "' + a[c].endDate + '">', b += "<i></i><em>编辑</em>", b += "</div>", b += 1 == a[c].whetherGraduate ? "<span>" + a[c].endDate + "年毕业</span>" : "<span>" + a[c].endDate + "年毕业( 预计 )</span>", b += "</div>", b += "</div>";
		P.obj.find(".list_show").html(b)
	}
	function W(a) {
		var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
		switch ($.trim($(".base_info .j").text()), c = $(".ul_shenfen"), d = a.content.resume, e = a.content.latestWorkExperience, f = a.content.latestEducationExperience, g = d.userIdentity, h = d.workYear, i = e ? e.positionName + " · " + e.companyName : "·", j = f ? f.professional + " · " + f.schoolName : "·", k = $.trim(j), l = $.trim(i), m = $("span.shenfen"), 0 == m.length && (m = $("<span></span>").addClass("shenfen"), $(".info_t").prepend(m)), n = $("<i></i>"), g) {
		case 0:
			"应届毕业生" == $.trim(h) ? (o = "·" != k ? $("<em data-id='0' title='" + j + "'>" + j + "</em>") : $("<em data-id='0' title='" + i + "'>" + i + "</em>"), m.removeClass("dn").empty(), m.append(n).append(o)) : (o = "·" != l ? $("<em data-id='0' title='" + i + "'>" + i + "</em>") : $("<em data-id='0' title='" + j + "'>" + j + "</em>"), m.removeClass("dn").empty(), m.append(n).append(o)), "·" == $.trim(m.text()) && m.addClass("dn");
			break;
		case 1:
			o = "·" != k ? $("<em data-id='1' title='" + j + "'>" + j + "</em>") : $("<em data-id='2' title='" + i + "'>" + i + "</em>"), m.removeClass("dn").empty(), m.append(n).append(o), "·" == $.trim(m.text()) && m.addClass("dn");
			break;
		case 2:
			o = "·" != l ? $("<em data-id='2' title='" + i + "'>" + i + "</em>") : $("<em data-id='1' title='" + j + "'>" + j + "</em>"), m.removeClass("dn").empty(), m.append(n).append(o), "·" == $.trim(m.text()) && m.addClass("dn")
		}
		p = c.find("li[data-id='2']"), q = c.find("li[data-id='1']"), "·" != l ? p.length > 0 ? p.text(i) : (r = $("<li></li>").attr({
			"data-id": "2",
			title: i
		}).text(i), c.append(r)) : p.remove(), "·" != k ? q.length > 0 ? q.text(j) : (s = $("<li></li>").attr({
			"data-id": "1",
			title: j
		}).text(j), c.append(s)) : q.remove()
	}
	function cb() {
		$("#addProForm").validate({
			rules: {
				projectName: {
					required: !0,
					maxlenStr: 50
				},
				thePost: {
					required: !0,
					maxlenStr: 30
				},
				startTime: {
					required: !0
				},
				endTime: {
					required: !0
				},
				proDescript: {
					required: !1,
					tinymceLength: [5, 800]
				},
				pro_link: {
					maxlenStr: 60,
					checkUrl: !0
				}
			},
			messages: {
				projectName: {
					required: "必填",
					maxlenStr: "请输入100字符以内的项目名称"
				},
				thePost: {
					required: "必填",
					maxlenStr: "哇，你的职责这么厉害，你的公司知道吗？60个字符以内哦"
				},
				startTime: {
					required: "必填"
				},
				endTime: {
					required: "必填"
				},
				proDescript: {
					tinymceLength: "请输入10-1600字符的项目描述"
				},
				pro_link: {
					maxlenStr: "链接太长，目前只支持120字符以内哦",
					checkUrl: "请输入有效的项目链接"
				}
			},
			errorPlacement: function(a, b) {
				"hidden" == b.attr("type") ? ($(b).parent().css("margin-bottom", "25px"), a.appendTo($(b).parent())) : a.insertAfter($(b).parent())
			},
			submitHandler: function(a) {
				var b = $('input[name="projectName"]', a).val(),
					c = $('input[name="thePost"]', a).val(),
					e = $('input[name="startTime"]', a).val(),
					g = $('input[name="endTime"]', a).val(),
					h = $('textarea[name="proDescript"]', a).val(),
					i = $('input[name="pro_link"]', a).val();
				$(a).find(":submit").val("保存中...").attr("disabled", !0), myresumeCommon.utils.addHttpPrefix("http://|https://", i, function(a) {
					i = "" == i ? "" : a
				}), $.ajax({
					url: ctx + "/" + myresumeCommon.requestTargets.projectExpSave,
					type: "POST",
					data: {
						id: globals.resumeId,
						projectid: "",
						projectName: $.trim(b),
						positionName: $.trim(c),
						startDate: $.trim(e),
						endDate: $.trim(g),
						projectRemark: $.trim(h),
						dutyRemark: "",
						projectUrl: $.trim(i)
					},
					dataType: "json"
				}).done(function(b) {
					var c, e, g, h, i, j, k;
					b.success ? (d = "", f = !0, mb(), $("#addProForm").addClass("dn"), c = b && b.content && b.content.projectExperiences || [], e = eb(c), Y.obj.find(".list_show").html(e), g = $(".mr_jobe_list .l2 .projectTitle"), g.each(function() {
						var a = $(this),
							b = a.width();
						a.find("span").css("left", b + 5)
					}), Y.AddCancel(), h = Y.obj.find(".mr_empty_add"), c.length ? h.hide() : h.show(), updateResumeTime(b.content.refreshTime), "" != oMoudleScore.projectExpScore && (amountScore -= oMoudleScore.projectExpScore), oMoudleScore.projectExpScore = "", i = b.content.infoCompleteStatus.score, j = parseInt($.trim($(".mr_bfb").text())), k = amountScore - j + i, updateRatioRM(i, k), Y.checkState()) : alert(b.msg), $(a).find(":submit").val("保 存").attr("disabled", !1), Z.reset(), _.reset()
				})
			}
		})
	}
	function db(a) {
		$("#upProForm").validate({
			rules: {
				projectName: {
					required: !0,
					maxlenStr: 50
				},
				thePost: {
					required: !0,
					maxlenStr: 30
				},
				startTime: {
					required: !0
				},
				endTime: {
					required: !0
				},
				upproContent: {
					required: !1,
					tinymceLength: [5, 800]
				},
				pro_link: {
					maxlenStr: 60,
					checkUrl: !0
				}
			},
			messages: {
				projectName: {
					required: "必填",
					maxlenStr: "请输入100字符以内的项目名称"
				},
				thePost: {
					required: "必填",
					maxlenStr: "哇，你的职责这么厉害，你的公司知道吗？60个字符以内哦"
				},
				startTime: {
					required: "必填"
				},
				endTime: {
					required: "必填"
				},
				upproContent: {
					tinymceLength: "请输入10-1600字符的项目描述"
				},
				pro_link: {
					maxlenStr: "链接太长，目前只支持120字符以内哦",
					checkUrl: "请输入有效的项目链接"
				}
			},
			errorPlacement: function(a, b) {
				"hidden" == b.attr("type") ? ($(b).parent().css("margin-bottom", "25px"), a.appendTo($(b).parent())) : a.insertAfter($(b).parent())
			},
			submitHandler: function(b) {
				var c = $('input[name="projectName"]', b).val(),
					e = $('input[name="thePost"]', b).val(),
					g = $('input[name="startTime"]', b).val(),
					h = $('input[name="endTime"]', b).val(),
					i = $('textarea[name="upproContent"]', b).val(),
					j = $('input[name="pro_link"]', b).val();
				$(b).find(":submit").val("保存中...").attr("disabled", !0), myresumeCommon.utils.addHttpPrefix("http://|https://", j, function(a) {
					j = "" == j ? "" : a
				}), $.ajax({
					url: ctx + "/" + myresumeCommon.requestTargets.projectExpSave,
					type: "POST",
					data: {
						id: globals.resumeId,
						projectid: a,
						projectName: $.trim(c),
						positionName: $.trim(e),
						startDate: $.trim(g),
						endDate: $.trim(h),
						projectRemark: $.trim(i),
						dutyRemark: "",
						projectUrl: $.trim(j)
					},
					dataType: "json"
				}).done(function(a) {
					var b, c, e, g, h, i, j;
					a.success ? (d = "", f = !0, mb(), $("#upProForm").remove(), b = a && a.content && a.content.projectExperiences || [], c = eb(b), Y.obj.find(".list_show").html(c), e = $(".mr_jobe_list .l2 .projectTitle"), e.each(function() {
						var a = $(this),
							b = a.width();
						a.find("span").css("left", b + 5)
					}), Y.UpCancel(), g = Y.obj.find(".mr_empty_add"), b.length ? g.hide() : g.show(), updateResumeTime(a.content.refreshTime), "" != oMoudleScore.projectExpScore && (amountScore -= oMoudleScore.projectExpScore), oMoudleScore.projectExpScore = "", h = a.content.infoCompleteStatus.score, i = parseInt($.trim($(".mr_bfb").text())), j = amountScore - i + h, updateRatioRM(h, j), Y.checkState()) : alert(a.msg)
				})
			}
		})
	}
	function eb(a) {
		var c, b = "";
		for (c = 0; c < a.length; c++) b += '<div class="mr_jobe_list" data-id="' + a[c].id + '" >', b += '<div class="clearfixs">', b += '<div class="mr_content_l">', b += '<div class="l2">', b += a[c].projectUrl ? '<a class="projectTitle" href="' + a[c].projectUrl + '" target="_blank"><span></span>' + a[c].projectName + "</a>" : '<a class="projectTitle nourl">' + a[c].projectName + "</a>", b += "<p>" + a[c].positionName + "</p>", b += "</div>", b += "</div>", b += '<div class="mr_content_r">', b += '<div class="mr_edit mr_c_r_t">', b += "<i></i><em>编辑</em>", b += "</div>", b += "<span>" + a[c].startDate + " - " + a[c].endDate + "</span>", b += "</div>", b += "</div>", b += '<div class="mr_content_m">' + a[c].projectRemark + "</div>", b += "</div>";
		return b
	}
	function kb() {
		var a = $(".mr_empty_add");
		a.not("hidden").addClass("addgrey"), a.bind("click", lb), $(".mr_head_r").each(function() {
			$(this).css("cursor", "default");
			var b = $(this).children("em").text();
			"添加" == b ? $(this).addClass("mr_add_grey") : "编辑" == b && $(this).addClass("mr_up_grey")
		}), $(".mr_c_r_t").each(function() {
			$(this).css("cursor", "default");
			var b = $(this).children("em").text();
			"添加" == b ? $(this).addClass("mr_add_grey") : "编辑" == b && $(this).addClass("mr_up_grey")
		})
	}
	function lb() {
		return !1
	}
	function mb() {
		var a = $(".mr_empty_add");
		a.not("hidden").removeClass("addgrey"), a.unbind("click", lb), $(".mr_head_r").each(function() {
			$(this).css("cursor", "pointer");
			var b = $(this).children("em");
			$(this).hasClass("mr_add_grey") ? (b.text("添加"), $(this).removeClass("mr_add_grey")) : $(this).hasClass("mr_up_grey") && (b.text("编辑"), $(this).removeClass("mr_up_grey"))
		}), $(".mr_c_r_t").each(function() {
			$(this).css("cursor", "pointer");
			var b = $(this).children("em");
			$(this).hasClass("mr_add_grey") ? (b.text("添加"), $(this).removeClass("mr_add_grey")) : $(this).hasClass("mr_up_grey") && (b.text("编辑"), $(this).removeClass("mr_up_grey"))
		}), f = !0, d = ""
	}
	function sb(a, b) {
		var c = parseInt($.trim($(".mr_bfb").text())),
			d = 0;
		switch (a) {
		case "expectJob":
			d = parseInt(oMdScore.expectJobsScore), oMoudleScore.expectJobsScore = d;
			break;
		case "projectExperience":
			d = parseInt(oMdScore.projectExpScore), oMoudleScore.projectExpScore = d;
			break;
		case "worksShow":
			d = parseInt(oMdScore.workShowScore), oMoudleScore.workShowScore = d;
			break;
		case "skillsAssess":
			d = parseInt(oMdScore.skillScore), oMoudleScore.skillScore = d;
			break;
		case "selfDescription":
			d = parseInt(oMdScore.myRemarkScore), oMoudleScore.myRemarkScore = d;
			break;
		default:
			return
		}
		0 == b ? amountScore += d : amountScore -= d, amountScore >= 100 && (amountScore = 100), c > amountScore && (amountScore = c), updateRatioRM(c, amountScore)
	}
	var a, b, c, d, e, f, i, k, n, p, u, v, w, B, C, D, E, G, H, I, J, P, Y, Z, _, ab, bb, fb, gb, hb, ib, jb, nb, ob, pb, qb;
	popQR(), a = $("#customTitleName"), "" == a.val() ? $("#customBlock .cust_title span").text("自定义标题") : $("#customBlock .cust_title span").text(a.val()), 9 == $(".md_flag").length ? $(".mr_module_add").addClass("dn") : $(".mr_module_add").removeClass("dn"), initTitlePosition(), initMceMr(), b = globals.initRatio, updateRatioRM(b, b), c = $(".mr_myresume_r .scroll_fix").offset(), $(window).scroll(function() {
		var a = $(window).scrollTop();
		c && c.top <= a ? $(".mr_myresume_r .scroll_fix").addClass("mr_myresume_r_fix") : $(".mr_myresume_r .scroll_fix").removeClass("mr_myresume_r_fix")
	}), 0 == $(".m_hide").hasClass("dn").length && $(".mr_module_add").hide(), d = "", e = "", f = !0, window.onbeforeunload = function() {
		return f ? void 0 : "内容还未保存，确认离开该页面吗？ "
	}, g(), i = function() {
		var a = $.trim($(this).val());
		"" != a && j(a, ".companyName")
	}, $(".mr_created").delegate(".companyName", "keyup", function() {
		myresumeCommon.utils.throttle(i, [], this, 300)
	}), k = function() {
		var a = $.trim($(this).val());
		"" != a && l(a, ".autoPosition")
	}, $(".mr_created").delegate(".autoPosition", "keyup", function() {
		myresumeCommon.utils.throttle(k, [], this, 300)
	}), $(".mr_name_edit .ed_name,.mr_intro_edit .ed_name").bind("click", function(a) {
		a.stopPropagation(), $(".select_color").removeClass("select_color"), $(this).addClass("select_color")
	}), $(".mr_r_nav ul li:first").bind("click", function(a) {
		a.stopPropagation();
		var b = $(this).find("em");
		b.is(":hidden") || b.addClass("dn")
	}), $(".mr_sns") && $(".mr_sns a").length > 0 && m(), $(".mr_sns").delegate("a", "hover", function() {
		$(this).find("span").toggle()
	}), $(".mr_headfile").hover(function() {
		$(".shadow").show()
	}, function() {
		$(".shadow").hide()
	}), $(".mr_p_name,.mr_p_info,.mr_p_introduce").hover(function() {
		$(this).addClass("mr_active").find(".mr_edit").removeClass("dn")
	}, function() {
		$(this).removeClass("mr_active").find(".mr_edit").addClass("dn")
	}), $(".mr_p_name .mr_edit").bind("click", function() {
		$(".mr_p_name").hide(), $("#mr_name").val($(".mr_p_name .mr_name").text()), $(".mr_name_edit").removeClass("dn"), $("#nameForm").find("input#mr_name")[0].focus(), f = !1
	}), n = $("input#mr_name"), n.on("keyup", function() {
		var a = $.trim(n.val()).length;
		0 == a && $(this).attr("placeholder", "姓名")
	}), $(".mr_name_edit .cancel").bind("click", function() {
		$(".mr_p_name").show(), $(".mr_name_edit").addClass("dn"), f = !0
	}), $(".mr_p_introduce .mr_edit").bind("click", function() {
		$(".mr_p_introduce").hide(), "0" == $(this).attr("data-type") && $("#mr_intro").val($(".mr_p_introduce .mr_intro").text()), $(".mr_intro_edit").removeClass("dn"), $("#mr_intro").focus(), $("#introduceForm .mroneError").hide(), f = !1
	}), $(".mr_intro_edit .cancel").bind("click", function() {
		$(".mr_p_introduce").show(), $(".mr_intro_edit").addClass("dn"), f = !0
	}), $(".j").hover(function() {
		var a = $(".birth_span"),
			b = $.trim(a.text()),
			c = $(".j");
		"" != b && "年出生" != b ? (a.removeClass("dn"), c.css("cursor", "pointer")) : c.css("cursor", "default")
	}, function() {
		setTimeout(function() {
			var a = $(".birth_span");
			a.addClass("dn")
		}, 90)
	}), jQuery.validator.addMethod("truename", function(a, b) {
		var c = /^([a-zA-Z ]+|[一-龥]+)$/;
		return this.optional(b) || c.test(a)
	}, "请输入有效的公司简称"), jQuery.validator.addMethod("truename2", function(a, b) {
		var c = /([·`~!@#$^&':;,?~！……&；：。，、？=])/;
		return this.optional(b) || !c.test(a)
	}, "请输入有效的名字"), $("#nameForm").validate({
		rules: {
			mr_name: {
				required: !0,
				truename2: !0,
				rangeLenStr: [1, 15]
			}
		},
		messages: {
			mr_name: {
				required: "必填",
				truename2: "格式错误",
				rangeLenStr: "请输入真实姓名"

			}
		},
		errorPlacement: function(a, b) {
			a.appendTo($(b).parent()), $(".c_section span.error").css("margin", "5px 0 10px 138px")
		},
		submitHandler: function(a) {
			var b = globals.token,
				c = $('input[name="mr_name"]', a).val(),
				d = globals.resumeId;
			c = $.trim(c), $(a).find(":submit").val("保存中...").attr("disabled", !0), $.ajax({
				url: ctx + "/resume/updateUserName.json",
				type: "POST",
				data: {
					name: c,
					id: d,
					resubmitToken: b
				},
				dataType: "json"
			}).done(function(b) {
				var d, e, g;
				b.success ? (f = !0, globals.token = b.resubmitToken, $("#nowrap").html(c + "&nbsp;"), d = b.content.resume, e = d.name, $(".mr_name_edit").addClass("dn"), $(".mr_name").html(e).parent().show(), g = b.content.url, $("#body").append("<iframe id='ifr' style='display:none;' src='" + g + "'></iframe>")) : alert(b.msg), $(a).find(":submit").val("保 存").attr("disabled", !1)
			})
		}
	}), $("#introduceForm").on("keyup", 'input[name="mr_intro"]', function() {
		var a = $(this),
			b = $.trim(a.val()),
			c = o(b);
		0 == c ? (f = !0, a.siblings("span.mroneError").text("必填").show()) : 4 > c ? (f = !0, a.siblings("span.mroneError").text("太短了").show()) : c >= 4 && 58 >= c ? a.siblings("span.mroneError").hide() : c > 58 && a.siblings("span.mroneError").text("请输入4-58个字的介绍").show()
	}), $("#introduceForm .save").click(function() {
		var d, e, g, h, a = $(this),
			b = $.trim($("#introduceForm #mr_intro").val()),
			c = o(b);
		0 == c ? (f = !0, a.siblings("span.mroneError").text("必填").show()) : 4 > c ? (f = !0, a.siblings("span.mroneError").text("太短了").show()) : c >= 4 && 58 >= c ? (d = $("#introduceForm"), e = globals.resumeId, g = $('input[name="mr_intro"]', d).val(), $(d).find(":submit").val("保存中...").attr("disabled", !0), h = globals.token, $.ajax({
			url: ctx + "/resume/oneWord.json",
			type: "POST",
			data: {
				oneWord: g,
				resubmitToken: h,
				id: e
			},
			dataType: "json"
		}).done(function(a) {
			var b, c, e, h;
			a.success ? (globals.token = a.resubmitToken, $(".mr_intro_edit").addClass("dn"), b = $(".mr_intro"), b.hasClass("mr_intro_grey") && b.removeClass("mr_intro_grey").addClass("mr_intro_normal"), b.text(g).attr("title", g).parent().show(), c = a.content.infoCompleteStatus.score, e = parseInt($.trim($(".mr_bfb").text())), h = amountScore - e + c, updateRatioRM(c, h)) : alert(a.msg), $(d).find(":submit").val("保 存").attr("disabled", !1), f = !0
		})) : c > 58 && a.siblings("span.mroneError").text("请输入4-58个字的介绍").show()
	}), $(".mr_created,.mr_uncreate").delegate(".normal_s", "click", function(a) {
		var b, c;
		a.stopPropagation(), b = $(this).find(".xl_list"), c = b.is(":hidden"), $(".xl_list").hide(), $(".select_color").removeClass("select_color"), c ? ($(this).addClass("select_color"), b.show()) : b.hide(), C && C.hide(), E && E.hide(), D && D.hide()
	}), $(".mr_created,.mr_uncreate").delegate(".email_s,.mobile_s", "focus", function(a) {
		var b, c;
		a.stopPropagation(), b = $(this).find(".xl_list"), c = b.is(":hidden"), $(".xl_list").hide(), $(".select_color").removeClass("select_color"), c ? ($(this).addClass("select_color"), b.show()) : b.hide(), C && C.hide(), E && E.hide(), D && D.hide()
	}), $(".mr_self_state .mr_self_s").bind("click", function(a) {
		a.stopPropagation(), $(".form_wrap").removeClass("select_color");
		var b = $(this).find(".xl_list");
		b.is(":hidden") && $(this).addClass("select_color"), b.toggle()
	}), $(".mr_self_state .mr_self_s").hover(function() {
		$(this).hasClass("active") && $(this).removeClass("active")
	}, function() {
		var a = $(this).find(".xl_list");
		a.is(":hidden") && $(this).addClass("active")
	}), $("#mr_mobile,#mr_email").click(function(a) {
		a.stopPropagation(), $(".select_color").removeClass("select_color"), $(this).parent().addClass("select_color"), E.hide()
	}), $(".xl_list").bind("click", function(a) {
		a.stopPropagation()
	}), $(".mr_my_qr").hover(function() {
		$(this).find("img").attr("src", globals.qrImgSrc), $(this).addClass("open")
	}, function() {
		$(this).removeClass("open")
	}), $(document).click(function() {
		var a, b, c;
		$(".xl_list").hide(), $(".select_color").removeClass("select_color"), a = $(".mr_down_tip"), a.is(":hidden") || a.addClass("dn"), C && C.hide(), E && E.hide(), D && D.hide(), Z && Z.hide(), _ && _.hide(), ab && ab.hide(), bb && bb.hide(), G && G.hide(), H && H.hide(), I && I.hide(), J && J.hide(), Z && Z.hide(), _ && _.hide(), b = $(".mr_self_state .mr_self_s"), b.hasClass("active") || b.addClass("active"), c = $(".set_default_wrap"), c.hasClass("active") && c.trigger("click")
	}), $(".ul_xl").delegate("li", "click", function() {
		$("#xl").val($(this).text()), $(this).parent().parent().hide(), $(".select_color").removeClass("select_color")
	}), $(".ul_gznx").delegate("li", "click", function() {
		var b, c, a = $(this).text();
		$("#gznx").val(a), "应届毕业生" == $.trim(a) ? (b = $(".ul_shenfen li[data-id = '1']"), 0 != b.length && ($("#shenfen").val(b.text()), globals.personIdFlag = "1")) : (c = $(".ul_shenfen li[data-id = '2']"), 0 != c.length && ($("#shenfen").val(c.text()), globals.personIdFlag = "2")), $(this).parent().parent().hide(), $(".select_color").removeClass("select_color")
	}), $(".ul_year").delegate("li", "click", function() {
		$("#mr_year").val($(this).text()), $(this).parent().parent().hide(), $(".select_color").removeClass("select_color")
	}), $(".ul_shenfen").delegate("li", "click", function() {
		$("#shenfen").val($(this).text()), globals.personIdFlag = $(this).attr("data-id"), $(this).parent().parent().hide(), $(".select_color").removeClass("select_color")
	}), $(".ul_self_state").delegate("li", "click", function() {
		var a = globals.token,
			b = $(this).text(),
			c = $(this);
		$.ajax({
			url: ctx + "Resume/updateWorkStatus",
			type: "post",
			data: {
				status: b,
				resumeId: globals.resumeId,
				resubmitToken: a
			},
			dataType: "json"
		}).done(function(a) {
			a.success ? (globals.resubmitToken = a.resubmitToken, updateResumeTime(a.content.refreshTime), $("#self_state").val(b), c.parent().parent().hide(), $(".select_color").removeClass("select_color")) : alert(a.msg)
		})
	}), $(".mr_year_se .mr_man").bind("click", function() {
		$(this).addClass("active").find("i").addClass("active"),$("#myysex").val('1'), $(".mr_year_se .mr_women").removeClass("active").find("i").removeClass("active")
	}), $(".mr_year_se .mr_women").bind("click", function() {
		$(this).addClass("active").find("i").addClass("active"),$("#myysex").val('1'), $(".mr_year_se .mr_man").removeClass("active").find("i").removeClass("active")
	}), $(".sns_area").delegate('input[id^="sns"]', "click", function(a) {
		a.stopPropagation(), $(".select_color").removeClass("select_color"), $(this).parent().addClass("select_color")
	}), $(".sns_area").delegate(".sns_del", "click", function() {
		var b, a = $(this).parent().find("i").attr("class");
		return a = "." + a, $(this).parent().remove(), $(".mr_add_m ul .active").removeClass("active"), $(".mr_add_m " + a).show(), b = $(".sns_area .mr_sns_m"), 0 == b.length && ($(".mr_add_sns").hide(), $(".sns_empty").show()), !1
	}), $(".mr_add_m li").hover(function() {
		$(this).find("span").show()
	}, function() {
		$(this).find("span").hide()
	}), $(".mr_locks").hover(function() {
		$(this).find("em").show()
	}, function() {
		$(this).find("em").hide()
	}), $(".mr_add_m ul").delegate("li", "click", function(a) {
		a.stopPropagation(), $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active")
	}), $(".mr_add_op .sns_save").bind("click", function(a) {
		a.stopPropagation();
		var b = "";
		return $(".mr_add_m ul .active").each(function() {
			var c = $(this).data("flag"),
				d = "sns" + c;
			b += '<div class="form_wrap mr_sns_m">', b += '	<i class="' + d + '"></i>', b += '	<em class=""></em>', b += '	<a href="javascript:;" class="sns_del"></a>', b += '	<input type="text" id="' + d + '" name="' + d + '" data-sns="' + c + '" class="mr_button" />', b += "</div>"
		}), $(".mr_add_m ul .active").removeClass("active"), $(".sns_area").append(b), $(".mr_add_m").slideUp("dn"), !1
	}), $(".mr_add_m").click(function(a) {
		a.stopPropagation()
	}), $(".mr_add_op .sns_cancel").bind("click", function(a) {
		return a.stopPropagation(), $(".mr_add_m li").removeClass("active"), $(".mr_add_m").slideUp("dn"), !1
	}), $(".sns_add").bind("click", function() {
		12 != $(".sns_area .mr_sns_m").length && ($(".mr_add_m li").show(), $(".sns_area i").each(function() {
			var b = $(this).attr("class");
			b = "." + b, $(".mr_add_m " + b).hide()
		}), $(".mr_add_m").slideToggle(300))
	}), $(".sns_add_empty").bind("click", function() {
		12 != $(".sns_area .mr_sns_m").length && ($(".mr_add_m li").show(), $(".sns_area i").each(function() {
			var b = $(this).attr("class");
			b = "." + b, $(".mr_add_m " + b).hide()
		}), $(".mr_add_m").slideToggle(300))
	}), $(".sns_area").delegate("input[id^='sns']", "keyup", function() {
		$.trim($(this).val()) && $(this).parent().find("em").removeClass("mr_no").removeClass("mr_ok").addClass("mr_ok")
	}), p = {
		required: !0,
		checkUrlNot: !0,
		maxlength: 100
	}, $("#olinfoForm").validate({
		rules: {
			mr_mobile: {
				required: !0,
				isMobile: !0,
				maxlength: 11
			},
			mr_email: {
				required: !0,
				email: !0,
				maxlength: 100
			},
			myysex: {
	    	   		required: true
	    	},
			byxy: {
				required: !0,
				rangeLenStr: [2, 20]
			},
			szcs: {
				required: !0,
				rangeLenStr: [2, 20]
			},
			zhuanye: {
				required: !0,
				rangeLenStr: [2, 20]
			},
			xl: {
	    	   		required: true
	    	},
			gznx: {
	    	   		required: true
	    	},
			mr_name: {
				required: !0,
				truename2: !0,
				rangeLenStr: [1, 15]
			},
			sns1: p,
			sns2: p,
			sns3: p,
			sns4: p,
			sns5: p,
			sns6: p,
			sns7: p,
			sns8: p,
			sns9: p,
			sns10: p,
			sns11: p,
			sns12: p
		},
		messages: {
			mr_mobile: {
				required: "必填",
				isMobile: "请输入11位中国大陆号码",
				maxlength: "目前仅支持11位有效中国大陆号码"
			},
			mr_name: {
				required: "必填",
				truename2: "格式错误",
				rangeLenStr: "请输入真实姓名"
			},
			mr_email: {
				required: "必填",
				email: "请输入正确的邮箱",
				maxlength: "输入100个字符以内的邮箱地址"
			},
			myysex: {
				required: "必填",
			},
			byxy: {
				required: "必填",
				rangeLenStr: "请输入2-20个字",
			}
			,
			szcs: {
				required: "必填",
				rangeLenStr: "请输入2-20个字",
			},
			xl: {
	    	   		required:"必填"
	       },
			gznx: {
	    	   		required:"必填"
	    	   },
			zhuanye: {
				required: "必填",
				rangeLenStr: "请输入2-20个字",
			}
		},
		errorPlacement: function(a, b) {
			$(b).data("sns") ? $(b).parent().find("em").addClass("mr_no") : (a.insertAfter($(b).parent()), $(".c_section span.error").css("margin", "5px 0 10px 138px"))
		},
		submitHandler: function(a) {//b = $('input[name="shenfen"]', a).val(),
			var c = $('input[name="mr_year"]', a).val(),
				e = $('input[name="xl"]', a).val(),
				g = $('input[name="gznx"]', a).val(),
				h = $('input[name="szcs"]', a).val(),
				i = $('input[name="mr_mobile"]', a).val(),
				j = $('input[name="mr_email"]', a).val(),
				k = $(".sns_area input"),
				l = $(".mr_year_se span.active em").text(),
				rn = $('input[name="mr_name"]', a).val(),
				byxy = $('input[name="byxy"]', a).val(),
				zhuanye = $('input[name="zhuanye"]', a).val(),
				english_name =$('input[name="english_name"]', a).val(),
				height =$('input[name="height"]', a).val(),
				weight =$('input[name="weight"]', a).val(),
				tel =$('input[name="tel"]', a).val(),
				wx_name =$('input[name="wx_name"]', a).val(),
				qq_name =$('input[name="qq_name"]', a).val(),
				sina_name =$('input[name="sina_name"]', a).val(),
				n = {},
				o = [],
				p = "",
				r = globals.token;
			k.each(function() {
				var d, e, b = $(this).val(),
					c = $(this).data("sns");
				n[c] = b, d = {}, d["accountId"] = c, d["accountUrl"] = b, o.push(d), e = "sns" + c, b = 0 == $.trim(b).indexOf("http://") || 0 == $.trim(b).indexOf("https://") ? b : "http://" + b, p += "<a href='" + b + "' target='_blank' data-sns='" + c + "' data-site='" + b + "' class='" + e + "'><span><em></em></span></a>"
			}), o = JSON.stringify(o), $(a).find(":submit").val("保存中...").attr("disabled", !0), $.ajax({
				url: ctx_new + "Resume/basicPost",
				type: "post",
				data: {
					zhuanye:zhuanye,
					byxy:byxy,
					highestEducation: e,
					workYear: g,
					phone: i,
					email: j,
					liveCity: h,
					birthYear: c,
					workYear: g,
					sex: l,
					type: 1,
					resubmitToken: r,
					socialAccountJson: o,
					mr_name:rn,
					english_name:english_name,
					height:height,
					weight:weight,
					wx_name:wx_name,
					sina_name:sina_name,
					qq_name:qq_name,
					tel:tel,
					userIdentity: globals.personIdFlag
				},
				dataType: "json"
			}).done(function(n) {
				var o, r, s, t, u, w, x, y, z, A, B;
				//globals.token = n.resubmitToken, 
				//console.log(n);
				n.success ? (mb(), d = "", f = !0, updateResumeTime(n.content.refreshTime), o = n.content.infoCompleteStatus.score, r = parseInt($.trim($(".mr_bfb").text())), s = amountScore - r + o, updateRatioRM(o, s), $("#olinfoForm .mr_info_edit").addClass("dn"), $(".mr_infoed .shenfen em").text(b).attr("title", b), t = g, u = t, "应届毕业生" != $.trim(g) ? ($(".mr_infoed .base_info .job_span").text(g += "工作经验"), t += "工作经验") : $(".mr_infoed .base_info .job_span").text(g), $(".mr_infoed .base_info .s").text(c+"年出生 · "+l+" · "), $(".mr_infoed .base_info .x").text(e+" · "+g), $(".info_b .dizhi em").text(h), $(".mr_infoed .mobile em").text(i).attr("title", i), $(".mr_infoed .email em").text(j).attr("title", j),$("#mr_name").val(rn),$("#txt_realname").text(rn), k.length > 0 ? $(".mr_infoed .mr_sns").removeClass("dn") : $(".mr_infoed .mr_sns").addClass("dn"), $(".mr_infoed .mr_sns").html(p), w = $(".mr_module .flag_work"), x = $("#workExperience"), y = n.content.isOpenMyResume, z = n.content.firstOpen, "应届毕业生" == g ? (x.find(".mr_title_c").text("实习经历"), x.find(".mr_empty_add span").text("添加实习经历"), $(".mr_module li[data-md = 'workExperience'] .mr_m_name").text("实习经历"), w.is(":hidden") || w.addClass("dn"), q(!1, y, z)) : (x.find(".mr_title_c").text("工作经历"), x.find(".mr_empty_add span").text("添加工作经历"), $(".mr_module li[data-md = 'workExperience'] .mr_m_name").text("工作经历"), 0 == $("#workExperience .mr_jobe_list").length && (w = $(".mr_module .flag_work"), w.is(":hidden") && w.removeClass("dn")), q(!0, y, z)), $(".birth_span").text(c + "年出生").append($("<em></em>")), A = $(".mr_infoed .mr_edit_on"), A.attr("data-sf", $.trim(b.split("·")[0])), A.attr("data-shenfen", b), A.attr("data-sex", l), A.attr("data-xl", e), A.attr("data-gzjy", u), A.attr("data-city", h), A.attr("data-mobile", i), A.attr("data-email", j), A.attr("data-birthday", c), $(".mr_p_info").show(), B = $(".mr_ope .mr_cancel"), B.attr("data-sf", $.trim(b.split("·")[0])), B.attr("data-shenfen", b), B.attr("data-sex", l), B.attr("data-xl", e), B.attr("data-gzjy", u), B.attr("data-city", h),B.attr("data-english_name",english_name),B.attr("data-height",height), B.attr("data-weight",weight), B.attr("data-mobile", i), B.attr("data-email", j),B.attr("data-realname", rn), B.attr("data-birthday", c), m()) : alert(n.msg), $(a).find(":submit").val("保 存").attr("disabled", !1)
			})
		}
	}), $("#infoForm").validate({
		rules: {
			mr_mobile: {
				required: !0,
				isMobile: !0,
				maxlength: 11
			},
			mr_email: {
				required: !0,
				email: !0,
				maxlength: 100
			},
			byxy: {
				required: !0,
				rangeLenStr: [2, 20]
			},
		},
		messages: {
			mr_mobile: {
				required: "必填",
				isMobile: "目前仅支持11位有效中国大陆号码",
				maxlength: "目前仅支持11位有效中国大陆号码"
			},
			mr_email: {
				required: "必填",
				email: "请输入正确的邮箱",
				maxlength: "请输入正确的邮箱"
			},
			 byxy: {
				required: "必填",
				rangeLenStr: "请输入2-20个字",
			}
		},
		errorPlacement: function(a, b) {
			$(b).parent().after(a), $(".c_section span.error").css("margin", "5px 0 10px 138px")
		},
		submitHandler: function(a) {
			var b = $('input[name="xl"]', a).val(),
				c = $('input[name="gznx"]', a).val(),
				e = $('input[name="mr_mobile"]', a).val(),
				g = $('input[name="mr_email"]', a).val(),
				h = $('input[name="szcs"]', a).val(),
				i = globals.token;
			$(a).find(":submit").val("保存中...").attr("disabled", !0), $.ajax({
				url: ctx + "/resume/basic.json",
				type: "POST",
				data: {
					highestEducation: b,
					workYear: c,
					phone: e,
					email: g,
					liveCity: h,
					type: 1,
					resubmitToken: i
				},
				dataType: "json"
			}).done(function(i) {
				var j, k;
				globals.token = i.resubmitToken, i.success ? (mb(), d = "", f = !0, $(".mr_p_info .xl em").text(b), j = c, "应届毕业生" != $.trim(c) ? $(".mr_p_info .gzjy em").text(c += "工作经验") : $(".mr_p_info .gzjy em").text(c), $(".mr_p_info .city em").text(h), $(".mr_p_info .mobile em").text(e), $(".mr_p_info .email em").text(g).attr("title", g), $("#infoForm .mr_info_edit").addClass("dn"), k = $(".mr_p_info .mr_edit_unon"), k.attr("data-xl", b), k.attr("data-gzjy", j), k.attr("data-city", h), k.attr("data-mobile", e), k.attr("data-email", g), $(".mr_p_info").show()) : alert(i.msg), $(a).find(":submit").val("保 存").attr("disabled", !1)
			})
		}
	}), $("#infoForm .mr_info_edit .mr_cancel").bind("click", function() {
		$(".mr_info_edit").addClass("dn"), $(".mr_p_info").show(), f = !0
	}), $("#olinfoForm .mr_info_edit .mr_cancel").bind("click", function() {
		var a, b, c;
		$(".mr_info_edit").addClass("dn"), a = $("#olinfoForm"), a.find("span.error").hide(), a.find("input.error").removeClass("error"), $("#mr_year").val($(this).attr("data-birthday")), b = $(this).attr("data-sex"), $(".mr_year_se span,.mr_year_se i").removeClass("active"), "男" == b || "" == b ? ($(".mr_year_se .mr_man").addClass("active"), $(".mr_year_se .mr_man i").addClass("active")) : ($(".mr_year_se .mr_women").addClass("active"), $(".mr_year_se .mr_women i").addClass("active")), c = $(".info_t .shenfen em"), globals.personIdFlag = c.attr("data-id"), $("#shenfen").val(c.text()), $("#xl").val($(this).attr("data-xl")), $("#gznx").val($(this).attr("data-gzjy")), $("#mr_mobile").val($(this).attr("data-mobile")), $("#mr_email").val($(this).attr("data-email")), $("#szcs").val($(this).attr("data-city")), $(".mr_p_info").show(), f = !0, d = "", mb()
	}), $(".mr_p_info .mr_edit_unon").bind("click", function() {
		$(".mr_p_info").hide(), $("#xl").val($(this).attr("data-xl")), $("#gznx").val($(this).attr("data-gzjy")), $("#mr_mobile").val($(this).attr("data-mobile")), $("#mr_email").val($(this).attr("data-email")), $("#szcs").val($(this).attr("data-city")), $("#infoForm .mr_info_edit").removeClass("dn"), $("#infoForm").find(":submit").val("保存").attr("disabled", !1), f = !1
	}), $(".mr_p_info .mr_edit_on").bind("click", function() {
		var a, b, c, e, g, h;
		"" == d && ($("#olinfoForm").find(":submit").val("保存").attr("disabled", !1), kb(), d = "olinfoForm", f = !1, $(".mr_p_info").hide(), a = $(this).attr("data-sex"), $(".mr_year_se span,.mr_year_se i").removeClass("active"), "男" == a ? ($(".mr_year_se .mr_man").addClass("active"), $(".mr_year_se .mr_man i").addClass("active")) : "女" == a && ($(".mr_year_se .mr_women").addClass("active"), $(".mr_year_se .mr_women i").addClass("active")), b = $(".info_t .shenfen em"), globals.personIdFlag = b.attr("data-id"), b.parent().hasClass("dn") ? $("#shenfen").val("") : "·" == $.trim(b.text()) ? $("#shenfen").val("") : $("#shenfen").val(b.text()).attr("title", b.text()), "" == $.trim($(".ul_shenfen").text()) ? $(".mr_showidentity_div").bind("click", t) : $(".mr_showidentity_div").unbind("click", t), $("#xl").val($(this).attr("data-xl")), $("#gznx").val($(this).attr("data-gzjy")), c = $("#gznx").val(), "应届毕业生" == $.trim(c) ? (e = $(".ul_shenfen li[data-id = '1']"), 0 != e.length && (globals.personIdFlag = "1")) : (g = $(".ul_shenfen li[data-id = '2']"), 0 != g.length && (globals.personIdFlag = "2")), $("#mr_mobile").val($(this).attr("data-mobile")), $("#mr_email").val($(this).attr("data-email")), $("#szcs").val($(this).attr("data-city")), $(".mr_sns a").length > 0 && ($(".mr_add_sns").show(), $(".sns_empty").hide(), h = "", $(".mr_sns a").each(function() {
			var b = $(this).data("sns"),
				c = $(this).data("site"),
				d = "sns" + b;
			h += '<div class="form_wrap mr_sns_m">', h += '	<i class="' + d + '"></i>', h += '	<em class="mr_ok"></em>', h += '	<a href="javascript:;" class="sns_del"></a>', h += '	<input type="text" id="' + d + '" name="' + d + '" data-sns="' + b + '" class="mr_button" value="' + c + '"/>', h += "</div>"
		}), $(".mr_info_edit .sns_area").html(h)), 0 == $(".sns_area .mr_sns_m").length && ($(".mr_add_sns").hide(), $(".sns_empty").show()), $("#olinfoForm .mr_info_edit").removeClass("dn"))
	}), u = function() {
		var e, f, g, a = $("#uploadImages"),
			b = a.find("#cropzoom_container"),
			c = a.find("#crop"),
			d = a.find("#restore");
		return c.bind("click", function() {
			e.send(ctx + "Resume/cutHead", "POST", {
				resubmitToken: globals.token
			}, function(a) {
				var b, c, d;
				a = $.parseJSON( a );
				//console.log(a);
				e.showImage.attr("src", ctx + "/" + a.content.uploadPath + "?cc=" + Math.random()), $.colorbox.close(), e.showImage = null, null != a.resubmitToken && "" != a.resubmitToken && (globals.token = a.resubmitToken), updateResumeTime(a.content.refreshTime), b = a.content.infoCompleteStatus.score, c = parseInt($.trim($(".mr_bfb").text())), d = amountScore - c + b, updateRatioRM(b, d), $(".shadow").hide(), $(".mr_headfile").hover(function() {
					$(".shadow").show()
				}, function() {
					$(".shadow").hide()
				}), e.restore()
			})
		}), d.bind("click", function() {
			e.restore(), $(".shadow").hide(), $(".mr_headfile").hover(function() {
				$(".shadow").show()
			}, function() {
				$(".shadow").hide()
			}), $.colorbox.close()
		}), f = function(c) {
			var f = $(".mr_headimg"),
				g = ctx +  c.uploadPath;
			$.colorbox({
				inline: !0,
				href: a,
				title: "选择裁剪区域"
			}), myresumeCommon.config.cutImage.image.source = g, myresumeCommon.config.cutImage.image.width = c.srcImageW, myresumeCommon.config.cutImage.image.height = c.srcImageH, myresumeCommon.config.cutImage.selector.w = myresumeCommon.config.userPhotoSelector.width, myresumeCommon.config.cutImage.selector.h = myresumeCommon.config.userPhotoSelector.height, e = b.cropzoom(myresumeCommon.config.cutImage), e.showImage = null, e.showImage = f
		}, g = function() {}, {
			upSucc: f,
			upFail: g
		}
	}(), window.uploadPhoto = u, $("#colorbox").on("click", "#cboxClose", function() {
		"uploadImages" == $(this).siblings("#cboxLoadedContent").children("div").attr("id") && ($(".shadow").hide(), $(".mr_headfile").hover(function() {
			$(".shadow").show()
		}, function() {
			$(".shadow").hide()
		}))
	}), v = function() {
		var e, a = $("#uploadLogos"),
			b = a.find("#cropzoom_container"),
			c = a.find("#crop"),
			d = a.find("#restore"),
			f = function(c, d) {
				var f = $("#" + d).next(".logo_u"),
					g = ctx + "/" + c.uploadPath;
				$.colorbox({
					inline: !0,
					href: a,
					title: "选择裁剪区域"
				}), myresumeCommon.config.cutImage.image.source = g, myresumeCommon.config.cutImage.image.width = c.srcImageW, myresumeCommon.config.cutImage.image.height = c.srcImageH, myresumeCommon.config.cutImage.selector.w = myresumeCommon.config.userPhotoSelector.width, myresumeCommon.config.cutImage.selector.h = myresumeCommon.config.userPhotoSelector.height, e = b.cropzoom(myresumeCommon.config.cutImage), e.showImage = null, e.showImage = f
			},
			g = function() {};
		return c.bind("click", function() {
			$(".jobExpForm").find(":submit").val("上传中").attr("disabled", !0), e.send(ctx + "Resume/cutLogo", "POST", {
				resubmitToken: globals.token
			}, function(a) {
				oMoudle.workId = "", e.showImage.css({
					width: 120,
					height: 120
				}).attr("src", ctx + "/" + a.content + "?cc=" + Math.random()), e.showImage.prev().prev().removeClass("active").addClass("up"), $.colorbox.close(), e.showImage = null, null != a.resubmitToken && "" != a.resubmitToken && (globals.token = a.resubmitToken), $(".jobExpForm").find(":submit").val("保存").attr("disabled", !1), e.restore()
			})
		}), d.bind("click", function() {
			e.restore(), $.colorbox.close()
		}), {
			upSucc: f,
			upFail: g
		}
	}(), window.uploadCompanyLogo = v, $(".mr_uploaded").on("click", "a.mr_del", function() {
		confirm("你确定要删除该附件吗？删除后你设置的默认投递简历也将失效") && $.ajax({
			url: ctx + "Resume/delOtherResume",
			type: "GET"
		}).done(function(a) {
			a.success ? ($(".mr_uploaded").hide(), $(".mr_upload").show()) : alert(a.msg)
		})
	}), $(".mr_module ul").delegate(".md_flag a", "click", function(a) {
		a.stopPropagation(), $(".mr_module li").removeClass("active"), $(this).parent().addClass("active");
		var b = $(this).parent().data("md");
		z(b, 0)
	}), $(".mr_module").unbind("click"), $(".mr_module").delegate(".hide_md", "click", function() {
		$(this).addClass("").addClass("mr_hide");
		var a = $(this).data("md");
		$("#" + a).removeClass("dn"), "customBlock" == a && initTitlePosition(), $(".m_hide").each(function() {
			var c, b = $(this).data("md");
			b == a && ($(this).removeClass("dn").addClass("md_flag"), sb(a, 0), z(a, 1), $(".mr_module li").removeClass("active"), $(this).addClass("active"), c = $(this).attr("data-md"), "customBlock" == $.trim(c) && $("#customBlock .cust_title span").text("自定义标题"), initTitlePosition())
		}), 9 == $(".mr_module ul .md_flag").length ? $(".mr_module_add").addClass("dn") : $(".mr_module_add").removeClass("dn")
	}), $(".mr_module_add").mouseover(function() {
		$(this).addClass("dn"), $(".hide_md").removeClass("dn"), $(".hide_md").mouseover(function() {
			$(".mr_module_add").addClass("dn"), $(".hide_md").removeClass("dn")
		})
	})
	/*, $(".hide_md").mouseout(function() {
		$(".mr_module .hide_md").addClass("dn"), $(".mr_module .m_hide").each(function(a) {
			$(this).hasClass("dn") && a++
		}), 9 == $(".md_flag").length ? $(".mr_module_add").addClass("dn") : $(".mr_module_add").removeClass("dn")
	})*/
	, $(".mr_created").on("click", ".mr_md_del", function(a) {
		a.stopPropagation()
	}), $(".mr_hide_del").bind("click", function(a) {
		a.stopPropagation(), $(".mr_module .mr_md_del").remove(), $(this).parent().after($("#del_hide_tip").html()), oDelMoudle = $(this)
	}), $(".mr_created").on("click", ".mr_md_del .mr_del_cel", function(a) {
		a.stopPropagation(), $(this).parents(".mr_md_del").remove()
	}), w = !0, $(".mr_created").on("click", ".mr_md_del .mr_del_btn", function(a) {
		var b, c, d, e, f, g, h, i, j;
		if (w) {
			switch (a.stopPropagation(), $(this).text("删除中"), w = !1, b = $(this), $(this).unbind(), c = "", d = oDelMoudle.parent().parent().data("md"), e = globals.token, f = globals.resumeId, g = "false", d) {
			case "expectJob":
				c = "Resume/delAllExpectJobs", g = globals.hasExpectJobs, i = $("#expHideId").val(), h = {
					resumeId: f,
					type: 1,
					resubmitToken: e,
					id: i
				}, gb.clear();
				break;
			case "projectExperience":
				c = "Resume/delAllProject", g = globals.hasProjectExperiences, h = {
					resumeId: f,
					type: 1,
					resubmitToken: e
				}, Y.clear();
				break;
			case "selfDescription":
				c = "Resume/intro", g = globals.hasSelf, h = {
					resumeId: f,
					type: 1,
					resubmitToken: e
				}, fb.clear();
				break;
			case "worksShow":
				c = "Resume/delAllWorkShow", g = globals.hasWorkShows, h = {
					resumeId: f,
					type: 1,
					resubmitToken: e
				}, ib.clear();
				break;
			case "customBlock":
				c = "Resume/delAllUserDefine", g = globals.hasUserDefines, i = $("#customId").val(), h = {
					resumeId: f,
					type: 1,
					resubmitToken: e,
					id: i
				}, j = $("#customBlock"), j.find(".cust_title span").text("自定义标题"), j.find(".custom_list").html("");
				break;
			case "skillsAssess":
				c = "Resume/skillDelAll", g = globals.hasSkillEvaluates, h = {
					resumeId: f,
					type: 1,
					resubmitToken: e
				}, jb.clear();
				break;
			default:
				return
			}
			g ? $.ajax({
				url: ctx + c,
				type: "POST",
				data: h,
				dataType: "json"
			}).done(function(a) {
				"expectJob" == d && $("#expHideId").val(""), globals.token = a.resubmitToken, a.success ? x(b, d, 0, a) : alert(a.msg), w = !0
			}) : (x(b, d, 1, 0), w = !0)
		}
	}), $(".mr_bottom_l").bind("click", function(a) {
		a.stopPropagation();
		var b = $(".mr_down_tip");
		b.is(":hidden") ? b.removeClass("dn") : b.addClass("dn")
	}), $(".mr_down_tip li").bind("click", function(a) {
		a.stopPropagation(), $(".mr_down_tip").addClass("dn")
	}), $(".mr_down_tip li").hover(function() {
		$(".mr_down_tip li.active").removeClass("active"), $(this).addClass("active")
	}, function() {
		$(".mr_down_tip li.active").removeClass("active"), $(this).removeClass("active")
	}), $(".mr_created").delegate(".mr_delete span", "click", function() {
		$(this).prev(".mr_delete_pop").removeClass("dn")
	}), $(".mr_created").delegate(".mr_del_cancel", "click", function() {
		"" == e && $(this).parent().parent().addClass("dn")
	}), $(".mr_created").delegate(".mr_del_ok", "click", function() {
		var a, b, c, g, h;
		switch (e = "1", a = $(this).parents(".mr_moudle_content"), b = $(this).parents("form"), c = $(".mr_del_ok", b).data("id"), g = "", d) {
		case "upJobForm":
			g = "Resume/delExp";
			break;
		case "upEduForm":
			g = "Resume/delEdu";
			break;
		case "upExpJobForm":
			$("#upExpJobForm .mr_cancel").trigger("click");
			break;
		case "upProForm":
			g = myresumeCommon.requestTargets.projectExpDel;
			break;
		default:
			return
		}
		$(this).text("删除中...").attr("disabled", !0), h = $(this), $.ajax({
			url: ctx + g,
			type: "POST",
			data: {
				id: c,
				resubmitToken: globals.token
			},
			dataType: "json"
		}).done(function(c) {
			var g, i, j, k, l, n, o, p, q, r, s, t;
			if (c.success) {
				switch (null != c.resubmitToken && "" != c.resubmitToken && (globals.token = c.resubmitToken), updateResumeTime(c.content.refreshTime), g = c.content.infoCompleteStatus.score, i = parseInt($.trim($(".mr_bfb").text())), j = amountScore - i + g, amountScore = j, updateRatioRM(g, j), d) {
				case "upJobForm":
					k = c.content.isOpenMyResume, l = c.content.firstOpen, A(k, l), 1 == a.find(".mr_jobe_list").length && (a.find(".mr_empty_add").show(), $.trim($(".base_info .j").text()), ("2" == $(".shenfen em").attr("data-id") || "0" == $(".shenfen em").attr("data-id")) && ($(".mr_infoed .info_t .shenfen").addClass("dn"), $(".mr_p_info .mr_edit_on").attr("data-sf", "")), n = $(".ul_shenfen li[data-id = '2']"), n && n.remove(), o = $(".mr_module .flag_work"), "实习经历" != $.trim($("#workExperience .mr_title_c").text()) && o.is(":hidden") && o.removeClass("dn")), W(c);
					break;
				case "upEduForm":
					k = c.content.isOpenMyResume, l = c.content.firstOpen, A(k, l), 1 == a.find(".mr_jobe_list").length && (a.find(".mr_empty_add").show(), $.trim($(".base_info .j").text()), ("1" == $(".shenfen em").attr("data-id") || "0" == $(".shenfen em").attr("data-id")) && ($(".mr_infoed .info_t .shenfen").addClass("dn"), $(".mr_p_info .mr_edit_on").attr("data-sf", "")), p = $(".ul_shenfen li[data-id = '1']"), p && p.remove(), o = $(".mr_module .flag_edu"), o.is(":hidden") && o.removeClass("dn")), W(c);
					break;
				case "upExpJobForm":
					$("#upExpJobForm .mr_cancel").trigger("click");
					break;
				case "upProForm":
					$("#upProForm .mr_cancel").trigger("click"), q = c && c.content && c.content.projectExperiences || [], r = eb(q), Y.obj.find(".list_show").html(r), s = $(".mr_jobe_list .l2 .projectTitle"), s.each(function() {
						var a = $(this),
							b = a.width();
						a.find("span").css("left", b + 5)
					}), t = Y.obj.find(".mr_empty_add"), q.length ? (globals.hasProjectExperiences = !0, t.hide()) : (globals.hasProjectExperiences = !1, t.show());
					break;
				default:
					return
				}
				mb(), d = "", f = !0, b.prev().remove(), b.remove()
			} else alert(c.msg);
			e = "", h.text("删除").attr("disabled", !1)
		})
	}), B = {
		obj: $("#workExperience"),
		clearError: function() {
			this.obj.find("span.error").hide(), this.obj.find("input.error").removeClass("error")
		},
		rules: {
			companyName: {
				required: !0,
				maxlenStr: 40
			},
			positionName: {
				required: !0,
				maxlenStr: 30
			},
			startTime: {
				required: !0
			},
			endTime: {
				required: !0
			},
			jobContent: {
				required: !1,
				tinymceLength: [0, 800]
			}
		},
		messages: {
			companyName: {
				required: "必填",
				maxlenStr: "请输入80字以内的公司名称"
			},
			positionName: {
				required: "必填",
				maxlenStr: "请输入60字以内的职位名称"
			},
			startTime: {
				required: "必填"
			},
			endTime: {
				required: "必填"
			},
			jobContent: {
				tinymceLength: "请输入1600字以内的工作内容"
			}
		},
		AddCancel: function() {
			$("#addJobForm").addClass("dn"), 0 == this.obj.find(".mr_jobe_list").length && this.obj.find(".mr_empty_add").show(), mb(), this.obj.find(".mr_head_r").removeClass("mr_add_grey").removeClass("mr_up_grey").removeClass("mr_addup_cel").children("em").text("添加"), d = "", f = !0
		},
		UpCancel: function() {
			mb(), $("#upJobForm").prev().show(), $("#upJobForm").remove(), d = "", f = !0
		}
	};
	try {
		C = new components.CityWrapper({
			container: $("#olinfoForm .city_s"),
			onchange: function(a, b) {
				b.find(".error").hide()
			},
			beforeShown: function(a) {
				$(document).trigger("click"), $(".select_color").removeClass("select_color"), a.addClass("select_color")
			},
			afterHide: function(a) {
				a.removeClass("select_color")
			}
		}), D = new components.CityWrapper({
			container: $("#upExpJobForm .city_s"),
			onchange: function(a, b) {
				b.find(".error").hide()
			},
			beforeShown: function(a) {
				$(document).trigger("click"), $(".select_color").removeClass("select_color"), a.addClass("select_color")
			},
			afterHide: function(a) {
				a.removeClass("select_color")
			}
		}), E = new components.CityWrapper({
			container: $("#infoForm .city_s"),
			onchange: function(a, b) {
				b.find(".error").hide()
			},
			beforeShown: function(a) {
				$(document).trigger("click"), $(".select_color").removeClass("select_color"), a.addClass("select_color")
			},
			afterHide: function(a) {
				a.removeClass("select_color")
			}
		})
	} catch (F) {}
	try {
		G = new components.CalendarWrapper({
			container: $("#addJobForm").find(".mr_timed_div:first"),
			onchange: function(a, b) {
				H.setLeftBoundary(a), b.find(".error").hide()
			},
			beforeShown: function(a) {
				H.hide(), $(".select_color").removeClass("select_color"), a.addClass("select_color"), a.css("zIndex", "2"), a.siblings("div:last").css("zIndex", "1")
			},
			afterHide: function(a) {
				a.removeClass("select_color"), a.css("zIndex", "auto"), a.siblings("div:last").css("zIndex", "auto")
			}
		}), H = new components.CalendarWrapper({
			container: $("#addJobForm").find(".mr_timed_div:last"),
			onchange: function(a, b) {
				G.setRightBoundary(a), b.find(".error").hide()
			},
			beforeShown: function(a) {
				G.hide(), $(".select_color").removeClass("select_color"), a.addClass("select_color")
			},
			afterHide: function(a) {
				a.removeClass("select_color")
			},
			has2Today: !0
		})
	} catch (F) {}
	B.obj.delegate(".mr_head_r", "click", function() {
		B.clearError(), L();
		var b = B.obj.find(".mr_empty_add");
		"添加" == $(this).children("em").text() ? "" == d && (d = "addJobForm", f = !1, $("#addJobForm").removeClass("dn"), kb(), $(this).removeClass("mr_add_grey").removeClass("mr_up_grey").addClass("mr_addup_cel").children("em").text("取消"), b.not(":hidden") && b.hide()) : (f = !0, $("#addJobForm").addClass("dn"), mb(), $(this).removeClass("mr_add_grey").removeClass("mr_up_grey").removeClass("mr_addup_cel").children("em").text("添加"), d = "", 0 == B.obj.find(".mr_jobe_list").length && b.show()), K($("#addJobForm"))
	}), B.obj.delegate(".mr_empty_add", "click", function() {
		$(this).hide(), $("#workExperience .mr_head_r").trigger("click")
	}), B.obj.delegate(".mr_edit", "click", function() {
		var b, c, e;
		"" == d && (kb(), d = "upJobForm", f = !1, b = "", b = $("#job_update_hide").html(), b = b.replace(/mce_jason/g, "upjobContent"), b = b.replace(/tinymce_replace/g, "tinymce1"), $(this).parents(".mr_jobe_list").hide().after(b), $(this).parents(".mr_jobe_list").next().attr("id", "upJobForm"), c = $("#upJobForm"), $("#mr_expid", c).val($(this).data("expid")), $(".mr_del_ok", c).attr("data-id", $(this).data("expid")), oMoudle.workId = $(this).data("expid"), $("img.logo_u", c).prev().prev().addClass("up"), e = $(this).data("logo"), "" != e ? (e = ctx + "/" + e, $("img.logo_u", c).css({
			width: 120,
			height: 120
		}).attr("src", e), $("input[name='companyLogoHide']", c).val(e)) : (e = "", $(".mr_upload_logo div", c).removeClass("up"), $("img.logo_u", c).css({
			width: 0,
			height: 0
		}).attr("src", e), $("input[name='companyLogoHide']", c).val("")), $('input[name="companyName"]', c).val($(this).data("comname")), $('input[name="positionName"]', c).val($(this).data("posname")), $('input[name="startTime"]', c).val($(this).data("startime")), $(".mr_sta_time .mr_btn", c).val($(this).data("startime")), $('input[name="endTime"]', c).val($(this).data("endtime")), $(".mr_end_time .mr_btn", c).val($(this).data("endtime")), $("#upjobContent", c).val($(this).data("content")), initMceMr1(), h(), N(), K($("#upJobForm")), I = new components.CalendarWrapper({
			container: c.find(".mr_timed_div:first"),
			onchange: function(a, b) {
				J.setLeftBoundary(a), b.find(".error").hide()
			},
			beforeShown: function(a) {
				J.hide(), $(".select_color").removeClass("select_color"), a.addClass("select_color")
			},
			afterHide: function(a) {
				a.removeClass("select_color")
			}
		}), J = new components.CalendarWrapper({
			container: c.find(".mr_timed_div:last"),
			onchange: function(a, b) {
				I.setRightBoundary(a), b.find(".error").hide()
			},
			beforeShown: function(a) {
				I.hide(), $(".select_color").removeClass("select_color"), a.addClass("select_color")
			},
			afterHide: function(a) {
				a.removeClass("select_color")
			},
			has2Today: !0
		}), I.set($(this).data("startime"), !0), J.set($(this).data("endtime"), !0), handleFrames())
	}), B.obj.delegate(".mr_upload_logo", "mouseover", function() {
		var a = $(this).find("div");
		a.hasClass("up") || a.addClass("active")
	}), B.obj.delegate(".mr_upload_logo", "mouseout", function() {
		var a = $(this).find("div");
		a.hasClass("up") || a.removeClass("active")
	}), B.obj.delegate("#upJobForm .mr_cancel", "click", function() {
		B.UpCancel()
	}), $("#addJobForm .mr_cancel").bind("click", function() {
		B.AddCancel()
	}), $(".mr_created").delegate("a.mce_fullscreen", "click", function() {
		var f, a = $("#mce_fullscreen_container .mceToolbarRow1"),
			b = $("#mce_fullscreen_container #mce_fullscreen_toolbargroup"),
			c = '<a href="javascript:;" class="writeBtn">写好了</a>',
			d = $(this).attr("id"),
			e = d.split("_");
		d = e[0], b.append(c), $(window).resize(function() {
			$("table#mce_fullscreen_tbl").css("width", "100%")
		}), $("#mce_fullscreen_container .writeBtn").bind("click", function() {
			ff.fullscreenEditor.execCommand("mceFullScreen")
		}), a.find("td:nth-child(3)").addClass("borderLNone"), f = $("#mce_fullscreen_ifr")[0].contentDocument.body, $(f).css({
			backgroundColor: "#f9f9f9",
			color: "#555",
			fontSize: "16px"
		}), f.focus()
	}), P = {
		obj: $("#educationalBackground"),
		rules: {
			schoolName: {
				required: !0,
				checkNum: !0,
				maxlenStr: 50,
				truename2: !0
			},
			positionName: {
				required: !0,
				checkNum: !0,
				maxlenStr: 50,
				newSpecialChar: !0
			},
			degree_text: {
				required: !0
			},
			graduate_text: {
				required: !0
			}
		},
		messages: {
			schoolName: {
				required: "必填",
				checkNum: "请输入有效的学校名称",
				maxlenStr: "请输入有效的学校名称",
				truename2: "请输入有效的学校名称"
			},
			positionName: {
				required: "必填",
				checkNum: "请输入有效的专业名称",
				maxlenStr: "请输入有效的专业名称",
				newSpecialChar: "请输入有效的专业名称"
			},
			degree_text: {
				required: "必填"
			},
			graduate_text: {
				required: "必填"
			}
		},
		errorPlacement: function(a, b) {
			"hidden" == b.attr("type") ? ($(b).parent().css("margin-bottom", "20px"), a.appendTo($(b).parent())) : "button" == b.attr("type") ? a.appendTo($(b).parent()) : a.insertAfter($(b).parent())
		},
		clearError: function() {
			this.obj.find("span.error").hide(), this.obj.find("input.error").removeClass("error")
		},
		AddCancel: function() {
			$("#addEduForm").addClass("dn"), 0 == this.obj.find(".mr_jobe_list").length && this.obj.find(".mr_empty_add").show(), mb(), this.obj.find(".mr_head_r").removeClass("mr_add_grey").removeClass("mr_up_grey").removeClass("mr_addup_cel").children("em").text("添加"), d = "", f = !0
		},
		UpCancel: function() {
			mb(), $("#upEduForm").prev().show(), $("#upEduForm").remove(), d = "", f = !0
		}
	}, P.obj.delegate(".mr_head_r", "click", function() {
		if (P.clearError(), T(), "添加" == $(this).children("em").text()) {
			var b = P.obj.find(".mr_empty_add");
			"" == d && (b.not(":hidden") && b.hide(), d = "addEduForm", f = !1, $("#addEduForm").removeClass("dn"), kb(), $(this).removeClass("mr_add_grey").removeClass("mr_up_grey").addClass("mr_addup_cel").children("em").text("取消"))
		} else 0 == $("#educationalBackground .mr_jobe_list").length && $("#educationalBackground .mr_empty_add").show(), $("#addEduForm").addClass("dn"), mb(), $(this).removeClass("mr_add_grey").removeClass("mr_up_grey").removeClass("mr_addup_cel").children("em").text("添加"), d = ""
	}), P.obj.delegate(".mr_empty_add", "click", function() {
		$(this).hide(), $("#educationalBackground .mr_head_r").trigger("click")
	}), P.obj.delegate(".mr_edit", "click", function() {
		var b, c;
		"" == d && (kb(), d = "upEduForm", f = !1, b = "", b = $("#edu_update_hide").html(), $(this).parents(".mr_jobe_list").hide().after(b), Q(), R(), $(this).parents(".mr_jobe_list").next().attr("id", "upEduForm"), c = $("#upEduForm"), $("#eduId", c).val($(this).data("eduid")), $(".mr_del_ok", c).attr("data-id", $(this).data("eduid")), oMoudle.eduId = $(this).data("eduid"), $('input[name="schoolName"]', c).val($(this).data("schoolname")), $('input[name="positionName"]', c).val($(this).data("pro")), $('input[name="degree_text"]', c).val($(this).data("edu")), $('input[name="degree_val"]', c).val($(this).data("edu")), $('input[name="graduate_text"]', c).val($(this).data("date")), $('input[name="graduate"]', c).val($(this).data("date")), U())
	}), P.obj.delegate("#upEduForm .mr_cancel", "click", function() {
		P.UpCancel()
	}), $("#addEduForm .mr_cancel").bind("click", function() {
		P.AddCancel()
	}), Q(), R(), Y = {
		obj: $("#projectExperience"),
		clearError: function() {
			this.obj.find("span.error").hide(), this.obj.find("input.error").removeClass("error")
		},
		AddCancel: function() {
			var a = $("#addProForm");
			a.addClass("dn"), a.find('input[name="projectName"]').val(""), a.find('input[name="thePost"]').val(""), a.find('input[name="startTime"]').val(""), a.find('input[name="endTime"]').val(""), a.find('textarea[name="proDescript"]').val(""), a.find('input[name="pro_link"]').val(""), a.find('input[type="button"]').val(""), 0 == this.obj.find(".mr_jobe_list").length && (this.obj.find(".mr_empty_add").show(), globals.hasProjectExperiences = !1), mb(), this.obj.find(".mr_head_r").removeClass("mr_add_grey").removeClass("mr_up_grey").removeClass("mr_addup_cel").children("em").text("添加"), d = "", f = !0, this.checkState(), Z.reset(), _.reset()
		},
		UpCancel: function() {
			mb(), $("#upProForm").prev().show(), $("#upProForm").remove(), d = "", f = !0, this.checkState()
		},
		checkState: function() {
			0 == this.obj.find(".mr_jobe_list").length ? (this.obj.find(".mr_empty_add").show(), globals.hasProjectExperiences = !1) : (this.obj.find(".mr_empty_add").hide(), globals.hasProjectExperiences = !0)
		},
		clear: function() {
			var b, a = $("#addProForm");
			a.find('input[name="projectName"]').val(""), a.find('input[name="thePost"]').val(""), a.find('input[name="startTime"]').val(""), a.find('input[name="endTime"]').val(""), a.find('textarea[name="proDescript"]').val(""), a.find('input[name="pro_link"]').val(""), a.find('input[type="button"]').val(""), b = this.obj, b.find(".list_show").html(""), b.find(".mr_empty_add").show(), this.clearError(), this.checkState()
		}
	}, Z = new components.CalendarWrapper({
		container: $("#addProForm").find(".mr_timed_div:first"),
		onchange: function(a, b) {
			_.setLeftBoundary(a), b.find(".error").hide()
		},
		beforeShown: function(a) {
			_.hide(), $(".select_color").removeClass("select_color"), a.addClass("select_color")
		},
		afterHide: function(a) {
			a.removeClass("select_color")
		}
	}), _ = new components.CalendarWrapper({
		container: $("#addProForm").find(".mr_timed_div:last"),
		onchange: function(a, b) {
			Z.setRightBoundary(a), b.find(".error").hide()
		},
		beforeShown: function(a) {
			Z.hide(), $(".select_color").removeClass("select_color"), a.addClass("select_color")
		},
		afterHide: function(a) {
			a.removeClass("select_color")
		},
		has2Today: !0
	}), Y.obj.delegate(".mr_head_r", "click", function() {
		Y.clearError(), cb(), "添加" == $(this).children("em").text() ? "" == d && (d = "addProForm", f = !1, $("#addProForm").removeClass("dn"), kb(), $(this).removeClass("mr_add_grey").removeClass("mr_up_grey").addClass("mr_addup_cel").children("em").text("取消"), Y.checkState(), Y.obj.find(".mr_empty_add").hide()) : ($("#addProForm").addClass("dn"), mb(), $(this).removeClass("mr_add_grey").removeClass("mr_up_grey").removeClass("mr_addup_cel").children("em").text("添加"), d = "", Y.checkState()), K($("#addProForm"))
	}), Y.obj.delegate(".mr_empty_add", "click", function() {
		$(this).hide(), $("#projectExperience .mr_head_r").trigger("click")
	}), Y.obj.delegate(".mr_edit", "click", function() {
		var b, c, e, g;
		"" == d && (kb(), d = "upProForm", f = !1, b = "", b = $("#pro_update_hide").html(), b = b.replace(/mce_jason/g, "upproContent"), b = b.replace(/tinymce_replace/g, "tinymce1"), $(this).parents(".mr_jobe_list").hide().after(b), $(this).parents(".mr_jobe_list").next().attr("id", "upProForm"), c = $("#upProForm"), e = $(this).parents(".mr_jobe_list"), initMceMr1(), h(), db(e.attr("data-id")), c.find(".mr_del_ok").data("id", e.data("id")), c.find('input[name="projectName"]').val($.trim(e.find(".projectTitle").text())), c.find('input[name="thePost"]').val($.trim(e.find(".l2 p").text())), g = $.trim(e.find(".mr_content_r span").text()).split(" - "), c.find('input[name="startTime"]').val(g[0]).prev().val(g[0]), c.find('input[name="endTime"]').val(g[1]).prev().val(g[1]), c.find('textarea[name="upproContent"]').val($.trim(e.find(".mr_content_m").html())), c.find('input[name="pro_link"]').val($.trim(e.find(".projectTitle").attr("href"))), K($("#upProForm")), Y.checkState(), ab = new components.CalendarWrapper({
			container: c.find(".mr_timed_div:first"),
			onchange: function(a, b) {
				bb.setLeftBoundary(a), b.find(".error").hide()
			},
			beforeShown: function(a) {
				bb.hide(), $(".select_color").removeClass("select_color"), a.addClass("select_color")
			},
			afterHide: function(a) {
				a.removeClass("select_color")
			}
		}), bb = new components.CalendarWrapper({
			container: c.find(".mr_timed_div:last"),
			onchange: function(a, b) {
				ab.setRightBoundary(a), b.find(".error").hide()
			},
			beforeShown: function(a) {
				ab.hide(), $(".select_color").removeClass("select_color"), a.addClass("select_color")
			},
			afterHide: function(a) {
				a.removeClass("select_color")
			},
			has2Today: !0
		}), ab.set(g[0], !0), bb.set(g[1], !0), handleFrames())
	}), Y.obj.delegate("#upProForm .mr_cancel", "click", function() {
		Y.UpCancel()
	}), $("#addProForm .mr_cancel").bind("click", function() {
		Y.AddCancel()
	}), fb = {
		obj: $("#selfDescription"),
		clearError: function() {
			this.obj.find("span.error").hide(), this.obj.find("input.error").removeClass("error")
		},
		UpCancel: function() {
			$("#upSelfForm").addClass("dn"), mb(), d = "", f = !0, this.obj.find(".mr_head_r").removeClass("mr_up_grey").removeClass("mr_add_grey").removeClass("mr_addup_cel").children("em").text("编辑"), this.obj.find(".self_des_list").removeClass("dn"), this.checkState()
		},
		clear: function() {
			$("#self").val(""), fb.obj.find(".mr_self_r").html(""), this.checkState(), this.clearError()
		},
		checkState: function() {
			"" == $.trim($(".mr_self_r").html()) ? (fb.obj.find(".mr_empty_add").show(), fb.obj.find(".self_des_list").addClass("dn")) : (fb.obj.find(".mr_empty_add").hide(), fb.obj.find(".self_des_list").removeClass("dn"))
		}
	}, fb.obj.delegate(".mr_head_r", "click", function() {
		var b, c;
		fb.clearError(), "编辑" == $(this).children("em").text() ? "" == d && (d = "upSelfForm", f = !1, $("#upSelfForm").removeClass("dn"), kb(), fb.obj.find(".self_des_list").addClass("dn"), $(this).removeClass("mr_add_grey").removeClass("mr_up_grey").addClass("mr_addup_cel").children("em").text("取消"), b = $("#upSelfForm"), c = fb.obj.find(".mr_self_r"), b.find("#self").val($.trim(c.html())), fb.obj.find(".mr_empty_add").hide()) : ($("#upSelfForm").addClass("dn"), mb(), $(this).removeClass("mr_up_grey").removeClass("mr_add_grey").removeClass("mr_addup_cel").children("em").text("编辑"), d = "", fb.obj.find(".self_des_list").removeClass("dn"), f = !0, "" == $.trim($("#self").val()) && fb.obj.find(".mr_empty_add").show(), fb.checkState()), K($("#upSelfForm"))
	}), $("#upSelfForm .mr_cancel").bind("click", function() {
		fb.UpCancel()
	}), fb.obj.find(".mr_empty_add").bind("click", function() {
		fb.obj.find(".mr_head_r").trigger("click")
	}), $("#upSelfForm").validate({
		rules: {
			self_des: {
				required: !0,
				tinymceLength: [5, 800]
			}
		},
		messages: {
			self_des: {
				required: "必填",
				tinymceLength: "请输入10-1600字符的自我描述"
			}
		},
		errorPlacement: function(a, b) {
			"text" == b.attr("type") || "button" == b.attr("type") ? ($(b).parent().css("margin-bottom", "20px"), a.appendTo($(b).parent())) : "expJobDes" == b.attr("id") ? $(b).parent().after(a) : a.insertAfter($(b).parent())
		},
		submitHandler: function(a) {
			$(a).find(":submit").val("保存中...").attr("disabled", !0);
			var b = $.trim($("#self").val());
			myresumeCommon.utils.requester({
				url: myresumeCommon.requestTargets.myRemark,
				data: {
					resumeId: globals.resumeId,
					myRemark: b
				}
			}, function(c) {
				var e, f, g, d = $("#upSelfForm");
				d.find("#self").val(""), fb.clearError(), fb.UpCancel(), fb.obj.find(".mr_self_r").html(b), $(a).find(":submit").val("保 存").attr("disabled", !1), updateResumeTime(c.content.refreshTime), globals.hasSelf = !0, "" != oMoudleScore.myRemarkScore && (amountScore -= oMoudleScore.myRemarkScore), oMoudleScore.myRemarkScore = "", "" != $.trim(fb.obj.find(".mr_self_r").html()) && (fb.obj.find(".mr_empty_add").hide(), fb.obj.find(".self_des_list").removeClass("dn")), e = c.content.infoCompleteStatus.score, f = parseInt($.trim($(".mr_bfb").text())), g = amountScore - f + e, updateRatioRM(e, g)
			})
		}
	}), gb = {
		obj: $("#expectJob"),
		clearError: function() {
			this.obj.find("span.error").hide(), this.obj.find("input.error").removeClass("error")
		},
		UpCancel: function() {
			$("#upExpJobForm").addClass("dn"), mb(), d = "", f = !0, this.obj.find(".mr_head_r").removeClass("mr_up_grey").removeClass("mr_add_grey").removeClass("mr_addup_cel").children("em").text("编辑"), this.obj.find(".expectjob_list").removeClass("dn"), this.checkState()
		},
		clear: function() {
			var a = $("#expectJob .expectjob_list");
			a.find(".mr_job_name").html(""), a.find(".mr_job_type").html(""), a.find(".mr_job_adr").html(""), a.find(".mr_job_range").html(""), a.find(".mr_job_des").html(""), this.checkState(), this.clearError()
		},
		checkState: function() {
			"" == $.trim($(".expectjob_list").text()).replace(/\s/g, "") ? (gb.obj.find(".expectjob_list").addClass("dn"), gb.obj.find(".mr_empty_add").show()) : (gb.obj.find(".mr_empty_add").hide(), gb.obj.find(".expectjob_list").removeClass("dn"), globals.hasExpectJobs = !0)
		},
		clearCityError: function() {
			gb.obj.find(".mr_job_city").find("span.error").hide()
		},
		clearPayError: function() {
			gb.obj.find(".mr_pay_div").find("span.error").hide()
		},
		clearPayLayer: function() {
			gb.obj.find(".xl_list:first, .xl_list:last").hide()
		}
	}, gb.obj.delegate(".mr_head_r", "click", function() {
		var b, c, e, g, h, i, j, k;
		gb.clearError(), "编辑" == $(this).children("em").text() ? "" == d && (d = "upExpJobForm", f = !1, $("#upExpJobForm").removeClass("dn"), kb(), fb.obj.find(".expectjob_list").addClass("dn"), $(this).removeClass("mr_add_grey").removeClass("mr_up_grey").addClass("mr_addup_cel").children("em").text("取消"), b = $("#expectJob .expectjob_list"), c = b.find(".mr_job_name").text(), e = b.find(".mr_job_type").text(), g = $(this).attr("data-city") || b.find(".mr_job_adr").text() || $("#mr_mr_head").find(".mr_p_info .base_info em:last").text() || "", h = b.find(".mr_job_range").text(), i = b.find(".mr_expjob_content").html(), j = $("#upExpJobForm"), $('input[name="expjobName"]', j).val($.trim(c)), k = $.trim(e), "" == k ? $('input[name="exp_job_type"]', j).val("全职") : $('input[name="exp_job_type"]', j).val(k), $('input[name="jobCity"]', j).val($.trim(g)), $('input[name="monthpay"]', j).val($.trim(h)), $("#expJobDes").val($.trim(i)), gb.checkState(), gb.obj.find(".mr_empty_add").hide(), gb.obj.find(".expectjob_list").addClass("dn")) : ($("#upExpJobForm").addClass("dn"), mb(), $(this).removeClass("mr_up_grey").removeClass("mr_add_grey").removeClass("mr_addup_cel").children("em").text("编辑"), d = "", fb.obj.find(".expectjob_list").removeClass("dn"), f = !0, gb.checkState()), K($("#upExpJobForm"))
	}), $("#upExpJobForm .mr_cancel").bind("click", function() {
		gb.UpCancel()
	}), gb.obj.find(".mr_empty_add").bind("click", function() {
		gb.obj.find(".mr_head_r").trigger("click")
	}), gb.obj.find(".ul_exptype").on("click", "li", function(a) {
		a.stopPropagation(), $(this).parent().parent().prev().val($(this).text()), $(this).parent().parent().hide(), $(".select_color").removeClass("select_color")
	}), gb.obj.find(".ul_pay").on("click", "li", function(a) {
		a.stopPropagation(), $(this).parent().parent().prev().val($(this).text()), $(this).parent().parent().hide(), $(".select_color").removeClass("select_color"), gb.clearPayError()
	}), $("#upExpJobForm").submit(function() {
		tinyMCE.triggerSave(!0)
	}).validate({
		rules: {
			expjobName: {
				required: !1,
				maxlenStr: 30,
				checkExceptSharp: !0
			},
			expJobDes: {
				tinymceLength: [0, 400]
			},
			monthpay: {
				required: !1
			},
			jobCity: {
				required: !1
			}
		},
		messages: {
			expjobName: {
				maxlenStr: "请输入有效的期望职位",
				checkExceptSharp: "格式错误"
			},
			expJobDes: {
				tinymceLength: $.validator.format("请输入400字符以内的补充说明")
			}
		},
		errorPlacement: function(a, b) {
			"text" == b.attr("type") || "button" == b.attr("type") ? ($(b).parent().css("margin-bottom", "20px"), a.appendTo($(b).parent())) : "expJobDes" == b.attr("id") ? $(b).parent().after(a) : a.insertAfter($(b).parent())
		},
		submitHandler: function(a) {
			var b, c, e, g, h, i, j;
			$(a).find(":submit").val("保存中...").attr("disabled", !0), b = $('input[name="expjobName"]', a).val(), c = $('input[name="exp_job_type"]', a).val(), e = $('input[name="jobCity"]', a).val(), g = $('input[name="monthpay"]', a).val(), h = $("#expJobDes").val(), i = $("#expJobDes").text().replace("&nbsp;", ""), j = $.trim($("#expectJob .mr_job_info").attr("data-id")), $.ajax({
				url: ctx + myresumeCommon.requestTargets.expectJobSave,
				type: "POST",
				data: {
					id: globals.resumeId,
					expectId: j || "",
					city: e,
					positionType: c,
					positionName: b,
					addExplain: h,
					salarys: g,
					resubmitToken: globals.token
				},
				dataType: "json"
			}).done(function(j) {
				var k, l, m, n;
				"" == $.trim(e) && $("#expectJob .mr_head_r").attr("data-city", ""), null != j.resubmitToken && "" != j.resubmitToken && (globals.token = j.resubmitToken), $(a).find(":submit").val("保 存").attr("disabled", !1), updateResumeTime(j.content.refreshTime), "" != oMoudleScore.expectJobsScore && (amountScore -= oMoudleScore.expectJobsScore), oMoudleScore.expectJobsScore = "", k = j.content.infoCompleteStatus.score, l = parseInt($.trim($(".mr_bfb").text())), m = amountScore - l + k, updateRatioRM(k, m), globals.hasExpectJobs = !0, n = $("#expectJob .expectjob_list"), $("#expHideId").val(j.content.expectJobs.id), n.find(".mr_job_name").text(b), n.find(".mr_job_name").attr("title", b), n.find(".mr_job_type").text(c), n.find(".mr_job_adr").text(e), n.find(".mr_job_adr").attr("title", e), n.find(".mr_job_range").text(g), n.find(".mr_expjob_content").html(h), $("#expectJob .mr_job_info").attr("data-id", j.content.expectJobs.id), "" == $.trim(b) ? $(".mr_name_li").addClass("dn") : $(".mr_name_li").removeClass("dn"), "" == $.trim(c) ? $(".mr_jobtype_li").addClass("dn") : $(".mr_jobtype_li").removeClass("dn"), "" == $.trim(e) ? $(".mr_city_li").addClass("dn") : $(".mr_city_li").removeClass("dn"), "" == $.trim(g) ? $(".mr_jobrange_li").addClass("dn") : $(".mr_jobrange_li").removeClass("dn"), "" == $.trim(i) ? $(".mr_job_des").addClass("dn") : $(".mr_job_des").removeClass("dn"), gb.UpCancel(), $(".expectjob_list").removeClass("dn"), $("#upExpJobForm").addClass("dn"), mb(), d = "", f = !0, gb.checkState()
			})
		}
	}), hb = {
		obj: $("#customBlock"),
		clearError: function() {
			this.obj.find("span.error").hide(), this.obj.find("input.error").removeClass("error")
		},
		UpCancel: function() {
			initTitlePosition(), $("#upCustomForm").addClass("dn"), mb(), d = "", f = !0, this.obj.find(".mr_head_r").removeClass("mr_up_grey").removeClass("mr_add_grey").removeClass("mr_addup_cel").children("em").text("编辑"), this.obj.find(".custom_list").removeClass("dn");
			var a = $(".mr_content_cus").text();
			"" == $.trim(a) && $("#customBlock .mr_empty_add").show()
		},
		SetTitle: function() {
			var a = $("#customTitleName");
			"" != a.val() && a.val() ? $("#customBlock .cust_title span").text(a.val()) : $("#customBlock .cust_title span").text("自定义标题")
		}
	}, hb.obj.delegate(".mr_empty_add", "click", function() {
		$(this).addClass("dn"), $("#customBlock .mr_head_r").trigger("click")
	}), $("#customCon").bind("full2restore", function() {
		$("#customCon").valid()
	}), hb.obj.delegate(".mr_head_r", "click", function() {
		var b, c, e, g;
		$("#customBlock .mr_empty_add").hide(), hb.clearError(), hb.obj.find(".mr_add_work img").attr("src", $("#userpic").attr("src")), b = $("#customBlock .cust_title").text(), c = $("#customBlock .custom_list").html(), e = $.trim(b), "自定义标题" == e ? $("#upCustomForm input[name='titleName']").val("") : $("#upCustomForm input[name='titleName']").val(e), $("#customCon").html(c), "编辑" == $(this).children("em").text() ? "" == d && (d = "upCustomForm", f = !1, $("#upCustomForm").removeClass("dn"), kb(), hb.obj.find(".custom_list").addClass("dn"), $(this).removeClass("mr_add_grey").removeClass("mr_up_grey").addClass("mr_addup_cel").children("em").text("取消")) : (hb.SetTitle(), initTitlePosition(), $("#upCustomForm").addClass("dn"), mb(), $(this).removeClass("mr_up_grey").removeClass("mr_add_grey").removeClass("mr_addup_cel").children("em").text("编辑"), d = "", hb.obj.find(".custom_list").removeClass("dn"), f = !0, g = $(".mr_content_cus").text(), "" == $.trim(g) && $("#customBlock .mr_empty_add").show()), K($("#upCustomForm"))
	}), $("#upCustomForm .mr_cancel").bind("click", function() {
		hb.SetTitle(), hb.UpCancel()
	}), $("#upCustomForm").submit(function() {
		tinyMCE.triggerSave(!0)
	}).validate({
		rules: {
			titleName: {
				required: !0,
				rangeLenStr: [0, 10]
			},
			customCon: {
				required: !0,
				tinymceLength: [1, 800]
			}
		},
		messages: {
			titleName: {
				required: "必填",
				rangeLenStr: "请输入20个字符以内的标题"
			},
			customCon: {
				required: "必填",
				tinymceLength: "请输入2-1600字符的有效内容"
			}
		},
		errorPlacement: function(a, b) {
			"customCon" == b.attr("id") ? $(b).parent().after(a) : a.insertAfter($(b).parent())
		},
		submitHandler: function(a) {
			var b = globals.token,
				c = globals.resumeId,
				e = $("#customId").val(),
				g = $('input[name="titleName"]', a).val(),
				h = tinyMCE.get("customCon").getContent();
			$(a).find(":submit").val("保存中...").attr("disabled", !0), $.ajax({
				url: ctx + "Resume/userDefine",
				type: "post",
				data: {
					id: c,
					defineId: e,
					titleName: g,
					titleContent: h,
					resubmitToken: b
				},
				dataType: "json"
			}).done(function(b) {
				var c, g, h;
				b.success ? (globals.hasUserDefines = !0, globals.token = b.resubmitToken, updateResumeTime(b.content.refreshTime), $(".mr_cancel", a).trigger("click"), $("#customBlock .mr_moudle_content .mr_empty_add").hide(), mb(), d = "", f = !0, hb.obj.find(".mr_head_r").removeClass("mr_up_grey").removeClass("mr_add_grey").removeClass("mr_addup_cel").children("em").text("编辑"), c = $('input[name="titleName"]', a).val(), $("#customCon").val(), $("#customBlock .cust_title span").text(c), $("#upCustomForm").addClass("dn"), g = b.content.userDefine, h = "", h += '<input id="customTitleName" type="hidden" value="' + g.titleName + '" />', h += '<input id="customId" type="hidden" value="' + g.id + '" />', h += '<div class="custom_list" data-id="' + g.id + '">' + g.titleContent + "</div>", $(".mr_content_cus").html(h), initTitlePosition()) : alert(b.msg), $(a).find(":submit").val("保 存").attr("disabled", !1)
			})
		}
	}), $("#upCustomForm input[name='titleName']").keyup(function() {});
	try {
		myresumeCommon.utils.inputerListener($("#upCustomForm input[name='titleName']"), function(a) {
			var e, f, g, b = a.length,
				c = 0,
				d = a;
			for (e = 0; b > e; e++) if (a.charCodeAt(e) < 27 || a.charCodeAt(e) > 126 ? c += 2 : c++, f = $("#titleName"), c > 20) {
				d = a.substring(0, e), f.val(d);
				break
			}
			"" == d ? $("#customBlock .cust_title span").text("自定义标题") : $("#customBlock .cust_title span").text(d), g = parseInt($("#customBlock .cust_title").width()) / 2, $("#customBlock .cust_title").css("margin-left", .7 * -g)
		})
	} catch (F) {}
	ib = function() {
		var A, B, C, D, E, F, G, H, I, J, L, M, N, O, Q, R, S, T, U, W, X, Y, Z, _, ab, bb, cb, db, a = {
			upload: 0,
			online: 1
		},
			//b = a.upload, /* 初始默认状态 */
			b = a.online,
			c = {
				edit: "添加",
				cancel: "取消"
			},
			e = {
				normal: 0,
				edit: 1
			},
			g = e.normal,
			h = {
				editcancel: "mr_addup_cel"
			},
			i = {
				url: "www.jobsminer.cc",
				previewText: "<p>这里是你的作品描述</p>"
			},
			j = $("#worksShow"),
			k = j.find(".mr_head_r"),
			l = k.find("em"),
			m = j.find(".mr_moudle_content"),
			n = m.find(".mr_worksshow_forms"),
			o = m.find("#addWorksShowUploadForm"),
			p = m.find("#addWorksShowOnlineForm"),
			q = m.find(".mr_work_online"),
			r = m.find(".mr_work_upload"),
			s = m.find(".mr_cancel"),
			t = m.find(".mr_save"),
			u = m.find(".mr_empty_add"),
			v = p.find("#workOnlineUrl"),
			w = p.find("#workOnlineDescContent"),
			x = p.find(".mr_self_sitelink"),
			y = p.find(".mr_wo_preview"),
			z = o.find("#worksshowUp");
		return z.click(function() {
			$(this).blur()
		}), A = o.find("#worksshowUpShow"), B = o.find("#workUploadTitle"), C = o.find("#workImagesDescContent"), D = function() {
			return q.find(".mr_wo_show").length + r.find(".mr_wu_show").length
		}, E = function() {
			m.find(".mr_worksshow_tab span").bind("click", function() {
				var c = $(this);
				c.hasClass("selected") || (n.find("span.error").hide(), c.hasClass("mr_wst_uponline") ? (o.hide(), p.show(), b = a.online) : (o.show(), p.hide(), b = a.upload))
			})
		}, F = function() {
			"" == d && (y.html(i.previewText), x.html(i.url), l.text(c.cancel), k.addClass(h.editcancel), A.css({
				width: "0",
				height: "0"
			}), u.hide(), n.find(".up").removeClass("up"), n.show(), g = e.edit, d = b == a.upload ? "addWorksShowUploadForm" : "addWorksShowOnlineForm", f = !1, kb())
		}, G = function() {
			l.text(c.edit), k.removeClass(h.editcancel), n.hide(), !D() && u.show(), g = e.normal, d = "", f = !0, mb()
		}, H = function() {
			M(), g == e.normal ? F() : G()
		}, I = function() {
			return {
				id: globals.resumeId,
				wsid: "",
				url: "",
				workName: "",
				imageUrl: "",
				workTitle: "",
				workDescribe: ""
			}
		}, J = function(a) {
			var d, e, f, g, b = a && a.content && a.content.workShows || [],
				c = {
					online: "",
					upload: ""
				};
			$.each(b, function(a, b) {
				b.url && (c.online += myresumeCommon.utils.strFormat(myresumeCommon.templates.workShowOnline, {
					type: "online",
					id: b.id,
					href: b.url,
					desc: b.workName,
					ahref: ~b.url.indexOf("http://") || ~b.url.indexOf("https://") ? b.url : "http://" + b.url
				})), b.imageUrl && (c.upload += myresumeCommon.utils.strFormat(myresumeCommon.templates.workShowUpload, {
					type: "upload",
					id: b.id,
					imgsrc: b.cutImageUrl,
					imageUrl: b.imageUrl,
					desc: b.workDescribe,
					title: b.workTitle,
					hasTitle: "" != b.workTitle ? "" : "dn"
				}))
			}), q.html(c.online), r.html(c.upload), d = $(".mr_wu_con .mr_content_l"), d.each(function() {
				var a = $(this);
				a.hasClass("dn") && "" != $.trim(a.parent().next(".mr_wu_con_m").text()) && (a.parent().addClass("step_aside"), a.parent().next(".mr_wu_con_m").addClass("step_content"))
			}), b.length ? u.hide() : u.show(), globals.hasWorkShows = b.length ? !0 : !1, updateResumeTime(a.content.refreshTime), "" != oMoudleScore.workShowScore && (amountScore -= oMoudleScore.workShowScore), oMoudleScore.workShowScore = "", e = a.content.infoCompleteStatus.score, f = parseInt($.trim($(".mr_bfb").text())), g = amountScore - f + e, updateRatioRM(e, g)
		}, L = function(c) {
			var d, e;
			j.find(":submit").val("保存中...").attr("disabled", !0), d = I(), b == a.online ? (e = v.val(), myresumeCommon.utils.addHttpPrefix("", e, function(a) {
				e = "" == e ? "" : a
			}), d.url = $.trim(e), d.workName = $.trim(w.val())) : b == a.upload && (d.workTitle = $.trim(B.val()), d.workDescribe = $.trim(C.val()), d.imageUrl = $.trim(A.attr("data-origin-src")), d.cutImageUrl = $.trim(A.attr("src"))), myresumeCommon.utils.requester({
				url: myresumeCommon.requestTargets.workShowSave,
				data: d
			}, function(a) {
				J(a), k.trigger("click"), j.find(":submit").val("保 存").attr("disabled", !1);
				var b = $("#worksshowUpShow");
				b.attr("src", "").attr("data-origin-src", "").css({
					width: 0,
					height: 0
				}), b.prev().prev().removeClass("up"), $("#workUploadTitle").val(""), $("#workImagesDescContent").val(""), c == p && ($("#workOnlineUrl").val(""), $("#workOnlineDescContent").val("")), b.parent().find(".work-pic-hidden").val("")
			})
		}, M = function() {
			n.find("span.error").hide()
		}, N = function() {
			var c = b == a.upload ? o : p;
			return c.valid() && L(c), !1
		}, O = {
			rules: {
				workPicHidden: {
					required: !0
				},
				workTitle: {
					required: !1,
					maxlenStr: 50
				},
				workDescribe: {
					required: !1,
					tinymceLength: [0, 500]
				},
				url: {
					required: !0,
					maxlenStr: 60,
					checkUrl: !0
				},
				workDescribeOnline: {
					required: !1,
					tinymceLength: [0, 500]
				}
			},
			messages: {
				workPicHidden: {
					required: "请选择要上传的图片"
				},
				workTitle: {
					required: "请输入作品标题",
					maxlenStr: "请输入有效的作品标题（100字符以内）"
				},
				workDescribe: {
					required: "请描述你的作品",
					tinymceLength: "请输入1000字符以内的描述"
				},
				url: {
					required: "请输入在线地址",
					maxlenStr: "请输入120字符以内的网址",
					checkUrl: "请输入有效的在线地址"
				},
				workDescribeOnline: {
					required: "请描述你的作品",
					tinymceLength: "请输入200字符以内的描述"
				}
			},
			errorPlacement: function(a, b) {
				"button" == b.attr("type") ? a.appendTo($(b).parent()) : a.insertAfter($(b).parent())
			}
		}, Q = function(a, b, c) {
			var d = function() {
					var e, d = $.trim(a.val());
					c && myresumeCommon.utils.addHttpPrefix("", d, function(a) {
						d = "" == d ? "" : a
					}), e = b[0].tagName.toLowerCase(), "a" == e ? (0 == d.length, b.attr("href", d), b.html(d)) : (0 == d.length && (d = i.url), b.html(d))
				};
			a.bind("keyup", d).bind("blur", d)
		}, R = function(a, b) {
			var e, c = function() {
					var c = $.trim(a.val()) || i.previewText;
					b.html(c)
				},
				d = a.parent().find("iframe")[0];
			d && (e = d.contentDocument.body, e.onkeyup = c, e.onblur = c, e.onfocus = c)
		}, S = function(a) {
			var b, c, e, g, h, i, k, l, m, n, o, p;
			"" == d && (d = "addWorksShowOnlineFormUpdate", f = !1, kb(), b = $("#addWorksShowOnlineFormUpdate")[0].outerHTML, a.after(b), c = j.find("#addWorksShowOnlineFormUpdate"), e = c.find("#workOnlineDescContentUpdate"), e.tinymce(myresumeCommon.config.tinymce), g = c.find("#workOnlineUrlUpdate"), h = a.attr("data-id"), i = $.trim(a.find(".mr_self_sitelink").text()), k = $.trim(a.find(".mr_wo_preview").html()), l = c.find(".mr_self_sitelink"), m = c.find(".mr_wo_preview"), l.html(i), m.html(k), g.val(i), e.val(k), a.hide(), c.show(), Q(g, l, !0), R(e, m), e.bind("full2restore", function(a, b) {
				m.html(b)
			}), c.validate(O), n = c.find(".mr_save"), o = c.find(".mr_cancel"), p = c.find(".mr_del_ok"), n.bind("click", function() {
				if (c.valid()) {
					n.val("保存中...").attr("disabled", !0);
					var a = I();
					a.url = $.trim(g.val()), a.workName = $.trim(e.val()), a.wsid = h, myresumeCommon.utils.requester({
						url: myresumeCommon.requestTargets.workShowSave,
						data: a
					}, function(a) {
						J(a), o.trigger("click"), n.val("保 存").attr("disabled", !1), mb(), e.remove(), d = "", f = !0
					})
				}
				return !1
			}), o.bind("click", function() {
				a.show(), c.remove(), myresumeCommon.utils.unset([c, e, g, l, m, n, o, p]), d = "", f = !0, mb()
			}), p.bind("click", function() {
				p.text("删除中...").attr("disabled", !0);
				var a = I();
				return a.id = h, myresumeCommon.utils.requester({
					url: myresumeCommon.requestTargets.workShowDel,
					data: a
				}, function(a) {
					var b, c, g;
					J(a), o.trigger("click"), p.text("删 除").attr("disabled", !1), "" != oMoudleScore.workShowScore && (amountScore -= oMoudleScore.workShowScore), oMoudleScore.workShowScore = "", b = a.content.infoCompleteStatus.score, c = parseInt($.trim($(".mr_bfb").text())), g = amountScore - c + b, amountScore = g, updateRatioRM(b, g), e.remove(), mb(), d = "", f = !0
				}), !1
			}), K(c))
		}, T = function(a) {
			var b, c, e, g, h, i, k, l, m, n, o, p, q, r;
			"" == d && (d = "addWorksShowUploadFormUpdate", f = !1, kb(), b = $("#addWorksShowUploadFormUpdate")[0].outerHTML, a.after(b), c = j.find("#addWorksShowUploadFormUpdate"), e = c.find("#workImagesDescContentUpdate"), e.tinymce(myresumeCommon.config.tinymce), g = c.find("#workUploadTitleUpdate"), h = a.attr("data-id"), i = $.trim(a.find(".mr_wu_t img").attr("src")), k = $.trim(a.find(".mr_wu_t img").attr("data-origin-src")), l = $.trim(a.find(".mr_work_title").text()), l = l.substring(2, l.length - 2), m = $.trim(a.find(".mr_wu_con_m").html()), n = c.find(".worksshow_img"), n.attr("data-origin-src", k), o = n.prev().prev(), o.addClass("up"), "" != i ? n.css({
				width: "100%",
				height: "100%"
			}).attr("src", i) : (logoSrc = "", o.removeClass("up"), n.css({
				width: 0,
				height: 0
			}).attr("src", i)), g.val(l), e.val(m), a.hide(), c.show(), c.validate(O), p = c.find(".mr_save"), q = c.find(".mr_cancel"), r = c.find(".mr_del_ok"), p.bind("click", function() {
				if (c.valid()) {
					p.val("保存中...").attr("disabled", !0);
					var a = I();
					a.wsid = h, a.workTitle = $.trim(g.val()), a.workDescribe = $.trim(e.val()), a.imageUrl = $.trim(n.attr("data-origin-src")), a.cutImageUrl = $.trim(n.attr("src")), myresumeCommon.utils.requester({
						url: myresumeCommon.requestTargets.workShowSave,
						data: a
					}, function(a) {
						J(a), e.remove(), q.trigger("click"), p.val("保 存").attr("disabled", !1), e.remove(), mb(), d = "", f = !0
					})
				}
				return !1
			}), q.bind("click", function() {
				a.show(), c.remove(), myresumeCommon.utils.unset([c, e, g, p, q, r]), d = "", f = !0, mb()
			}), r.bind("click", function() {
				r.text("删除中...").attr("disabled", !0);
				var a = I();
				return a.id = h, myresumeCommon.utils.requester({
					url: myresumeCommon.requestTargets.workShowDel,
					data: a
				}, function(a) {
					J(a), e.remove(), q.trigger("click"), r.text("删 除").attr("disabled", !1), mb(), d = "", f = !0
				}), !1
			}), K(c))
		}, U = function() {
			var a = $(this),
				b = a.attr("data-type");
			"online" == b ? S(a.parents(".mr_wo_show")) : T(a.parents(".mr_wu_show"))
		}, W = function() {
			q.html(""), r.html(""), D() ? u.hide() : u.show()
		}, X = function() {
			k.bind("click", H), s.bind("click", H), t.bind("click", N), E(), o.validate(O), p.validate(O), u.click(function() {
				k.trigger("click")
			}), m.delegate(".mr_wo_show .mr_edit_text, .mr_wu_show .mr_edit_text", "click", U), window.setTimeout(function() {
				Q(v, x, !0), R(w, y), K(o), K(p), w.bind("full2restore", function(a, b) {
					y.html(b)
				})
			}, 3e3)
		}, Y = $("#cropimageContainer"), Z = Y.find("#cropzoom_container"), _ = Y.find("#cropimageEnsure"), ab = Y.find("#cropimageRestore"), _.bind("click", function() {
			$(".add_worksshow_form").find(":submit").val("上传中").attr("disabled", !0), bb.send(ctx + myresumeCommon.requestTargets.workCut, "POST", {
				resubmitToken: globals.token
			}, function(a) {
				bb.showImage.prev().prev().prev().removeClass("active").addClass("up"), bb.showImage.parent().find(".work-pic-hidden").val(a.content), bb.showImage.attr("src", ctx + "/" + a.content).css({
					width: "100%",
					height: "100%"
				}), $.colorbox.close(), bb.showImage = null, null != a.resubmitToken && "" != a.resubmitToken && (globals.token = a.resubmitToken), $(".add_worksshow_form").find(":submit").val("保存").attr("disabled", !1), bb.restore()
			})
		}), ab.bind("click", function() {
			$("#worksShow input[name='workPicHidden']").val(""), bb.restore(), $.colorbox.close()
		}), cb = function(a, b) {
			var c = $("#" + b + "Show"),
				d = ctx + "/" + a.uploadPath;
			c.parent().parent().find(".error").hide(), c.attr("data-origin-src", d), $.colorbox({
				inline: !0,
				href: Y,
				title: "选择裁剪区域"
			}), myresumeCommon.config.cutImage.image.source = d, myresumeCommon.config.cutImage.image.width = a.srcImageW, myresumeCommon.config.cutImage.image.height = a.srcImageH, myresumeCommon.config.cutImage.selector.w = myresumeCommon.config.workShowSelector.width, myresumeCommon.config.cutImage.selector.h = myresumeCommon.config.workShowSelector.height, bb = Z.cropzoom(myresumeCommon.config.cutImage), bb.showImage = c
		}, db = function() {}, {
			init: X,
			addUploadSucc: cb,
			addUploadFail: db,
			clear: W
		}
	}(), window.worksShowOperator = ib, ib.init(), $("#worksShow").delegate(".mr_worksshow_upimage", "mouseover", function() {
		var a = $(this).find("div");
		a.hasClass("up") || a.addClass("active")
	}), $("#worksShow").delegate(".mr_worksshow_upimage", "mouseout", function() {
		var a = $(this).find("div");
		a.hasClass("up") || a.removeClass("active")
	}), jb = function() {
		var a = {
			edit: "编辑",
			cancel: "取消"
		},
			b = {
				normal: 0,
				edit: 1
			},
			c = {
				skillplanstart: 10,
				skillplanend: 420,
				skillcirclestart: 122,
				skillcircleend: 532,
				allwidth: 410
			},
			e = b.normal,
			g = {
				editcancel: "mr_addup_cel"
			},
			h = {
				inbk: "inline-block"
			},
			i = {
				defaultText: "基础",
				hashDefine: {
					"基础": {
						min: 0,
						max: 140
					},
					"熟练": {
						min: 140,
						max: 280
					},
					"精通": {
						min: 280,
						max: 420
					}
				}
			},
			j = {
				skillTitle: "输入技能名称"
			},
			k = 5,
			l = function() {
				return e
			},
			m = function(a) {
				var c, b = i.defaultText;
				for (c in i.hashDefine) if (i.hashDefine[c].min < a && a <= i.hashDefine[c].max) {
					b = c;
					break
				}
				return b
			},
			n = $("#skillsAssess"),
			o = n.find(".mr_moudle_content"),
			p = o.find(".mr_skill_con"),
			q = o.find(".me_skill_list"),
			r = n.find(".mr_head_r"),
			s = r.find("em"),
			t = n.find(".mr_skill_delete"),
			u = n.find(".mr_skill_circle"),
			v = n.find(".mr_skill_level"),
			w = n.find(".mr_empty_add"),
			x = n.find(".mr_skill_add"),
			y = n.find(".mr_skill_add_button"),
			z = n.find(".mr_skill_opera"),
			A = z.find(".mr_save"),
			B = z.find(".mr_cancel"),
			D = function() {
				if ("" == d) {
					s.text(a.cancel), r.addClass(g.editcancel), F(!0), t = q.find(".mr_skill_delete"), u = q.find(".mr_skill_circle"), v = q.find(".mr_skill_level"), t.css("display", h.inbk), u.css("display", h.inbk), v.hide(), x.show(), O(), e = b.edit;
					var c = $(".mr_skill_name");
					"输入技能名称" == $.trim(c.text()) && c.css("font-style", "italic"), d = "updateSkill", f = !1, kb(), o.addClass("mr_skilledit_background")
				}
			},
			E = function() {
				s.text(a.edit), r.removeClass(g.editcancel), F(), t = q.find(".mr_skill_delete"), u = q.find(".mr_skill_circle"), v = q.find(".mr_skill_level"), t.hide(), u.hide(), v.show(), x.hide(), e = b.normal, d = "", f = !0, mb(), o.removeClass("mr_skilledit_background")
			},
			F = function(a) {
				q.children('.mr_skill_con[data-del-flag!="1"]').length || (a ? (w.hide(), q.html(myresumeCommon.utils.strFormat(myresumeCommon.templates.skillItem, {
					skillPercent: "10",
					id: "",
					skillName: j.skillTitle,
					masterLevel: "了解"
				})), q.children("div").attr("data-add-flag", "1")) : (w.show(), z.hide()))
			},
			G = function() {
				H(), e == b.normal ? D() : E()
			},
			H = function() {
				o.find("div[data-add-flag=1]").remove(), q.children("div[data-del-flag=1]").show().removeAttr("data-del-flag"), Q(o.find("div[data-grade-edit=1]")), o.find(".mr_skill_con").each(function() {
					var a = $(this).find(".mr_skill_name");
					a.text(a.attr("title"))
				})
			},
			I = function() {
				var a = [];
				return q.children("div[data-del-flag=1][data-add-flag!=1]").each(function(b, c) {
					a.push(c.getAttribute("data-skill-id"))
				}), a
			},
			J = function() {
				var e, a = 40,
					b = n.find(".mr_skill_con"),
					c = !1,
					d = 0;
				return $.each(b, function(a) {
					var f, g, b = $(this);
					if (1 != b.attr("data-del-flag")) {
						if (f = $.trim(b.find(".mr_skill_name").text()), "" == f || ~f.indexOf(j.skillTitle)) return e = a, c = !0, !1;
						g = getStrLen(f), g > d && (d = g, e = a)
					}
				}), c ? (void 0 != e && $(b[e]).find(".mr_skill_name").trigger("click"), myresumeCommon.utils.errorTips(n.find(".error"), "必填"), !1) : d > a ? (void 0 != e && $(b[e]).find(".mr_skill_name").trigger("click"), myresumeCommon.utils.errorTips(n.find(".error"), "请输入20个字以内的技能名称"), !1) : !0
			},
			K = function() {
				var a, b;
				if (J()) return a = I(), b = N(), n.find(":submit").val("保存中...").attr("disabled", !0), a.length ? (myresumeCommon.utils.requester({
					url: myresumeCommon.requestTargets.skillDel,
					data: {
						skillId: a.join(",")
					}
				}, function() {
					L(b)
				}), void 0) : (L(b), void 0)
			},
			L = function(a) {
				var b = {
					skillJson: JSON.stringify(a),
					resumeId: globals.resumeId
				};
				myresumeCommon.utils.requester({
					url: myresumeCommon.requestTargets.skillSave,
					data: b
				}, function(a) {
					M(a), G(), n.find(":submit").val("保 存").attr("disabled", !1)
				})
			},
			M = function(a) {
				var d, e, f, b = a && a.content && a.content.skillEvaluates || [],
					c = "";
				$.each(b, function(a, b) {
					c += myresumeCommon.utils.strFormat(myresumeCommon.templates.skillItem, b)
				}), q.html(c), b.length ? w.hide() : w.show(), Q(q.children()), globals.hasSkillEvaluates = b.length ? !0 : !1, updateResumeTime(a.content.refreshTime), "" != oMoudleScore.skillScore && (amountScore -= oMoudleScore.skillScore), oMoudleScore.skillScore = "", d = a.content.infoCompleteStatus.score, e = parseInt($.trim($(".mr_bfb").text())), f = amountScore - e + d, updateRatioRM(d, f)
			},
			N = function() {
				var a = q.find(".mr_skill_con"),
					b = R(a);
				return b
			},
			O = function() {
				q.children('.mr_skill_con[data-del-flag!="1"]').length >= k ? y.hide() : y.show()
			},
			P = function(a) {
				a.attr("data-add-flag", "1"), a.removeAttr("data-del-flag"), a.find(".mr_skill_plan em").width(c.skillplanstart), a.find(".mr_skill_circle").css("left", c.skillcirclestart).find("em").text(i.defaultText), a.removeAttr("data-grade").removeAttr("data-grade-edit").removeAttr("data-skill-id"), a.find(".mr_skill_name").attr("title", "").css("font-style", "italic"), a.show(), O()
			},
			Q = function(a) {
				a = a || p, a.each(function(a, b) {
					var d = c.allwidth * (b.getAttribute("data-grade") / 100),
						e = $(b),
						f = m(d);
					e.find(".mr_skill_plan em").width(c.skillplanstart + d), e.find(".mr_skill_circle").css("left", c.skillcirclestart + d + "px").find("em").text(f), e.find(".mr_skill_level").text(f)
				})
			},
			R = function(a) {
				var b = [];
				return a = a || p, a.each(function(a, d) {
					var f, g, h, e = $(d);~$.trim(e.find(".mr_skill_name").text()).indexOf(j.skillTitle) || e.attr("data-del-flag") || (f = {}, g = e.find(".mr_skill_plan em").width() - c.skillplanstart, h = parseInt(100 * (g / c.allwidth)), f.id = e.attr("data-skill-id") || "", f.skillName = $.trim(e.find(".mr_skill_name").text()), f.masterLevel = $.trim(e.find(".mr_skill_circle").text()), f.skillPercent = 0 > +h ? 0 : h, b.push(f))
				}), b
			},
			S = function(a) {
				$(this).parent(".mr_skill_con").attr("data-del-flag", 1).hide(), O(), a.stopPropagation()
			},
			T = function() {
				q.html(""), w.show()
			},
			U = function() {
				Q(), r.bind("click", G), B.bind("click", G), w.bind("click", G), A.bind("click", K), n.delegate(".mr_skill_delete", "click", S)
			};
		return {
			init: U,
			clear: T,
			initWidths: c,
			rangeDefine: i,
			onAddSkill: P,
			defaultsText: j,
			getState: l,
			toggleOpenOnclick: G
		}
	}(), jb.init(), $(".mr_created").delegate(".mr_click_flag", "click", function(a) {
		a.stopPropagation(), $(".xl_list").hide(), $(".select_color").removeClass("select_color"), $(this).addClass("select_color"), C && C.hide(), E && E.hide(), D && D.hide(), Z && Z.hide(), _ && _.hide(), ab && ab.hide(), bb && bb.hide(), G && G.hide(), H && H.hide(), I && I.hide(), J && J.hide(), Z && Z.hide(), _ && _.hide()
	}), $("#skillsAssess").delegate(".mr_skill_circle", "mousedown", function() {
		var a = $(this),
			b = a.siblings(".mr_skill_plan").find("em"),
			c = a.parent(".mr_skill_con"),
			d = a.siblings(".mr_skill_plan");
		return a.parent().attr("data-grade-edit", "1"), $(document).on("mousemove", function(e) {
			var f = e || event,
				g = f.clientX - c.offset().left - 122 - a.width() / 2;
			0 > g ? g = 0 : g > d.width() - a.width() / 2 && (g = d.width() - a.width() / 2), a.css({
				left: 122 + g + "px"
			}), b.width(g + a.width() / 2), b.width() <= 140 ? a.find("em").text("基础") : b.width() > 140 && b.width() <= 280 ? a.find("em").text("熟练") : b.width() > 280 && b.width() <= 400 ? a.find("em").text("精通") : b.width()
		}), $(document).on("mouseup", function() {
			$(this).off("mousemove"), $(this).off("mouseup")
		}), !1
	}), $("#skillsAssess").delegate(".mr_skill_name", "click", function(a) {
		if (jb.getState()) {
			$text = $(this).text();
			var b = $('<input type="text" name="skillname" />');
			$(this).empty(), b.appendTo($(this)), b.val($text), b.css({
				width: "90px",
				height: "22px",
				"font-size": "14px",
				border: "none",
				outline: "none",
				margin: "0px",
				padding: "0 5px",
				border: "1px solid #00b88d",
				"line-height": "22px"
			}), b.on("click", function(a) {
				a.stopPropagation()
			}), b.on("focus", function() {
				var a = $.trim(b.val());
				"" == a || a == jb.defaultsText.skillTitle ? b.css("color", "silver") : b.css("color", "#000"), b.select()
			}), b.on("blur", function() {
				var a = $.trim(b.val()) || jb.defaultsText.skillTitle,
					c = b.closest(".mr_skill_name");
				c.text(a), a == jb.defaultsText.skillTitle ? c.css("font-style", "italic") : c.css("font-style", "normal"), b.remove()
			}), b.on("keyup", function() {
				$.trim(b.val()), b.css("color", "#000")
			}), b.focus(), a.stopPropagation()
		}
	}), nb = navigator.appName, ob = navigator.appVersion, pb = ob.split(";"), pb.length > 1 && (qb = pb[1].replace(/[ ]/g, "")), $(".mr_skill_add_button span").on("click", function(a) {
		var b = $(".mr_skill_con"),
			c = $(".mr_skill_con").eq(b.length - 1),
			d = c.clone(!0);
		d.find(".mr_skill_name").text(jb.defaultsText.skillTitle), c.after(d), jb.onAddSkill(d), a.stopPropagation()
	}), $(".mr_set_default").bind("click", function(a) {
		var b, c, d;
		a.stopPropagation(), b = $(this), c = b.find(".set_default_wrap"), d = b.find(".xl_list"), c.hasClass("active") ? (c.removeClass("active"), d.hide()) : (c.addClass("active"), d.show())
	}), $(".ul_resume_type li").bind("click", function(a) {
		var b, c;
		a.stopPropagation(), b = $(this), c = b.parent().parent(), $.ajax({
			url: ctx + "Resume/setDefaultResume",
			type: "POST",
			data: {
				type: b.attr("data-type")
			}
		}).done(function(a) {
			a.success ? (c.hide(), $("#default_resume").val(b.text()), $(".set_default_wrap").removeClass("active")) : alert(a.msg)
		})
	})
}), uploadFlag = 1, window.setTimeout(function() {
	handleFrames()
}, 7e3), openFlag = !0, toggleHandler = function(a) {
	var b;
	a = a, b = $(a).find("input"), b.click(function() {
		openFlag && (openFlag = !1, "3" != globals.isOpenResume && "2" != globals.isOpenResume && (b.eq(1).is(":checked") ? switchResumeStatus(0, a, b) : switchResumeStatus(1, a, b)))
	}), $(a).hover(function() {
		$(".openresume_tip").toggleClass("dn")
	}, function() {
		$(".openresume_tip").toggleClass("dn")
	}), $("#openResumeStatus .btn").click(function() {
		switchResumeStatus(0, a, b)
	})
}, $(document).ready(function() {
	var a = $(".openresume_tip");
	"3" == globals.isOpenResume && (a.hide(), $(".firstset").show()), $(".toggle").each(function(a, b) {
		toggleHandler(b)
	}), $(".openresume_tip i").bind("click", function(a) {
		a.stopPropagation, $(this).parent().hide()
	}), $(".toggle").mouseover(function() {
		switch (globals.isOpenResume) {
		case "2":
			$(".unopen").show();
			break;
		case "3":
			$(".firstset").show()
		}
	})
});