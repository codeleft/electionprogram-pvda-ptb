<!-- FUNCTION ONE -->
(function(t, e) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(["jquery"], e)
	} else if (typeof exports === "object") {
		if (typeof $ === "undefined") {
			module.exports = e(require("jquery"))
		} else {
			module.exports = e($)
		}
	} else {
		t.bootbox = e(t.jQuery)
	}
}(this, function t(e, o) {
	"use strict";
	var n = {
		dialog: "<div class='bootbox modal' tabindex='-1' role='dialog' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>",
		header: "<div class='modal-header'><h4 class='modal-title'></h4></div>",
		footer: "<div class='modal-footer'></div>",
		closeButton: "<button type='button' class='bootbox-close-button close' aria-hidden='true'>&times;</button>",
		form: "<form class='bootbox-form'></form>",
		inputs: {
			text: "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
			textarea: "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
			email: "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
			select: "<select class='bootbox-input bootbox-input-select form-control'></select>",
			checkbox: "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
			date: "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
			time: "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
			number: "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
			password: "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
		}
	};
	var l = {
		locale: "en",
		backdrop: "static",
		animate: !0,
		className: null,
		closeButton: !0,
		show: !0,
		container: "body"
	};
	var a = {};

	function b(t) {
		var e = i[l.locale];
		return e ? e[t] : i.en[t]
	};

	function c(t, o, a) {
		t.stopPropagation();
		t.preventDefault();
		var n = e.isFunction(a) && a.call(o, t) === !1;
		if (!n) {
			o.modal("hide")
		}
	};

	function d(t) {
		if (Object.keys) {
			return Object.keys(t).length
		};
		var o, e = 0;
		for (o in t) {
			e++
		};
		return e
	};

	function r(t, o) {
		var a = 0;
		e.each(t, function(t, e) {
			o(t, e, a++)
		})
	};

	function m(t) {
		var o, a;
		if (typeof t !== "object") {
			throw new Error("Please supply an object of options")
		};
		if (!t.message) {
			throw new Error("Please specify a message")
		};
		t = e.extend({}, l, t);
		if (!t.buttons) {
			t.buttons = {}
		};
		o = t.buttons;
		a = d(o);
		r(o, function(t, n, r) {
			var i = r === a - 1;
			if (e.isFunction(n)) {
				n = o[t] = {
					callback: n
				}
			};
			if (e.type(n) !== "object") {
				throw new Error("button with key " + t + " must be an object")
			};
			if (!n.label) {
				n.label = t
			};
			if (!n.className) {
				if (a <= 2 && i) {
					n.className = "btn-primary"
				} else {
					n.className = "btn-default"
				}
			}
		});
		return t
	};

	function C(t, e) {
		var a = t.length,
			o = {};
		if (a < 1 || a > 2) {
			throw new Error("Invalid argument length")
		};
		if (a === 2 || typeof t[0] === "string") {
			o[e[0]] = t[0];
			o[e[1]] = t[1]
		} else {
			o = t[0]
		};
		return o
	};

	function s(t, o, a) {
		return e.extend(!0, {}, t, C(o, a))
	};

	function u(t, e, o, a) {
		var n = {
			className: "bootbox-" + t,
			buttons: f.apply(null, e)
		};
		return p(s(n, a, o), e)
	};

	function f() {
		var o = {};
		for (var t = 0, r = arguments.length; t < r; t++) {
			var e = arguments[t],
				a = e.toLowerCase(),
				n = e.toUpperCase();
			o[a] = {
				label: b(n)
			}
		};
		return o
	};

	function p(t, e) {
		var a = {};
		r(e, function(t, e) {
			a[e] = !0
		});
		r(t.buttons, function(t) {
			if (a[t] === o) {
				throw new Error("button key " + t + " is not allowed (options are " + e.join("\n") + ")")
			}
		});
		return t
	};
	a.alert = function() {
		var t;
		t = u("alert", ["ok"], ["message", "callback"], arguments);
		if (t.callback && !e.isFunction(t.callback)) {
			throw new Error("alert requires callback property to be a function when provided")
		};
		t.buttons.ok.callback = t.onEscape = function() {
			if (e.isFunction(t.callback)) {
				return t.callback.call(this)
			};
			return !0
		};
		return a.dialog(t)
	};
	a.confirm = function() {
		var t;
		t = u("confirm", ["cancel", "confirm"], ["message", "callback"], arguments);
		if (!e.isFunction(t.callback)) {
			throw new Error("confirm requires a callback")
		};
		t.buttons.cancel.callback = t.onEscape = function() {
			return t.callback.call(this, !1)
		};
		t.buttons.confirm.callback = function() {
			return t.callback.call(this, !0)
		};
		return a.dialog(t)
	};
	a.prompt = function() {
		var t, d, c, b, i, m, l;
		b = e(n.form);
		d = {
			className: "bootbox-prompt",
			buttons: f("cancel", "confirm"),
			value: "",
			inputType: "text"
		};
		t = p(s(d, arguments, ["title", "callback"]), ["cancel", "confirm"]);
		m = (t.show === o) ? !0 : t.show;
		t.message = b;
		t.buttons.cancel.callback = t.onEscape = function() {
			return t.callback.call(this, null)
		};
		t.buttons.confirm.callback = function() {
			var o;
			if (t.inputType === "checkbox") {
				o = i.find("input:checked").map(function() {
					return e(this).val()
				}).get()
			} else {
				o = i.val()
			};
			return t.callback.call(this, o)
		};
		t.show = !1;
		if (!t.title) {
			throw new Error("prompt requires a title")
		};
		if (!e.isFunction(t.callback)) {
			throw new Error("prompt requires a callback")
		};
		if (!n.inputs[t.inputType]) {
			throw new Error("invalid prompt type")
		};
		i = e(n.inputs[t.inputType]);
		switch (t.inputType) {
			case "text":
			case "textarea":
			case "email":
			case "date":
			case "time":
			case "number":
			case "password":
				i.val(t.value);
				break;
			case "select":
				var u = {};
				l = t.inputOptions || [];
				if (!e.isArray(l)) {
					throw new Error("Please pass an array of input options")
				};
				if (!l.length) {
					throw new Error("prompt with select requires options")
				};
				r(l, function(t, a) {
					var n = i;
					if (a.value === o || a.text === o) {
						throw new Error("each option needs a `value` and a `text` property")
					};
					if (a.group) {
						if (!u[a.group]) {
							u[a.group] = e("<optgroup/>").attr("label", a.group)
						};
						n = u[a.group]
					};
					n.append("<option value='" + a.value + "'>" + a.text + "</option>")
				});
				r(u, function(t, e) {
					i.append(e)
				});
				i.val(t.value);
				break;
			case "checkbox":
				var C = e.isArray(t.value) ? t.value : [t.value];
				l = t.inputOptions || [];
				if (!l.length) {
					throw new Error("prompt with checkbox requires options")
				};
				if (!l[0].value || !l[0].text) {
					throw new Error("each option needs a `value` and a `text` property")
				};
				i = e("<div/>");
				r(l, function(o, a) {
					var l = e(n.inputs[t.inputType]);
					l.find("input").attr("value", a.value);
					l.find("label").append(a.text);
					r(C, function(t, e) {
						if (e === a.value) {
							l.find("input").prop("checked", !0)
						}
					});
					i.append(l)
				});
				break
		};
		if (t.placeholder) {
			i.attr("placeholder", t.placeholder)
		};
		if (t.pattern) {
			i.attr("pattern", t.pattern)
		};
		if (t.maxlength) {
			i.attr("maxlength", t.maxlength)
		};
		b.append(i);
		b.on("submit", function(t) {
			t.preventDefault();
			t.stopPropagation();
			c.find(".btn-primary").click()
		});
		c = a.dialog(t);
		c.off("shown.bs.modal");
		c.on("shown.bs.modal", function() {
			i.focus()
		});
		if (m === !0) {
			c.modal("show")
		};
		return c
	};
	a.dialog = function(t) {
		t = m(t);
		var a = e(n.dialog),
			f = a.find(".modal-dialog"),
			l = a.find(".modal-body"),
			p = t.buttons,
			s = "",
			i = {
				onEscape: t.onEscape
			};
		if (e.fn.modal === o) {
			throw new Error("$.fn.modal is not defined; please double check you have included the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ for more details.")
		};
		r(p, function(t, e) {
			s += "<button data-bb-handler='" + t + "' type='button' class='btn " + e.className + "'>" + e.label + "</button>";
			i[t] = e.callback
		});
		l.find(".bootbox-body").html(t.message);
		if (t.animate === !0) {
			a.addClass("fade")
		};
		if (t.className) {
			a.addClass(t.className)
		};
		if (t.size === "large") {
			f.addClass("modal-lg")
		} else if (t.size === "small") {
			f.addClass("modal-sm")
		};
		if (t.title) {
			l.before(n.header)
		};
		if (t.closeButton) {
			var u = e(n.closeButton);
			if (t.title) {
				a.find(".modal-header").prepend(u)
			} else {
				u.css("margin-top", "-2px").prependTo(l)
			}
		};
		if (t.title) {
			a.find(".modal-title").html(t.title)
		};
		if (s.length) {
			l.after(n.footer);
			a.find(".modal-footer").html(s)
		};
		a.one("hide.bs.modal", function() {
			a.off("escape.close.bb");
			a.off("click")
		});
		a.one("hidden.bs.modal", function(t) {
			if (t.target === this) {
				a.remove()
			}
		});
		a.one("shown.bs.modal", function() {
			a.find(".btn-primary:first").focus()
		});
		if (t.backdrop !== "static") {
			a.on("click.dismiss.bs.modal", function(t) {
				if (a.children(".modal-backdrop").length) {
					t.currentTarget = a.children(".modal-backdrop").get(0)
				};
				if (t.target !== t.currentTarget) {
					return
				};
				a.trigger("escape.close.bb")
			})
		};
		a.on("escape.close.bb", function(t) {
			if (i.onEscape) {
				c(t, a, i.onEscape)
			}
		});
		a.on("click", ".modal-footer button", function(t) {
			var o = e(this).data("bb-handler");
			c(t, a, i[o])
		});
		a.on("click", ".bootbox-close-button", function(t) {
			c(t, a, i.onEscape)
		});
		a.on("keyup", function(t) {
			if (t.which === 27) {
				a.trigger("escape.close.bb")
			}
		});
		e(t.container).append(a);
		a.modal({
			backdrop: t.backdrop ? "static" : !1,
			keyboard: !1,
			show: !1
		});
		if (t.show) {
			a.modal("show")
		};
		return a
	};
	a.setDefaults = function() {
		var t = {};
		if (arguments.length === 2) {
			t[arguments[0]] = arguments[1]
		} else {
			t = arguments[0]
		};
		e.extend(l, t)
	};
	a.hideAll = function() {
		e(".bootbox").modal("hide");
		return a
	};
	var i = {
		ar: {
			OK: "موافق",
			CANCEL: "الغاء",
			CONFIRM: "تأكيد"
		},
		bg_BG: {
			OK: "Ок",
			CANCEL: "Отказ",
			CONFIRM: "Потвърждавам"
		},
		br: {
			OK: "OK",
			CANCEL: "Cancelar",
			CONFIRM: "Sim"
		},
		cs: {
			OK: "OK",
			CANCEL: "Zrušit",
			CONFIRM: "Potvrdit"
		},
		da: {
			OK: "OK",
			CANCEL: "Annuller",
			CONFIRM: "Accepter"
		},
		de: {
			OK: "OK",
			CANCEL: "Abbrechen",
			CONFIRM: "Akzeptieren"
		},
		el: {
			OK: "Εντάξει",
			CANCEL: "Ακύρωση",
			CONFIRM: "Επιβεβαίωση"
		},
		en: {
			OK: "OK",
			CANCEL: "Cancel",
			CONFIRM: "OK"
		},
		es: {
			OK: "OK",
			CANCEL: "Cancelar",
			CONFIRM: "Aceptar"
		},
		et: {
			OK: "OK",
			CANCEL: "Katkesta",
			CONFIRM: "OK"
		},
		fa: {
			OK: "قبول",
			CANCEL: "لغو",
			CONFIRM: "تایید"
		},
		fi: {
			OK: "OK",
			CANCEL: "Peruuta",
			CONFIRM: "OK"
		},
		fr: {
			OK: "OK",
			CANCEL: "Annuler",
			CONFIRM: "Confirmer"
		},
		he: {
			OK: "אישור",
			CANCEL: "ביטול",
			CONFIRM: "אישור"
		},
		hu: {
			OK: "OK",
			CANCEL: "Mégsem",
			CONFIRM: "Megerősít"
		},
		hr: {
			OK: "OK",
			CANCEL: "Odustani",
			CONFIRM: "Potvrdi"
		},
		id: {
			OK: "OK",
			CANCEL: "Batal",
			CONFIRM: "OK"
		},
		it: {
			OK: "OK",
			CANCEL: "Annulla",
			CONFIRM: "Conferma"
		},
		ja: {
			OK: "OK",
			CANCEL: "キャンセル",
			CONFIRM: "確認"
		},
		lt: {
			OK: "Gerai",
			CANCEL: "Atšaukti",
			CONFIRM: "Patvirtinti"
		},
		lv: {
			OK: "Labi",
			CANCEL: "Atcelt",
			CONFIRM: "Apstiprināt"
		},
		nl: {
			OK: "OK",
			CANCEL: "Annuleren",
			CONFIRM: "Accepteren"
		},
		no: {
			OK: "OK",
			CANCEL: "Avbryt",
			CONFIRM: "OK"
		},
		pl: {
			OK: "OK",
			CANCEL: "Anuluj",
			CONFIRM: "Potwierdź"
		},
		pt: {
			OK: "OK",
			CANCEL: "Cancelar",
			CONFIRM: "Confirmar"
		},
		ru: {
			OK: "OK",
			CANCEL: "Отмена",
			CONFIRM: "Применить"
		},
		sq: {
			OK: "OK",
			CANCEL: "Anulo",
			CONFIRM: "Prano"
		},
		sv: {
			OK: "OK",
			CANCEL: "Avbryt",
			CONFIRM: "OK"
		},
		th: {
			OK: "ตกลง",
			CANCEL: "ยกเลิก",
			CONFIRM: "ยืนยัน"
		},
		tr: {
			OK: "Tamam",
			CANCEL: "İptal",
			CONFIRM: "Onayla"
		},
		zh_CN: {
			OK: "OK",
			CANCEL: "取消",
			CONFIRM: "确认"
		},
		zh_TW: {
			OK: "OK",
			CANCEL: "取消",
			CONFIRM: "確認"
		}
	};
	a.addLocale = function(t, o) {
		e.each(["OK", "CANCEL", "CONFIRM"], function(t, e) {
			if (!o[e]) {
				throw new Error("Please supply a translation for '" + e + "'")
			}
		});
		i[t] = {
			OK: o.OK,
			CANCEL: o.CANCEL,
			CONFIRM: o.CONFIRM
		};
		return a
	};
	a.removeLocale = function(t) {
		delete i[t];
		return a
	};
	a.setLocale = function(t) {
		return a.setDefaults("locale", t)
	};
	a.init = function(o) {
		return t(o || e)
	};
	return a
}));
if (typeof jQuery === 'undefined') {
	throw new Error('Bootstrap\'s JavaScript requires jQuery')
}; + function(t) {
	'use strict';
	var e = t.fn.jquery.split(' ')[0].split('.');
	if ((e[0] < 2 && e[1] < 9) || (e[0] == 1 && e[1] == 9 && e[2] < 1) || (e[0] > 2)) {
		throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')
	}
}(jQuery); + function(t) {
	'use strict';

	function e() {
		var i = document.createElement('bootstrap'),
			e = {
				WebkitTransition: 'webkitTransitionEnd',
				MozTransition: 'transitionend',
				OTransition: 'oTransitionEnd otransitionend',
				transition: 'transitionend'
			};
		for (var t in e) {
			if (i.style[t] !== undefined) {
				return {
					end: e[t]
				}
			}
		};
		return !1
	};
	t.fn.emulateTransitionEnd = function(e) {
		var i = !1,
			n = this;
		t(this).one('bsTransitionEnd', function() {
			i = !0
		});
		var o = function() {
			if (!i) t(n).trigger(t.support.transition.end)
		};
		setTimeout(o, e);
		return this
	};
	t(function() {
		t.support.transition = e();
		if (!t.support.transition) return;
		t.event.special.bsTransitionEnd = {
			bindType: t.support.transition.end,
			delegateType: t.support.transition.end,
			handle: function(e) {
				if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
			}
		}
	})
}(jQuery); + function(t) {
	'use strict';
	var i = '[data-dismiss="alert"]',
		e = function(e) {
			t(e).on('click', i, this.close)
		};
	e.VERSION = '3.3.6';
	e.TRANSITION_DURATION = 150;
	e.prototype.close = function(i) {
		var s = t(this),
			n = s.attr('data-target');
		if (!n) {
			n = s.attr('href');
			n = n && n.replace(/.*(?=#[^\s]*$)/, '')
		};
		var o = t(n);
		if (i) i.preventDefault();
		if (!o.length) {
			o = s.closest('.alert')
		};
		o.trigger(i = t.Event('close.bs.alert'));
		if (i.isDefaultPrevented()) return;
		o.removeClass('in');

		function r() {
			o.detach().trigger('closed.bs.alert').remove()
		};
		t.support.transition && o.hasClass('fade') ? o.one('bsTransitionEnd', r).emulateTransitionEnd(e.TRANSITION_DURATION) : r()
	};

	function n(i) {
		return this.each(function() {
			var o = t(this),
				n = o.data('bs.alert');
			if (!n) o.data('bs.alert', (n = new e(this)));
			if (typeof i == 'string') n[i].call(o)
		})
	};
	var o = t.fn.alert;
	t.fn.alert = n;
	t.fn.alert.Constructor = e;
	t.fn.alert.noConflict = function() {
		t.fn.alert = o;
		return this
	};
	t(document).on('click.bs.alert.data-api', i, e.prototype.close)
}(jQuery); + function(t) {
	'use strict';
	var e = function(i, o) {
		this.$element = t(i);
		this.options = t.extend({}, e.DEFAULTS, o);
		this.isLoading = !1
	};
	e.VERSION = '3.3.6';
	e.DEFAULTS = {
		loadingText: 'loading...'
	};
	e.prototype.setState = function(e) {
		var o = 'disabled',
			i = this.$element,
			s = i.is('input') ? 'val' : 'html',
			n = i.data();
		e += 'Text';
		if (n.resetText == null) i.data('resetText', i[s]());
		setTimeout(t.proxy(function() {
			i[s](n[e] == null ? this.options[e] : n[e]);
			if (e == 'loadingText') {
				this.isLoading = !0;
				i.addClass(o).attr(o, o)
			} else if (this.isLoading) {
				this.isLoading = !1;
				i.removeClass(o).removeAttr(o)
			}
		}, this), 0)
	};
	e.prototype.toggle = function() {
		var e = !0,
			i = this.$element.closest('[data-toggle="buttons"]');
		if (i.length) {
			var t = this.$element.find('input');
			if (t.prop('type') == 'radio') {
				if (t.prop('checked')) e = !1;
				i.find('.active').removeClass('active');
				this.$element.addClass('active')
			} else if (t.prop('type') == 'checkbox') {
				if ((t.prop('checked')) !== this.$element.hasClass('active')) e = !1;
				this.$element.toggleClass('active')
			};
			t.prop('checked', this.$element.hasClass('active'));
			if (e) t.trigger('change')
		} else {
			this.$element.attr('aria-pressed', !this.$element.hasClass('active'));
			this.$element.toggleClass('active')
		}
	};

	function i(i) {
		return this.each(function() {
			var n = t(this),
				o = n.data('bs.button'),
				s = typeof i == 'object' && i;
			if (!o) n.data('bs.button', (o = new e(this, s)));
			if (i == 'toggle') o.toggle();
			else if (i) o.setState(i)
		})
	};
	var o = t.fn.button;
	t.fn.button = i;
	t.fn.button.Constructor = e;
	t.fn.button.noConflict = function() {
		t.fn.button = o;
		return this
	};
	t(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function(e) {
		var o = t(e.target);
		if (!o.hasClass('btn')) o = o.closest('.btn');
		i.call(o, 'toggle');
		if (!(t(e.target).is('input[type="radio"]') || t(e.target).is('input[type="checkbox"]'))) e.preventDefault()
	}).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function(e) {
		t(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
	})
}(jQuery); + function(t) {
	'use strict';
	var e = function(e, i) {
		this.$element = t(e);
		this.$indicators = this.$element.find('.carousel-indicators');
		this.options = i;
		this.paused = null;
		this.sliding = null;
		this.interval = null;
		this.$active = null;
		this.$items = null;
		this.options.keyboard && this.$element.on('keydown.bs.carousel', t.proxy(this.keydown, this));
		this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', t.proxy(this.pause, this)).on('mouseleave.bs.carousel', t.proxy(this.cycle, this))
	};
	e.VERSION = '3.3.6';
	e.TRANSITION_DURATION = 600;
	e.DEFAULTS = {
		interval: 5000,
		pause: 'hover',
		wrap: !0,
		keyboard: !0
	};
	e.prototype.keydown = function(t) {
		if (/input|textarea/i.test(t.target.tagName)) return;
		switch (t.which) {
			case 37:
				this.prev();
				break;
			case 39:
				this.next();
				break;
			default:
				return
		};
		t.preventDefault()
	};
	e.prototype.cycle = function(e) {
		e || (this.paused = !1);
		this.interval && clearInterval(this.interval);
		this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval));
		return this
	};
	e.prototype.getItemIndex = function(t) {
		this.$items = t.parent().children('.item');
		return this.$items.index(t || this.$active)
	};
	e.prototype.getItemForDirection = function(t, e) {
		var i = this.getItemIndex(e),
			s = (t == 'prev' && i === 0) || (t == 'next' && i == (this.$items.length - 1));
		if (s && !this.options.wrap) return e;
		var o = t == 'prev' ? -1 : 1,
			n = (i + o) % this.$items.length;
		return this.$items.eq(n)
	};
	e.prototype.to = function(t) {
		var i = this,
			e = this.getItemIndex(this.$active = this.$element.find('.item.active'));
		if (t > (this.$items.length - 1) || t < 0) return;
		if (this.sliding) return this.$element.one('slid.bs.carousel', function() {
			i.to(t)
		});
		if (e == t) return this.pause().cycle();
		return this.slide(t > e ? 'next' : 'prev', this.$items.eq(t))
	};
	e.prototype.pause = function(e) {
		e || (this.paused = !0);
		if (this.$element.find('.next, .prev').length && t.support.transition) {
			this.$element.trigger(t.support.transition.end);
			this.cycle(!0)
		};
		this.interval = clearInterval(this.interval);
		return this
	};
	e.prototype.next = function() {
		if (this.sliding) return;
		return this.slide('next')
	};
	e.prototype.prev = function() {
		if (this.sliding) return;
		return this.slide('prev')
	};
	e.prototype.slide = function(i, o) {
		var r = this.$element.find('.item.active'),
			n = o || this.getItemForDirection(i, r),
			f = this.interval,
			s = i == 'next' ? 'left' : 'right',
			p = this;
		if (n.hasClass('active')) return (this.sliding = !1);
		var h = n[0],
			d = t.Event('slide.bs.carousel', {
				relatedTarget: h,
				direction: s
			});
		this.$element.trigger(d);
		if (d.isDefaultPrevented()) return;
		this.sliding = !0;
		f && this.pause();
		if (this.$indicators.length) {
			this.$indicators.find('.active').removeClass('active');
			var l = t(this.$indicators.children()[this.getItemIndex(n)]);
			l && l.addClass('active')
		};
		var a = t.Event('slid.bs.carousel', {
			relatedTarget: h,
			direction: s
		});
		if (t.support.transition && this.$element.hasClass('slide')) {
			n.addClass(i);
			n[0].offsetWidth;
			r.addClass(s);
			n.addClass(s);
			r.one('bsTransitionEnd', function() {
				n.removeClass([i, s].join(' ')).addClass('active');
				r.removeClass(['active', s].join(' '));
				p.sliding = !1;
				setTimeout(function() {
					p.$element.trigger(a)
				}, 0)
			}).emulateTransitionEnd(e.TRANSITION_DURATION)
		} else {
			r.removeClass('active');
			n.addClass('active');
			this.sliding = !1;
			this.$element.trigger(a)
		};
		f && this.cycle();
		return this
	};

	function i(i) {
		return this.each(function() {
			var n = t(this),
				o = n.data('bs.carousel'),
				s = t.extend({}, e.DEFAULTS, n.data(), typeof i == 'object' && i);
			var r = typeof i == 'string' ? i : s.slide;
			if (!o) n.data('bs.carousel', (o = new e(this, s)));
			if (typeof i == 'number') o.to(i);
			else if (r) o[r]();
			else if (s.interval) o.pause().cycle()
		})
	};
	var n = t.fn.carousel;
	t.fn.carousel = i;
	t.fn.carousel.Constructor = e;
	t.fn.carousel.noConflict = function() {
		t.fn.carousel = n;
		return this
	};
	var o = function(e) {
		var a, o = t(this),
			n = t(o.attr('data-target') || (a = o.attr('href')) && a.replace(/.*(?=#[^\s]+$)/, ''));
		if (!n.hasClass('carousel')) return;
		var r = t.extend({}, n.data(), o.data());
		var s = o.attr('data-slide-to');
		if (s) r.interval = !1;
		i.call(n, r);
		if (s) {
			n.data('bs.carousel').to(s)
		};
		e.preventDefault()
	};
	t(document).on('click.bs.carousel.data-api', '[data-slide]', o).on('click.bs.carousel.data-api', '[data-slide-to]', o);
	t(window).on('load', function() {
		t('[data-ride="carousel"]').each(function() {
			var e = t(this);
			i.call(e, e.data())
		})
	})
}(jQuery); + function(t) {
	'use strict';
	var e = function(i, o) {
		this.$element = t(i);
		this.options = t.extend({}, e.DEFAULTS, o);
		this.$trigger = t('[data-toggle="collapse"][href="#' + i.id + '"],[data-toggle="collapse"][data-target="#' + i.id + '"]');
		this.transitioning = null;
		if (this.options.parent) {
			this.$parent = this.getParent()
		} else {
			this.addAriaAndCollapsedClass(this.$element, this.$trigger)
		};
		if (this.options.toggle) this.toggle()
	};
	e.VERSION = '3.3.6';
	e.TRANSITION_DURATION = 350;
	e.DEFAULTS = {
		toggle: !0
	};
	e.prototype.dimension = function() {
		var t = this.$element.hasClass('width');
		return t ? 'width' : 'height'
	};
	e.prototype.show = function() {
		if (this.transitioning || this.$element.hasClass('in')) return;
		var s, o = this.$parent && this.$parent.children('.panel').children('.in, .collapsing');
		if (o && o.length) {
			s = o.data('bs.collapse');
			if (s && s.transitioning) return
		};
		var a = t.Event('show.bs.collapse');
		this.$element.trigger(a);
		if (a.isDefaultPrevented()) return;
		if (o && o.length) {
			i.call(o, 'hide');
			s || o.data('bs.collapse', null)
		};
		var n = this.dimension();
		this.$element.removeClass('collapse').addClass('collapsing')[n](0).attr('aria-expanded', !0);
		this.$trigger.removeClass('collapsed').attr('aria-expanded', !0);
		this.transitioning = 1;
		var r = function() {
			this.$element.removeClass('collapsing').addClass('collapse in')[n]('');
			this.transitioning = 0;
			this.$element.trigger('shown.bs.collapse')
		};
		if (!t.support.transition) return r.call(this);
		var l = t.camelCase(['scroll', n].join('-'));
		this.$element.one('bsTransitionEnd', t.proxy(r, this)).emulateTransitionEnd(e.TRANSITION_DURATION)[n](this.$element[0][l])
	};
	e.prototype.hide = function() {
		if (this.transitioning || !this.$element.hasClass('in')) return;
		var n = t.Event('hide.bs.collapse');
		this.$element.trigger(n);
		if (n.isDefaultPrevented()) return;
		var i = this.dimension();
		this.$element[i](this.$element[i]())[0].offsetHeight;
		this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', !1);
		this.$trigger.addClass('collapsed').attr('aria-expanded', !1);
		this.transitioning = 1;
		var o = function() {
			this.transitioning = 0;
			this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse')
		};
		if (!t.support.transition) return o.call(this);
		this.$element[i](0).one('bsTransitionEnd', t.proxy(o, this)).emulateTransitionEnd(e.TRANSITION_DURATION)
	};
	e.prototype.toggle = function() {
		this[this.$element.hasClass('in') ? 'hide' : 'show']()
	};
	e.prototype.getParent = function() {
		return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(e, i) {
			var n = t(i);
			this.addAriaAndCollapsedClass(o(n), n)
		}, this)).end()
	};
	e.prototype.addAriaAndCollapsedClass = function(t, e) {
		var i = t.hasClass('in');
		t.attr('aria-expanded', i);
		e.toggleClass('collapsed', !i).attr('aria-expanded', i)
	};

	function o(e) {
		var i, o = e.attr('data-target') || (i = e.attr('href')) && i.replace(/.*(?=#[^\s]+$)/, '');
		return t(o)
	};

	function i(i) {
		return this.each(function() {
			var n = t(this),
				o = n.data('bs.collapse'),
				s = t.extend({}, e.DEFAULTS, n.data(), typeof i == 'object' && i);
			if (!o && s.toggle && /show|hide/.test(i)) s.toggle = !1;
			if (!o) n.data('bs.collapse', (o = new e(this, s)));
			if (typeof i == 'string') o[i]()
		})
	};
	var n = t.fn.collapse;
	t.fn.collapse = i;
	t.fn.collapse.Constructor = e;
	t.fn.collapse.noConflict = function() {
		t.fn.collapse = n;
		return this
	};
	t(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function(e) {
		var n = t(this);
		if (!n.attr('data-target')) e.preventDefault();
		var s = o(n),
			r = s.data('bs.collapse'),
			a = r ? 'toggle' : n.data();
		i.call(s, a)
	})
}(jQuery); + function(t) {
	'use strict';
	var r = '.dropdown-backdrop',
		i = '[data-toggle="dropdown"]',
		e = function(e) {
			t(e).on('click.bs.dropdown', this.toggle)
		};
	e.VERSION = '3.3.6';

	function o(e) {
		var i = e.attr('data-target');
		if (!i) {
			i = e.attr('href');
			i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, '')
		};
		var o = i && t(i);
		return o && o.length ? o : e.parent()
	};

	function n(e) {
		if (e && e.which === 3) return;
		t(r).remove();
		t(i).each(function() {
			var n = t(this),
				i = o(n),
				s = {
					relatedTarget: this
				};
			if (!i.hasClass('open')) return;
			if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && t.contains(i[0], e.target)) return;
			i.trigger(e = t.Event('hide.bs.dropdown', s));
			if (e.isDefaultPrevented()) return;
			n.attr('aria-expanded', 'false');
			i.removeClass('open').trigger(t.Event('hidden.bs.dropdown', s))
		})
	};
	e.prototype.toggle = function(e) {
		var s = t(this);
		if (s.is('.disabled, :disabled')) return;
		var i = o(s),
			a = i.hasClass('open');
		n();
		if (!a) {
			if ('ontouchstart' in document.documentElement && !i.closest('.navbar-nav').length) {
				t(document.createElement('div')).addClass('dropdown-backdrop').insertAfter(t(this)).on('click', n)
			};
			var r = {
				relatedTarget: this
			};
			i.trigger(e = t.Event('show.bs.dropdown', r));
			if (e.isDefaultPrevented()) return;
			s.trigger('focus').attr('aria-expanded', 'true');
			i.toggleClass('open').trigger(t.Event('shown.bs.dropdown', r))
		};
		return !1
	};
	e.prototype.keydown = function(e) {
		if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
		var a = t(this);
		e.preventDefault();
		e.stopPropagation();
		if (a.is('.disabled, :disabled')) return;
		var r = o(a),
			l = r.hasClass('open');
		if (!l && e.which != 27 || l && e.which == 27) {
			if (e.which == 27) r.find(i).trigger('focus');
			return a.trigger('click')
		};
		var h = ' li:not(.disabled):visible a',
			s = r.find('.dropdown-menu' + h);
		if (!s.length) return;
		var n = s.index(e.target);
		if (e.which == 38 && n > 0) n--;
		if (e.which == 40 && n < s.length - 1) n++;
		if (!~n) n = 0;
		s.eq(n).trigger('focus')
	};

	function a(i) {
		return this.each(function() {
			var o = t(this),
				n = o.data('bs.dropdown');
			if (!n) o.data('bs.dropdown', (n = new e(this)));
			if (typeof i == 'string') n[i].call(o)
		})
	};
	var s = t.fn.dropdown;
	t.fn.dropdown = a;
	t.fn.dropdown.Constructor = e;
	t.fn.dropdown.noConflict = function() {
		t.fn.dropdown = s;
		return this
	};
	t(document).on('click.bs.dropdown.data-api', n).on('click.bs.dropdown.data-api', '.dropdown form', function(t) {
		t.stopPropagation()
	}).on('click.bs.dropdown.data-api', i, e.prototype.toggle).on('keydown.bs.dropdown.data-api', i, e.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', e.prototype.keydown)
}(jQuery); + function(t) {
	'use strict';
	var e = function(e, i) {
		this.options = i;
		this.$body = t(document.body);
		this.$element = t(e);
		this.$dialog = this.$element.find('.modal-dialog');
		this.$backdrop = null;
		this.isShown = null;
		this.originalBodyPad = null;
		this.scrollbarWidth = 0;
		this.ignoreBackdropClick = !1;
		if (this.options.remote) {
			this.$element.find('.modal-content').load(this.options.remote, t.proxy(function() {
				this.$element.trigger('loaded.bs.modal')
			}, this))
		}
	};
	e.VERSION = '3.3.6';
	e.TRANSITION_DURATION = 300;
	e.BACKDROP_TRANSITION_DURATION = 150;
	e.DEFAULTS = {
		backdrop: !0,
		keyboard: !0,
		show: !0
	};
	e.prototype.toggle = function(t) {
		return this.isShown ? this.hide() : this.show(t)
	};
	e.prototype.show = function(i) {
		var o = this,
			n = t.Event('show.bs.modal', {
				relatedTarget: i
			});
		this.$element.trigger(n);
		if (this.isShown || n.isDefaultPrevented()) return;
		this.isShown = !0;
		this.checkScrollbar();
		this.setScrollbar();
		this.$body.addClass('modal-open');
		this.escape();
		this.resize();
		this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', t.proxy(this.hide, this));
		this.$dialog.on('mousedown.dismiss.bs.modal', function() {
			o.$element.one('mouseup.dismiss.bs.modal', function(e) {
				if (t(e.target).is(o.$element)) o.ignoreBackdropClick = !0
			})
		});
		this.backdrop(function() {
			var s = t.support.transition && o.$element.hasClass('fade');
			if (!o.$element.parent().length) {
				o.$element.appendTo(o.$body)
			};
			o.$element.show().scrollTop(0);
			o.adjustDialog();
			if (s) {
				o.$element[0].offsetWidth
			};
			o.$element.addClass('in');
			o.enforceFocus();
			var n = t.Event('shown.bs.modal', {
				relatedTarget: i
			});
			s ? o.$dialog.one('bsTransitionEnd', function() {
				o.$element.trigger('focus').trigger(n)
			}).emulateTransitionEnd(e.TRANSITION_DURATION) : o.$element.trigger('focus').trigger(n)
		})
	};
	e.prototype.hide = function(i) {
		if (i) i.preventDefault();
		i = t.Event('hide.bs.modal');
		this.$element.trigger(i);
		if (!this.isShown || i.isDefaultPrevented()) return;
		this.isShown = !1;
		this.escape();
		this.resize();
		t(document).off('focusin.bs.modal');
		this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');
		this.$dialog.off('mousedown.dismiss.bs.modal');
		t.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', t.proxy(this.hideModal, this)).emulateTransitionEnd(e.TRANSITION_DURATION) : this.hideModal()
	};
	e.prototype.enforceFocus = function() {
		t(document).off('focusin.bs.modal').on('focusin.bs.modal', t.proxy(function(t) {
			if (this.$element[0] !== t.target && !this.$element.has(t.target).length) {
				this.$element.trigger('focus')
			}
		}, this))
	};
	e.prototype.escape = function() {
		if (this.isShown && this.options.keyboard) {
			this.$element.on('keydown.dismiss.bs.modal', t.proxy(function(t) {
				t.which == 27 && this.hide()
			}, this))
		} else if (!this.isShown) {
			this.$element.off('keydown.dismiss.bs.modal')
		}
	};
	e.prototype.resize = function() {
		if (this.isShown) {
			t(window).on('resize.bs.modal', t.proxy(this.handleUpdate, this))
		} else {
			t(window).off('resize.bs.modal')
		}
	};
	e.prototype.hideModal = function() {
		var t = this;
		this.$element.hide();
		this.backdrop(function() {
			t.$body.removeClass('modal-open');
			t.resetAdjustments();
			t.resetScrollbar();
			t.$element.trigger('hidden.bs.modal')
		})
	};
	e.prototype.removeBackdrop = function() {
		this.$backdrop && this.$backdrop.remove();
		this.$backdrop = null
	};
	e.prototype.backdrop = function(i) {
		var r = this,
			s = this.$element.hasClass('fade') ? 'fade' : '';
		if (this.isShown && this.options.backdrop) {
			var n = t.support.transition && s;
			this.$backdrop = t(document.createElement('div')).addClass('modal-backdrop ' + s).appendTo(this.$body);
			this.$element.on('click.dismiss.bs.modal', t.proxy(function(t) {
				if (this.ignoreBackdropClick) {
					this.ignoreBackdropClick = !1;
					return
				};
				if (t.target !== t.currentTarget) return;
				this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide()
			}, this));
			if (n) this.$backdrop[0].offsetWidth;
			this.$backdrop.addClass('in');
			if (!i) return;
			n ? this.$backdrop.one('bsTransitionEnd', i).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : i()
		} else if (!this.isShown && this.$backdrop) {
			this.$backdrop.removeClass('in');
			var o = function() {
				r.removeBackdrop();
				i && i()
			};
			t.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', o).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION) : o()
		} else if (i) {
			i()
		}
	};
	e.prototype.handleUpdate = function() {
		this.adjustDialog()
	};
	e.prototype.adjustDialog = function() {
		var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
		this.$element.css({
			paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : '',
			paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ''
		})
	};
	e.prototype.resetAdjustments = function() {
		this.$element.css({
			paddingLeft: '',
			paddingRight: ''
		})
	};
	e.prototype.checkScrollbar = function() {
		var t = window.innerWidth;
		if (!t) {
			var e = document.documentElement.getBoundingClientRect();
			t = e.right - Math.abs(e.left)
		};
		this.bodyIsOverflowing = document.body.clientWidth < t;
		this.scrollbarWidth = this.measureScrollbar()
	};
	e.prototype.setScrollbar = function() {
		var t = parseInt((this.$body.css('padding-right') || 0), 10);
		this.originalBodyPad = document.body.style.paddingRight || '';
		if (this.bodyIsOverflowing) this.$body.css('padding-right', t + this.scrollbarWidth)
	};
	e.prototype.resetScrollbar = function() {
		this.$body.css('padding-right', this.originalBodyPad)
	};
	e.prototype.measureScrollbar = function() {
		var t = document.createElement('div');
		t.className = 'modal-scrollbar-measure';
		this.$body.append(t);
		var e = t.offsetWidth - t.clientWidth;
		this.$body[0].removeChild(t);
		return e
	};

	function i(i, o) {
		return this.each(function() {
			var s = t(this),
				n = s.data('bs.modal'),
				r = t.extend({}, e.DEFAULTS, s.data(), typeof i == 'object' && i);
			if (!n) s.data('bs.modal', (n = new e(this, r)));
			if (typeof i == 'string') n[i](o);
			else if (r.show) n.show(o)
		})
	};
	var o = t.fn.modal;
	t.fn.modal = i;
	t.fn.modal.Constructor = e;
	t.fn.modal.noConflict = function() {
		t.fn.modal = o;
		return this
	};
	t(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function(e) {
		var o = t(this),
			s = o.attr('href'),
			n = t(o.attr('data-target') || (s && s.replace(/.*(?=#[^\s]+$)/, ''))),
			r = n.data('bs.modal') ? 'toggle' : t.extend({
				remote: !/#/.test(s) && s
			}, n.data(), o.data());
		if (o.is('a')) e.preventDefault();
		n.one('show.bs.modal', function(t) {
			if (t.isDefaultPrevented()) return n.one('hidden.bs.modal', function() {
				o.is(':visible') && o.trigger('focus')
			})
		});
		i.call(n, r, this)
	})
}(jQuery); + function(t) {
	'use strict';
	var e = function(t, e) {
		this.type = null;
		this.options = null;
		this.enabled = null;
		this.timeout = null;
		this.hoverState = null;
		this.$element = null;
		this.inState = null;
		this.init('tooltip', t, e)
	};
	e.VERSION = '3.3.6';
	e.TRANSITION_DURATION = 150;
	e.DEFAULTS = {
		animation: !0,
		placement: 'top',
		selector: !1,
		template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger: 'hover focus',
		title: '',
		delay: 0,
		html: !1,
		container: !1,
		viewport: {
			selector: 'body',
			padding: 0
		}
	};
	e.prototype.init = function(e, i, o) {
		this.enabled = !0;
		this.type = e;
		this.$element = t(i);
		this.options = this.getOptions(o);
		this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport));
		this.inState = {
			click: !1,
			hover: !1,
			focus: !1
		};
		if (this.$element[0] instanceof document.constructor && !this.options.selector) {
			throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
		};
		var r = this.options.trigger.split(' ');
		for (var s = r.length; s--;) {
			var n = r[s];
			if (n == 'click') {
				this.$element.on('click.' + this.type, this.options.selector, t.proxy(this.toggle, this))
			} else if (n != 'manual') {
				var a = n == 'hover' ? 'mouseenter' : 'focusin',
					l = n == 'hover' ? 'mouseleave' : 'focusout';
				this.$element.on(a + '.' + this.type, this.options.selector, t.proxy(this.enter, this));
				this.$element.on(l + '.' + this.type, this.options.selector, t.proxy(this.leave, this))
			}
		};
		this.options.selector ? (this._options = t.extend({}, this.options, {
			trigger: 'manual',
			selector: ''
		})) : this.fixTitle()
	};
	e.prototype.getDefaults = function() {
		return e.DEFAULTS
	};
	e.prototype.getOptions = function(e) {
		e = t.extend({}, this.getDefaults(), this.$element.data(), e);
		if (e.delay && typeof e.delay == 'number') {
			e.delay = {
				show: e.delay,
				hide: e.delay
			}
		};
		return e
	};
	e.prototype.getDelegateOptions = function() {
		var e = {};
		var i = this.getDefaults();
		this._options && t.each(this._options, function(t, o) {
			if (i[t] != o) e[t] = o
		});
		return e
	};
	e.prototype.enter = function(e) {
		var i = e instanceof this.constructor ? e : t(e.currentTarget).data('bs.' + this.type);
		if (!i) {
			i = new this.constructor(e.currentTarget, this.getDelegateOptions());
			t(e.currentTarget).data('bs.' + this.type, i)
		};
		if (e instanceof t.Event) {
			i.inState[e.type == 'focusin' ? 'focus' : 'hover'] = !0
		};
		if (i.tip().hasClass('in') || i.hoverState == 'in') {
			i.hoverState = 'in';
			return
		};
		clearTimeout(i.timeout);
		i.hoverState = 'in';
		if (!i.options.delay || !i.options.delay.show) return i.show();
		i.timeout = setTimeout(function() {
			if (i.hoverState == 'in') i.show()
		}, i.options.delay.show)
	};
	e.prototype.isInStateTrue = function() {
		for (var t in this.inState) {
			if (this.inState[t]) return !0
		};
		return !1
	};
	e.prototype.leave = function(e) {
		var i = e instanceof this.constructor ? e : t(e.currentTarget).data('bs.' + this.type);
		if (!i) {
			i = new this.constructor(e.currentTarget, this.getDelegateOptions());
			t(e.currentTarget).data('bs.' + this.type, i)
		};
		if (e instanceof t.Event) {
			i.inState[e.type == 'focusout' ? 'focus' : 'hover'] = !1
		};
		if (i.isInStateTrue()) return;
		clearTimeout(i.timeout);
		i.hoverState = 'out';
		if (!i.options.delay || !i.options.delay.hide) return i.hide();
		i.timeout = setTimeout(function() {
			if (i.hoverState == 'out') i.hide()
		}, i.options.delay.hide)
	};
	e.prototype.show = function() {
		var c = t.Event('show.bs.' + this.type);
		if (this.hasContent() && this.enabled) {
			this.$element.trigger(c);
			var m = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
			if (c.isDefaultPrevented() || !m) return;
			var n = this,
				o = this.tip(),
				p = this.getUID(this.type);
			this.setContent();
			o.attr('id', p);
			this.$element.attr('aria-describedby', p);
			if (this.options.animation) o.addClass('fade');
			var i = typeof this.options.placement == 'function' ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
				d = /\s?auto?\s?/i,
				f = d.test(i);
			if (f) i = i.replace(d, '') || 'top';
			o.detach().css({
				top: 0,
				left: 0,
				display: 'block'
			}).addClass(i).data('bs.' + this.type, this);
			this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element);
			this.$element.trigger('inserted.bs.' + this.type);
			var s = this.getPosition(),
				a = o[0].offsetWidth,
				l = o[0].offsetHeight;
			if (f) {
				var g = i,
					r = this.getPosition(this.$viewport);
				i = i == 'bottom' && s.bottom + l > r.bottom ? 'top' : i == 'top' && s.top - l < r.top ? 'bottom' : i == 'right' && s.right + a > r.width ? 'left' : i == 'left' && s.left - a < r.left ? 'right' : i;
				o.removeClass(g).addClass(i)
			};
			var u = this.getCalculatedOffset(i, s, a, l);
			this.applyPlacement(u, i);
			var h = function() {
				var t = n.hoverState;
				n.$element.trigger('shown.bs.' + n.type);
				n.hoverState = null;
				if (t == 'out') n.leave(n)
			};
			t.support.transition && this.$tip.hasClass('fade') ? o.one('bsTransitionEnd', h).emulateTransitionEnd(e.TRANSITION_DURATION) : h()
		}
	};
	e.prototype.applyPlacement = function(e, i) {
		var o = this.tip(),
			c = o[0].offsetWidth,
			a = o[0].offsetHeight,
			l = parseInt(o.css('margin-top'), 10),
			h = parseInt(o.css('margin-left'), 10);
		if (isNaN(l)) l = 0;
		if (isNaN(h)) h = 0;
		e.top += l;
		e.left += h;
		t.offset.setOffset(o[0], t.extend({
			using: function(t) {
				o.css({
					top: Math.round(t.top),
					left: Math.round(t.left)
				})
			}
		}, e), 0);
		o.addClass('in');
		var d = o[0].offsetWidth,
			s = o[0].offsetHeight;
		if (i == 'top' && s != a) {
			e.top = e.top + a - s
		};
		var n = this.getViewportAdjustedDelta(i, e, d, s);
		if (n.left) e.left += n.left;
		else e.top += n.top;
		var r = /top|bottom/.test(i),
			f = r ? n.left * 2 - c + d : n.top * 2 - a + s,
			p = r ? 'offsetWidth' : 'offsetHeight';
		o.offset(e);
		this.replaceArrow(f, o[0][p], r)
	};
	e.prototype.replaceArrow = function(t, e, i) {
		this.arrow().css(i ? 'left' : 'top', 50 * (1 - t / e) + '%').css(i ? 'top' : 'left', '')
	};
	e.prototype.setContent = function() {
		var t = this.tip(),
			e = this.getTitle();
		t.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](e);
		t.removeClass('fade in top bottom left right')
	};
	e.prototype.hide = function(i) {
		var n = this,
			o = t(this.$tip),
			s = t.Event('hide.bs.' + this.type);

		function r() {
			if (n.hoverState != 'in') o.detach();
			n.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + n.type);
			i && i()
		};
		this.$element.trigger(s);
		if (s.isDefaultPrevented()) return;
		o.removeClass('in');
		t.support.transition && o.hasClass('fade') ? o.one('bsTransitionEnd', r).emulateTransitionEnd(e.TRANSITION_DURATION) : r();
		this.hoverState = null;
		return this
	};
	e.prototype.fixTitle = function() {
		var t = this.$element;
		if (t.attr('title') || typeof t.attr('data-original-title') != 'string') {
			t.attr('data-original-title', t.attr('title') || '').attr('title', '')
		}
	};
	e.prototype.hasContent = function() {
		return this.getTitle()
	};
	e.prototype.getPosition = function(e) {
		e = e || this.$element;
		var n = e[0],
			o = n.tagName == 'BODY',
			i = n.getBoundingClientRect();
		if (i.width == null) {
			i = t.extend({}, i, {
				width: i.right - i.left,
				height: i.bottom - i.top
			})
		};
		var a = o ? {
			top: 0,
			left: 0
		} : e.offset();
		var r = {
			scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
		};
		var s = o ? {
			width: t(window).width(),
			height: t(window).height()
		} : null;
		return t.extend({}, i, r, s, a)
	};
	e.prototype.getCalculatedOffset = function(t, e, i, o) {
		return t == 'bottom' ? {
			top: e.top + e.height,
			left: e.left + e.width / 2 - i / 2
		} : t == 'top' ? {
			top: e.top - o,
			left: e.left + e.width / 2 - i / 2
		} : t == 'left' ? {
			top: e.top + e.height / 2 - o / 2,
			left: e.left - i
		} : {
			top: e.top + e.height / 2 - o / 2,
			left: e.left + e.width
		}
	};
	e.prototype.getViewportAdjustedDelta = function(t, e, o, r) {
		var n = {
			top: 0,
			left: 0
		};
		if (!this.$viewport) return n;
		var s = this.options.viewport && this.options.viewport.padding || 0,
			i = this.getPosition(this.$viewport);
		if (/right|left/.test(t)) {
			var h = e.top - s - i.scroll,
				d = e.top + s - i.scroll + r;
			if (h < i.top) {
				n.top = i.top - h
			} else if (d > i.top + i.height) {
				n.top = i.top + i.height - d
			}
		} else {
			var a = e.left - s,
				l = e.left + s + o;
			if (a < i.left) {
				n.left = i.left - a
			} else if (l > i.right) {
				n.left = i.left + i.width - l
			}
		};
		return n
	};
	e.prototype.getTitle = function() {
		var e, i = this.$element,
			t = this.options;
		e = i.attr('data-original-title') || (typeof t.title == 'function' ? t.title.call(i[0]) : t.title);
		return e
	};
	e.prototype.getUID = function(t) {
		do t += ~~(Math.random() * 1000000); while (document.getElementById(t)) return t
	};
	e.prototype.tip = function() {
		if (!this.$tip) {
			this.$tip = t(this.options.template);
			if (this.$tip.length != 1) {
				throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
			}
		};
		return this.$tip
	};
	e.prototype.arrow = function() {
		return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
	};
	e.prototype.enable = function() {
		this.enabled = !0
	};
	e.prototype.disable = function() {
		this.enabled = !1
	};
	e.prototype.toggleEnabled = function() {
		this.enabled = !this.enabled
	};
	e.prototype.toggle = function(e) {
		var i = this;
		if (e) {
			i = t(e.currentTarget).data('bs.' + this.type);
			if (!i) {
				i = new this.constructor(e.currentTarget, this.getDelegateOptions());
				t(e.currentTarget).data('bs.' + this.type, i)
			}
		};
		if (e) {
			i.inState.click = !i.inState.click;
			if (i.isInStateTrue()) i.enter(i);
			else i.leave(i)
		} else {
			i.tip().hasClass('in') ? i.leave(i) : i.enter(i)
		}
	};
	e.prototype.destroy = function() {
		var t = this;
		clearTimeout(this.timeout);
		this.hide(function() {
			t.$element.off('.' + t.type).removeData('bs.' + t.type);
			if (t.$tip) {
				t.$tip.detach()
			};
			t.$tip = null;
			t.$arrow = null;
			t.$viewport = null
		})
	};

	function o(i) {
		return this.each(function() {
			var n = t(this),
				o = n.data('bs.tooltip'),
				s = typeof i == 'object' && i;
			if (!o && /destroy|hide/.test(i)) return;
			if (!o) n.data('bs.tooltip', (o = new e(this, s)));
			if (typeof i == 'string') o[i]()
		})
	};
	var i = t.fn.tooltip;
	t.fn.tooltip = o;
	t.fn.tooltip.Constructor = e;
	t.fn.tooltip.noConflict = function() {
		t.fn.tooltip = i;
		return this
	}
}(jQuery); + function(t) {
	'use strict';
	var e = function(t, e) {
		this.init('popover', t, e)
	};
	if (!t.fn.tooltip) throw new Error('Popover requires tooltip.js');
	e.VERSION = '3.3.6';
	e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
		placement: 'right',
		trigger: 'click',
		content: '',
		template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	});
	e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype);
	e.prototype.constructor = e;
	e.prototype.getDefaults = function() {
		return e.DEFAULTS
	};
	e.prototype.setContent = function() {
		var t = this.tip(),
			i = this.getTitle(),
			e = this.getContent();
		t.find('.popover-title')[this.options.html ? 'html' : 'text'](i);
		t.find('.popover-content').children().detach().end()[this.options.html ? (typeof e == 'string' ? 'html' : 'append') : 'text'](e);
		t.removeClass('fade top bottom left right in');
		if (!t.find('.popover-title').html()) t.find('.popover-title').hide()
	};
	e.prototype.hasContent = function() {
		return this.getTitle() || this.getContent()
	};
	e.prototype.getContent = function() {
		var e = this.$element,
			t = this.options;
		return e.attr('data-content') || (typeof t.content == 'function' ? t.content.call(e[0]) : t.content)
	};
	e.prototype.arrow = function() {
		return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
	};

	function o(i) {
		return this.each(function() {
			var n = t(this),
				o = n.data('bs.popover'),
				s = typeof i == 'object' && i;
			if (!o && /destroy|hide/.test(i)) return;
			if (!o) n.data('bs.popover', (o = new e(this, s)));
			if (typeof i == 'string') o[i]()
		})
	};
	var i = t.fn.popover;
	t.fn.popover = o;
	t.fn.popover.Constructor = e;
	t.fn.popover.noConflict = function() {
		t.fn.popover = i;
		return this
	}
}(jQuery); + function(t) {
	'use strict';

	function e(i, o) {
		this.$body = t(document.body);
		this.$scrollElement = t(i).is(document.body) ? t(window) : t(i);
		this.options = t.extend({}, e.DEFAULTS, o);
		this.selector = (this.options.target || '') + ' .nav li > a';
		this.offsets = [];
		this.targets = [];
		this.activeTarget = null;
		this.scrollHeight = 0;
		this.$scrollElement.on('scroll.bs.scrollspy', t.proxy(this.process, this));
		this.refresh();
		this.process()
	};
	e.VERSION = '3.3.6';
	e.DEFAULTS = {
		offset: 10
	};
	e.prototype.getScrollHeight = function() {
		return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	};
	e.prototype.refresh = function() {
		var e = this,
			i = 'offset',
			o = 0;
		this.offsets = [];
		this.targets = [];
		this.scrollHeight = this.getScrollHeight();
		if (!t.isWindow(this.$scrollElement[0])) {
			i = 'position';
			o = this.$scrollElement.scrollTop()
		};
		this.$body.find(this.selector).map(function() {
			var s = t(this),
				n = s.data('target') || s.attr('href'),
				e = /^#./.test(n) && t(n);
			return (e && e.length && e.is(':visible') && [
				[e[i]().top + o, n]
			]) || null
		}).sort(function(t, e) {
			return t[0] - e[0]
		}).each(function() {
			e.offsets.push(this[0]);
			e.targets.push(this[1])
		})
	};
	e.prototype.process = function() {
		var i = this.$scrollElement.scrollTop() + this.options.offset,
			s = this.getScrollHeight(),
			r = this.options.offset + s - this.$scrollElement.height(),
			e = this.offsets,
			o = this.targets,
			n = this.activeTarget,
			t;
		if (this.scrollHeight != s) {
			this.refresh()
		};
		if (i >= r) {
			return n != (t = o[o.length - 1]) && this.activate(t)
		};
		if (n && i < e[0]) {
			this.activeTarget = null;
			return this.clear()
		};
		for (t = e.length; t--;) {
			n != o[t] && i >= e[t] && (e[t + 1] === undefined || i < e[t + 1]) && this.activate(o[t])
		}
	};
	e.prototype.activate = function(e) {
		this.activeTarget = e;
		this.clear();
		var o = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
			i = t(o).parents('li').addClass('active');
		if (i.parent('.dropdown-menu').length) {
			i = i.closest('li.dropdown').addClass('active')
		};
		i.trigger('activate.bs.scrollspy')
	};
	e.prototype.clear = function() {
		t(this.selector).parentsUntil(this.options.target, '.active').removeClass('active')
	};

	function i(i) {
		return this.each(function() {
			var n = t(this),
				o = n.data('bs.scrollspy'),
				s = typeof i == 'object' && i;
			if (!o) n.data('bs.scrollspy', (o = new e(this, s)));
			if (typeof i == 'string') o[i]()
		})
	};
	var o = t.fn.scrollspy;
	t.fn.scrollspy = i;
	t.fn.scrollspy.Constructor = e;
	t.fn.scrollspy.noConflict = function() {
		t.fn.scrollspy = o;
		return this
	};
	t(window).on('load.bs.scrollspy.data-api', function() {
		t('[data-spy="scroll"]').each(function() {
			var e = t(this);
			i.call(e, e.data())
		})
	})
}(jQuery); + function(t) {
	'use strict';
	var e = function(e) {
		this.element = t(e)
	};
	e.VERSION = '3.3.6';
	e.TRANSITION_DURATION = 150;
	e.prototype.show = function() {
		var e = this.element,
			a = e.closest('ul:not(.dropdown-menu)'),
			i = e.data('target');
		if (!i) {
			i = e.attr('href');
			i = i && i.replace(/.*(?=#[^\s]*$)/, '')
		};
		if (e.parent('li').hasClass('active')) return;
		var o = a.find('.active:last a'),
			r = t.Event('hide.bs.tab', {
				relatedTarget: e[0]
			});
		var s = t.Event('show.bs.tab', {
			relatedTarget: o[0]
		});
		o.trigger(r);
		e.trigger(s);
		if (s.isDefaultPrevented() || r.isDefaultPrevented()) return;
		var n = t(i);
		this.activate(e.closest('li'), a);
		this.activate(n, n.parent(), function() {
			o.trigger({
				type: 'hidden.bs.tab',
				relatedTarget: e[0]
			});
			e.trigger({
				type: 'shown.bs.tab',
				relatedTarget: o[0]
			})
		})
	};
	e.prototype.activate = function(i, o, n) {
		var s = o.find('> .active'),
			r = n && t.support.transition && (s.length && s.hasClass('fade') || !!o.find('> .fade').length);

		function a() {
			s.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', !1);
			i.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', !0);
			if (r) {
				i[0].offsetWidth;
				i.addClass('in')
			} else {
				i.removeClass('fade')
			};
			if (i.parent('.dropdown-menu').length) {
				i.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', !0)
			};
			n && n()
		};
		s.length && r ? s.one('bsTransitionEnd', a).emulateTransitionEnd(e.TRANSITION_DURATION) : a();
		s.removeClass('in')
	};

	function o(i) {
		return this.each(function() {
			var n = t(this),
				o = n.data('bs.tab');
			if (!o) n.data('bs.tab', (o = new e(this)));
			if (typeof i == 'string') o[i]()
		})
	};
	var n = t.fn.tab;
	t.fn.tab = o;
	t.fn.tab.Constructor = e;
	t.fn.tab.noConflict = function() {
		t.fn.tab = n;
		return this
	};
	var i = function(e) {
		e.preventDefault();
		o.call(t(this), 'show')
	};
	t(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', i).on('click.bs.tab.data-api', '[data-toggle="pill"]', i)
}(jQuery); + function(t) {
	'use strict';
	var e = function(i, o) {
		this.options = t.extend({}, e.DEFAULTS, o);
		this.$target = t(this.options.target).on('scroll.bs.affix.data-api', t.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', t.proxy(this.checkPositionWithEventLoop, this));
		this.$element = t(i);
		this.affixed = null;
		this.unpin = null;
		this.pinnedOffset = null;
		this.checkPosition()
	};
	e.VERSION = '3.3.6';
	e.RESET = 'affix affix-top affix-bottom';
	e.DEFAULTS = {
		offset: 0,
		target: window
	};
	e.prototype.getState = function(t, e, i, o) {
		var n = this.$target.scrollTop(),
			r = this.$element.offset(),
			a = this.$target.height();
		if (i != null && this.affixed == 'top') return n < i ? 'top' : !1;
		if (this.affixed == 'bottom') {
			if (i != null) return (n + this.unpin <= r.top) ? !1 : 'bottom';
			return (n + a <= t - o) ? !1 : 'bottom'
		};
		var s = this.affixed == null,
			l = s ? n : r.top,
			h = s ? a : e;
		if (i != null && n <= i) return 'top';
		if (o != null && (l + h >= t - o)) return 'bottom';
		return !1
	};
	e.prototype.getPinnedOffset = function() {
		if (this.pinnedOffset) return this.pinnedOffset;
		this.$element.removeClass(e.RESET).addClass('affix');
		var t = this.$target.scrollTop(),
			i = this.$element.offset();
		return (this.pinnedOffset = i.top - t)
	};
	e.prototype.checkPositionWithEventLoop = function() {
		setTimeout(t.proxy(this.checkPosition, this), 1)
	};
	e.prototype.checkPosition = function() {
		if (!this.$element.is(':visible')) return;
		var l = this.$element.height(),
			o = this.options.offset,
			s = o.top,
			n = o.bottom,
			h = Math.max(t(document).height(), t(document.body).height());
		if (typeof o != 'object') n = s = o;
		if (typeof s == 'function') s = o.top(this.$element);
		if (typeof n == 'function') n = o.bottom(this.$element);
		var i = this.getState(h, l, s, n);
		if (this.affixed != i) {
			if (this.unpin != null) this.$element.css('top', '');
			var r = 'affix' + (i ? '-' + i : ''),
				a = t.Event(r + '.bs.affix');
			this.$element.trigger(a);
			if (a.isDefaultPrevented()) return;
			this.affixed = i;
			this.unpin = i == 'bottom' ? this.getPinnedOffset() : null;
			this.$element.removeClass(e.RESET).addClass(r).trigger(r.replace('affix', 'affixed') + '.bs.affix')
		};
		if (i == 'bottom') {
			this.$element.offset({
				top: h - l - n
			})
		}
	};

	function i(i) {
		return this.each(function() {
			var n = t(this),
				o = n.data('bs.affix'),
				s = typeof i == 'object' && i;
			if (!o) n.data('bs.affix', (o = new e(this, s)));
			if (typeof i == 'string') o[i]()
		})
	};
	var o = t.fn.affix;
	t.fn.affix = i;
	t.fn.affix.Constructor = e;
	t.fn.affix.noConflict = function() {
		t.fn.affix = o;
		return this
	};
	t(window).on('load', function() {
		t('[data-spy="affix"]').each(function() {
			var o = t(this),
				e = o.data();
			e.offset = e.offset || {};
			if (e.offsetBottom != null) e.offset.bottom = e.offsetBottom;
			if (e.offsetTop != null) e.offset.top = e.offsetTop;
			i.call(o, e)
		})
	})
}(jQuery);

<!-- FUNCTION TWO -->
(function() {
	var e = (function(o) {
		'use strict';
		o = (o) ? o : {};
		var v = {
			bgColor: '#d00',
			textColor: '#fff',
			fontFamily: 'sans-serif',
			fontStyle: 'bold',
			type: 'circle',
			position: 'down',
			animation: 'slide',
			elementId: !1,
			element: null,
			dataUrl: !1,
			win: window
		};
		var e, w, r, i, u, t, l, d, x, m, s, g, a, I, M, h;
		a = {};
		a.ff = typeof InstallTrigger != 'undefined';
		a.chrome = !!window.chrome;
		a.opera = !!window.opera || navigator.userAgent.indexOf('Opera') >= 0;
		a.ie = /*@cc_on!@*/ !1;
		a.safari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		a.supported = (a.chrome || a.ff || a.opera);
		var c = [];
		s = function() {};
		d = g = !1;
		var k = function() {
				e = A(v, o);
				e.bgColor = b(e.bgColor);
				e.textColor = b(e.textColor);
				e.position = e.position.toLowerCase();
				e.animation = (n.types['' + e.animation]) ? e.animation : v.animation;
				h = e.win.document;
				var g = e.position.indexOf('up') > -1,
					x = e.position.indexOf('left') > -1;
				if (g || x) {
					for (var c in n.types) {
						for (var s = 0; s < n.types[c].length; s++) {
							var a = n.types[c][s];
							if (g) {
								if (a.y < 0.6) {
									a.y = a.y - 0.4
								} else {
									a.y = a.y - 2 * a.y + (1 - a.w)
								}
							};
							if (x) {
								if (a.x < 0.6) {
									a.x = a.x - 0.4
								} else {
									a.x = a.x - 2 * a.x + (1 - a.h)
								}
							};
							n.types[c][s] = a
						}
					}
				};
				e.type = (p['' + e.type]) ? e.type : v.type;
				w = y.getIcons();
				u = document.createElement('canvas');
				l = document.createElement('img');
				var d = w[w.length - 1];
				if (d.hasAttribute('href')) {
					l.setAttribute('crossOrigin', 'anonymous');
					l.onload = function() {
						r = (l.height > 0) ? l.height : 32;
						i = (l.width > 0) ? l.width : 32;
						u.height = r;
						u.width = i;
						t = u.getContext('2d');
						f.ready()
					};
					l.setAttribute('src', d.getAttribute('href'))
				} else {
					r = 32;
					i = 32;
					l.height = r;
					l.width = i;
					u.height = r;
					u.width = i;
					t = u.getContext('2d');
					f.ready()
				}
			},
			f = {};
		f.ready = function() {
			d = !0;
			f.reset();
			s()
		};
		f.reset = function() {
			if (!d) {
				return
			};
			c = [];
			x = !1;
			m = !1;
			t.clearRect(0, 0, i, r);
			t.drawImage(l, 0, 0, i, r);
			y.setIcon(u);
			window.clearTimeout(I);
			window.clearTimeout(M)
		};
		f.start = function() {
			if (!d || m) {
				return
			};
			var o = function() {
				x = c[0];
				m = !1;
				if (c.length > 0) {
					c.shift();
					f.start()
				} else {}
			};
			if (c.length > 0) {
				m = !0;
				var t = function() {
					['type', 'animation', 'bgColor', 'textColor', 'fontFamily', 'fontStyle'].forEach(function(t) {
						if (t in c[0].options) {
							e[t] = c[0].options[t]
						}
					});
					n.run(c[0].options, function() {
						o()
					}, !1)
				};
				if (x) {
					n.run(x.options, function() {
						t()
					}, !0)
				} else {
					t()
				}
			}
		};
		var p = {};
		var E = function(e) {
			e.n = ((typeof e.n) === 'number') ? Math.abs(e.n | 0) : e.n;
			e.x = i * e.x;
			e.y = r * e.y;
			e.w = i * e.w;
			e.h = r * e.h;
			e.len = ('' + e.n).length;
			return e
		};
		p.circle = function(o) {
			o = E(o);
			var n = !1;
			if (o.len === 2) {
				o.x = o.x - o.w * 0.4;
				o.w = o.w * 1.4;
				n = !0
			} else if (o.len >= 3) {
				o.x = o.x - o.w * 0.65;
				o.w = o.w * 1.65;
				n = !0
			};
			t.clearRect(0, 0, i, r);
			t.drawImage(l, 0, 0, i, r);
			t.beginPath();
			t.font = e.fontStyle + ' ' + Math.floor(o.h * (o.n > 99 ? 0.85 : 1)) + 'px ' + e.fontFamily;
			t.textAlign = 'center';
			if (n) {
				t.moveTo(o.x + o.w / 2, o.y);
				t.lineTo(o.x + o.w - o.h / 2, o.y);
				t.quadraticCurveTo(o.x + o.w, o.y, o.x + o.w, o.y + o.h / 2);
				t.lineTo(o.x + o.w, o.y + o.h - o.h / 2);
				t.quadraticCurveTo(o.x + o.w, o.y + o.h, o.x + o.w - o.h / 2, o.y + o.h);
				t.lineTo(o.x + o.h / 2, o.y + o.h);
				t.quadraticCurveTo(o.x, o.y + o.h, o.x, o.y + o.h - o.h / 2);
				t.lineTo(o.x, o.y + o.h / 2);
				t.quadraticCurveTo(o.x, o.y, o.x + o.h / 2, o.y)
			} else {
				t.arc(o.x + o.w / 2, o.y + o.h / 2, o.h / 2, 0, 2 * Math.PI)
			};
			t.fillStyle = 'rgba(' + e.bgColor.r + ',' + e.bgColor.g + ',' + e.bgColor.b + ',' + o.o + ')';
			t.fill();
			t.closePath();
			t.beginPath();
			t.stroke();
			t.fillStyle = 'rgba(' + e.textColor.r + ',' + e.textColor.g + ',' + e.textColor.b + ',' + o.o + ')';
			if ((typeof o.n) === 'number' && o.n > 999) {
				t.fillText(((o.n > 9999) ? 9 : Math.floor(o.n / 1000)) + 'k+', Math.floor(o.x + o.w / 2), Math.floor(o.y + o.h - o.h * 0.2))
			} else {
				t.fillText(o.n, Math.floor(o.x + o.w / 2), Math.floor(o.y + o.h - o.h * 0.15))
			};
			t.closePath()
		};
		p.rectangle = function(o) {
			o = E(o);
			var n = !1;
			if (o.len === 2) {
				o.x = o.x - o.w * 0.4;
				o.w = o.w * 1.4;
				n = !0
			} else if (o.len >= 3) {
				o.x = o.x - o.w * 0.65;
				o.w = o.w * 1.65;
				n = !0
			};
			t.clearRect(0, 0, i, r);
			t.drawImage(l, 0, 0, i, r);
			t.beginPath();
			t.font = e.fontStyle + ' ' + Math.floor(o.h * (o.n > 99 ? 0.9 : 1)) + 'px ' + e.fontFamily;
			t.textAlign = 'center';
			t.fillStyle = 'rgba(' + e.bgColor.r + ',' + e.bgColor.g + ',' + e.bgColor.b + ',' + o.o + ')';
			t.fillRect(o.x, o.y, o.w, o.h);
			t.fillStyle = 'rgba(' + e.textColor.r + ',' + e.textColor.g + ',' + e.textColor.b + ',' + o.o + ')';
			if ((typeof o.n) === 'number' && o.n > 999) {
				t.fillText(((o.n > 9999) ? 9 : Math.floor(o.n / 1000)) + 'k+', Math.floor(o.x + o.w / 2), Math.floor(o.y + o.h - o.h * 0.2))
			} else {
				t.fillText(o.n, Math.floor(o.x + o.w / 2), Math.floor(o.y + o.h - o.h * 0.15))
			};
			t.closePath()
		};
		var T = function(e, t) {
				t = ((typeof t) === 'string' ? {
					animation: t
				} : t) || {};
				s = function() {
					try {
						if (typeof(e) === 'number' ? (e > 0) : (e !== '')) {
							var o = {
								type: 'badge',
								options: {
									n: e
								}
							};
							if ('animation' in t && n.types['' + t.animation]) {
								o.options.animation = '' + t.animation
							};
							if ('type' in t && p['' + t.type]) {
								o.options.type = '' + t.type
							}['bgColor', 'textColor'].forEach(function(e) {
								if (e in t) {
									o.options[e] = b(t[e])
								}
							});
							['fontStyle', 'fontFamily'].forEach(function(e) {
								if (e in t) {
									o.options[e] = t[e]
								}
							});
							c.push(o);
							if (c.length > 100) {
								throw new Error('Too many badges requests in queue.')
							};
							f.start()
						} else {
							f.reset()
						}
					} catch (r) {
						throw new Error('Error setting badge. Message: ' + r.message)
					}
				};
				if (d) {
					s()
				}
			},
			U = function(e) {
				s = function() {
					try {
						var a = e.width,
							f = e.height,
							o = document.createElement('img'),
							l = (a / i < f / r) ? (a / i) : (f / r);
						o.setAttribute('crossOrigin', 'anonymous');
						o.onload = function() {
							t.clearRect(0, 0, i, r);
							t.drawImage(o, 0, 0, i, r);
							y.setIcon(u)
						};
						o.setAttribute('src', e.getAttribute('src'));
						o.height = (f / l);
						o.width = (a / l)
					} catch (n) {
						throw new Error('Error setting image. Message: ' + n.message)
					}
				};
				if (d) {
					s()
				}
			},
			R = function(e) {
				s = function() {
					y.setIconSrc(e)
				};
				if (d) {
					s()
				}
			},
			O = function(e) {
				s = function() {
					try {
						if (e === 'stop') {
							g = !0;
							f.reset();
							g = !1;
							return
						};
						e.addEventListener('play', function() {
							C(this)
						}, !1)
					} catch (t) {
						throw new Error('Error setting video. Message: ' + t.message)
					}
				};
				if (d) {
					s()
				}
			},
			S = function(e) {
				if (!window.URL || !window.URL.createObjectURL) {
					window.URL = window.URL || {};
					window.URL.createObjectURL = function(e) {
						return e
					}
				};
				if (a.supported) {
					var t = !1;
					navigator.getUserMedia = navigator.getUserMedia || navigator.oGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
					s = function() {
						try {
							if (e === 'stop') {
								g = !0;
								f.reset();
								g = !1;
								return
							};
							t = document.createElement('video');
							t.width = i;
							t.height = r;
							navigator.getUserMedia({
								video: !0,
								audio: !1
							}, function(e) {
								t.src = URL.createObjectURL(e);
								t.play();
								C(t)
							}, function() {})
						} catch (o) {
							throw new Error('Error setting webcam. Message: ' + o.message)
						}
					};
					if (d) {
						s()
					}
				}
			},
			L = function(t, r) {
				var i = t;
				if (!(r == null && Object.prototype.toString.call(t) == '[object Object]')) {
					i = {};
					i[t] = r
				};
				var n = Object.keys(i);
				for (var o = 0; o < n.length; o++) {
					if (n[o] == 'bgColor' || n[o] == 'textColor') {
						e[n[o]] = b(i[n[o]])
					} else {
						e[n[o]] = i[n[o]]
					}
				};
				c.push(x);
				f.start()
			};

		function C(e) {
			if (e.paused || e.ended || g) {
				return !1
			};
			try {
				t.clearRect(0, 0, i, r);
				t.drawImage(e, 0, 0, i, r)
			} catch (o) {};
			M = setTimeout(function() {
				C(e)
			}, n.duration);
			y.setIcon(u)
		};
		var y = {};
		y.getIcons = function() {
			var t = [],
				o = function() {
					var o = [],
						t = h.getElementsByTagName('head')[0].getElementsByTagName('link');
					for (var e = 0; e < t.length; e++) {
						if ((/(^|\s)icon(\s|$)/i).test(t[e].getAttribute('rel'))) {
							o.push(t[e])
						}
					};
					return o
				};
			if (e.element) {
				t = [e.element]
			} else if (e.elementId) {
				t = [h.getElementById(e.elementId)];
				t[0].setAttribute('href', t[0].getAttribute('src'))
			} else {
				t = o();
				if (t.length === 0) {
					t = [h.createElement('link')];
					t[0].setAttribute('rel', 'icon');
					h.getElementsByTagName('head')[0].appendChild(t[0])
				}
			};
			t.forEach(function(e) {
				e.setAttribute('type', 'image/png')
			});
			return t
		};
		y.setIcon = function(e) {
			var t = e.toDataURL('image/png');
			y.setIconSrc(t)
		};
		y.setIconSrc = function(t) {
			if (e.dataUrl) {
				e.dataUrl(t)
			};
			if (e.element) {
				e.element.setAttribute('href', t);
				e.element.setAttribute('src', t)
			} else if (e.elementId) {
				var r = h.getElementById(e.elementId);
				r.setAttribute('href', t);
				r.setAttribute('src', t)
			} else {
				if (a.ff || a.opera) {
					var n = w[w.length - 1],
						o = h.createElement('link');
					w = [o];
					if (a.opera) {
						o.setAttribute('rel', 'icon')
					};
					o.setAttribute('rel', 'icon');
					o.setAttribute('type', 'image/png');
					h.getElementsByTagName('head')[0].appendChild(o);
					o.setAttribute('href', t);
					if (n.parentNode) {
						n.parentNode.removeChild(n)
					}
				} else {
					w.forEach(function(e) {
						e.setAttribute('href', t)
					})
				}
			}
		};

		function b(e) {
			var o = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			e = e.replace(o, function(e, t, o, n) {
				return t + t + o + o + n + n
			});
			var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
			return t ? {
				r: parseInt(t[1], 16),
				g: parseInt(t[2], 16),
				b: parseInt(t[3], 16)
			} : !1
		};

		function A(e, t) {
			var n = {};
			var o;
			for (o in e) {
				n[o] = e[o]
			};
			for (o in t) {
				n[o] = t[o]
			};
			return n
		};

		function j() {
			return h.hidden || h.msHidden || h.webkitHidden || h.mozHidden
		};
		var n = {};
		n.duration = 40;
		n.types = {};
		n.types.fade = [{
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 0.0
		}, {
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 0.1
		}, {
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 0.2
		}, {
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 0.3
		}, {
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 0.4
		}, {
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 0.5
		}, {
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 0.6
		}, {
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 0.7
		}, {
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 0.8
		}, {
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 0.9
		}, {
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 1.0
		}];
		n.types.none = [{
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 1
		}];
		n.types.pop = [{
			x: 1,
			y: 1,
			w: 0,
			h: 0,
			o: 1
		}, {
			x: 0.9,
			y: 0.9,
			w: 0.1,
			h: 0.1,
			o: 1
		}, {
			x: 0.8,
			y: 0.8,
			w: 0.2,
			h: 0.2,
			o: 1
		}, {
			x: 0.7,
			y: 0.7,
			w: 0.3,
			h: 0.3,
			o: 1
		}, {
			x: 0.6,
			y: 0.6,
			w: 0.4,
			h: 0.4,
			o: 1
		}, {
			x: 0.5,
			y: 0.5,
			w: 0.5,
			h: 0.5,
			o: 1
		}, {
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 1
		}];
		n.types.popFade = [{
			x: 0.75,
			y: 0.75,
			w: 0,
			h: 0,
			o: 0
		}, {
			x: 0.65,
			y: 0.65,
			w: 0.1,
			h: 0.1,
			o: 0.2
		}, {
			x: 0.6,
			y: 0.6,
			w: 0.2,
			h: 0.2,
			o: 0.4
		}, {
			x: 0.55,
			y: 0.55,
			w: 0.3,
			h: 0.3,
			o: 0.6
		}, {
			x: 0.50,
			y: 0.50,
			w: 0.4,
			h: 0.4,
			o: 0.8
		}, {
			x: 0.45,
			y: 0.45,
			w: 0.5,
			h: 0.5,
			o: 0.9
		}, {
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 1
		}];
		n.types.slide = [{
			x: 0.4,
			y: 1,
			w: 0.6,
			h: 0.6,
			o: 1
		}, {
			x: 0.4,
			y: 0.9,
			w: 0.6,
			h: 0.6,
			o: 1
		}, {
			x: 0.4,
			y: 0.9,
			w: 0.6,
			h: 0.6,
			o: 1
		}, {
			x: 0.4,
			y: 0.8,
			w: 0.6,
			h: 0.6,
			o: 1
		}, {
			x: 0.4,
			y: 0.7,
			w: 0.6,
			h: 0.6,
			o: 1
		}, {
			x: 0.4,
			y: 0.6,
			w: 0.6,
			h: 0.6,
			o: 1
		}, {
			x: 0.4,
			y: 0.5,
			w: 0.6,
			h: 0.6,
			o: 1
		}, {
			x: 0.4,
			y: 0.4,
			w: 0.6,
			h: 0.6,
			o: 1
		}];
		n.run = function(t, r, i, o) {
			var a = n.types[j() ? 'none' : e.animation];
			if (i === !0) {
				o = (typeof o !== 'undefined') ? o : a.length - 1
			} else {
				o = (typeof o !== 'undefined') ? o : 0
			};
			r = (r) ? r : function() {};
			if ((o < a.length) && (o >= 0)) {
				p[e.type](A(t, a[o]));
				I = setTimeout(function() {
					if (i) {
						o = o - 1
					} else {
						o = o + 1
					};
					n.run(t, r, i, o)
				}, n.duration);
				y.setIcon(u)
			} else {
				r();
				return
			}
		};
		k();
		return {
			badge: T,
			video: O,
			image: U,
			rawImageSrc: R,
			webcam: S,
			setOpt: L,
			reset: f.reset,
			browser: {
				supported: a.supported
			}
		}
	});
	if (typeof define !== 'undefined' && define.amd) {
		define([], function() {
			return e
		})
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = e
	} else {
		this.Favico = e
	}
})();
! function(t, e) {
	'use strict';
	var n = function(t, e, n) {
		var i;
		return function() {
			function s() {
				n || t.apply(a, r), i = null
			};
			var a = this,
				r = arguments;
			i ? clearTimeout(i) : n && t.apply(a, r), i = setTimeout(s, e || 100)
		}
	};
	jQuery.fn[e] = function(t) {
		return t ? this.bind('resize', n(t)) : this.trigger(e)
	}
}(jQuery, 'smartresize'),
function(t) {
	'use strict';

	function s() {
		this.reset()
	};
	var i, e = document.documentElement.style,
		p = e.textWrap || e.WebkitTextWrap || e.MozTextWrap || e.MsTextWrap || e.OTextWrap;
	s.prototype.reset = function() {
		this.index = 0, this.width = 0
	};
	var l = function(t, e) {
			var n, a = /\s(?![^<]*>)/g;
			if (!i)
				for (i = []; null !== (n = a.exec(t));) i.push(n.index);
			return -1 !== i.indexOf(e)
		},
		o = function(e) {
			e.find('br[data-owner="balance-text"]').replaceWith(' ');
			var i = e.find('span[data-owner="balance-text"]');
			if (i.length > 0) {
				var n = '';
				i.each(function() {
					n += t(this).text(), t(this).remove()
				}), e.html(n)
			}
		},
		d = function(t) {
			return e = t.get(0).currentStyle || window.getComputedStyle(t.get(0), null), 'justify' === e.textAlign
		},
		h = function(e, n, a) {
			n = t.trim(n);
			var r = n.split(' ').length;
			if (n += ' ', 2 > r) return n;
			var i = t('<span></span>').html(n);
			e.append(i);
			var l = i.width();
			i.remove();
			var s = Math.floor((a - l) / (r - 1));
			return i.css('word-spacing', s + 'px').attr('data-owner', 'balance-text'), t('<div></div>').append(i).html()
		},
		u = function(t, e) {
			return 0 === e || e === t.length || l(t, e - 1) && !l(t, e)
		},
		a = function(t, e, a, s, r, n, l) {
			var i;
			if (e && 'string' == typeof e)
				for (;;) {
					for (; !u(e, n);) n += r;
					if (t.html(e.substr(0, n)), i = t.width(), 0 > r ? s >= i || 0 >= i || 0 === n : i >= s || i >= a || n === e.length) break;
					n += r
				};
			l.index = n, l.width = i
		},
		c = function(e, n) {
			var t = document.createElement('div');
			t.style.display = 'block', t.style.position = 'absolute', t.style.bottom = 0, t.style.right = 0, t.style.width = 0, t.style.height = 0, t.style.margin = 0, t.style.padding = 0, t.style.visibility = 'hidden', t.style.overflow = 'hidden';
			var i = document.createElement('span');
			i.style.fontSize = '2000px', i.innerHTML = '&nbsp;', t.appendChild(i), e.append(t);
			var a = i.getBoundingClientRect();
			t.parentNode.removeChild(t);
			var r = a.height / a.width;
			return n / r
		},
		n = {
			sel: ['.balance-text'],
			$el: t()
		},
		r = function() {
			n.$el.add(n.sel.join(',')).balanceText()
		};
	t.fn.balanceTextUpdate = r, t.balanceText = function(e) {
		'string' == typeof e ? n.sel.push(e) : n.$el = n.$el.add(e), t(e).balanceText()
	}, t.fn.balanceText = function() {
		return p ? this : this.each(function() {
			var e = t(this),
				H = 5e3;
			o(e);
			var M = this.style.whiteSpace,
				j = this.style['float'],
				z = this.style.display,
				C = this.style.position,
				E = this.style.lineHeight;
			e.css('line-height', 'normal');
			var l = e.width(),
				S = e.height();
			e.css({
				'white-space': 'nowrap',
				'float': 'none',
				display: 'inline',
				position: 'static'
			});
			var x = e.width(),
				b = e.height(),
				T = 'pre-wrap' === M ? 0 : c(e, b);
			if (l > 0 && x > l && H > x) {
				for (var n = e.html(), y = '', g = '', m = d(e), W = Math.round(S / b), v = W; v > 1;) {
					i = null;
					var p = Math.round((x + T) / v - T),
						f = Math.round((n.length + 1) / v) - 1,
						r = new s;
					a(e, n, l, p, -1, f, r);
					var u = new s;
					f = r.index, a(e, n, l, p, 1, f, u), r.reset(), f = u.index, a(e, n, l, p, -1, f, r);
					var w;
					w = 0 === r.index ? u.index : l < u.width || r.index === u.index ? r.index : Math.abs(p - r.width) < Math.abs(u.width - p) ? r.index : u.index, g = n.substr(0, w), m ? y += h(e, g, l) : (y += g.replace(/\s$/, ''), y += '<br data-owner="balance-text" />'), n = n.substr(w), v--, e.html(n), x = e.width()
				};
				m ? e.html(y + h(e, n, l)) : e.html(y + n)
			};
			this.style.whiteSpace = M, this.style['float'] = j, this.style.display = z, this.style.position = C, this.style.lineHeight = E
		})
	}, t(window).ready(r), t(window).smartresize(r)
}(jQuery);

<!-- FUNCTION THREE -->
(function(e, t, u) {
	'$:nomunge';
	e.map('click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup'.split(' '), function(e) {
		n(e)
	});
	n('focusin', 'focus' + u);
	n('focusout', 'blur' + u);
	e.addOutsideEvent = n;

	function n(n, i) {
		i = i || n + u;
		var o = e(),
			s = n + '.' + i + '-special-event';
		e.event.special[i] = {
			setup: function() {
				o = o.add(this);
				if (o.length === 1) {
					e(t).bind(s, a)
				}
			},
			teardown: function() {
				o = o.not(this);
				if (o.length === 0) {
					e(t).unbind(s)
				}
			},
			add: function(e) {
				var t = e.handler;
				e.handler = function(e, n) {
					e.target = n;
					t.apply(this, arguments)
				}
			}
		};

		function a(t) {
			e(o).each(function() {
				var n = e(this);
				if (this !== t.target && !n.has(t.target).length) {
					n.triggerHandler(i, [t.target])
				}
			})
		}
	}
})(jQuery, document, 'outside');
/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-audio-csstransitions-inputtypes-localstorage-svg-setclasses */
! function(t, e, a) {
	function l(e, t) {
		return typeof e === t
	};

	function b() {
		var o, e, a, r, s, u, t;
		for (var i in c)
			if (c.hasOwnProperty(i)) {
				if (o = [], e = c[i], e.name && (o.push(e.name.toLowerCase()), e.options && e.options.aliases && e.options.aliases.length))
					for (a = 0; a < e.options.aliases.length; a++) o.push(e.options.aliases[a].toLowerCase());
				for (r = l(e.fn, 'function') ? e.fn() : e.fn, s = 0; s < o.length; s++) u = o[s], t = u.split('.'), 1 === t.length ? n[t[0]] = r : (!n[t[0]] || n[t[0]] instanceof Boolean || (n[t[0]] = new Boolean(n[t[0]])), n[t[0]][t[1]] = r), h.push((r ? '' : 'no-') + t.join('-'))
			}
	};

	function P(e) {
		var t = s.className,
			o = n._config.classPrefix || '';
		if (p && (t = t.baseVal), n._config.enableJSClass) {
			var a = new RegExp('(^|\\s)' + o + 'no-js(\\s|$)');
			t = t.replace(a, '$1' + o + 'js$2')
		};
		n._config.enableClasses && (t += ' ' + o + e.join(' ' + o), p ? s.className.baseVal = t : s.className = t)
	};

	function u() {
		return 'function' != typeof e.createElement ? e.createElement(arguments[0]) : p ? e.createElementNS.call(e, 'http://www.w3.org/2000/svg', arguments[0]) : e.createElement.apply(e, arguments)
	};

	function x(e, t) {
		return !!~('' + e).indexOf(t)
	};

	function E(e) {
		return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
			return t + n.toUpperCase()
		}).replace(/^-/, '')
	};

	function k(e, t) {
		return function() {
			return e.apply(t, arguments)
		}
	};

	function N(e, t, n) {
		var o;
		for (var a in e)
			if (e[a] in t) return n === !1 ? e[a] : (o = t[e[a]], l(o, 'function') ? k(o, n || t) : o);
		return !1
	};

	function w(e) {
		return e.replace(/([A-Z])/g, function(e, t) {
			return '-' + t.toLowerCase()
		}).replace(/^ms-/, '-ms-')
	};

	function A() {
		var t = e.body;
		return t || (t = u(p ? 'svg' : 'body'), t.fake = !0), t
	};

	function z(t, n, o, l) {
		var r, d, c, f, p = 'modernizr',
			i = u('div'),
			a = A();
		if (parseInt(o, 10))
			for (; o--;) c = u('div'), c.id = l ? l[o] : p + (o + 1), i.appendChild(c);
		return r = u('style'), r.type = 'text/css', r.id = 's' + p, (a.fake ? a : i).appendChild(r), a.appendChild(i), r.styleSheet ? r.styleSheet.cssText = t : r.appendChild(e.createTextNode(t)), i.id = p, a.fake && (a.style.background = '', a.style.overflow = 'hidden', f = s.style.overflow, s.style.overflow = 'hidden', s.appendChild(a)), d = n(i, t), a.fake ? (a.parentNode.removeChild(a), s.style.overflow = f, s.offsetHeight) : i.parentNode.removeChild(i), !!d
	};

	function j(e, n) {
		var r = e.length;
		if ('CSS' in t && 'supports' in t.CSS) {
			for (; r--;)
				if (t.CSS.supports(w(e[r]), n)) return !0;
			return !1
		};
		if ('CSSSupportsRule' in t) {
			for (var o = []; r--;) o.push('(' + w(e[r]) + ':' + n + ')');
			return o = o.join(' or '), z('@supports (' + o + ') { #modernizr { position: absolute; } }', function(e) {
				return 'absolute' == getComputedStyle(e, null).position
			})
		};
		return a
	};

	function V(e, t, n, s) {
		function c() {
			p && (delete r.style, delete r.modElem)
		};
		if (s = l(s, 'undefined') ? !1 : s, !l(n, 'undefined')) {
			var y = j(e, n);
			if (!l(y, 'undefined')) return y
		};
		for (var p, i, d, o, f, m = ['modernizr', 'tspan', 'samp']; !r.style && m.length;) p = !0, r.modElem = u(m.shift()), r.style = r.modElem.style;
		for (d = e.length, i = 0; d > i; i++)
			if (o = e[i], f = r.style[o], x(o, '-') && (o = E(o)), r.style[o] !== a) {
				if (s || l(n, 'undefined')) return c(), 'pfx' == t ? o : !0;
				try {
					r.style[o] = n
				} catch (g) {};
				if (r.style[o] != f) return c(), 'pfx' == t ? o : !0
			};
		return c(), !1
	};

	function C(e, t, n, a, s) {
		var o = e.charAt(0).toUpperCase() + e.slice(1),
			r = (e + ' ' + g.join(o + ' ') + o).split(' ');
		return l(t, 'string') || l(t, 'undefined') ? V(r, t, a, s) : (r = (e + ' ' + m.join(o + ' ') + o).split(' '), N(r, t, n))
	};

	function S(e, t, n) {
		return C(e, a, a, t, n)
	};
	var h = [],
		c = [],
		i = {
			_version: '3.3.1',
			_config: {
				classPrefix: '',
				enableClasses: !0,
				enableJSClass: !0,
				usePrefixes: !0
			},
			_q: [],
			on: function(e, t) {
				var n = this;
				setTimeout(function() {
					t(n[e])
				}, 0)
			},
			addTest: function(e, t, n) {
				c.push({
					name: e,
					fn: t,
					options: n
				})
			},
			addAsyncTest: function(e) {
				c.push({
					name: null,
					fn: e
				})
			}
		},
		n = function() {};
	n.prototype = i, n = new n, n.addTest('svg', !!e.createElementNS && !!e.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect), n.addTest('localstorage', function() {
		var e = 'modernizr';
		try {
			return localStorage.setItem(e, e), localStorage.removeItem(e), !0
		} catch (t) {
			return !1
		}
	});
	var s = e.documentElement,
		p = 'svg' === s.nodeName.toLowerCase();
	n.addTest('audio', function() {
		var t = u('audio'),
			e = !1;
		try {
			(e = !!t.canPlayType) && (e = new Boolean(e), e.ogg = t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''), e.mp3 = t.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ''), e.opus = t.canPlayType('audio/ogg; codecs="opus"') || t.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ''), e.wav = t.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''), e.m4a = (t.canPlayType('audio/x-m4a;') || t.canPlayType('audio/aac;')).replace(/^no$/, ''))
		} catch (n) {};
		return e
	});
	var o = u('input'),
		T = 'search tel url email datetime date month week time datetime-local number range color'.split(' '),
		v = {};
	n.inputtypes = function(t) {
		for (var r, l, n, c = t.length, u = '1)', i = 0; c > i; i++) o.setAttribute('type', r = t[i]), n = 'text' !== o.type && 'style' in o, n && (o.value = u, o.style.cssText = 'position:absolute;visibility:hidden;', /^range$/.test(r) && o.style.WebkitAppearance !== a ? (s.appendChild(o), l = e.defaultView, n = l.getComputedStyle && 'textfield' !== l.getComputedStyle(o, null).WebkitAppearance && 0 !== o.offsetHeight, s.removeChild(o)) : /^(search|tel)$/.test(r) || (n = /^(url|email)$/.test(r) ? o.checkValidity && o.checkValidity() === !1 : o.value != u)), v[t[i]] = !!n;
		return v
	}(T);
	var y = 'Moz O ms Webkit',
		g = i._config.usePrefixes ? y.split(' ') : [];
	i._cssomPrefixes = g;
	var m = i._config.usePrefixes ? y.toLowerCase().split(' ') : [];
	i._domPrefixes = m;
	var f = {
		elem: u('modernizr')
	};
	n._q.push(function() {
		delete f.elem
	});
	var r = {
		style: f.elem.style
	};
	n._q.unshift(function() {
		delete r.style
	}), i.testAllProps = C, i.testAllProps = S, n.addTest('csstransitions', S('transition', 'all', !0)), b(), P(h), delete i.addTest, delete i.addAsyncTest;
	for (var d = 0; d < n._q.length; d++) n._q[d]();
	t.Modernizr = n
}(window, document);;
var __app = __app || {};
__app.aos = {
	__deps: [],
	options: {
		className: 'page-aos',
		easing: 'ease-out-back',
		duration: 1300,
	},
	init: function() {
		var a = this,
			s = __app.__html;
		if (!s.hasClass(a.options.className)) {
			s.addClass(a.options.className)
		};
		AOS.init({
			easing: a.options.easing,
			duration: a.options.duration,
		})
	},
	remove: function() {
		$('[data-aos]').each(function() {
			var a = $(this);
			a.removeAttr('data-aos').removeAttr('data-aos-duration').removeAttr('data-aos-offset').removeAttr('data-aos-delay')
		});
		__app.__html.removeClass(_self.options.className);
		AOS.refreshHard()
	},
	__run: function() {
		var a = this;
		if (__app.__html.hasClass(a.options.className)) {
			a.init()
		};
		__app.__document.on('shown.bs.collapse hidden.bs.collapse', function() {
			if (__app.__html.hasClass(a.options.className)) {
				AOS.refreshHard()
			}
		})
	}
};;
var __app = __app || {};
__app.audiobook = {
	__deps: ['utils', 'sounds', 'prefs'],
	options: {
		selector: 'audio.audiobook',
		sound: 'audiobook',
		playerId: 'audiobook-player',
		toolbarSelector: '[role="toolbar"]',
		iconSelector: '.fa',
		download: !0,
		speed: {
			min: 0.5,
			max: 1.75,
			step: .25
		},
		step: 10,
		actions: {
			main: {
				play: {
					title: 'Jouer / Pause',
					icon: 'fa-play',
					pauseIcon: 'fa-pause',
					accessKey: 'P'
				},
				restart: {
					title: 'Relancer',
					icon: 'fa-repeat',
					accessKey: 'S'
				}
			},
			steps: {
				backward: {
					title: 'Reculer de 10 secondes',
					icon: 'fa-step-backward',
					accessKey: 'R'
				},
				forward: {
					title: 'Avancer de 10 secondes',
					icon: 'fa-step-forward',
					accessKey: 'A'
				}
			},
			speed: {
				decrease: {
					title: 'Ralentir la lecture',
					icon: 'fa-chevron-down',
					accessKey: 'L'
				},
				increase: {
					title: 'Accélérer la lecture',
					icon: 'fa-chevron-up',
					accessKey: 'C'
				}
			},
			volume: {
				classes: 'pull-right',
				volume: {
					title: 'Volume',
					icon: 'fa-volume-up',
					accessKey: 'V',
					medium: {
						value: 0.5,
						title: 'Volume moyen',
						icon: 'fa-volume-down'
					},
					full: {
						value: 1,
						title: 'Plein volume',
						icon: 'fa-volume-up'
					},
					low: {
						value: 0.15,
						title: 'Volume réduit',
						icon: 'fa-volume-off'
					}
				}
			}
		},
		strings: {
			status: {
				playing: 'Lecture',
				paused: 'Pause',
				loading: 'Chargement…',
				ready: 'Prêt',
				ended: 'Terminée',
				buffering: 'Chargement…'
			}
		},
		templates: {
			time: '<span class="elapsed">__elapsed__</span><span class="over hidden-xs"> / </span><span class="duration hidden-xs">__duration__</span>',
			speed: '<span class="hidden-xs">Vitesse : </span><span class="value">__speed__x</span>',
			player: '<div class="player" id="__id__"><div class="player-seekbar"><input type="range" accesskey="B" min="0" max="0" step="1" value="0" disabled="disabled"><span class="sr-only readable-progress" aria-live="polite"></span></div><div class="btn-toolbar" role="toolbar"></div><div class="player-infos row"><div class="col-xs-4 player-time"></div><div class="col-xs-4 player-speed" aria-live="assertive"></div><div class="col-xs-4 player-status" aria-live="polite">Chargement…</div></div></div>',
			buttonGroup: '<div class="btn-group player-group-__group__"></div>',
			button: '<button disabled="disabled" class="btn btn-default" accesskey="__shortcut__" type="button" title="__title__"><span class="sr-only">__title__</span><i class="fa fa-fw" aria-hidden="true"></i></button>',
			download: '<a disabled="disabled" download href="__href__" title="Télécharger le fichier sonore" class="btn btn-default"><span class="sr-only">Télécharger le fichier sonore de cette lecture</span><i class="fa fa-fw fa-download" aria-hidden="true"></i></a>',
		}
	},
	_oAudio: null,
	_player: null,
	_playing: !1,
	_rangeDragging: !1,
	_volumeState: 'full',
	_downloadLink: null,
	_normalTime: null,
	_bufferTime: null,
	_hammerTime: 'Can\'t touch this!',
	play: function() {
		var a = this;
		__app.sounds.play('audiobook', !0, a._updateTime);
		a._updatePlayButton()
	},
	restart: function() {
		var a = this;
		__app.sounds.restart('audiobook')
	},
	volume: function() {
		var t = this,
			e = ['low', 'medium', 'full'],
			a = e.indexOf(t._volumeState);
		++a;
		if (a >= e.length) {
			a = 0
		};
		t._switchVolume(e[a])
	},
	increase: function() {
		var a = this,
			t = __app.sounds.getPlaybackRate(a.options.sound);
		if (t < a.options.speed.max) {
			var e = t + a.options.speed.step;
			__app.sounds.setPlaybackRate(a.options.sound, e);
			__app.prefs.set('audiobook_playback_rate', e)
		};
		a._updateSpeed()
	},
	decrease: function() {
		var a = this,
			t = __app.sounds.getPlaybackRate(a.options.sound);
		if (t > a.options.speed.min) {
			var e = t - a.options.speed.step;
			__app.sounds.setPlaybackRate(a.options.sound, e);
			__app.prefs.set('audiobook_playback_rate', e)
		};
		a._updateSpeed()
	},
	seek: function(a) {
		var e = this;
		__app.sounds.seek(e.options.sound, a)
	},
	forward: function() {
		var a = this;
		__app.sounds.advance(a.options.sound, a.options.step);
		a._updateAll()
	},
	backward: function() {
		var a = this;
		__app.sounds.rewind(a.options.sound, a.options.step);
		a._updateAll()
	},
	_switchVolume: function(a) {
		var e = this,
			a = a || 0,
			t = e.options.actions.volume.volume[a] || null;
		if (null == t) {
			throw new Error('Invalid volume state: ' + a)
		};
		e._changeIcon('volume', t.icon);
		e._changeTitle('volume', t.title);
		__app.sounds.setVolume(t.value, e.options.sound);
		e._volumeState = a;
		__app.prefs.set('audiobook_volume_state', a)
	},
	_updateAll: function() {
		var a = this,
			e = a.options.sound,
			t = __app.sounds.getPosition(e),
			o = __app.sounds.getDuration(e),
			s = a._playing ? a.options.strings.status.playing : a.options.strings.status.paused;
		a._updateTime(t, o);
		a._updateSpeed();
		a._updateStatus(s);
		a._updatePlayButton();
		a._updateSpeedButtons();
		a._updateStepButtons()
	},
	_checkBuffering: function() {
		var a = this;
		if (!a._playing) {
			return
		};
		a._bufferTime = (new Date()).getTime();
		if (Math.abs(a._normalTime - a._bufferTime) > 1000) {
			a._updateStatus(a.options.strings.status.buffering)
		}
	},
	_updateTime: function(a, t) {
		var e = __app.audiobook,
			a = Math.round(a),
			t = Math.round(t),
			o = e._player.find('input[type="range"]'),
			s = __app.utils.template(e.options.templates.time, {
				elapsed: e._timeFormat(a),
				duration: e._timeFormat(t)
			});
		if (!e._rangeDragging) {
			o.attr('min', 0).attr('max', t).val(a)
		};
		e._player.find('.player-time').html(s);
		e._player.find('.readable-progress').text(a + ' secondes');
		e._updateStepButtons();
		if (e._playing) {
			e._normalTime = (new Date()).getTime()
		}
	},
	_updateSpeed: function() {
		var a = this,
			e = __app.sounds.getPlaybackRate(a.options.sound),
			t = __app.utils.template(a.options.templates.speed, {
				speed: e
			});
		a._player.find('.player-speed').html(t);
		a._updateSpeedButtons()
	},
	_updateStatus: function(a) {
		var e = this;
		e._player.find('.player-status').text(a)
	},
	_updateSpeedButtons: function() {
		var a = this,
			e = a._player.find('[data-player-action="increase"]'),
			t = a._player.find('[data-player-action="decrease"]'),
			o = __app.sounds.getPlaybackRate(a.options.sound);
		e.removeAttr('disabled');
		t.removeAttr('disabled');
		if (o <= a.options.speed.min) {
			t.attr('disabled', !0)
		};
		if (o >= a.options.speed.max) {
			e.attr('disabled', !0)
		}
	},
	_updatePlayButton: function() {
		var a = this;
		a._changeIcon('play', a._playing ? a.options.actions.main.play.pauseIcon : a.options.actions.main.play.icon)
	},
	_updateStepButtons: function() {
		var a = this,
			e = a._player.find('[data-player-action="forward"]'),
			t = a._player.find('[data-player-action="backward"]'),
			o = __app.sounds.getPosition(a.options.sound),
			s = __app.sounds.getDuration(a.options.sound);
		e.removeAttr('disabled');
		t.removeAttr('disabled');
		if (o <= 0) {
			t.attr('disabled', !0)
		};
		if (o >= s) {
			e.attr('disabled', !0)
		}
	},
	_changeIcon: function(a, e) {
		var t = this,
			o = t._player.find('[data-player-action="' + a + '"]').find(t.options.iconSelector);
		o.removeClass().addClass(o.attr('data-original-class')).addClass(e)
	},
	_changeTitle: function(a, e) {
		var t = this,
			a = t._player.find('[data-player-action="' + a + '"]');
		newTitle = a.is('[accesskey]') ? e + ' [' + a.attr('accesskey') + ']' : e;
		a.attr('title', newTitle)
	},
	_timeFormat: function(a) {
		var o = Math.floor(a / 3600);
		a %= 3600;
		var t = Math.floor(a / 60);
		a = a % 60;
		var e = [__app.utils.pad(a)];
		e.unshift(__app.utils.pad(t));
		if (o > 0) {
			e.unshift(__app.utils.pad(t))
		};
		return e.join(':')
	},
	_registerAudioEvents: function() {
		var a = this;
		__app.__document.on('click', '.audiobook-collapser', function(e) {
			__app.sounds.activate(a.options.sound)
		}).on('app:sounds:ready', function(e) {
			if (e.id == a.options.sound) {
				a._player.removeClass('loading').find('[disabled]').removeAttr('disabled');
				a._switchVolume(__app.prefs.get('audiobook_volume_state', 'full'));
				__app.sounds.setPlaybackRate(a.options.sound, __app.prefs.get('audiobook_playback_rate', 1));
				a._updateAll()
			}
		}).on('app:sounds:playing app:sounds:resumed', function(e) {
			if (e.id == a.options.sound) {
				a._playing = !0;
				a._updateAll()
			}
		}).on('app:sounds:paused app:sounds:ended app:sounds:stopped', function(e) {
			if (e.id == a.options.sound) {
				a._playing = !1;
				a._updateAll()
			}
		}).on('app:sounds:ended', function(e) {
			if (e.id == a.options.sound) {
				a._updateStatus(a.options.strings.status.ended)
			}
		})
	},
	_buildToolbar: function(a) {
		var e = this;
		if (1 != a.length) {
			throw new Error('Invalid Toolbar in player template.')
		};
		e.__log('Building toolbar');
		$.each(e.options.actions, function(t, o) {
			var i = $(__app.utils.template(e.options.templates.buttonGroup, {
				group: t
			}));
			e.__log('[Toolbar] Group: ' + t);
			if (o.classes) {
				i.addClass(o.classes)
			};
			for (var s in o) {
				if (o.hasOwnProperty(s) && 'object' == typeof o[s]) {
					var n = o[s];
					html = __app.utils.template(e.options.templates.button, {
						title: n.title + ' [' + n.accessKey + ']',
						action: s,
						shortcut: n.accessKey
					}), button = $(html), icon = button.find(e.options.iconSelector);
					icon.attr('data-original-class', icon.attr('class')).addClass(n.icon);
					button.attr('data-player-action', s).appendTo(i);
					e.__log('[Toolbar] + Action: ' + s)
				}
			};
			i.appendTo(a)
		});
		if (e.options.download) {
			var t = $(__app.utils.template(e.options.templates.buttonGroup, {
				group: 'download'
			}));
			link = $(__app.utils.template(e.options.templates.download, {
				href: e._downloadLink
			}));
			t.append(link).appendTo(a);
			e.__log('[Toolbar] Adding download link')
		}
	},
	_buildPlayer: function(e) {
		var a = this;
		a.__log('Initializing audiobook player');
		if (a.options.download) {
			a._downloadLink = e.find('source[type="audio/mpeg"]').attr('src')
		};
		var s = __app.utils.template(a.options.templates.player, {
			id: a.options.playerId
		});
		a._player = $(s);
		a._player.addClass('loading');
		if (!Modernizr.inputtypes.range) {
			a._player.addClass('no-range-seekbar')
		};
		a._buildToolbar(a._player.find(a.options.toolbarSelector));
		e.hide().after(a._player);
		a.oAudio = e.get(0);
		a._registerAudioEvents();
		__app.sounds.manage(a.options.sound, a.oAudio);
		if (Modernizr.inputtypes.range) {
			var t = '#' + a.options.playerId + ' .player-seekbar input[type="range"]';
			__app.__document.on('change', t, function(e) {
				a.seek($(this).val())
			}).on('mousedown', t, function() {
				a._rangeDragging = !0
			}).on('mouseup', t, function() {
				a._rangeDragging = !1
			})
		};
		var o = '#' + a.options.playerId + ' ' + a.options.toolbarSelector + ' [data-player-action]';
		__app.__document.on('click', o, function(e) {
			var t = $(this),
				o = t.attr('data-player-action');
			a[o]();
			t.blur()
		})
	},
	__run: function() {
		if (!Modernizr.audio) {
			return
		};
		var a = this,
			e = $(a.options.selector).first();
		if (0 == e.length) {
			a.__log('No audiobook to play.');
			return
		};
		a._buildPlayer(e)
	}
};;
var __app = __app || {};
__app.backLinks = {
	__deps: ['totalLoading'],
	options: {
		selector: '[data-back-url]'
	},
	__run: function() {
		var a = this;
		__app.__document.on('click', a.options.selector, function(a) {
			a.preventDefault();
			__app.totalLoading.start();
			window.history.back()
		})
	}
};;
var __app = __app || {};
__app.backToTop = {
	__deps: ['scroll'],
	options: {
		selector: '#back-to-top'
	},
	__run: function() {
		var a = this,
			o = $('#back-to-top');
		if (o.length > 0 && o.get(0).getBoundingClientRect) {
			var e = $('.jumbotron').get(0),
				n = $('.navbar-fixed-top').outerHeight(),
				t = function() {
					if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
						o.addClass('rock-bottom')
					} else {
						o.removeClass('rock-bottom')
					};
					var t = e.getBoundingClientRect();
					if (t.bottom <= n) {
						o.addClass('in')
					} else {
						o.removeClass('in')
					}
				};
			__app.scroll.addHandler(t, 'back-to-top');
			t();
			__app.__document.on('click', '#back-to-top', function() {
				$(this).removeClass('rock-bottom')
			})
		}
	}
};;
var __app = __app || {};
__app.bonus = {
	__deps: ['totalLoading', 'dialogs', 'sounds', 'konami'],
	events: {
		started: 'app:bonus:started',
		stopped: 'app:bonus:stopped',
		ended: 'app:bonus:ended'
	},
	options: {
		trigger: '[data-special]',
		rootClass: 'very-special',
		sound: 'special',
	},
	_backdrop: null,
	_loaded: !1,
	_running: !1,
	_scrolled: !1,
	_update: function() {
		var e = __app.bonus;
		if (!e._running) {
			return
		};
		e._scrolled = 0 != e._backdrop.scrollTop();
		var a = __app.__window.height();
		e._backdrop.find('.scrollable').each(function() {
			var t = $(this),
				n = this.getBoundingClientRect();
			if (Math.floor(n.bottom) <= a && n.bottom > 0.05 * a) {
				t.addClass('in-viewport').removeClass('not-in-viewport');
				if ('cant-stenchon' == t.attr('id') && !t.is('[data-playing]')) {
					t.attr('data-playing', !0);
					__app.sounds.play(e.options.sound)
				}
			} else {
				t.addClass('not-in-viewport').removeClass('in-viewport');
				if (t.is('[data-playing]')) {
					__app.sounds.stop('special');
					t.removeAttr('data-playing')
				}
			}
		})
	},
	_buildElements: function() {
		var t = this,
			i = ['crown', 'keep', 'calm', 'and', 'vote', 'melenchon'],
			e = $('<div class="special-backdrop"/>'),
			o = $('<div class="container-fluid"/>');
		cantstenchon = $('<div id="cant-stenchon" class="scrollable"><img class="img-content-drop-shadow" src="/img/special/cant-stenchon.png"><img class="layer" id="deal-with-it" src="/img/special/layer-deal-with-it.png"><img class="layer" id="thug-life" src="/img/special/layer-thug-life.png"><img class="layer" id="petard" src="/img/special/layer-petard.png"></div>');
		credits = $('<div id="credits" class="scrollable"><p class="semi-lead">Avec les compliments de <a class="external" href="https://twitter.com/TintinCastrol" title="Votre dévoué serviteur">TintinCastro</a></p></div>');
		t.__log('Adding Elements to DOM');
		for (var a = 0; a < i.length; ++a) {
			var n = i[a],
				s = '/img/special/' + a + '-' + n;
			img = $('<img width="2500"/>').attr('src', s + (Modernizr.svg ? '.svg' : '.png')).addClass('img-responsive img-responsive-center img-responsive-svg-fix img-content-drop-shadow'), wrapper = $('<div/>');
			wrapper.attr('id', n).addClass('message-item scrollable').append(img).appendTo(o)
		};
		o.append(cantstenchon).append(credits).appendTo(e);
		e.appendTo(__app.__body);
		t._backdrop = e;
		if (e.get(0).getBoundingClientRect) {
			e.addClass('scroll-capable out').on('scroll', __app.utils.throttle(t._update, 150)).find('scrollable').addClass('not-in-viewport');
			__app.__window.on('resize', __app.utils.throttle(t._update, 400))
		}
	},
	start: function() {
		var e = this;
		if (e._running) {
			e.__log('Already running!');
			return
		};
		if (!e._loaded) {
			e._preload();
			return
		};
		e._backdrop.scrollTop(0);
		e._scrolled = !1;
		__app.__html.addClass(e.options.rootClass);
		e._running = !0;
		$.event.trigger(e.events.started);
		$.doTimeout(2000, function() {
			e._update()
		});
		$.doTimeout(5000, function() {
			var t = __app.__window.height(),
				a = e._backdrop.find('.container-fluid').first().outerHeight();
			if (!e._scrolled && a > t) {
				e.__log('Autoscroll engaged!');
				e._backdrop.animate({
					scrollTop: a - t
				}, a * 3, 'linear')
			}
		})
	},
	stop: function(e) {
		var a = this;
		a._running = !1;
		__app.sounds.stop('special');
		__app.__html.removeClass(a.options.rootClass);
		$.event.trigger(e ? a.events.ended : a.events.stopped);
		$.doTimeout(500, function() {})
	},
	_preload: function() {
		var e = this;
		__app.totalLoading.start();
		__app.sounds.add('special');
		__app.sounds.activate('special');
		e._buildElements();
		var a = Modernizr.svg ? '.svg' : '.png',
			t = ['/img/special/cant-stenchon.png', '/img/special/layer-deal-with-it.png', '/img/special/layer-petard.png', '/img/special/layer-thug-life.png', '/img/special/0-crown' + a, '/img/special/1-keep' + a, '/img/special/2-calm' + a, '/img/special/3-and' + a, '/img/special/4-vote' + a, '/img/special/5-melenchon' + a, ],
			n = function() {
				var a = t.shift();
				$('<img/>').on('load', function() {
					if (t.length > 0) {
						n();
						return
					};
					e._loaded = !0;
					__app.totalLoading.stop();
					e.start()
				}).on('error', function() {
					__app.totalLoading.stop();
					__app.dialogs.error('Zut, fichier introuvable !');
					__app.log('[Bonus] Unable to preload: ' + a)
				}).attr('src', a)
			};
		e.__log('Preloading medias');
		n();
		__app.__document.on('keyup', function(a) {
			if (27 == a.keyCode) {
				e.stop()
			}
		});
		e._backdrop.on('dblclick doubletap', function(a) {
			e.stop()
		})
	},
	__run: function() {
		var e = this;
		$(e.options.trigger).css('cursor', 'help');
		__app.__document.on('click', e.options.trigger, function(a) {
			a.preventDefault();
			e.start()
		});
		__app.__document.on(__app.konami.events.triggered, function() {
			e.start()
		});
		__app.__document.on(__app.sounds.events.ended, function(a) {
			if (a.id == e.options.sound) {
				e.stop()
			}
		})
	}
};;
var __app = __app || {};
__app.bookmark = {
	__deps: [],
	events: {
		toggled: 'app:bookmark:toggled'
	},
	options: {},
	__run: function() {
		var a = this;
		__app.__document.on('click', '[data-bookmark-toggle]', function(o) {
			o.preventDefault();
			var e = $(this),
				s = e.attr('href') + '.json',
				i = e.attr('data-token'),
				t = e.find('.fa[data-bookmark-state-on]'),
				n = t.attr('data-bookmark-loading') + ' ' + t.attr('data-bookmark-state-on') + ' ' + t.attr('data-bookmark-state-off') + ' yay',
				r = function() {
					e.removeClass('bookmark-toggle-loading');
					t.removeClass(n).addClass(t.attr('data-bookmark-initial'))
				};
			t.removeClass(t.attr('data-bookmark-initial')).removeClass(n).addClass(t.attr('data-bookmark-loading'));
			$.ajax({
				url: s + '?_token=' + i,
				dataType: 'json',
				type: 'GET',
				error: function(a, t, e) {
					r()
				},
				complete: function() {
					e.blur()
				},
				success: function(o) {
					r();
					if (!o.success) {
						return
					};
					var d = 'yay ' + t.attr('data-bookmark-state-' + o.data.state);
					t.removeClass(n).addClass(d);
					var s = e.parents('.modal-measure').first(),
						i = {
							type: a.events.toggled,
							state: o.data.state,
							source: s.length > 0 ? 'modal' : 'page',
							measure: s.length > 0 ? s.attr('measure-index') : null
						};
					$.event.trigger(i);
					if ('on' == o.data.state) {
						e.addClass('active')
					} else {
						e.removeClass('active')
					}
				}
			})
		});
		$(document).on('click', '[data-json-remove-link]', function(a) {
			a.preventDefault();
			var t = $(this),
				n = t.attr('href') + '.json',
				r = t.attr('data-token'),
				e = t.find('.fa[data-json-loading]'),
				o = function() {
					t.blur();
					e.removeClass(e.attr('data-json-loading'));
					t.attr('disabled', null)
				};
			bootbox.confirm('Êtes-vous sur de vouloir supprimer cet élément ?', function(a) {
				if (!a) {
					return
				};
				e.addClass(e.attr('data-json-loading'));
				t.attr('disabled', 'disabled');
				$.ajax({
					url: n + '?_token=' + r,
					dataType: 'json',
					error: function(a, e, t) {
						o();
						__app.dialogs.error('Une erreur technique est survenue…' + t)
					},
					complete: function() {},
					success: function(a) {
						o();
						if (a.success) {
							var e = $(t.attr('data-remove-on-success'));
							if (e.length > 0) {
								if (Modernizr.csstransitions) {
									e.addClass('out').one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
										$(e).remove()
									})
								} else {
									e.animate({
										marginTop: '-200px'
									}, 500, function() {
										e.remove()
									})
								}
							}
						} else {
							__app.dialogs.error(a.message || 'Une erreur technique est survenue…')
						}
					}
				})
			})
		})
	}
};;
var __app = __app || {};
__app.captcha = {
	options: {
		reloaderAttr: 'data-captcha-reload',
		codeAttr: 'data-captcha-code',
		formClassname: 'form-group-captcha'
	},
	__run: function() {
		var t = this;
		__app.__document.on('click', '[' + t.options.reloaderAttr + ']', function(a) {
			a.preventDefault();
			var r = $(this),
				e = $(r.attr(t.options.reloaderAttr)),
				o = r.attr(t.options.codeAttr),
				n = o + '?n=' + (new Date()).getTime();
			e.attr('src', n);
			r.blur()
		});
		__app.__document.on('keypress', '.' + t.options.formClassname, function(t) {
			var e = t.keyCode ? t.keyCode : t.which;
			if (13 != e) {
				return !0
			};
			var a = $(this),
				r = a.parents('form').first();
			if (r.length > 0) {
				r.submit();
				return !1
			};
			return !0
		})
	}
};;
var __app = __app || {};
__app.collapsables = {
	__deps: [],
	options: {},
	__run: function() {
		__app.__document.on('shown.bs.collapse', '.collapsable', function() {
			var t = $(this),
				a = $('.btn[data-target="#' + t.attr('id') + '"');
			if (a.length > 0) {
				a.addClass('active');
				a.blur()
			}
		});
		__app.__document.on('hidden.bs.collapse', '.collapsable', function() {
			var t = $(this),
				a = $('.btn[data-target="#' + t.attr('id') + '"');
			if (a.length > 0) {
				a.removeClass('active');
				a.blur()
			}
		});
		__app.__document.on('hidden.bs.collapse shown.bs.collapse', '.navbar-collapse', function() {
			var a = $(this);
			toggler = a.closest('.navbar').find('.navbar-toggle').first();
			toggler.blur()
		})
	}
};;
var __app = __app || {};
__app.confirm = {
	__deps: ["dialogs", "totalLoading"],
	options: {},
	__run: function() {
		__app.__document.on("click", "[data-confirm]", function(n) {
			n.preventDefault();
			var t = $(this),
				o = t.attr("href"),
				a = t.attr("data-token"),
				a = a ? ("?_token=" + a) : "";
			callback = function(t) {
				if (t) {
					__app.totalLoading.start();
					document.location.href = o + a
				}
			};
			__app.dialogs.confirm(t.attr("data-confirm") || "Voulez-vous vraiment continuer ?", t.attr("data-confirm-title") || t.attr("title") || "Attention l'ami-e !", callback, "Je confirme", "Non !")
		})
	}
};;
var __app = __app || {};
__app.dialogs = {
	options: {},
	confirm: function(i, o, a, t, n) {
		var a = 'function' == typeof a ? a : function(a) {},
			o = o || 'Confirmation',
			i = i || 'Êtes-vous sûr ?',
			e = {
				title: '<i class="fa fa-fw fa-warning"></i> ' + o,
				message: i,
				callback: a,
				buttons: {
					cancel: {
						label: '<i class="fa fa-fw fa-times"></i> ' + (n || 'Annuler')
					},
					confirm: {
						label: '<i class="fa fa-fw fa-hand-o-right"></i> ' + (t || 'Confirmer'),
						className: 'btn-default'
					},
				}
			};
		if (!bootbox) {
			var f = confirm(o + '\n------------\n' + i);
			if ('function' == typeof a) {
				a(f)
			};
			return
		};
		bootbox.confirm(e)
	},
	error: function(a, i, o) {
		this._dialog('fire', a, i || 'Une erreur est survenue…', 'C\'est noté !', o)
	},
	notice: function(a, i, o) {
		this._dialog('info-circle', a, i || 'Attention…', 'Très bien', o)
	},
	_dialog: function(a, i, o, n, t) {
		var f = {
			message: i,
			title: '<i class="fa fa-fw fa-' + a + '" aria-hidden="true"></i> ' + o,
			buttons: {
				ok: {
					label: (n || 'OK') + ' <i class="fa fa-fw fa-times" aria-hidden="true"></i>',
					className: 'btn-default'
				},
			},
			callback: t,
			backdrop: !0
		};
		if (!bootbox) {
			alert(o + '\n------------\n' + i);
			if ('function' == typeof t) {
				t()
			};
			return
		};
		bootbox.alert(f)
	},
	__run: function() {
		var a = this;
		if (bootbox) {
			bootbox.setDefaults({
				locale: 'fr'
			})
		}
	}
};;
var __app = __app || {};
__app.disqus = {
	__deps: [],
	events: {
		ready: 'app:disqus:ready',
		commented: 'app:disqus:commented',
		authentified: 'app:disqus:authentified'
	},
	options: {
		containerId: 'commentaires-disqus',
		shortname: null,
		url: null,
		identifier: null,
		user: null,
	},
	install: function() {
		var t = this,
			i = __app.disqusConfiguration;
		if (!i) {
			return
		};
		$.extend(t.options, i);
		if (null == t.options.shortname) {
			throw new Error('shortname must be configured')
		};
		window.disqus_container_id = t.options.containerId || 'disqus_thread';
		window.disqus_config = t._disqusConfigCallback;
		t._createScript()
	},
	_createScript: function() {
		var t = this;
		if ($('#app-disqus-script-tag').length > 0) {
			t.__log('Script already installed');
			return
		};
		t.__log('Installing disqus script tag');
		$('<script id="app-disqus-script-tag"/>').attr('src', '//' + t.options.shortname + '.disqus.com/embed.js').attr('data-timestamp', new Date()).appendTo(body)
	},
	_onReady: function() {
		var t = __app.disqus;
		$.event.trigger(t.events.ready)
	},
	_onNewComment: function(t) {
		var i = __app.disqus;
		if ('object' == typeof t) {
			$.event.trigger({
				type: i.events.commented,
				comment: t.text,
				identifier: t.id
			})
		}
	},
	_onIdentify: function(t) {
		var i = __app.disqus;
		if ('string' == typeof t) {
			$.event.trigger({
				type: i.events.authentified,
				user: t,
				isLoggedUser: t == i.options.user
			})
		}
	},
	_disqusConfigCallback: function() {
		var t = __app.disqus;
		this.page.url = t.options.url;
		this.identifier = t.options.identifier;
		this.callbacks.onReady = [t._onReady];
		this.callbacks.onNewComment = [t._onNewComment];
		this.callbacks.onIdentify = [t._onIdentify]
	},
	__run: function() {
		this.install()
	}
};;
var __app = __app || {};
__app.email = {
	__deps: [],
	options: {
		selector: 'span.obfuscated',
		auto: !0,
		createLinks: !0,
		classes: 'email unobfuscated',
		replaces: {
			at: ' CHEZ ',
			dot: ' POINT '
		}
	},
	unobfuscate: function(a) {
		var t = this,
			a = a || t.options.selector,
			e = $(a),
			s = new RegExp(t.options.replaces.dot, 'g'),
			o = new RegExp(t.options.replaces.at, 'g');
		e.each(function() {
			var a = $(this),
				n = a.text().replace(s, '.').replace(o, '@');
			if (!t.options.createLinks) {
				a.text(n);
				return
			};
			var p = a.attr('data-text') || a.attr('title') || n,
				i = a.attr('data-title') || a.attr('title') || null,
				e = $('<a>' + p + '</a>'),
				r = a.attr('data-subject') || null,
				c = 'mailto:' + n + (r ? '?subject=' + encodeURIComponent(r) : '');
			e.attr('href', c).addClass(t.options.classes);
			if (i) {
				e.attr('title', i)
			};
			a.replaceWith(e)
		})
	},
	__run: function() {
		var t = this;
		if (t.options.auto) {
			t.unobfuscate()
		}
	}
};;
var __app = __app || {};
__app.externalLinks = {
	__deps: [],
	options: {
		selector: 'a.external'
	},
	__run: function() {
		var n = this;
		__app.__document.on('click', n.options.selector, function(n) {
			n.preventDefault();
			var e = $(this).attr('href');
			window.open(e, '_blank')
		})
	}
};;
var __app = __app || {};
__app.flashes = {
	__deps: ['utils', 'dialogs'],
	events: {
		added: 'app:flashes:added',
		dismissed: 'app:flashes:dimissed',
	},
	options: {
		selector: '.flash',
		container: '.flash-group',
		flashCountChannels: ['favicon'],
		classes: {
			'error': 'danger',
			'danger': 'danger',
			'warning': 'warning',
			'notice': 'primary',
			'info': 'info',
			'success': 'success'
		},
		icons: {
			'error': 'frown-o',
			'danger': 'frown-o',
			'warning': 'meh-o',
			'notice': 'thumb-tack',
			'info': 'info-circle',
			'success': 'smile-o'
		},
		titles: {
			'error': 'Oops !',
			'danger': 'Oops !',
			'warning': 'Attention…',
			'notice': 'Pour votre information…',
			'info': 'Message à caractère informatif…',
			'success': 'Félicitations !'
		},
		template: '<div class="flash flash-__classname__ shake"><div class="container flash-content"><div class="media"><div class="media-left media-middle"><i class="fa fa-fw fa-3x fa-__icon__" aria-hidden="true"></i></div><div class="media-body"><h4 class="media-heading">__title__</h4><div class="media-body-content">__message__</div></div><div class="media-right media-middle js-only"><button data-dismiss="flash" class="close" aria-label="Fermer">&times;</button></div></div></div></div>'
	},
	_originalPageTitle: null,
	_favicon: null,
	add: function(a, i, n, t) {
		var e = this,
			s = $(e.options.container);
		if (0 == s.length) {
			__app.dialogs.notice(a, n);
			return
		};
		var i = i || 'notice',
			o = e.options.classes[i] || 'primary',
			n = n || e.options.titles[i],
			t = t || e.options.icons[i],
			l = e.options.template,
			d = __app.utils.template(l, {
				'classname': o,
				'title': n,
				'icon': t,
				'message': a
			});
		$.event.trigger({
			type: e.events.added,
			title: n,
			genre: i,
			message: a,
			icon: t
		});
		s.append(d);
		e._updateFlashCount()
	},
	find: function(e) {
		var i = this,
			a = $(i.options.container);
		return a.find(e).closest(i.options.selector)
	},
	_updateFlashCount: function() {
		var e = this,
			t = $(e.options.container),
			i = t.find('div.flash').length,
			a = -1 !== e.options.flashCountChannels.indexOf('favicon'),
			n = -1 !== e.options.flashCountChannels.indexOf('pagetitle');
		if (0 == e.options.flashCountChannels) {
			return
		};
		if (n && null == e._originalPageTitle) {
			e._originalPageTitle = $('head > title').text()
		};
		if (a && null == e._favicon) {
			e._favicon = new Favico({
				type: 'rectangle',
				animation: 'none',
				bgColor: '#c94e34',
				textColor: '#fff',
				fontStyle: 700
			})
		};
		if (0 == i) {
			if (n) {
				$('head > title').text(e._originalPageTitle)
			};
			if (a) {
				e._favicon.reset()
			}
		} else {
			if (n) {
				$('head > title').text('(' + i + ') ' + e._originalPageTitle)
			};
			if (a) {
				e._favicon.badge(i)
			}
		}
	},
	__run: function() {
		var e = this;
		__app.__document.on('click', '[data-dismiss="flash"]', function(a) {
			var n = $(this),
				i = n.parents(e.options.selector).first(),
				t = {
					'margin-top': '-' + i.outerHeight() + 'px',
					'opacity': 0
				};
			$.event.trigger({
				type: e.events.dismissed,
				title: i.find('.media-heading').text(),
				message: i.find('.media-body-content').html(),
			});
			i.css('transition', 'none').animate(t, 350, function() {
				i.remove();
				e._updateFlashCount()
			})
		});
		e._updateFlashCount()
	}
};;
var __app = __app || {};
__app.instantSearch = {
	__deps: ['flashes'],
	events: {
		suggested: 'app:instant-search:suggested',
		initiated: 'app:instant-search:initiated',
		response: 'app:instant-search:response'
	},
	options: {
		selector: '.instant-search',
		unavailable: 'Moteur inaccessible. Merci de vérifier l\'état de votre connexion ou bien de réessayer ultérieurement.'
	},
	__run: function() {
		var e = this,
			t = $(e.options.selector),
			s = null,
			a = null;
		if (t.length > 0) {
			__app.__document.on('click', '.form-instant-search [type="submit"]', function(e) {
				e.preventDefault();
				t.focus()
			});
			__app.__document.on('click', '.jumbotron .suggestion', function(s) {
				s.preventDefault();
				var a = $(this).text();
				if (!a) {
					return
				};
				$.event.trigger({
					type: e.events.suggested,
					suggestion: a
				});
				a = a.charAt(0).toUpperCase() + a.slice(1).toLowerCase();
				t.val(a).trigger('keydown').select().focus()
			});
			__app.__document.on('click focus', e.options.selector, function(e) {
				$(this).select()
			});
			__app.__document.on('keydown keypress', e.options.selector, function(t) {
				var n = $(this),
					r = t.keyCode ? t.keyCode : t.which;
				switch (r) {
					case 13:
						t.preventDefault();
					case 27:
						n.blur();
						return;
					case 8:
					case 46:
						if (null != s) {
							s.abort()
						};
						return
				};
				$.doTimeout('instant-search', 1000, function() {
					var r = n.closest('form'),
						u = r.attr('action'),
						t = n.val(),
						o = r.find('.fa').not('.fa-keyboard-o'),
						i = $('#resultats'),
						l = $('.search-results-count'),
						c = l.attr('data-prototype');
					if (null != s) {
						s.abort()
					};
					if (t == a || t.length < 3) {
						return
					};
					o.removeClass('fa-search').addClass('fa-spin fa-refresh');
					$('.lead.no-search').addClass('hidden');
					$('.lead.no-results').addClass('hidden');
					__app.__html.removeClass('has-results');
					$.event.trigger({
						type: e.events.initiated,
						query: t
					});
					s = $.ajax({
						dataType: 'json',
						url: u + '.json',
						data: {
							'termes': t
						},
						complete: function() {
							o.removeClass('fa-spin fa-refresh').addClass('fa-search')
						},
						error: function(s) {
							__app.flashes.add(e.options.unavailable, 'warning')
						},
						success: function(s) {
							if (!s.success) {
								__app.flashes.add(s.message, 'warning');
								return
							};
							i.find('.list-group-item').remove();
							for (var n in s.results) {
								var a = s.results[n];
								i.append(a.html)
							};
							var t = c.replace(/__total__/g, s.count).replace(/__query__/g, __app.utils.escape(s.query)).replace(/__plural__/g, s.count > 1 ? 's' : '');
							l.html(t);
							if (0 == s.count) {
								$('.lead.no-results').removeClass('hidden')
							} else {
								__app.__html.addClass('has-results')
							};
							$.event.trigger({
								type: e.events.response,
								query: s.query,
								results: s.count
							})
						},
					})
				})
			})
		}
	}
};;
var __app = __app || {};
__app.internalLinks = {
	__deps: ['dialogs'],
	options: {},
	__run: function() {
		__app.__document.on('click', '[data-display-internal-link]', function(a) {
			a.preventDefault();
			var n = $(this);
			target = n.attr('data-target') || n.attr('href') || null;
			if (null == target) {
				__app.dialogs.error('Lien mal configuré');
				return
			};
			__app.dialogs.notice('<div class="input-group internal-link"><div class="input-group-addon"><i class="fa fa-fw fa-anchor" aria-hidden="true"></i></div><input type="text" class="form-control share-control" readonly="readonly" value="' + target + '"></div>', 'Lien interne au site')
		});
		__app.__document.on('shown.bs.modal', function() {
			var a = $(this),
				n = a.find('.input-group.internal-link > input');
			if (n.length != 0) {
				n.focus()
			}
		})
	}
};;
var __app = __app || {};
__app.konami = {
	__deps: [],
	events: {
		triggered: 'app:konami:triggered'
	},
	__run: function() {
		var t = this,
			n = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
			e = [];
		__app.__document.on('keydown', function(i) {
			e.push(i.keyCode);
			if (e.length > n.length) {
				e = e.slice(-(n.length))
			};
			if (e.toString() == n.toString()) {
				$.event.trigger(t.events.triggered)
			}
		})
	}
};;
var __app = __app || {};
__app.lightbox = {
	__deps: [],
	events: {
		displayed: 'app:lightbox:displayed'
	},
	options: {
		selector: '.notes-body img, .addendum-body img',
		strings: {
			okLabel: 'C\'est tout vu !'
		}
	},
	__run: function() {
		if (!bootbox) {
			return
		};
		var t = this;
		biggerThanLife = function(a) {
			var t = a.get(0),
				e = __app.__window;
			if (t.naturalHeight) {
				if (t.naturalHeight > e.height() || t.naturalWidth > 1000) {
					return 'large'
				};
				if (t.naturalWidth <= 300) {
					return 'small'
				}
			};
			return null
		};
		__app.__document.on('click', t.options.selector, function(i) {
			var a = $(this),
				e = a.attr('src');
			title = a.attr('title') || a.attr('alt') || 'Image';
			html = '<img class="img-responsive img-lightbox" src="' + e + '">', opts = {
				message: html,
				className: 'modal-lightbox',
				size: biggerThanLife(a),
				title: '<i class="fa fa-fw fa-camera"></i> ' + title,
				backdrop: !0,
				buttons: {
					ok: {
						label: t.options.strings.okLabel + ' <i class="fa fa-fw fa-check-circle"></i>',
						className: 'btn-default'
					}
				}
			};
			if ('A' != a.parent().prop('tagName')) {
				$.event.trigger({
					type: t.events.displayed,
					title: title,
					src: e,
					img: a
				});
				bootbox.alert(opts)
			}
		})
	}
};;
var __app = __app || {};
__app.login = {
	__deps: [],
	events: {
		activated: 'app:login:activated',
		closed: 'app:login:closed',
		cancelled: 'app:login:cancelled'
	},
	options: {
		selector: '#connexion-inscription'
	},
	_closeSessionUrl: null,
	__run: function() {
		var t = this,
			a = t.options.selector,
			e = $(a),
			n = a + ' [role="tablist"] > li > a';
		selectedTabIndex = __app.prefs.get('login_modal_selected_tab_index', 0);
		if (e.length > 0) {
			__app.__document.on('click', n, function() {
				var t = $(this).closest('li').index();
				__app.prefs.set('login_modal_selected_tab_index', t)
			});
			__app.__document.on('click', '[data-login-toggle]', function(a) {
				a.preventDefault();
				var i = e.find('.form-login-load');
				if (i.length > 0) {
					var d = i.attr('data-target');
					t._closeSessionUrl = i.attr('data-close');
					$.ajax({
						dataType: 'html',
						url: d,
						success: function(t) {
							var e = $(t);
							e.find('input[name="_target_path"]').val(window.location.href);
							i.replaceWith(e)
						},
						error: function(e, a, i) {
							t.__log('Unable to load login form:', i, a, e)
						}
					})
				};
				document.location.hash = 'modal-login-opened';
				$.doTimeout(500, function() {
					__app.__window.one('hashchange', function() {
						if (e.is(':visible')) {
							$.event.trigger(t.events.cancelled);
							e.modal('hide')
						}
					})
				});
				var n = $(this),
					o = '<i class="fa fa-fw fa-sign-in" aria-hidden="true"></i> ' + (n.attr('title') || 'Connexion');
				e.attr('data-original-title', e.find('.modal-title').html()).find('.modal-title').html(o);
				var l = '[role="tablist"] > li:eq(' + selectedTabIndex + ') > a';
				selectedTab = e.find(l);
				selectedTab.tab('show');
				$.event.trigger({
					type: t.events.activated,
					source: n.attr('data-login-toggle') || n.text().trim() || 'Unknown',
					tab: selectedTab
				});
				e.modal('show')
			});
			__app.__document.on('hidden.bs.modal', a, function(i) {
				var e = $(this),
					n = $('[data-target="' + a + '"], [href="' + a + '"]');
				n.blur();
				$.event.trigger(t.events.closed);
				if (t._closeSessionUrl) {
					$.ajax({
						url: t._closeSessionUrl,
						dataType: 'html'
					})
				};
				if ('#modal-login-opened' == document.location.hash) {
					document.location.hash = ''
				};
				if (e.attr('data-original-title')) {
					e.find('.modal-title').html(e.attr('data-original-title'));
					e.removeAttr('data-original-title')
				}
			});
			if (__app.__html.hasClass('page-login')) {
				var i = $('.main-container #login-form input[type="email"]').first();
				i.focus()
			}
		}
	}
};;
var __app = __app || {};
__app.measuresForm = {
	__deps: ['dialogs'],
	options: {
		strings: {
			new: 'Nouvelle mesure',
			delete: 'Supprimer la mesure',
			deletionConfirm: 'Êtes-vous sûr de vouloir supprimer la mesure ?'
		},
	},
	__run: function() {
		var e = this,
			t = $('<button class="btn btn-default btn-sm btn-add-measure"><i class="fa fa-fw fa-plus"></i> ' + e.options.strings.new + '</button>'),
			a = $('<div class="action-new"></div>').append(t),
			n = $('#section_measures'),
			s = function(e, a) {
				var s = e.data('prototype'),
					t = e.data('index'),
					o = s.replace(/__name__label__/g, t).replace(/__name__/g, t);
				e.data('index', t + 1);
				var n = $(o);
				i(n);
				a.before(n);
				n.slideUp(0, function() {
					n.slideDown()
				})
			},
			i = function(n) {
				var t = $('<button class="btn btn-danger btn-sm"><i class="fa fa-fw fa-trash"></i> ' + e.options.strings.delete + '</button>');
				n.append(t);
				t.on('click', function(t) {
					t.preventDefault();
					__app.dialogs.confirm(e.options.strings.deletionConfirm, e.options.strings.delete, function(e) {
						if (e) {
							n.slideUp(300, function() {
								n.remove()
							})
						}
					})
				})
			};
		n.append(a).data('index', n.children('.form-group').length);
		n.children('.form-group').each(function() {
			i($(this))
		});
		t.on('click', function(e) {
			e.preventDefault();
			s(n, a);
			$(this).blur()
		})
	},
};;
var __app = __app || {};
__app.measures = {
	__deps: [],
	options: {},
	__run: function() {
		var t = $('.list-measures > .list-group-item.active').first();
		if (t.length > 0) {
			__app.scroll.to(t);
			var e = $(t.attr('data-target'));
			e.modal()
		};
		__app.__document.on('click', '.list-measures > .list-group-item', function(e) {
			if ('A' == e.target.nodeName) {
				return
			};
			e.preventDefault();
			var a = $(this),
				t = $('.list-measures > .list-group-item'),
				o = $(a.attr('data-target'));
			t.removeClass('active');
			a.addClass('active');
			a.blur();
			o.modal('show')
		});
		__app.__document.on('hide.bs.modal', '.modal.modal-measure', function() {
			var e = $(this),
				a = $('.list-group-item[data-target="#' + e.attr('id') + '"]');
			icon = a.find('.icon-bookmarked'), btn = e.find('.modal-footer .btn-bookmark');
			if (btn.hasClass('active')) {
				icon.removeClass('hidden')
			} else {
				icon.addClass('hidden')
			}
		});
		$('.list-measures').bind('clickoutside', function(e) {
			if (!$('body').hasClass('modal-open')) {
				$(this).find('.list-group-item.active').removeClass('active')
			}
		});
		var o = window.location.hash,
			i = /^#mesure-([0-9]+)$/,
			a = i.test(o) ? i.exec(o)[1] : null;
		if (a) {
			var e = $('#modal-measure-' + a);
			if (e.length > 0) {
				var s = $('#mesure-' + a).addClass('active');
				__app.scroll.to(s, 150, function() {
					e.modal('show')
				})
			}
		};
		if ($('.list-measures').length > 0) {
			$('[data-toggle="popover"]').popover({
				container: 'body'
			});
			__app.__document.on('hide.bs.modal', function() {
				$('[data-toggle="popover"]').popover('hide')
			})
		};
		__app.__document.on('click', '.popover', function() {
			$(this).popover('hide')
		})
	}
};;
var __app = __app || {};
__app.modals = {
	__deps: ['utils'],
	options: {},
	_center: function(o) {
		this.$element = $(o);
		this.$content = this.$element.find('.modal-content');
		var e = this.$content.outerHeight() - this.$content.innerHeight(),
			n = __app.__window.width() < 768 ? 20 : 60,
			i = __app.__window.height() - (n + e),
			a = this.$element.find('.modal-header').outerHeight() || 0,
			s = this.$element.find('.modal-footer').outerHeight() || 0,
			t = i - (a + s);
		if (t < 0) {
			t = 0
		};
		if (__app.__window.width() < 768) {
			this.$element.find('.modal-body').css({
				'max-height': 'none',
				'overflow-y': 'visible'
			});
			return
		};
		this.$content.css({
			'overflow': 'hidden'
		});
		this.$element.find('.modal-body').css({
			'max-height': t,
			'overflow-y': 'auto'
		})
	},
	__run: function() {
		var t = this;
		__app.__document.on('show.bs.modal', '.modal', function() {
			$(this).show();
			t._center(this)
		});
		__app.__window.on('resize', __app.utils.throttle(function() {
			var o = $('.modal.in');
			if (o.length != 0) {
				t._center(o)
			}
		}, 100));
		__app.__document.on('shown.bs.collapse hidden.bs.collapse', '.modal .collapsable', function() {
			t._center($(this).parents('.modal').first())
		});
		__app.__document.on('hide.bs.modal', '.modal', function() {
			$(this).find('.collapse.in').collapse('hide')
		});
		__app.__window.load(function() {
			var o = $.fn.modal.Constructor.prototype.setScrollbar;
			$.fn.modal.Constructor.prototype.setScrollbar = function() {
				o.apply(this);
				if (this.bodyIsOverflowing && this.scrollbarWidth) {
					$('.navbar-fixed-top, .navbar-fixed-bottom, .footer, body').css('padding-right', this.scrollbarWidth)
				}
			};
			var t = $.fn.modal.Constructor.prototype.resetScrollbar;
			$.fn.modal.Constructor.prototype.resetScrollbar = function() {
				t.apply(this);
				$('.navbar-fixed-top, .navbar-fixed-bottom, .footer, body').css('padding-right', '')
			}
		})
	}
};;
var __app = __app || {};
__app.notes = {
	__deps: ['sounds', 'totalLoading'],
	options: {
		strings: {
			pendingChanges: 'Vos modifications n\'ont pas été sauvegardées.'
		}
	},
	events: {
		started: 'app:notes:started',
		reset: 'app:notes:reset',
		submit: 'app:notes:submit'
	},
	_pendingChanges: !1,
	__run: function() {
		var e = this;
		__app.__window.bind('beforeunload', function() {
			if (e._pendingChanges) {
				__app.totalLoading.stop();
				return e.options.strings.pendingChanges
			}
		});
		__app.__document.delegate('.notes-collapsable textarea', 'keydown', function(t) {
			if (!e._pendingChanges) {
				$.event.trigger(e.events.started)
			};
			e._pendingChanges = !0;
			var a = t.keyCode || t.which;
			if (a == 9) {
				t.preventDefault();
				var n = $(this).get(0).selectionStart,
					s = $(this).get(0).selectionEnd;
				$(this).val($(this).val().substring(0, n) + '  ' + $(this).val().substring(s));
				$(this).get(0).selectionStart = $(this).get(0).selectionEnd = n + 2
			}
		});
		__app.__document.on('click', '.notes-collapsable [type="reset"]', function(t) {
			var n = $(this).closest('.notes-collapsable');
			n.collapse('hide');
			e._pendingChanges = !1;
			$.event.trigger(e.events.reset)
		});
		__app.__document.on('submit', '.notes-collapsable form', function(t) {
			e._pendingChanges = !1;
			$.event.trigger(e.events.submit)
		})
	}
};;
var __app = __app || {};
var _paq = _paq || [];
__app.piwik = {
	__deps: ['utils', 'scroll'],
	options: {
		attrs: {
			event: 'data-track-event',
			eventCategory: 'data-event-category',
			eventAction: 'data-event-action',
			eventName: 'data-event-name',
			eventValue: 'data-event-value',
			scroll: 'data-track-scroll',
		}
	},
	call: function() {
		var e = this,
			t = Array.prototype.slice.call(arguments);
		e.__log('[API]', t);
		_paq.push(t)
	},
	trackEvent: function(t, e, n, a) {
		var o = this;
		if (!t || !e) {
			throw new Error('trackEvent(): requires at least category and action')
		};
		return o.call('trackEvent', t, e, n, a)
	},
	_createTrackEventFrom: function(t, r, e, n, a) {
		var i = this,
			o = i.options.attrs,
			e = e || t.attr(o.eventAction) || t.attr('href') || 'Unknown',
			n = n || t.attr(o.eventName) || t.attr('title'),
			a = a || t.attr(o.eventValue);
		i.trackEvent(r, e, n, a)
	},
	__run: function() {
		var t = this,
			o = o || [],
			e = t.options.attrs;
		return;
		__app.__document.on('app:instant-search:initiated', function(e) {
			t.trackEvent('Recherche instantanée', 'Envoi formulaire', e.query)
		}).on('app:instant-search:suggested', function(e) {
			t.trackEvent('Recherche instantanée', 'Clic sur suggestion', e.suggestion)
		}).on('app:instant-search:response', function(e) {
			t.call('trackSiteSearch', e.query, 'Instantanée', e.results)
		}).on('app:login:activated', function(e) {
			t.trackEvent('Fenêtre de connexion', 'Affichée', e.source, e.tab.text())
		}).on('app:login:cancelled', function(e) {
			t.trackEvent('Fenêtre de connexion', 'Annulée', 'navigateur')
		}).on('app:bookmark:toggled', function(e) {
			t.trackEvent('Favori', 'on' == e.state ? 'Ajouté' : 'Retiré', 'page' == e.source ? 'Page' : 'Mesure', e.measure ? e.measure : null)
		}).on('app:lightbox:displayed', function(e) {
			t.trackEvent('Clic image', e.title, e.src)
		}).on('app:disqus:authentified', function(e) {
			if (e.isLoggedUser) {
				t.trackEvent('Discussion', 'Connexion', 'Utilisateur identique', e.user)
			}
		}).on('app:disqus:commented', function(e) {
			t.trackEvent('Discussion', 'Ajout commentaire', e.comment, e.identifier)
		}).on('app:sharing:link-selected', function(e) {
			t.trackEvent('Lien court', 'Sélectionné', 'page' == e.source ? 'Page' : 'Mesure', e.measure ? e.measure : null)
		}).on('app:sharing:popup', function(e) {
			t.trackEvent('Popup de partage', e.network, 'page' == e.source ? 'Page' : 'Mesure', e.measure ? e.measure : null)
		}).on('click', '.share-collapser', function() {
			var n = $(this),
				e = n.parents('.modal-measure').first();
			t.trackEvent('Panneau Partager', !n.hasClass('active') ? 'Ouvert' : 'Fermé', 1 == e.length ? 'Mesure' : 'Page', 1 == e.length ? e.attr('measure-index') : null)
		}).on('app:notes:started', function() {
			t.trackEvent('Notes', 'Écriture')
		}).on('app:notes:reset', function() {
			t.trackEvent('Notes', 'Annulation des modifications')
		}).on('app:notes:submit', function() {
			t.trackEvent('Notes', 'Enregistrement des modifications')
		}).on('app:typewriter:toggled', function(e) {
			t.trackEvent('Notes', 'Son', 'on' == e.state ? 'Activé' : 'Désactivé')
		}).on('click', '.notes-collapser', function() {
			var e = $(this);
			t.trackEvent('Panneau Annoter', !e.hasClass('active') ? 'Ouvert' : 'Fermé')
		}).on('click', '.audiobook-collapser', function() {
			var e = $(this);
			t.trackEvent('Panneau Audiobook', !e.hasClass('active') ? 'Ouvert' : 'Fermé')
		}).on('app:sounds:playing app:sounds:resumed', function(e) {
			if ('audiobook' == e.id) {
				t.trackEvent('Audiobook', 'Joué')
			}
		}).on('app:sounds:paused app:sounds:stopped', function(e) {
			if ('audiobook' == e.id) {
				t.trackEvent('Audiobook', 'Arrêté')
			}
		}).on('app:sounds:ended', function(e) {
			if ('audiobook' == e.id) {
				t.trackEvent('Audiobook', 'Terminé')
			}
		}).on('app:sounds:louder app:sounds:quieter', function(e) {
			if ('audiobook' == e.id) {
				t.trackEvent('Audiobook', 'Paramètres', 'Volume', Math.round(e.volume * 100) + '%')
			}
		}).on('app:sounds:slowed app:sounds:accelerated', function(e) {
			if ('audiobook' == e.id) {
				t.trackEvent('Audiobook', 'Paramètres', 'Vitesse', e.current + 'x')
			}
		}).on('app:sounds:restarted', function(e) {
			if ('audiobook' == e.id) {
				t.trackEvent('Audiobook', 'Position', 'Réinitialisée')
			}
		}).on('app:sounds:rewound app:sounds:advanced app:sounds:seeked', function(e) {
			if ('audiobook' == e.id) {
				t.trackEvent('Audiobook', 'Position', 'Déplacée', Math.round(e.position) + ' secondes')
			}
		}).on('click', '.pageref-collapser', function() {
			var n = $(this),
				e = n.parents('.modal-measure').first();
			t.trackEvent('Panneau Détails du livre', !n.hasClass('active') ? 'Ouvert' : 'Fermé', 1 == e.length ? 'Mesure' : 'Page', 1 == e.length ? e.attr('measure-index') : null)
		}).on('click', '[href="#discussion"]', function() {
			var e = $(this);
			if (e.is('[data-do-scroll-to]')) {
				t.trackEvent('Discussion', 'Scroll', e.parents('#side-navigation').length > 0 ? 'navigation' : 'Barre des actions')
			}
		}).on('app:flashes:dimissed', function(e) {
			var n = __app.utils.truncate(__app.utils.strip(e.message).trim(), 0);
			t.trackEvent('Message Flash', 'Fermé', n)
		}).on('app:konami:triggered', function(e) {
			t.trackEvent('Bonus', 'Code Konami')
		}).on('app:bonus:started', function(e) {
			t.trackEvent('Bonus', 'Démarré')
		}).on('app:bonus:stopped', function(e) {
			t.trackEvent('Bonus', 'Fermé')
		}).on('app:bonus:ended', function(e) {
			t.trackEvent('Bonus', 'Regardé jusqu\'au bout')
		}).on('click', '[' + e.event + ']', function() {
			var n = $(this),
				a = n.attr(e.eventCategory) || n.attr(e.event);
			t._createTrackEventFrom(n, a)
		});
		var n = 0,
			a = $('.navbar-fixed-top').outerHeight();
		$('[' + e.scroll + ']').each(function() {
			trackable = $(this);
			if (!trackable.get(0).getBoundingClientRect) {
				return
			};
			n++;
			__app.scroll.addHandler(function() {
				var r = trackable.get(0).getBoundingClientRect();
				if (r.top <= a) {
					var o = trackable.attr(e.scroll);
					t._createTrackEventFrom(trackable, o, 'Scroll');
					__app.scroll.removeHandler('track-scrollable-' + n)
				}
			}, 'track-scrollable-' + n)
		});
		__app.__window.on('blur', function() {
			var e = $(document.activeElement);
			if ('IFRAME' != e.prop('tagName') || !e.hasClass('embed-responsive-item')) {
				return
			};
			var n = e.closest('.embed-container');
			if (n.length) {
				var a = n.find('.embed-caption').text() || 'Sans titre';
				url = e.attr('src'), regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/, match = url.match(regExp), videoId = match && match[2].length == 11 ? match[2] : url;
				t.trackEvent('Vidéo', 'Click', a, videoId)
			}
		})
	}
};;
var __app = __app || {};
__app.popups = {
	__deps: ['utils'],
	options: {},
	pop: function(o, e, t) {
		var l = this;
		wh = [];
		var t = 'string' == typeof t ? (-1 != t.indexOf(',') ? t.split(',') : ['' + parseInt(t)]) : 'object' == typeof t ? __app.utils.values(t) : [],
			n = 2 == t.length ? t[0] : 1 == t.length ? t[0] : null,
			p = 2 == t.length ? t[1] : null,
			i = 'directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no';
		if (n) {
			i += ',width=' + n.trim()
		};
		if (p) {
			i += ',height=' + p.trim()
		};
		window.open(o, e, i)
	},
	__run: function() {}
};;
var __app = __app || {};
__app.prefs = {
	options: {
		storageKey: "app_user_preferences"
	},
	_prefs: {},
	get: function(e, r) {
		var o = this;
		value = o._prefs[e];
		o.__log("Getting preference for", e, "/ default:", r, "/ retrieved:", value);
		return "undefined" != typeof value ? value : r
	},
	set: function(e, r) {
		var o = this;
		o._prefs[e] = r;
		o.__log("Setting preference", e, "with", r);
		o._store();
		return __app.prefs
	},
	clear: function() {
		var e = this;
		e._prefs = {};
		if (!localStorage || !JSON) {
			e.__log("Clearing not applicable since there's no storage");
			return
		};
		e.__log("Clearing preferences from local storage @" + e.options.storageKey);
		localStorage.removeItem(e.options.storageKey)
	},
	_store: function() {
		var e = this;
		if (!localStorage || !JSON) {
			e.__log("_store() requires localStorage and JSON to be available")
		};
		e.__log("Storing preferences in local storage @" + e.options.storageKey);
		localStorage.setItem(e.options.storageKey, JSON.stringify(e._prefs))
	},
	_reload: function() {
		var e = this;
		if (!localStorage || !JSON) {
			e.__log("_reload() requires localStorage and JSON to be available")
		};
		e.__log("Retrieving preferences from local storage @" + e.options.storageKey);
		var r = localStorage.getItem(e.options.storageKey) || "{}";
		e._prefs = JSON.parse(r)
	},
	__run: function() {
		var e = this;
		if (!Modernizr.localstorage) {
			e.__log("No local storage, preferences won't persist.");
			return
		};
		e._reload()
	}
};;
var __app = __app || {};
__app.preview = {
	__deps: ['popups'],
	options: {},
	__run: function() {
		__app.__document.on('click', '[data-form-popup-preview]', function(a) {
			var t = $(this),
				p = $(this).closest('form');
			backup = p.attr('target');
			p.attr('data-action-popup', t.attr('data-popup-title') || t.attr('title') || 'Popup').attr('data-popup-dimensions', t.attr('data-popup-dimensions'));
			$.doTimeout(500, function() {
				p.removeAttr('data-action-popup').removeAttr('data-popup-dimensions').attr('target', backup);
				if (null == backup) {
					p.removeAttr('target')
				}
			});
			t.blur()
		});
		__app.__document.on('submit', '[data-action-popup]', function(a) {
			var t = $(this),
				p = t.attr('data-action-popup'),
				o = t.attr('data-popup-dimensions');
			__app.popups.pop('', p, o);
			t.attr('target', p)
		})
	}
};;
var __app = __app || {};
__app.printing = {
	__deps: ['dialogs', 'totalLoading'],
	events: {
		beforePrint: 'app:printing:before-print',
		afterPrint: 'app:printing:after-print',
		iframeTriggered: 'app:printing:iframe-triggered',
		iframeBeforePrint: 'app:printing:iframe-before-print',
		iframeAfterPrint: 'app:printing:iframe-after-print'
	},
	options: {},
	_iframePrinting: !1,
	_beforePrint: function() {
		var r = this;
		if (!r._iframePrinting) {
			$.event.trigger(r.events.beforePrint)
		}
	},
	_afterPrint: function() {
		var r = this;
		if (!r._iframePrinting) {
			$.event.trigger(r.events.afterPrint)
		} else {
			$.event.trigger(r.events.iframeAfterPrint)
		}
	},
	__run: function() {
		var r = this;
		$('[data-open-print-dialog]').on('click', function(t) {
			t.preventDefault();
			var e = $(this),
				i = e.attr('data-target') || e.attr('href');
			printFrame = $('<iframe style="display: none;" id="print-frame"></iframe>');
			existing = __app.__body.find('#print-frame');
			if (!i) {
				__app.dialogs.error('Lien d\'impression mal configuré');
				return
			};
			if (0 == existing.length) {
				__app.__body.append(printFrame)
			};
			$.event.trigger({
				type: r.events.iframeTriggered,
				href: i,
				source: e
			});
			r._iframePrinting = !0;
			printFrame = __app.__body.find('#print-frame');
			printFrame.attr('src', i);
			__app.totalLoading.start();
			e.blur();
			printFrame.one('load', function() {
				$.event.trigger({
					type: r.events.iframeBeforePrint,
					href: i,
					source: e
				});
				printFrame.get(0).contentWindow.print();
				__app.totalLoading.stop()
			})
		});
		if (window.matchMedia) {
			var e = window.matchMedia('print');
			e.addListener(function(e) {
				if (e.matches) {
					r._beforePrint()
				} else {
					r._afterPrint()
				}
			})
		};
		window.onbeforeprint = r._beforePrint;
		window.onafterprint = r._afterPrint
	}
};;
var __app = __app || {};
__app.scroll = {
	__deps: ['dialogs', 'utils'],
	events: {
		started: 'app:scroll:started',
		ended: 'app:scroll:ended',
		complete: 'app:scroll:complete'
	},
	options: {
		duration: 800,
		scrollThrottle: 150,
		offset: function() {
			return $('.navbar-fixed-top').outerHeight() + 20
		}
	},
	_handlers: {},
	addHandler: function(t, o) {
		var e = this,
			o = o || '_handler_' + __app.utils.count(handlers);
		if ('function' == typeof t) {
			e._handlers[o] = t
		}
	},
	removeHandler: function(t) {
		var e = this,
			o = e._handlers;
		if (o[t]) {
			callable = o[t];
			delete o[t];
			return callable
		}
	},
	to: function(t, a, e, r) {
		var o = this,
			a = a || o.options.duration,
			e = 'function' == typeof e ? e : function() {},
			t = t || null;
		if (null == t) {
			return
		};
		var t = $(t),
			l = 'function' == typeof o.options.offset ? o.options.offset() : o.options.offset,
			n = {
				target: t,
				offset: l,
				source: r,
				callback: e
			};
		if (0 == t.length) {
			return
		};
		$.event.trigger($.extend({}, {
			type: o.events.started
		}, n));
		$('html, body').animate({
			scrollTop: (t.offset().top - l)
		}, 1000, function() {
			$.event.trigger($.extend({}, {
				type: o.events.ended
			}, n));
			e();
			$.event.trigger($.extend({}, {
				type: o.events.complete
			}, n))
		})
	},
	_handle: function() {
		var o = __app.scroll;
		for (var e in o._handlers) {
			var t = o._handlers[e];
			if ('function' == typeof t) {
				t()
			}
		}
	},
	__run: function() {
		var t = this;
		__app.__window.on('scroll', __app.utils.throttle(t._handle, t.options.scrollThrottle));
		__app.__document.on('click', '[data-scroll-and-open]', function(e) {
			e.preventDefault();
			var a = $(this),
				o = a.attr('data-scroll-and-open'),
				n = $('[data-target="' + o + '"]');
			if (n.length > 0) {
				a.blur();
				t.to(n, 200, function() {
					o = $(o);
					if (o.hasClass('collapsable') && !o.hasClass('in')) {
						o.collapse('show')
					}
				}, a)
			}
		});
		__app.__document.on('click', '[data-do-scroll-to]', function(o) {
			o.preventDefault();
			var e = $(this),
				n = e.attr('data-do-scroll-to') || t.options.duration,
				a = $(e.attr('data-target') || e.attr('href'));
			if (0 == a.length) {
				__app.dialogs.error('Lien mal configuré')
			};
			t.to(a, n, function() {
				e.blur()
			}, e)
		});
		if (__app.__body.is('[data-scroll-on-load]')) {
			t.to($(__app.__body.attr('data-scroll-on-load')), t.options.duration, null, __app.__body)
		};
		if (__app.__html.hasClass('page-index')) {
			$('body').scrollspy({
				target: '.navbar-fixed-top',
				offset: 100
			})
		}
	}
};;
var __app = __app || {};
__app.searching = {
	__deps: [],
	options: {},
	__run: function() {
		__app.__document.on('click focus', '#searchbox', function(a) {
			$(this).select()
		});
		__app.__document.on('submit', '.navbar-searchbox-form', function(a) {
			var t = $('#searchbox').val().replace(/^\s+|\s+$/gm, '');
			target = $(this).attr('action');
			if ('' == t) {
				a.preventDefault();
				window.location = target;
				return !1
			}
		})
	}
};;
var __app = __app || {};
__app.sharing = {
	__deps: [],
	events: {
		linkSelected: 'app:sharing:link-selected',
		popup: 'app:sharing:popup'
	},
	options: {},
	__run: function() {
		var e = this;
		__app.__document.on('focus click', '.share-control', function() {
			var e = $(this);
			e.select()
		});
		__app.__document.on('click', '.share-control', function() {
			var t = $(this);
			modal = t.parents('.modal-measure').first();
			$.event.trigger({
				type: e.events.linkSelected,
				source: modal.length > 0 ? 'modal' : 'page',
				measure: modal.length > 0 ? modal.attr('measure-index') : null
			})
		});
		__app.__document.on('click', '.input-group-addon', function() {
			var a = $(this).parents('.input-group').first(),
				n = a.find('.share-control').first(),
				t = n.parents('.modal-measure');
			$.event.trigger({
				type: e.events.linkSelected,
				source: t.length > 0 ? 'modal' : 'page',
				measure: t.length > 0 ? t.attr('measure-index') : null
			});
			n.focus()
		});
		__app.__document.on('click', '.share-link', function(a) {
			a.preventDefault();
			var t = $(this),
				r = t.attr('data-popup-dimensions').split(','),
				p = t.attr('href'),
				o = t.attr('title'),
				n = t.parents('.modal-measure').first();
			$.event.trigger({
				type: e.events.popup,
				network: t.attr('data-network') || 'Unknown',
				source: n.length > 0 ? 'modal' : 'page',
				measure: n.length > 0 ? n.attr('measure-index') : null
			});
			__app.popups.pop(p, o, r);
			$(this).blur()
		})
	}
};;
var __app = __app || {};
__app.searching = {
	__deps: [],
	options: {},
	__run: function() {
		__app.__document.on('click', '#side-navigation > li', function(i) {
			if ('A' != i.target.nodeName) {
				$(this).find('a').get(0).click()
			}
		})
	}
};;
var __app = __app || {};
__app.sounds = {
	__deps: ['utils'],
	events: {
		playing: 'app:sounds:playing',
		muted: 'app:sounds:muted',
		unmuted: 'app:sounds:unmuted',
		stopped: 'app:sounds:stopped',
		ended: 'app:sounds:ended',
		paused: 'app:sounds:paused',
		resumed: 'app:sounds:resumed',
		restarted: 'app:sounds:restarted',
		ready: 'app:sounds:ready',
		seeked: 'app:sounds:seeked',
		rewound: 'app:sounds:rewound',
		advanced: 'app:sounds:advanced',
		accelerated: 'app:sounds:accelerated',
		slowed: 'app:sounds:slowed',
		louder: 'app:sounds:louder',
		quieter: 'app:sounds:quieter'
	},
	options: {
		path: '/audio/',
		prefix: 'app-sounds-',
		formats: {
			'ogg': 'audio/ogg',
			'mp3': 'audio/mpeg',
			'wav': 'audio/wav'
		},
		autoload: !0,
		sources: ['ogg', 'mp3', 'wav'],
	},
	_library: {},
	mute: function(e) {
		if (!Modernizr.audio) {
			return !0
		};
		var r = this;
		if (0 == __app.utils.count(r._library)) {
			return !0
		};
		var a = 'undefined' == typeof e,
			t = !a ? Boolean(e) : !__app.utils.first(r._library).muted;
		for (var i in r._library) {
			var n = r._library[i];
			n.muted = t
		};
		r._fire(t ? 'muted' : 'unmuted');
		return t
	},
	muted: function() {
		if (!Modernizr.audio) {
			return !0
		};
		var r = this,
			e = __app.utils.first(r._library);
		return !e || e.muted
	},
	setVolume: function(e, r) {
		if (!Modernizr.audio) {
			return
		};
		if (e < 0 || e > 1) {
			throw new RangeError('setVolume(): volume should be a value between 0 and 1')
		};
		var n = this;
		if (r) {
			var t = n._library[r];
			if (t) {
				var i = t.volume;
				if (i != e) {
					t.volume = e;
					n._fire(e > i ? 'louder' : 'quieter', r, {
						volume: e
					})
				}
			};
			return
		};
		for (var a in n._library) {
			var t = n._library[a];
			t.volume = e
		}
	},
	play: function(e, t, i) {
		if (!Modernizr.audio || 'string' != typeof e) {
			return
		};
		var r = this,
			n = r._library[e];
		if (!n && r.options.autoload) {
			r.add(e);
			n = r._library[e]
		};
		if (!n) {
			r.__log('No sound to play!');
			return
		};
		if (r.muted()) {
			r.__log('All sounds are muted!');
			return
		};
		$(n).one('ended', function() {
			r._fire('ended', e)
		});
		if ('function' == typeof i) {
			$(n).on('timeupdate', function() {
				var e = this,
					r = e.currentTime,
					t = e.duration;
				i(r, t)
			})
		};
		if (!t) {
			r.stop(e)
		} else {
			if (!n.paused) {
				n.pause();
				r._fire('paused', e)
			} else {
				n.play();
				r._fire(n.currentTime > 0 ? 'resumed' : 'playing', e)
			};
			return
		};
		n.play();
		r._fire('playing', e)
	},
	restart: function(e) {
		var r = this,
			t = r._get(e);
		t.currentTime = 0;
		r._fire('restarted', e)
	},
	stop: function(e) {
		if (!Modernizr.audio) {
			return
		};
		var t = this,
			r = t._library[e];
		if (e && !r) {
			return
		};
		if (r) {
			if (!r.paused) {
				r.pause();
				r.currentTime = 0;
				t._fire('stopped', e);
				return 1
			}
		};
		var i = 0;
		for (var n in t._library) {
			var r = t._library[n];
			if (!r.paused) {
				r.pause();
				r.currentTime = 0;
				t._fire('stopped', n);
				i += 1
			}
		};
		return i
	},
	add: function(e, r) {
		if (!Modernizr.audio) {
			return
		};
		var t = this,
			r = 'array' == typeof r ? r : t.options.sources;
		if ('string' != typeof e) {
			return
		};
		var n = t.options.prefix + e,
			i = '<audio id="' + n + '">';
		if (0 != $('#' + n).length) {
			return
		};
		for (var u in r) {
			var o = r[u];
			filename = t.options.path + e + '.' + o;
			if (mime = t.options.formats[o]) {
				i += '<source src="' + filename + '" type="' + mime + '">'
			}
		};
		i += '</audio>';
		t.__log('Adding sound "' + e + '" to library');
		$(i).appendTo('body');
		var a = $('#' + n).get(0);
		$(a).on('canplay', function() {
			t._fire('ready', e)
		});
		t._library[e] = a
	},
	manage: function(e, r) {
		if (!Modernizr.audio) {
			return
		};
		var t = this;
		if ('string' != typeof e || 'object' != typeof r) {
			return
		};
		var n = t.options.prefix + e;
		element = $(r);
		element.removeAttr('controls').attr('id', n);
		t.__log('Adding existing sound "' + e + '" to library.');
		t._library[e] = r;
		if (r.readyState) {
			t._fire('ready', e)
		} else {
			element.on('canplay', function() {
				t._fire('ready', e)
			})
		}
	},
	activate: function(e) {
		var r = this;
		sound = r._get(e);
		if (!sound.paused) {
			return r
		};
		r.__log('Activating "' + e + '"…');
		try {
			var t = sound.volume;
			currentTime = sound.currentTime;
			sound.volume = 0;
			sound.play();
			$.doTimeout(50, function() {
				sound.pause();
				sound.currentTime = currentTime;
				sound.volume = t;
				r.__log('"' + e + '" activated.')
			})
		} catch (n) {
			r.__log('Catched error: ', n)
		};
		return r
	},
	getPosition: function(e) {
		var r = this;
		sound = r._get(e, !0);
		return sound.currentTime
	},
	advance: function(e, r) {
		var n = this,
			i = n._get(e, !0),
			a = i.currentTime,
			t = a + r,
			o = i.duration;
		if (t > o) {
			t = o
		};
		i.currentTime = t;
		n._fire('advanced', e, {
			query: r,
			before: a,
			position: t
		});
		return n
	},
	seek: function(e, r) {
		var t = this,
			n = t._get(e, !0),
			i = n.duration,
			a = r;
		if (r < 0) {
			r = 0
		};
		if (r > i) {
			r = i
		};
		n.currentTime = r;
		t._fire('seeked', e, {
			query: a,
			position: r
		});
		return t
	},
	rewind: function(e, r) {
		var n = this,
			i = n._get(e, !0),
			a = i.currentTime,
			t = a - r;
		if (t < 0) {
			t = 0
		};
		i.currentTime = t;
		n._fire('rewound', e, {
			query: r,
			before: a,
			position: t
		});
		return n
	},
	getDuration: function(e) {
		var r = this,
			t = r._get(e, !0);
		return t.duration
	},
	getPlaybackRate: function(e) {
		var r = this,
			t = r._get(e, !0);
		return t.playbackRate
	},
	setPlaybackRate: function(e, r) {
		var t = this,
			i = t._get(e, !0),
			r = r || 1,
			n = i.playbackRate;
		if (r == n) {
			return t
		};
		i.playbackRate = r;
		t._fire(r > n ? 'accelerated' : 'slowed', e, {
			previous: n,
			current: r
		});
		return t
	},
	playbackRate: function(e, r) {
		var t = this;
		if ('undefined' == typeof r) {
			return t.getPlaybackRate(e)
		} else {
			return t.setPlaybackRate(e, r)
		}
	},
	_get: function(e, r) {
		if (!Modernizr.audio) {
			throw new Error('No audio support!')
		};
		if ('string' != typeof e) {
			throw new TypeError('Invalid type for identifier: ' + typeof e + ', "string" expected.')
		};
		var n = __app.sounds,
			t = n._library[e];
		if (!t && n.options.autoload) {
			n.add(e);
			t = n._library[e]
		};
		if (!t) {
			throw new Error('Unable to get sound: ' + e)
		};
		if (r && !t.readyState) {
			throw new Error('Sound "' + e + '" is not ready.')
		};
		return t
	},
	_fire: function(e, r, t) {
		var i = __app.sounds,
			a = r ? i._get(r) : undefined,
			e = i.events[e] || undefined,
			t = 'object' == typeof t ? t : {};
		if (!e) {
			return
		};
		var n = {
			type: e
		};
		if (a) {
			n.audio = a;
			n.id = r
		};
		$.event.trigger($.extend({}, t, n));
		return !0
	},
	__run: function() {}
};;
var __app = __app || {};
__app.supportUpdates = {
	__deps: ['utils', 'sounds', 'flashes'],
	events: {
		started: 'app:support-updates:started',
		stopped: 'app:support-updates:stopped',
		polling: 'app:support-updates:polling'
	},
	options: {
		attribute: 'data-json-refresh-support',
		soundEnabled: !0,
		polling: 30000,
		template: '[<strong data-message-id="__id__">__thread__</strong>] Message de <strong>__email__</strong><br>« __message__ »<br><a href="__link__"><i class="fa fa-fw fa-arrow-right"></i> Afficher le message</a>'
	},
	start: function() {
		var e = this,
			s = e.options.attribute,
			p = '[' + s + ']',
			a = $(p);
		if (1 == a.length) {
			__app.sounds.add('notification');
			var i = a.attr(s) || e.options.polling,
				n = a.attr(s + '-target') || null,
				t = a.attr(s + '-since') || undefined;
			t = t ? new Date(t) : undefined;
			if (n) {
				$.event.trigger(e.events.started);
				$.doTimeout('support-updates', i, function() {
					var s = '';
					if (t) {
						s = '?since=' + t.toISOString()
					};
					$.event.trigger({
						type: e.events.polling,
						query: n + s
					});
					$.ajax({
						url: n + s,
						dataType: 'json',
						error: function(t, s, a) {
							e.__log('[ERROR] Ajax status: ', s, ' / message: ', a)
						},
						success: function(s) {
							if (s.success && s.count > 0) {
								var a = s.data[0],
									n = __app.utils.template(e.options.template, {
										'id': a.id,
										'thread': a.thread,
										'email': a.email,
										'message': a.message,
										'link': a.link
									});
								e.__log('[OK] ' + s.count + ' new message' + (s.count > 1 ? 's' : ''));
								if (0 == __app.flashes.find('[data-message-id="' + a.id + '"]').length) {
									__app.flashes.add(n, 'info', 'Nouveau message', 'envelope-o');
									if (e.options.soundEnabled) {
										__app.sounds.play('notification')
									}
								};
								t = new Date(s.queryTime)
							} else if (s.success) {
								t = new Date(s.queryTime);
								e.__log('[OK] Nothing new.')
							}
						}
					});
					return !0
				})
			}
		}
	},
	stop: function() {
		var e = this;
		$.doTimeout('support-updates');
		$.event.trigger(e.events.stopped)
	},
	__run: function() {
		var e = this
	}
};;
var __app = __app || {};
__app.svgpng = {
	__deps: [],
	_replace: function() {
		$('[data-no-svg-src]').each(function() {
			var r = $(this);
			r.attr('src', r.attr('data-no-svg-src')).removeAttr('data-no-svg-src')
		})
	},
	__run: function() {
		if (Modernizr.svg) {
			return
		};
		var r = this;
		r._replace();
		$.doTimeout(1000, function() {
			r._replace();
			return !0
		})
	}
};;
var __app = __app || {};
__app.textBalance = {
	__deps: ['printing'],
	options: {
		selector: '.jumbotron h1, .jumbotron h2, .text-balance',
		minWidth: 480,
	},
	install: function() {
		var t = this;
		$.balanceText(t.options.selector)
	},
	_removeElements: function() {
		$('br[data-owner="balance-text"]').replaceWith(' ')
	},
	__run: function() {
		var t = this;
		if (!__app.__html.hasClass('theme-print')) {
			if (__app.__window.height() < t.options.minWidth) {
				return
			};
			t.install();
			__app.__document.on(__app.printing.events.beforePrint, function() {
				t._removeElements();
				$.doTimeout(2000, function() {
					t.install()
				})
			})
		}
	}
};;
var __app = __app || {};
__app.tooltips = {
	__deps: [],
	options: {},
	__run: function() {
		$('[data-li-tooltip]').each(function() {
			var t = $(this);
			li = t.closest('li');
			if (0 == li.length) {
				return
			};
			li.attr('title', t.attr('title')).attr('data-delay', t.attr('data-delay')).attr('data-toggle', 'tooltip');
			t.removeAttr('title').removeAttr('data-delay')
		});
		$('[data-toggle="tooltip"]').tooltip()
	}
};;
var __app = __app || {};
__app.totalLoading = {
	events: {
		started: 'app:total-loading:started',
		stopped: 'app:total-loading:stopped'
	},
	options: {
		selector: '[data-load-display], .toc a, .pagination a',
		classname: 'total-loading',
		formSelector: '.form-total-loading',
		timeout: 10000,
		backdropClassname: 'total-loading-backdrop',
		loaderTemplate: '<div class="loading-animation"><div class="loading-bar"></div><div class="loading-bar"></div><div class="loading-bar"></div><div class="loading-bar"></div></div>'
	},
	start: function(t) {
		var a = this,
			t = 'number' == typeof t ? t : a.options.timeout;
		__app.__html.addClass(a.options.classname);
		$.doTimeout('total-loading', t, function() {
			a.stop()
		});
		$.event.trigger(a.events.started)
	},
	stop: function() {
		var t = this;
		__app.__html.removeClass(t.options.classname);
		$.doTimeout('total-loading');
		$.event.trigger(t.events.stopped)
	},
	__run: function() {
		var t = this,
			o = t.options.loaderTemplate,
			a = t.options.backdropClassname;
		__app.__body.append('<div class="' + a + '"></div>');
		$('.' + a).prepend(o);
		__app.__document.on('click', t.options.selector, function() {
			t.start()
		});
		__app.__document.on('submit', '.form-total-loading', function() {
			if (null == $(this).attr('target')) {
				t.start()
			}
		});
		__app.__document.on('keyup', function(a) {
			if (27 == a.keyCode) {
				t.stop()
			}
		});
		__app.__document.on('dblclick doubletab swipe', '.' + a, function(a) {
			t.stop()
		})
	}
};;
var __app = __app || {};
__app.typewriter = {
	__deps: ['sounds', 'prefs'],
	events: {
		toggled: 'app:typewriter:toggled'
	},
	options: {
		selector: '.notes-collapsable textarea',
		sound: !0,
		sounds: {
			character: {
				pattern: 'machine-touche-caractere-?',
				count: 6
			},
			carriageMoving: {
				pattern: 'machine-touche-position-?',
				count: 3
			},
			carriageReturn: {
				pattern: 'machine-retour-chariot-?',
				count: 3
			}
		},
		togglerTemplate: '<div class="typewriter-sound-toggle"><i class="fa fa-fw fa-bell-o" aria-hidden="true"></i><span class="sr-only">Son machine à écrire ON/OFF</span></div>'
	},
	_soundEnabled: !1,
	_preloaded: !1,
	_lastPlayed: {},
	_basename: function(e, a) {
		var o = this,
			n = o.options.sounds[e] || null;
		if (null == n) {
			throw new Error('No sound specified for category: ' + e)
		};
		if (a > n.count) {
			throw new Error('Invalid sound index [' + a + '] for category ' + e)
		};
		return n.pattern.replace('?', a)
	},
	_random: function(e) {
		var a = this,
			o = a.options.sounds[e] || null,
			t = a._lastPlayed[e] || null,
			n = null;
		if (null == o) {
			throw new Error('Invalid category: ' + e)
		};
		if (1 == o.count) {
			return a._basename(e, 1)
		};
		do {
			n = Math.floor((Math.random() * o.count) + 1)
		}
		while (n == t) a._lastPlayed[e] = n;
		return a._basename(e, n)
	},
	_loadSounds: function() {
		var e = this;
		if (e._preloaded) {
			return
		};
		e.__log('Preloading sounds');
		for (i = 1; i <= 6; ++i) {
			__app.sounds.add(e._basename('character', i))
		};
		for (i = 1; i <= 3; ++i) {
			__app.sounds.add(e._basename('carriageMoving', i))
		};
		for (i = 1; i <= 3; ++i) {
			__app.sounds.add(e._basename('carriageReturn', i))
		};
		e._preloaded = !0
	},
	_build: function(e) {
		var a = this;
		a.__log('Adding sound toggles to textareas');
		e.each(function(e, n) {
			var o = $(n);
			if (!o.next().is('.typewriter-sound-toggle')) {
				o.before(a.options.togglerTemplate)
			}
		})
	},
	__run: function() {
		var e = this;
		textareas = $(e.options.selector);
		if (0 == textareas.length) {
			return
		};
		e._build(textareas);
		e._soundEnabled = __app.prefs.get('typewriter_sound_enabled', e.options.sound);
		if (e._soundEnabled) {
			e._loadSounds();
			__app.__html.addClass('typewriter-sound-enabled')
		} else {
			__app.__html.addClass('typewriter-sound-disabled typewriter-display-toggle')
		};
		__app.__document.on('click', '.typewriter-sound-toggle', function(a) {
			e._soundEnabled = !e._soundEnabled;
			__app.prefs.set('typewriter_sound_enabled', e._soundEnabled);
			__app.__html.removeClass('typewriter-sound-' + (e._soundEnabled ? 'disabled' : 'enabled')).addClass('typewriter-sound-' + (e._soundEnabled ? 'enabled' : 'disabled'));
			if (e._soundEnabled) {
				e._loadSounds()
			};
			$.event.trigger({
				type: e.events.toggled,
				state: e._soundEnabled ? 'on' : 'off'
			})
		});
		__app.__document.on('keydown', e.options.selector, function(n) {
			if (!e._soundEnabled) {
				return
			};
			__app.__html.addClass('typewriter-display-toggle');
			var a = n.keyCode || n.which,
				o = !1,
				t = (a > 47 && a < 58) || (a > 64 && a < 91) || (a > 95 && a < 112) || (a > 185 && a < 193) || (a > 218 && a < 224);
			if (t) {
				__app.sounds.play(e._random('character'));
				return
			};
			switch (a) {
				case 8:
				case 46:
				case 9:
				case 32:
				case 37:
				case 38:
				case 39:
				case 40:
					o = !0
			};
			if (o) {
				__app.sounds.play(e._random('carriageMoving'));
				return
			};
			if (13 == a) {
				__app.sounds.play(e._random('carriageReturn'))
			}
		})
	}
};;
var __app = __app || {};
__app.utils = {
	propAt: function(r, e) {
		if ('object' != typeof r) {
			throw new TypeError('propAt() requires an object')
		};
		var e = parseInt(e);
		position = 0;
		for (var n in r) {
			if (r.hasOwnProperty(n)) {
				if (e == position) {
					return r[n]
				};
				++position
			}
		};
		return undefined
	},
	keys: function(r) {
		if ('object' != typeof r) {
			throw new TypeError('values() requires an object')
		};
		var n = [];
		for (var e in r) {
			if (r.hasOwnProperty(e)) {
				n.push(e)
			}
		};
		return n
	},
	values: function(r) {
		if ('object' != typeof r) {
			throw new TypeError('values() requires an object')
		};
		var n = [];
		for (var e in r) {
			if (r.hasOwnProperty(e)) {
				n.push(r[e])
			}
		};
		return n
	},
	first: function(r) {
		if ('object' != typeof r) {
			throw new TypeError('first() requires an object')
		};
		for (var e in r) {
			if (r.hasOwnProperty(e)) {
				return r[e]
			}
		};
		return undefined
	},
	last: function(r) {
		if ('object' != typeof r) {
			throw new TypeError('last() requires an object')
		};
		var n = undefined;
		for (var e in r) {
			if (r.hasOwnProperty(e)) {
				n = r[e]
			}
		};
		return n
	},
	count: function(r) {
		if ('object' != typeof r) {
			throw new TypeError('count() requires an object')
		};
		var e = 0;
		for (var n in r) {
			if (r.hasOwnProperty(n)) {
				++e
			}
		};
		return e
	},
	template: function(r, e) {
		if ('string' != typeof r || 'object' != typeof e) {
			return
		};
		for (var n in e) {
			var t = e[n],
				i = new RegExp('__' + n + '__', 'g');
			r = r.replace(i, t)
		};
		return r
	},
	strip: function(r) {
		if (!r) {
			return
		};
		return r.replace(/(<([^>]+)>)/ig, '')
	},
	truncate: function(r, e, i, o) {
		if (!r) {
			return
		};
		var e = e || 1000,
			o = o || '…';
		if (!i) {
			return (r.length > e) ? r.substr(0, e - 1) + o : r
		};
		var u = r.length > e,
			t = u ? r.substr(0, n - 1) : r;
		t = (useWordBoundary && u) ? t.substr(0, t.lastIndexOf(' ')) : t;
		return u ? t + o : t
	},
	escape: function(r, e) {
		var e = e || 'html';
		if ('html' != e) {
			throw new Error('escape(): cannot handle destination "' + e + '"')
		};
		return r.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
	},
	pad: function(r, e, n) {
		var r = String(r),
			t = '',
			n = n || '0',
			e = (e || 2) - r.length;
		while (t.length < e) {
			t += n
		};
		return t + r
	},
	debounce: function(r, e, t) {
		var f, a, i, n = null,
			o = function(e, t) {
				n = null;
				i = r.apply(e, t)
			},
			u = function() {
				if (n) {
					clearTimeout(n)
				};
				if (t) {
					var u = !n;
					n = setTimeout(o, e);
					if (u) {
						i = r.apply(this, a)
					}
				} else {
					n = setTimeout(o, e)
				};
				return i
			};
		u.cancel = function() {
			clearTimeout(n);
			n = null
		};
		return u
	},
	throttle: function(r, e, n) {
		var u, a, o, t = null,
			i = 0;
		if (!n) n = {};
		var f = function() {
			i = n.leading === !1 ? 0 : Date.now();
			t = null;
			o = r.apply(u, a);
			if (!t) {
				u = a = null
			}
		};
		return function() {
			var a = Date.now();
			if (!i && n.leading === !1) i = a;
			var u = e - (a - i),
				p = this,
				l = arguments;
			if (u <= 0 || u > e) {
				if (t) {
					clearTimeout(t);
					t = null
				};
				i = a;
				o = r.apply(p, l);
				if (!t) {
					p = l = null
				}
			} else if (!t && n.trailing !== !1) {
				t = setTimeout(f, u)
			};
			return o
		}
	},
	__run: function() {}
};;
var __app = __app || {};
__app.__debug = __app.__debug || !1;
__app.__name = __app.__name || 'App';
__app.log = function() {
	if (__app.__debug && window.console && 'function' == typeof console.log && Function) {
		var n = Array.prototype.slice.call(arguments);
		n.unshift('[' + __app.__name + ']');
		return Function.apply.call(console.log, console, n)
	}
};
__app.__main = {
	_register: function(n, a) {
		var p = this;
		if (!n.__name) {
			n.__name = a
		};
		if (!n.__log && Function) {
			n.__log = function() {
				var n = Array.prototype.slice.call(arguments);
				if (this.__name) {
					var a = this.__name.charAt(0).toUpperCase() + this.__name.slice(1);
					n.unshift('[' + a + ']')
				};
				Function.apply.call(__app.log, this, n)
			}
		};
		if (!__app.__debug || !n.events || 'object' != typeof n.events) {
			return
		};
		$.each(n.events, function(a, p) {
			$(document).on(p, function(p) {
				n.__log('[Event]', '[' + a + ']', p)
			})
		})
	},
	_buildRunList: function() {
		var i = this,
			n = [],
			u = function(a) {
				for (var p in n) {
					if (n[p].name == a) {
						return n[p]
					}
				}
			};
		for (var a in __app) {
			var p = __app[a];
			if ('__main' != a && p.__run && 'function' == typeof p.__run) {
				i._register(p, a);
				n.push({
					name: a,
					score: 0,
					deps: p.__deps || []
				})
			}
		};
		for (var a in n) {
			var t = n[a];
			for (var o = 0; o < t.deps.length; ++o) {
				var e = t.deps[o];
				if (!__app[e]) {
					throw new Error('Cannot satisfy a dependancy of ' + t.name + '. Missing component: ' + e)
				};
				u(e).score++
			}
		};
		n.sort(function(n, a) {
			return a.score - n.score
		});
		var r = [];
		for (var a in n) {
			r.push(n[a].name)
		};
		return r
	},
	__run: function() {
		var p = this;
		__app.__document = __app.__document || $(document);
		__app.__window = __app.__window || $(window);
		__app.__html = __app.__html || $('html');
		__app.__body = __app.__body || $('body');
		__app.__html.addClass('document-ready');
		var a = p._buildRunList();
		for (var n = 0; n < a.length; ++n) {
			__app[a[n]].__run()
		}
	},
};
$(document).ready(function() {
	__app.__main.__run()
});
