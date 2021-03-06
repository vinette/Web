!
function() {
	function e(e) {
		var t = top.location,
			n = {
				protocol: t.protocol.substring(0, t.protocol.length - 1),
				hostname: t.hostname,
				port: t.port || "80"
			},
			i = d.exec(e.url);
		if (i && i.length) {
			var r = {
				protocol: i[1],
				hostname: i[2],
				port: i[3] || "80"
			};
			if (n.protocol != r.protocol || n.hostname != r.hostname || n.port != r.port) e.dataType = "jsonp", e.jsonp = "jsoncallback"
		}
	}
	function t() {
		v.tinfo("Resource Ready!"), E = !0
	}
	function n(e) {
		var t = $("#remember", e);
		if (t.prop("checked")) t.val(1);
		else t.val(null);
		var n = $.trim($("#email", e).val()),
			i = $("#password", e).val();
		i = md5(i), i = md5(p + i + p);
		var r = t.val(),
			o = void 0 == r || null == r ? !1 : 1 == r ? !0 : !1;
		$(e).find(":submit").attr("disabled", !0), $.ajax({
			type: "POST",
			data: {
				username: n,
				password: i,
				rememberMe: o
			},
			url: f.server + f.poplogin,
			dataType: "jsonp",
			jsonp: "jsoncallback"
		}).done(function(t) {
			if (1 == t.state) {
				var n = v.getCurEncodeUrl(),
					i = v.getTargetUrl(f.server + f.poptransfer, {
						fl: "2",
						service: n,
						osc: "PASSPORT._pscb(" + l + ")",
						ofc: "PASSPORT._pfcb(" + l + ")"
					});
				v.createIframe("popup_login_iframe", i)
			} else {
				var r = h[t.state] || h.other;
				$("#login_beError").text(r).show()
			}
			$(e).find(":submit").attr("disabled", !1)
		})
	}
	function i() {
		$("#login_form_popup").validate({
			onkeyup: !1,
			focusCleanup: !0,
			rules: {
				email: {
					required: !0,
					email: !0,
					maxlength: 100
				},
				password: {
					required: !0,
					rangelength: [6, 16]
				}
			},
			messages: {
				email: {
					required: "请输入登录邮箱地址",
					email: "请输入有效的邮箱地址，如：vivi@lagou.com",
					maxlength: "请输入100字以内的邮箱地址"
				},
				password: {
					required: "请输入密码",
					rangelength: "请输入6-16位密码，字母区分大小写"
				}
			}
		})
	}
	function r(e, t) {
		var n = e + "_" + t;
		$("#" + n).remove(), v.tinfo("Iframe " + n + " removed")
	}
	var o = !1,
		a = "1.0.2",
		s = "_lgpassport_",
		l = 0,
		u = {
			remote: {}
		},
		c = document.getElementById(s),
		d = /^(https?):\/\/((?:[\u4E00-\u9FA5a-z0-9.-]|%[0-9A-F]{2}){2,})(?::(\d+))?((?:\/(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})*)*)(?:\?((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?(?:#((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?$/i,
		f = {
			server: "http://passport.lagou.com",
			poplogin: "/login/login.json",
			poptransfer: "/ajaxLogin/frameGrant.html",
			autologin: "/ajaxLogin/login.html"
		},
		h = {
			240: "请输入常用邮箱地址",
			210: "请输入100字以内的邮箱地址",
			220: "请输入有效的邮箱地址，如：vivi@lagou.com",
			241: "请输入密码",
			211: "请输入6-16位密码，字母区分大小写",
			299: "您操作太频繁了,过一会儿再来吧!",
			400: "该帐号不存在或密码错误，请重新输入",
			401: "登录失败，该帐号已被禁用",
			500: "登录失败,系统内部异常",
			other: "网络异常，请刷新重试"
		},
		p = "veenike",
		m = {
			site: "/static/css/style.css",
			popup: "/static/css/loginPop/css/loginPop.css"
		},
		g = {
			jq: "/static/js/jquery-1.11.1.min.js",
			jqv: "/static/js/jquery.validate.js",
			cb: "/static/js/colorbox.min.js",
			jsf: "/static/js/stringifyJSON.min.js",
			md5: "/static/js/md5.js"
		},
		v = {
			rpc: function(t) {
				if (t.url) {
					t.type || (t.type = "POST"), t.params || (t.params = {});
					var n = arguments.callee;
					v.tinfo("Start passport.rpc: " + t.url);
					var i = {
						type: t.type,
						data: t.params,
						url: t.url,
						dataType: "json"
					};
					e(i), $.ajax(i).done(function(e, i) {
						if (v.tinfo("passport.rpc.succ: " + i), "10001" == e.state) return void PASSPORT.remote(e.content.data.crossServiceUrl, function() {
							v.tinfo("passport.rpc.remote.succ"), n(t)
						}, function(e) {
							v.tinfo("passport.rpc.remote.fail"), t.fail && t.fail.apply(null, [e])
						});
						else return void(t.succ && t.succ.apply(null, arguments))
					}).fail(function(e, n) {
						v.tinfo("passport.rpc.fail: " + n), t.fail && t.fail.apply(null, arguments)
					})
				}
			},
			getTargetUrl: function(e, t) {
				var n = {
					fl: void 0 != t.fl ? t.fl : !0,
					service: t.service,
					osc: t.osc,
					ofc: t.ofc,
					pfurl: v.getCurEncodeUrl()
				};
				return e + "?" + $.param(n)
			},
			getCurEncodeUrl: function() {
				return encodeURIComponent(document.URL)
			},
			createIframe: function(e, t) {
				var n = '<iframe src="' + t + '" id="' + e + "_" + l + '" style="display:none;"></iframe>';
				$("body").append(n), l++
			},
			requester: function(e, t) {
				e.dataType = e.dataType || "json", e.type = e.type || "POST", e.data = e.data || {}, $.ajax(e).done(function(e) {
					t && t(e)
				})
			},
			strFormat: function(e, t) {
				e = String(e);
				var n = Array.prototype.slice.call(arguments, 1),
					i = Object.prototype.toString;
				if (n.length) return n = 1 == n.length ? null !== t && /\[object Array\]|\[object Object\]/.test(i.call(t)) ? t : n : n, e.replace(/#\{(.+?)\}/g, function(e, t) {
					var r = n[t];
					if ("[object Function]" == i.call(r)) r = r(t);
					return "undefined" == typeof r ? "" : r
				});
				else return e
			},
			tipheader: "Lagou Passport v" + a + " -> ",
			tip: function() {
				if (o) {
					var e = arguments[0],
						t = Array.prototype.slice.call(arguments, 1);
					console[e].apply(console, t)
				}
			},
			tinfo: function(e) {
				v.tip("info", v.tipheader + e)
			}
		};
	v.tinfo("Enter passport...");
	var y = function(e) {
			function t(t, n) {
				var i, r = e.createElement(t);
				for (i in n) if (n.hasOwnProperty(i)) r.setAttribute(i, n[i]);
				return r
			}
			function n(e) {
				var t, n, i = u[e];
				if (i) if (t = i.callback, n = i.urls, n.shift(), c = 0, !n.length) t && t.call(i.context, i.obj), u[e] = null, d[e].length && r(e)
			}
			function i() {
				var t = navigator.userAgent;
				s = {
					async: e.createElement("script").async === !0
				}, (s.webkit = /AppleWebKit\//.test(t)) || (s.ie = /MSIE|Trident/.test(t)) || (s.opera = /Opera/.test(t)) || (s.gecko = /Gecko\//.test(t)) || (s.unknown = !0)
			}
			function r(r, c, f, h, p) {
				var m, g, v, y, b, x, w = function() {
						n(r)
					},
					F = "css" === r,
					C = [];
				if (s || i(), c) if (c = "string" == typeof c ? [c] : c.concat(), F || s.async || s.gecko || s.opera) d[r].push({
					urls: c,
					callback: f,
					obj: h,
					context: p
				});
				else for (m = 0, g = c.length; g > m; ++m) d[r].push({
					urls: [c[m]],
					callback: m === g - 1 ? f : null,
					obj: h,
					context: p
				});
				if (!u[r] && (y = u[r] = d[r].shift())) {
					for (l || (l = e.head || e.getElementsByTagName("head")[0]), b = y.urls.concat(), m = 0, g = b.length; g > m; ++m) {
						if (x = b[m], F) v = s.gecko ? t("style") : t("link", {
							href: x,
							rel: "stylesheet"
						});
						else v = t("script", {
							src: x
						}), v.async = !1;
						if (v.className = "lazyload", v.setAttribute("charset", "utf-8"), s.ie && !F && "onreadystatechange" in v && !("draggable" in v)) v.onreadystatechange = function() {
							if (/loaded|complete/.test(v.readyState)) v.onreadystatechange = null, w()
						};
						else if (F && (s.gecko || s.webkit)) if (s.webkit) y.urls[m] = v.href, a();
						else v.innerHTML = '@import "' + x + '";', o(v);
						else v.onload = v.onerror = w;
						C.push(v)
					}
					for (m = 0, g = C.length; g > m; ++m) l.appendChild(C[m])
				}
			}
			function o(e) {
				var t;
				try {
					t = !! e.sheet.cssRules
				} catch (i) {
					if (c += 1, 200 > c) setTimeout(function() {
						o(e)
					}, 50);
					else t && n("css");
					return
				}
				n("css")
			}
			function a() {
				var e, t = u.css;
				if (t) {
					for (e = f.length; --e >= 0;) if (f[e].href === t.urls[0]) {
						n("css");
						break
					}
					if (c += 1, t) if (200 > c) setTimeout(a, 50);
					else n("css")
				}
			}
			var s, l, u = {},
				c = 0,
				d = {
					css: [],
					js: []
				},
				f = e.styleSheets;
			return {
				css: function(e, t, n, i) {
					r("css", e, t, n, i)
				},
				js: function(e, t, n, i) {
					r("js", e, t, n, i)
				}
			}
		}(this.document),
		b = function() {
			function e() {}
			var t = e.prototype;
			return t._getEvents = function() {
				if (!this._events) this._events = {};
				return this._events
			}, t._getMaxListeners = function() {
				if (isNaN(this.maxListeners)) this.maxListeners = 10;
				return this.maxListeners
			}, t.on = function(e, t) {
				var n = this._getEvents(),
					i = this._getMaxListeners();
				n[e] = n[e] || [];
				var r = n[e].length;
				if (r >= i && 0 !== i) throw new RangeError("Warning: possible Emitter memory leak detected. " + r + " listeners added.");
				return n[e].push(t), this
			}, t.once = function(e, t) {
				function n() {
					i.off(e, n), t.apply(this, arguments)
				}
				var i = this;
				return n.listener = t, this.on(e, n), this
			}, t.off = function(e, t) {
				var n = this._getEvents();
				if (0 === arguments.length) return this._events = {}, this;
				var i = n[e];
				if (!i) return this;
				if (1 === arguments.length) return delete n[e], this;
				for (var r, o = 0; o < i.length; o++) if (r = i[o], r === t || r.listener === t) {
					i.splice(o, 1);
					break
				}
				return this
			}, t.emit = function(e) {
				var t = this._getEvents(),
					n = t[e],
					i = Array.prototype.slice.call(arguments, 1);
				if (n) {
					n = n.slice(0);
					for (var r = 0, o = n.length; o > r; r++) n[r].apply(this, i)
				}
				return this
			}, t.listeners = function(e) {
				var t = this._getEvents();
				return t[e] || []
			}, t.setMaxListeners = function(e) {
				return this.maxListeners = e, this
			}, e.mixin = function(t) {
				for (var n in e.prototype) t[n] = e.prototype[n];
				return t
			}, e
		}(),
		x = function() {
			var e = !1;
			try {
				e = !! ($ && jQuery && $("body").hide)
			} catch (t) {
				e = !1
			}
			return e
		}(),
		w = function() {
			return !(!x || !$("body").validate)
		}(),
		F = function() {
			return !(!x || !$.colorbox)
		}(),
		C = function() {
			return !!window.stringifyJSON
		}(),
		T = function() {
			return !(!T || !md5)
		}();
	v.tinfo("Has$: " + x), v.tinfo("HasValidate: " + w), v.tinfo("HasCb: " + F), v.tinfo("HasJsf: " + C), v.tinfo("HasMD5: " + T), function() {
		var e = c.getAttribute("data-css-site"),
			t = c.getAttribute("data-css-popup");
		if (e = void 0 == e ? 1 : +e, t = void 0 == t ? 1 : +t, e) v.tinfo("Load site style..."), y.css(f.server + m.site, function() {
			v.tinfo("Load site style success!")
		});
		if (t) v.tinfo("Load popup style..."), y.css(f.server + m.popup, function() {
			v.tinfo("Load popup style success!")
		})
	}();
	var E = !1;
	!
	function() {
		var e = {};
		!x && (e[g.jq] = !1), !w && (e[g.jqv] = !1), !F && (e[g.cb] = !1), !C && (e[g.jsf] = !1), !T && (e[g.md5] = !1);
		var n = function() {
				for (var t in e) if (!e[t]) return !1;
				return !0
			},
			i = function(i) {
				v.tinfo("Load " + i + "..."), y.js(f.server + i, function() {
					e[i] = !0, v.tinfo("Load " + i + " success!"), n() && t()
				})
			};
		for (var r in e) i(r)
	}();
	var k = new b,
		_ = function(e) {
			return function() {
				var t = 70,
					n = arguments;
				if (!E) window.setTimeout(function() {
					n.callee.apply(null, n)
				}, t);
				else e.apply(null, n)
			}
		},
		S = function() {
			var e = v.getCurEncodeUrl(),
				t = f.server;
			$.colorbox({
				html: '<div id="loginPop" class="popup" style="height:240px;"><form id="login_form_popup" action="javascript:;" method="post"><input type="text" id="email" name="email" tabindex="1" placeholder="请输入登录邮箱地址"><input type="password" id="password" name="password" tabindex="2" placeholder="请输入密码"><span class="error" style="display: none;" id="login_beError"></span><label class="fl" for="remember"><input type="checkbox" id="remember"  value="" checked="checked" name="autoLogin"> 记住我</label><a class="fr" href="' + t + '/accountPwd/toReset.html">忘记密码？</a><input type="submit" id="submitLogin" value="登 &nbsp; &nbsp; 录"></form><div class="login_right"><div>还没有拉勾帐号？</div><a href="' + t + '/register/register.html" class="registor_now">立即注册</a><div class="login_others">使用以下帐号直接登录:</div><a href="' + t + "/oauth20/auth_sinaWeiboProvider.html?service=" + e + '" target="_blank" id="icon_wb" class="icon_wb" title="使用新浪微博帐号登录"></a><a href="' + t + "/oauth20/auth_qqProvider.html?service=" + e + '" class="icon_qq" id="icon_qq" target="_blank" title="使用腾讯QQ帐号登录"></a><a href="' + t + "/oauth20/auth_weixinProvider.html?service=" + e + '" class="icon_weixin" id="icon_weixin" target="_blank" title="使用腾讯QQ帐号登录"></a></div></div>',
				title: "登录"
			}), $("body").on("click", "#login_form_popup #submitLogin", function() {
				var e = $("body #colorbox #login_form_popup");
				i();
				var t = e.valid();
				if (t) n(e);
				else return !1
			})
		};
	window.PASSPORT = window.PASSPORT || {
		on: function() {
			k.on.apply(k, arguments)
		},
		auto: _(function() {
			var e = v.getCurEncodeUrl(),
				t = v.getTargetUrl(f.server + f.autologin, {
					fl: "1",
					service: e,
					osc: "PASSPORT._ascb(" + l + ")",
					ofc: "PASSPORT._afcb(" + l + ")"
				});
			v.createIframe("auto_login_iframe", t)
		}),
		_ascb: function(e, t) {
			v.tinfo("Call of PASSPORT._ascb" + e + ": " + t), k.emit("autologin:succ", t), r("auto_login_iframe", e)
		},
		_afcb: function(e, t) {
			v.tinfo("Call of PASSPORT._afcb" + e + ": " + t), k.emit("autologin:fail", t), r("auto_login_iframe", e)
		},
		popup: _(function() {
			S()
		}),
		_pscb: function(e, t) {
			v.tinfo("Call of PASSPORT._pscb" + e + ": " + t), k.emit("popuplogin:succ", t), r("popup_login_iframe", e)
		},
		_pfcb: function(e, t) {
			v.tinfo("Call of PASSPORT._pfcb" + e + ": " + t), k.emit("popuplogin:fail", t), r("popup_login_iframe", e)
		},
		remote: _(function(e, t, n) {
			if (v.tinfo("Remote request: " + e + " " + t + " " + n), u.remote[l] = {}, t) u.remote[l].succ = t;
			if (n) u.remote[l].fail = n;
			v.tinfo("Remote request put into callbacks: " + JSON.stringify(u.remote));
			var i = v.getTargetUrl(f.server + f.autologin, {
				fl: "3",
				service: e,
				osc: "PASSPORT._rscb(" + l + ")",
				ofc: "PASSPORT._rfcb(" + l + ")"
			});
			v.createIframe("remote_login_iframe", i)
		}),
		_rscb: function(e, t) {
			v.tinfo("Call of PASSPORT._rscb" + e + ": " + t), k.emit("remotelogin:succ", t), r("remote_login_iframe", e), u.remote[e] && u.remote[e].succ && u.remote[e].succ(t)
		},
		_rfcb: function(e, t) {
			v.tinfo("Call of PASSPORT._rfcb" + e + ": " + t), k.emit("remotelogin:fail", t), r("remote_login_iframe", e), u.remote[e] && u.remote[e].fail && u.remote[e].fail(t)
		},
		util: {
			rpc: _(v.rpc)
		}
	}
}();