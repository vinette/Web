function reqHotwords(a) {
	var b, c, d, e, f;
	if (searchWrap = a, b = $("#search_input"), c = b.val(), d = $("#isIndex").val(), c == b.attr("placeholder") && (c = ""), "" != a.hotwords) {
		for (e = "<dt>热门搜索：</dt>", f = 0; f < a.hotwords.length; f++) e += a.hotwords[f].isHighLight ? '<dd><a href="' + a.hotwords[f].url + '" class="current">' + a.hotwords[f].text + "</a></dd>" : '<dd><a href="' + a.hotwords[f].url + '">' + a.hotwords[f].text + "</a></dd>";
		$(".hotSearch").html(e)
	}
	"" != a.recommendSearchWord && "" == c && "true" == d && b.css("color", "#999").val(a.recommendSearchWord.text), b.bind("focus", function() {
		this.value == a.recommendSearchWord.text && "true" == d && (this.value = "", this.style.color = "#333")
	}).bind("blur", function() {
		this.value || "true" != d || (this.value = a.recommendSearchWord.text, this.style.color = "#999")
	})
}!
function(a) {
	var b = a.createElement("script"),
		c = a.getElementsByTagName("head")[0];
	b.src = "/Index/getKeywords/?callback=reqHotwords", c.appendChild(b)
}(document);
var searchWrap = "";
$(function() {
	$(window).resize(function() {
		var a = $("#search_box").offset().left + 96;
		$(".ui-autocomplete").css("left", a)
	}), $(".ui-autocomplete").css("height", "200px"), $.widget("custom.catcomplete", $.ui.autocomplete, {
		_renderItem: function(a, b) {
			var c = b.count >= 600 ? "大于" : "共";
			return $("<li></li>").data("item.autocomplete", b).append("<a><span class='fl'>" + b.name + "</span><span class='fr'>" + c + "<i>" + b.count + "个</i>职位</span></a>").appendTo(a)
		},
		_renderMenu: function(a, b) {
			var c = this,
				d = "";
			$.each(b, function(b, e) {
				e.category != d && (a.append("<li class='ui-autocomplete-category'>" + e.category + "</li>"), d = e.category), c._renderItemData(a, e)
			}), a.find(".ui-autocomplete-category:not(:first-child)").next().css("borderTop", "1px dashed #e5e5e5"), a.find(".ui-autocomplete-category").first().css("borderTop", "none")
		}
	});
	var a = "";
	$("#search_input").catcomplete({
		minLength: 0,
		source: function(b, c) {
			"" != $.trim(b.term) ? $.ajax({
				url: ctx + "/suggest.json",
				dataType: "json",
				data: {
					query: b.term
				},
				success: function(b) {
					var d, e, f, g;
					for (a = b.requestId, d = new Array, e = "", f = ["职位", "公司", "城市"], g = 0; g < b.content.length; g++) $.each(b.content[g], function(a, b) {
						e = '{"name":"' + b.name + '","count":"' + b.count + '","type":"' + b.type + '","category":"' + f[g] + '"}', e = jQuery.parseJSON(e), d.push(e)
					});
					c(d)
				}
			}) : c("")
		},
		focus: function() {
			return !1
		},
		select: function(b, c) {
			$("#requestId").val(a), $("#search_input").val(c.item.name);
			var d = encodeURIComponent(c.item.name);
			return $("#searchForm").attr("action", ctx + "/Jobs/index/?kd=" + d), $("#search_button").trigger("click", [c.item.type, !0]), !1
		}
	}), $("#search_button").click(function(a, b, c) {
		var d, e, f, g;
		b && $("#spcInput").val(b), d = $("#searchType li").attr("data-searchtype"), "4" == d && $("#cityInput").val("全国"), e = $.trim($("#search_input").val()), ("请输入职位名称，如：产品经理" == e || "请输入公司名称，如：百度" == e || "请输入宣讲会名称，如：百度" == e) && (e = ""), f = /[\\\/]/g, g = e.replace(f, " "), g = encodeURIComponent(g), c ? $("#labelWords").val("sug") : $("#labelWords").val(""), $("#searchForm").trigger("submit")
	}), $("#searchType").hover(function() {
		$(this).children("li").show(), $(this).siblings(".searchtype_arrow").addClass("transform")
	}, function() {
		$(this).children("li").not(".type_selected").hide(), $(this).siblings(".searchtype_arrow").removeClass("transform")
	}), $("#searchType li").click(function() {
		$(this).siblings("li").hide(), $(this).hasClass("type_selected") || ($("#searchType li").removeClass("type_selected"), $(this).addClass("type_selected").prependTo("#searchType"));
		var b = $(this).attr("data-searchtype");
		//b == 1 ? ($("#search_input").attr("placeholder", "请输入职位名称，如：产品经理"), $(".placeholder").val("请输入职位名称，如：产品经理")) : ($("#search_input").attr("placeholder", "请输入公司名称，如：百度"), $(".placeholder").val("请输入公司名称，如：百度")), $("#spcInput").val(b), $(this).children("li").not(".type_selected").hide(), $(this).siblings(".searchtype_arrow").removeClass("transform")
	  if (b==1) {
		  $("#search_input").attr("placeholder", "请输入职位名称，如：产品经理"), $(".placeholder").val("请输入职位名称，如：产品经理");
		  $("#spc").val(1);
	  }else if(b==2){
		  $("#spc").val(2);
		  $("#search_input").attr("placeholder", "请输入公司名称，如：乔麦"), $(".placeholder").val("请输入公司名称，如：乔麦");
	  }else if(b==3){
		  $("#spc").val(3);
		  $("#search_input").attr("placeholder", "请输入宣讲会名称，如：乔麦2015宣讲会"), $(".placeholder").val("请输入宣讲会名称，如：乔麦2015宣讲会");
	  }
	}) /*,$("#searchForm").bind("submit", function() {
		var a = $("#isIndex").val(),
			b = $("#search_input").val(),
			c = /[\\\/]/g;
		//return b = b.replace(c, " "), "" != b && searchWrap.recommendSearchWord.text != b || "true" != a ? (b = encodeURIComponent(b), $(this).attr("action", ctx + "Jobs/index.html?jd=" + b), !0) : (window.location.href = searchWrap.recommendSearchWord.url, !1)
	})*/
});