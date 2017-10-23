(function () {
    var method;
    var noop = function () {
    };
    var methods = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        if (!console[method]) {
            console[method] = noop
        }
    }
}());
if ("undefined" == typeof jQuery) {
    throw new Error("Bootstrap's JavaScript requires jQuery")
}
+function (a) {
    function b() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b) {
            if (void 0 !== a.style[c]) {
                return {end: b[c]}
            }
        }
        return !1
    }

    a.fn.emulateTransitionEnd = function (b) {
        var c = !1, d = this;
        a(this).one(a.support.transition.end, function () {
            c = !0
        });
        var e = function () {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function () {
        a.support.transition = b()
    })
}(jQuery), +function (a) {
    var b = '[data-dismiss="alert"]', c = function (c) {
        a(c).on("click", b, this.close)
    };
    c.prototype.close = function (b) {
        function c() {
            f.trigger("closed.bs.alert").remove()
        }

        var d = a(this), e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c())
    };
    var d = a.fn.alert;
    a.fn.alert = function (b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.alert");
            e || d.data("bs.alert", e = new c(this)), "string" == typeof b && e[b].call(d)
        })
    }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function () {
        return a.fn.alert = d, this
    }, a(document).on("click.bs.alert.data-api", b, c.prototype.close)
}(jQuery), +function (a) {
    var b = function (c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.isLoading = !1
    };
    b.DEFAULTS = {loadingText: "loading..."}, b.prototype.setState = function (b) {
        var c = "disabled", d = this.$element, e = d.is("input") ? "val" : "html", f = d.data();
        b += "Text", f.resetText || d.data("resetText", d[e]()), d[e](f[b] || this.options[b]), setTimeout(a.proxy(function () {
            "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, b.prototype.toggle = function () {
        var a = !0, b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        a && this.$element.toggleClass("active")
    };
    var c = a.fn.button;
    a.fn.button = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.button"), f = "object" == typeof c && c;
            e || d.data("bs.button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c)
        })
    }, a.fn.button.Constructor = b, a.fn.button.noConflict = function () {
        return a.fn.button = c, this
    }, a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function (b) {
        var c = a(b.target);
        c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle"), b.preventDefault()
    })
}(jQuery), +function (a) {
    var b = function (b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
    };
    b.DEFAULTS = {interval: 5000, pause: "hover", wrap: !0}, b.prototype.cycle = function (b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, b.prototype.getActiveIndex = function () {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, b.prototype.to = function (b) {
        var c = this, d = this.getActiveIndex();
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
            c.to(b)
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
    }, b.prototype.pause = function (b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, b.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next")
    }, b.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, b.prototype.slide = function (b, c) {
        var d = this.$element.find(".item.active"), e = c || d[b](), f = this.interval,
            g = "next" == b ? "left" : "right", h = "next" == b ? "first" : "last", i = this;
        if (!e.length) {
            if (!this.options.wrap) {
                return
            }
            e = this.$element.find(".item")[h]()
        }
        if (e.hasClass("active")) {
            return this.sliding = !1
        }
        var j = a.Event("slide.bs.carousel", {relatedTarget: e[0], direction: g});
        return this.$element.trigger(j), j.isDefaultPrevented() ? void 0 : (this.sliding = !0, f && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", function () {
            var b = a(i.$indicators.children()[i.getActiveIndex()]);
            b && b.addClass("active")
        })), a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function () {
            e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function () {
                i.$element.trigger("slid.bs.carousel")
            }, 0)
        }).emulateTransitionEnd(1000 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid.bs.carousel")), f && this.cycle(), this)
    };
    var c = a.fn.carousel;
    a.fn.carousel = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.carousel"),
                f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c),
                g = "string" == typeof c ? c : f.slide;
            e || d.data("bs.carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = c, this
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (b) {
        var c, d = a(this), e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")),
            f = a.extend({}, e.data(), d.data()), g = d.attr("data-slide-to");
        g && (f.interval = !1), e.carousel(f), (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g), b.preventDefault()
    }), a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
            var b = a(this);
            b.carousel(b.data())
        })
    })
}(jQuery), +function (a) {
    var b = function (c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    b.DEFAULTS = {toggle: !0}, b.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, b.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b = a.Event("show.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.$parent && this.$parent.find("> .panel > .in");
                if (c && c.length) {
                    var d = c.data("bs.collapse");
                    if (d && d.transitioning) {
                        return
                    }
                    c.collapse("hide"), d || c.data("bs.collapse", null)
                }
                var e = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[e](0), this.transitioning = 1;
                var f = function () {
                    this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!a.support.transition) {
                    return f.call(this)
                }
                var g = a.camelCase(["scroll", e].join("-"));
                this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g])
            }
        }
    }, b.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var d = function () {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return a.support.transition ? void this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this)
            }
        }
    }, b.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var c = a.fn.collapse;
    a.fn.collapse = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.collapse"),
                f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c);
            !e && f.toggle && "show" == c && (c = !c), e || d.data("bs.collapse", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = c, this
    }, a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (b) {
        var c, d = a(this),
            e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""),
            f = a(e), g = f.data("bs.collapse"), h = g ? "toggle" : d.data(), i = d.attr("data-parent"), j = i && a(i);
        g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"), d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), f.collapse(h)
    })
}(jQuery), +function (a) {
    function b(b) {
        a(d).remove(), a(e).each(function () {
            var d = c(a(this)), e = {relatedTarget: this};
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e))
        })
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    var d = ".dropdown-backdrop", e = "[data-toggle=dropdown2]", f = function (b) {
        a(b).on("click.bs.dropdown", this.toggle)
    };
    f.prototype.toggle = function (d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e), g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {relatedTarget: this};
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) {
                    return
                }
                f.toggleClass("open").trigger("shown.bs.dropdown", h), e.focus()
            }
            return !1
        }
    }, f.prototype.keydown = function (b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var f = c(d), g = f.hasClass("open");
                if (!g || g && 27 == b.keyCode) {
                    return 27 == b.which && f.find(e).focus(), d.click()
                }
                var h = " li:not(.divider):visible a", i = f.find("[role=menu]" + h + ", [role=listbox]" + h);
                if (i.length) {
                    var j = i.index(i.filter(":focus"));
                    38 == b.keyCode && j > 0 && j--, 40 == b.keyCode && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).focus()
                }
            }
        }
    };
    var g = a.fn.dropdown;
    a.fn.dropdown = function (b) {
        return this.each(function () {
            var c = a(this), d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new f(this)), "string" == typeof b && d[b].call(c)
        })
    }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = g, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu], [role=listbox]", f.prototype.keydown)
}(jQuery), +function (a) {
    var b = function (b, c) {
        this.options = c, this.$element = a(b), this.$backdrop = this.isShown = null, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    b.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0}, b.prototype.toggle = function (a) {
        return this[this.isShown ? "hide" : "show"](a)
    }, b.prototype.show = function (b) {
        var c = this, d = a.Event("show.bs.modal", {relatedTarget: b});
        this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show().scrollTop(0), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
            var e = a.Event("shown.bs.modal", {relatedTarget: b});
            d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function () {
                c.$element.focus().trigger(e)
            }).emulateTransitionEnd(300) : c.$element.focus().trigger(e)
        }))
    }, b.prototype.hide = function (b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, b.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus()
        }, this))
    }, b.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, b.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(), this.backdrop(function () {
            a.removeBackdrop(), a.$element.trigger("hidden.bs.modal")
        })
    }, b.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, b.prototype.backdrop = function (b) {
        var c = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var d = a.support.transition && c;
            if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                    a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) {
                return
            }
            d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()
        } else {
            !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
        }
    };
    var c = a.fn.modal;
    a.fn.modal = function (c, d) {
        return this.each(function () {
            var e = a(this), f = e.data("bs.modal"), g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c);
            f || e.data("bs.modal", f = new b(this, g)), "string" == typeof c ? f[c](d) : g.show && f.show(d)
        })
    }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function () {
        return a.fn.modal = c, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (b) {
        var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")),
            f = e.data("bs.modal") ? "toggle" : a.extend({remote: !/#/.test(d) && d}, e.data(), c.data());
        c.is("a") && b.preventDefault(), e.modal(f, this).one("hide", function () {
            c.is(":visible") && c.focus()
        })
    }), a(document).on("show.bs.modal", ".modal", function () {
        a(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function () {
        a(document.body).removeClass("modal-open")
    })
}(jQuery), +function (a) {
    var b = function (a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
    };
    b.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, b.prototype.init = function (b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d);
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) {
                this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this))
            } else {
                if ("manual" != g) {
                    var h = "hover" == g ? "mouseenter" : "focusin", i = "hover" == g ? "mouseleave" : "focusout";
                    this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
                }
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, b.prototype.getDefaults = function () {
        return b.DEFAULTS
    }, b.prototype.getOptions = function (b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, b.prototype.getDelegateOptions = function () {
        var b = {}, c = this.getDefaults();
        return this._options && a.each(this._options, function (a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, b.prototype.enter = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show()
    }, b.prototype.leave = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, b.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(b), b.isDefaultPrevented()) {
                return
            }
            var c = this, d = this.tip();
            this.setContent(), this.options.animation && d.addClass("fade");
            var e = "function" == typeof this.options.placement ? this.options.placement.call(this, d[0], this.$element[0]) : this.options.placement,
                f = /\s?auto?\s?/i, g = f.test(e);
            g && (e = e.replace(f, "") || "top"), d.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(e), this.options.container ? d.appendTo(this.options.container) : d.insertAfter(this.$element);
            var h = this.getPosition(), i = d[0].offsetWidth, j = d[0].offsetHeight;
            if (g) {
                var k = this.$element.parent(), l = e,
                    m = document.documentElement.scrollTop || document.body.scrollTop,
                    n = "body" == this.options.container ? window.innerWidth : k.outerWidth(),
                    o = "body" == this.options.container ? window.innerHeight : k.outerHeight(),
                    p = "body" == this.options.container ? 0 : k.offset().left;
                e = "bottom" == e && h.top + h.height + j - m > o ? "top" : "top" == e && h.top - m - j < 0 ? "bottom" : "right" == e && h.right + i > n ? "left" : "left" == e && h.left - i < p ? "right" : e, d.removeClass(l).addClass(e)
            }
            var q = this.getCalculatedOffset(e, h, i, j);
            this.applyPlacement(q, e), this.hoverState = null;
            var r = function () {
                c.$element.trigger("shown.bs." + c.type)
            };
            a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, r).emulateTransitionEnd(150) : r()
        }
    }, b.prototype.applyPlacement = function (b, c) {
        var d, e = this.tip(), f = e[0].offsetWidth, g = e[0].offsetHeight, h = parseInt(e.css("margin-top"), 10),
            i = parseInt(e.css("margin-left"), 10);
        isNaN(h) && (h = 0), isNaN(i) && (i = 0), b.top = b.top + h, b.left = b.left + i, a.offset.setOffset(e[0], a.extend({
            using: function (a) {
                e.css({top: Math.round(a.top), left: Math.round(a.left)})
            }
        }, b), 0), e.addClass("in");
        var j = e[0].offsetWidth, k = e[0].offsetHeight;
        if ("top" == c && k != g && (d = !0, b.top = b.top + g - k), /bottom|top/.test(c)) {
            var l = 0;
            b.left < 0 && (l = -2 * b.left, b.left = 0, e.offset(b), j = e[0].offsetWidth, k = e[0].offsetHeight), this.replaceArrow(l - f + j, j, "left")
        } else {
            this.replaceArrow(k - g, k, "top")
        }
        d && e.offset(b)
    }, b.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    }, b.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, b.prototype.hide = function () {
        function b() {
            "in" != c.hoverState && d.detach(), c.$element.trigger("hidden.bs." + c.type)
        }

        var c = this, d = this.tip(), e = a.Event("hide.bs." + this.type);
        return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), this.hoverState = null, this)
    }, b.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, b.prototype.hasContent = function () {
        return this.getTitle()
    }, b.prototype.getPosition = function () {
        var b = this.$element[0];
        return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
            width: b.offsetWidth,
            height: b.offsetHeight
        }, this.$element.offset())
    }, b.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {top: b.top + b.height / 2 - d / 2, left: b.left - c} : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, b.prototype.getTitle = function () {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, b.prototype.tip = function () {
        return this.$tip = this.$tip || a(this.options.template)
    }, b.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, b.prototype.validate = function () {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, b.prototype.enable = function () {
        this.enabled = !0
    }, b.prototype.disable = function () {
        this.enabled = !1
    }, b.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, b.prototype.toggle = function (b) {
        var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, b.prototype.destroy = function () {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var c = a.fn.tooltip;
    a.fn.tooltip = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof c && c;
            (e || "destroy" != c) && (e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]())
        })
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = c, this
    }
}(jQuery), +function (a) {
    var b = function (a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) {
        throw new Error("Popover requires tooltip.js")
    }
    b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, b.prototype.getDefaults = function () {
        return b.DEFAULTS
    }, b.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, b.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, b.prototype.getContent = function () {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, b.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, b.prototype.tip = function () {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip
    };
    var c = a.fn.popover;
    a.fn.popover = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.popover"), f = "object" == typeof c && c;
            (e || "destroy" != c) && (e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]())
        })
    }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function () {
        return a.fn.popover = c, this
    }
}(jQuery), +function (a) {
    function b(c, d) {
        var e, f = a.proxy(this.process, this);
        this.$element = a(a(c).is("body") ? window : c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), this.process()
    }

    b.DEFAULTS = {offset: 10}, b.prototype.refresh = function () {
        var b = this.$element[0] == window ? "offset" : "position";
        this.offsets = a([]), this.targets = a([]);
        var c = this;
        this.$body.find(this.selector).map(function () {
            var d = a(this), e = d.data("target") || d.attr("href"), f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [[f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]] || null
        }).sort(function (a, b) {
            return a[0] - b[0]
        }).each(function () {
            c.offsets.push(this[0]), c.targets.push(this[1])
        })
    }, b.prototype.process = function () {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(),
            e = this.offsets, f = this.targets, g = this.activeTarget;
        if (b >= d) {
            return g != (a = f.last()[0]) && this.activate(a)
        }
        if (g && b <= e[0]) {
            return g != (a = f[0]) && this.activate(a)
        }
        for (a = e.length; a--;) {
            g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
        }
    }, b.prototype.activate = function (b) {
        this.activeTarget = b, a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    };
    var c = a.fn.scrollspy;
    a.fn.scrollspy = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
        return a.fn.scrollspy = c, this
    }, a(window).on("load", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);
            b.scrollspy(b.data())
        })
    })
}(jQuery), +function (a) {
    var b = function (b) {
        this.element = a(b)
    };
    b.prototype.show = function () {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0], f = a.Event("show.bs.tab", {relatedTarget: e});
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.parent("li"), c), this.activate(g, g.parent(), function () {
                    b.trigger({type: "shown.bs.tab", relatedTarget: e})
                })
            }
        }
    }, b.prototype.activate = function (b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
        }

        var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade");
        g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), f.removeClass("in")
    };
    var c = a.fn.tab;
    a.fn.tab = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new b(this)), "string" == typeof c && e[c]()
        })
    }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function () {
        return a.fn.tab = c, this
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) {
        b.preventDefault(), a(this).tab("show")
    })
}(jQuery), +function (a) {
    var b = function (c, d) {
        this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(c), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = {offset: 0}, b.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) {
            return this.pinnedOffset
        }
        this.$element.removeClass(b.RESET).addClass("affix");
        var a = this.$window.scrollTop(), c = this.$element.offset();
        return this.pinnedOffset = c.top - a
    }, b.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, b.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var c = a(document).height(), d = this.$window.scrollTop(), e = this.$element.offset(),
                f = this.options.offset, g = f.top, h = f.bottom;
            "top" == this.affixed && (e.top += d), "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top(this.$element)), "function" == typeof h && (h = f.bottom(this.$element));
            var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1;
            if (this.affixed !== i) {
                this.unpin && this.$element.css("top", "");
                var j = "affix" + (i ? "-" + i : ""), k = a.Event(j + ".bs.affix");
                this.$element.trigger(k), k.isDefaultPrevented() || (this.affixed = i, this.unpin = "bottom" == i ? this.getPinnedOffset() : null, this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))), "bottom" == i && this.$element.offset({top: c - h - this.$element.height()}))
            }
        }
    };
    var c = a.fn.affix;
    a.fn.affix = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.affix"), f = "object" == typeof c && c;
            e || d.data("bs.affix", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function () {
        return a.fn.affix = c, this
    }, a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var b = a(this), c = b.data();
            c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c)
        })
    })
}(jQuery);
!function (a) {
    var b = function () {
        return {
            isMsie: function () {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1
            }, isBlankString: function (a) {
                return !a || /^\s*$/.test(a)
            }, escapeRegExChars: function (a) {
                return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            }, isString: function (a) {
                return "string" == typeof a
            }, isNumber: function (a) {
                return "number" == typeof a
            }, isArray: a.isArray, isFunction: a.isFunction, isObject: a.isPlainObject, isUndefined: function (a) {
                return "undefined" == typeof a
            }, toStr: function (a) {
                return b.isUndefined(a) || null === a ? "" : a + ""
            }, bind: a.proxy, each: function (b, c) {
                function d(a, b) {
                    return c(b, a)
                }

                a.each(b, d)
            }, map: a.map, filter: a.grep, every: function (b, c) {
                var d = !0;
                return b ? (a.each(b, function (a, e) {
                    return (d = c.call(null, e, a, b)) ? void 0 : !1
                }), !!d) : d
            }, some: function (b, c) {
                var d = !1;
                return b ? (a.each(b, function (a, e) {
                    return (d = c.call(null, e, a, b)) ? !1 : void 0
                }), !!d) : d
            }, mixin: a.extend, getUniqueId: function () {
                var a = 0;
                return function () {
                    return a++
                }
            }(), templatify: function (b) {
                function c() {
                    return String(b)
                }

                return a.isFunction(b) ? b : c
            }, defer: function (a) {
                setTimeout(a, 0)
            }, debounce: function (a, b, c) {
                var d, e;
                return function () {
                    var f, g, h = this, i = arguments;
                    return f = function () {
                        d = null, c || (e = a.apply(h, i))
                    }, g = c && !d, clearTimeout(d), d = setTimeout(f, b), g && (e = a.apply(h, i)), e
                }
            }, throttle: function (a, b) {
                var c, d, e, f, g, h;
                return g = 0, h = function () {
                    g = new Date, e = null, f = a.apply(c, d)
                }, function () {
                    var i = new Date, j = b - (i - g);
                    return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), f
                }
            }, noop: function () {
            }
        }
    }(), c = "0.10.4", d = function () {
        function a(a) {
            return a = b.toStr(a), a ? a.split(/\s+/) : []
        }

        function c(a) {
            return a = b.toStr(a), a ? a.split(/\W+/) : []
        }

        function d(a) {
            return function () {
                var c = [].slice.call(arguments, 0);
                return function (d) {
                    var e = [];
                    return b.each(c, function (c) {
                        e = e.concat(a(b.toStr(d[c])))
                    }), e
                }
            }
        }

        return {nonword: c, whitespace: a, obj: {nonword: d(c), whitespace: d(a)}}
    }(), e = function () {
        function c(c) {
            this.maxSize = b.isNumber(c) ? c : 100, this.reset(), this.maxSize <= 0 && (this.set = this.get = a.noop)
        }

        function d() {
            this.head = this.tail = null
        }

        function e(a, b) {
            this.key = a, this.val = b, this.prev = this.next = null
        }

        return b.mixin(c.prototype, {
            set: function (a, b) {
                var c, d = this.list.tail;
                this.size >= this.maxSize && (this.list.remove(d), delete this.hash[d.key]), (c = this.hash[a]) ? (c.val = b, this.list.moveToFront(c)) : (c = new e(a, b), this.list.add(c), this.hash[a] = c, this.size++)
            }, get: function (a) {
                var b = this.hash[a];
                return b ? (this.list.moveToFront(b), b.val) : void 0
            }, reset: function () {
                this.size = 0, this.hash = {}, this.list = new d
            }
        }), b.mixin(d.prototype, {
            add: function (a) {
                this.head && (a.next = this.head, this.head.prev = a), this.head = a, this.tail = this.tail || a
            }, remove: function (a) {
                a.prev ? a.prev.next = a.next : this.head = a.next, a.next ? a.next.prev = a.prev : this.tail = a.prev
            }, moveToFront: function (a) {
                this.remove(a), this.add(a)
            }
        }), c
    }(), f = function () {
        function a(a) {
            this.prefix = ["__", a, "__"].join(""), this.ttlKey = "__ttl__", this.keyMatcher = new RegExp("^" + b.escapeRegExChars(this.prefix))
        }

        function c() {
            return (new Date).getTime()
        }

        function d(a) {
            return JSON.stringify(b.isUndefined(a) ? null : a)
        }

        function e(a) {
            return JSON.parse(a)
        }

        var f, g;
        try {
            f = window.localStorage, f.setItem("~~~", "!"), f.removeItem("~~~")
        } catch (h) {
            f = null
        }
        return g = f && window.JSON ? {
            _prefix: function (a) {
                return this.prefix + a
            }, _ttlKey: function (a) {
                return this._prefix(a) + this.ttlKey
            }, get: function (a) {
                return this.isExpired(a) && this.remove(a), e(f.getItem(this._prefix(a)))
            }, set: function (a, e, g) {
                return b.isNumber(g) ? f.setItem(this._ttlKey(a), d(c() + g)) : f.removeItem(this._ttlKey(a)), f.setItem(this._prefix(a), d(e))
            }, remove: function (a) {
                return f.removeItem(this._ttlKey(a)), f.removeItem(this._prefix(a)), this
            }, clear: function () {
                var a, b, c = [], d = f.length;
                for (a = 0; d > a; a++) {
                    (b = f.key(a)).match(this.keyMatcher) && c.push(b.replace(this.keyMatcher, ""))
                }
                for (a = c.length; a--;) {
                    this.remove(c[a])
                }
                return this
            }, isExpired: function (a) {
                var d = e(f.getItem(this._ttlKey(a)));
                return b.isNumber(d) && c() > d ? !0 : !1
            }
        } : {get: b.noop, set: b.noop, remove: b.noop, clear: b.noop, isExpired: b.noop}, b.mixin(a.prototype, g), a
    }(), g = function () {
        function c(b) {
            b = b || {}, this.cancelled = !1, this.lastUrl = null, this._send = b.transport ? d(b.transport) : a.ajax, this._get = b.rateLimiter ? b.rateLimiter(this._get) : this._get, this._cache = b.cache === !1 ? new e(0) : i
        }

        function d(c) {
            return function (d, e) {
                function f(a) {
                    b.defer(function () {
                        h.resolve(a)
                    })
                }

                function g(a) {
                    b.defer(function () {
                        h.reject(a)
                    })
                }

                var h = a.Deferred();
                return c(d, e, f, g), h
            }
        }

        var f = 0, g = {}, h = 6, i = new e(10);
        return c.setMaxPendingRequests = function (a) {
            h = a
        }, c.resetCache = function () {
            i.reset()
        }, b.mixin(c.prototype, {
            _get: function (a, b, c) {
                function d(b) {
                    c && c(null, b), k._cache.set(a, b)
                }

                function e() {
                    c && c(!0)
                }

                function i() {
                    f--, delete g[a], k.onDeckRequestArgs && (k._get.apply(k, k.onDeckRequestArgs), k.onDeckRequestArgs = null)
                }

                var j, k = this;
                this.cancelled || a !== this.lastUrl || ((j = g[a]) ? j.done(d).fail(e) : h > f ? (f++, g[a] = this._send(a, b).done(d).fail(e).always(i)) : this.onDeckRequestArgs = [].slice.call(arguments, 0))
            }, get: function (a, c, d) {
                var e;
                return b.isFunction(c) && (d = c, c = {}), this.cancelled = !1, this.lastUrl = a, (e = this._cache.get(a)) ? b.defer(function () {
                    d && d(null, e)
                }) : this._get(a, c, d), !!e
            }, cancel: function () {
                this.cancelled = !0
            }
        }), c
    }(), h = function () {
        function c(b) {
            b = b || {}, b.datumTokenizer && b.queryTokenizer || a.error("datumTokenizer and queryTokenizer are both required"), this.datumTokenizer = b.datumTokenizer, this.queryTokenizer = b.queryTokenizer, this.reset()
        }

        function d(a) {
            return a = b.filter(a, function (a) {
                return !!a
            }), a = b.map(a, function (a) {
                return a.toLowerCase()
            })
        }

        function e() {
            return {ids: [], children: {}}
        }

        function f(a) {
            for (var b = {}, c = [], d = 0, e = a.length; e > d; d++) {
                b[a[d]] || (b[a[d]] = !0, c.push(a[d]))
            }
            return c
        }

        function g(a, b) {
            function c(a, b) {
                return a - b
            }

            var d = 0, e = 0, f = [];
            a = a.sort(c), b = b.sort(c);
            for (var g = a.length, h = b.length; g > d && h > e;) {
                a[d] < b[e] ? d++ : a[d] > b[e] ? e++ : (f.push(a[d]), d++, e++)
            }
            return f
        }

        return b.mixin(c.prototype, {
            bootstrap: function (a) {
                this.datums = a.datums, this.trie = a.trie
            }, add: function (a) {
                var c = this;
                a = b.isArray(a) ? a : [a], b.each(a, function (a) {
                    var f, g;
                    f = c.datums.push(a) - 1, g = d(c.datumTokenizer(a)), b.each(g, function (a) {
                        var b, d, g;
                        for (b = c.trie, d = a.split(""); g = d.shift();) {
                            b = b.children[g] || (b.children[g] = e()), b.ids.push(f)
                        }
                    })
                })
            }, get: function (a) {
                var c, e, h = this;
                return c = d(this.queryTokenizer(a)), b.each(c, function (a) {
                    var b, c, d, f;
                    if (e && 0 === e.length) {
                        return !1
                    }
                    for (b = h.trie, c = a.split(""); b && (d = c.shift());) {
                        b = b.children[d]
                    }
                    return b && 0 === c.length ? (f = b.ids.slice(0), void (e = e ? g(e, f) : f)) : (e = [], !1)
                }), e ? b.map(f(e), function (a) {
                    return h.datums[a]
                }) : []
            }, reset: function () {
                this.datums = [], this.trie = e()
            }, serialize: function () {
                return {datums: this.datums, trie: this.trie}
            }
        }), c
    }(), i = function () {
        function d(a) {
            return a.local || null
        }

        function e(d) {
            var e, f;
            return f = {
                url: null,
                thumbprint: "",
                ttl: 86400000,
                filter: null,
                ajax: {}
            }, (e = d.prefetch || null) && (e = b.isString(e) ? {url: e} : e, e = b.mixin(f, e), e.thumbprint = c + e.thumbprint, e.ajax.type = e.ajax.type || "GET", e.ajax.dataType = e.ajax.dataType || "json", !e.url && a.error("prefetch requires url to be set")), e
        }

        function f(c) {
            function d(a) {
                return function (c) {
                    return b.debounce(c, a)
                }
            }

            function e(a) {
                return function (c) {
                    return b.throttle(c, a)
                }
            }

            var f, g;
            return g = {
                url: null,
                cache: !0,
                wildcard: "%QUERY",
                replace: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                send: null,
                filter: null,
                ajax: {}
            }, (f = c.remote || null) && (f = b.isString(f) ? {url: f} : f, f = b.mixin(g, f), f.rateLimiter = /^throttle$/i.test(f.rateLimitBy) ? e(f.rateLimitWait) : d(f.rateLimitWait), f.ajax.type = f.ajax.type || "GET", f.ajax.dataType = f.ajax.dataType || "json", delete f.rateLimitBy, delete f.rateLimitWait, !f.url && a.error("remote requires url to be set")), f
        }

        return {local: d, prefetch: e, remote: f}
    }();
    !function (c) {
        function e(b) {
            b && (b.local || b.prefetch || b.remote) || a.error("one of local, prefetch, or remote is required"), this.limit = b.limit || 5, this.sorter = j(b.sorter), this.dupDetector = b.dupDetector || k, this.local = i.local(b), this.prefetch = i.prefetch(b), this.remote = i.remote(b), this.cacheKey = this.prefetch ? this.prefetch.cacheKey || this.prefetch.url : null, this.index = new h({
                datumTokenizer: b.datumTokenizer,
                queryTokenizer: b.queryTokenizer
            }), this.storage = this.cacheKey ? new f(this.cacheKey) : null
        }

        function j(a) {
            function c(b) {
                return b.sort(a)
            }

            function d(a) {
                return a
            }

            return b.isFunction(a) ? c : d
        }

        function k() {
            return !1
        }

        var l, m;
        return l = c.Bloodhound, m = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        }, c.Bloodhound = e, e.noConflict = function () {
            return c.Bloodhound = l, e
        }, e.tokenizers = d, b.mixin(e.prototype, {
            _loadPrefetch: function (b) {
                function c(a) {
                    f.clear(), f.add(b.filter ? b.filter(a) : a), f._saveToStorage(f.index.serialize(), b.thumbprint, b.ttl)
                }

                var d, e, f = this;
                return (d = this._readFromStorage(b.thumbprint)) ? (this.index.bootstrap(d), e = a.Deferred().resolve()) : e = a.ajax(b.url, b.ajax).done(c), e
            }, _getFromRemote: function (a, b) {
                function c(a, c) {
                    b(a ? [] : f.remote.filter ? f.remote.filter(c) : c)
                }

                var d, e, f = this;
                if (this.transport) {
                    return a = a || "", e = encodeURIComponent(a), d = this.remote.replace ? this.remote.replace(this.remote.url, a) : this.remote.url.replace(this.remote.wildcard, e), this.transport.get(d, this.remote.ajax, c)
                }
            }, _cancelLastRemoteRequest: function () {
                this.transport && this.transport.cancel()
            }, _saveToStorage: function (a, b, c) {
                this.storage && (this.storage.set(m.data, a, c), this.storage.set(m.protocol, location.protocol, c), this.storage.set(m.thumbprint, b, c))
            }, _readFromStorage: function (a) {
                var b, c = {};
                return this.storage && (c.data = this.storage.get(m.data), c.protocol = this.storage.get(m.protocol), c.thumbprint = this.storage.get(m.thumbprint)), b = c.thumbprint !== a || c.protocol !== location.protocol, c.data && !b ? c.data : null
            }, _initialize: function () {
                function c() {
                    e.add(b.isFunction(f) ? f() : f)
                }

                var d, e = this, f = this.local;
                return d = this.prefetch ? this._loadPrefetch(this.prefetch) : a.Deferred().resolve(), f && d.done(c), this.transport = this.remote ? new g(this.remote) : null, this.initPromise = d.promise()
            }, initialize: function (a) {
                return !this.initPromise || a ? this._initialize() : this.initPromise
            }, add: function (a) {
                this.index.add(a)
            }, get: function (a, c) {
                function d(a) {
                    var d = f.slice(0);
                    b.each(a, function (a) {
                        var c;
                        return c = b.some(d, function (b) {
                            return e.dupDetector(a, b)
                        }), !c && d.push(a), d.length < e.limit
                    }), c && c(e.sorter(d))
                }

                var e = this, f = [], g = !1;
                f = this.index.get(a), f = this.sorter(f).slice(0, this.limit), f.length < this.limit ? g = this._getFromRemote(a, d) : this._cancelLastRemoteRequest(), g || (f.length > 0 || !this.transport) && c && c(f)
            }, clear: function () {
                this.index.reset()
            }, clearPrefetchCache: function () {
                this.storage && this.storage.clear()
            }, clearRemoteCache: function () {
                this.transport && g.resetCache()
            }, ttAdapter: function () {
                return b.bind(this.get, this)
            }
        }), e
    }(this);
    var j = function () {
        return {
            wrapper: '<span class="twitter-typeahead"></span>',
            dropdown: '<span class="tt-dropdown-menu"></span>',
            dataset: '<div class="tt-dataset-%CLASS%"></div>',
            suggestions: '<span class="tt-suggestions"></span>',
            suggestion: '<div class="tt-suggestion"></div>'
        }
    }(), k = function () {
        var a = {
            wrapper: {position: "relative", display: "inline-block"},
            hint: {
                position: "absolute",
                top: "0",
                left: "0",
                borderColor: "transparent",
                boxShadow: "none",
                opacity: "1"
            },
            input: {position: "relative", verticalAlign: "top", backgroundColor: "transparent"},
            inputWithNoHint: {position: "relative", verticalAlign: "top"},
            dropdown: {position: "absolute", top: "100%", left: "0", zIndex: "100", display: "none"},
            suggestions: {display: "block"},
            suggestion: {whiteSpace: "nowrap", cursor: "pointer"},
            suggestionChild: {whiteSpace: "normal"},
            ltr: {left: "0", right: "auto"},
            rtl: {left: "auto", right: " 0"}
        };
        return b.isMsie() && b.mixin(a.input, {backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}), b.isMsie() && b.isMsie() <= 7 && b.mixin(a.input, {marginTop: "-1px"}), a
    }(), l = function () {
        function c(b) {
            b && b.el || a.error("EventBus initialized without el"), this.$el = a(b.el)
        }

        var d = "typeahead:";
        return b.mixin(c.prototype, {
            trigger: function (a) {
                var b = [].slice.call(arguments, 1);
                this.$el.trigger(d + a, b)
            }
        }), c
    }(), m = function () {
        function a(a, b, c, d) {
            var e;
            if (!c) {
                return this
            }
            for (b = b.split(i), c = d ? h(c, d) : c, this._callbacks = this._callbacks || {}; e = b.shift();) {
                this._callbacks[e] = this._callbacks[e] || {sync: [], async: []}, this._callbacks[e][a].push(c)
            }
            return this
        }

        function b(b, c, d) {
            return a.call(this, "async", b, c, d)
        }

        function c(b, c, d) {
            return a.call(this, "sync", b, c, d)
        }

        function d(a) {
            var b;
            if (!this._callbacks) {
                return this
            }
            for (a = a.split(i); b = a.shift();) {
                delete this._callbacks[b]
            }
            return this
        }

        function e(a) {
            var b, c, d, e, g;
            if (!this._callbacks) {
                return this
            }
            for (a = a.split(i), d = [].slice.call(arguments, 1); (b = a.shift()) && (c = this._callbacks[b]);) {
                e = f(c.sync, this, [b].concat(d)), g = f(c.async, this, [b].concat(d)), e() && j(g)
            }
            return this
        }

        function f(a, b, c) {
            function d() {
                for (var d, e = 0, f = a.length; !d && f > e; e += 1) {
                    d = a[e].apply(b, c) === !1
                }
                return !d
            }

            return d
        }

        function g() {
            var a;
            return a = window.setImmediate ? function (a) {
                setImmediate(function () {
                    a()
                })
            } : function (a) {
                setTimeout(function () {
                    a()
                }, 0)
            }
        }

        function h(a, b) {
            return a.bind ? a.bind(b) : function () {
                a.apply(b, [].slice.call(arguments, 0))
            }
        }

        var i = /\s+/, j = g();
        return {onSync: c, onAsync: b, off: d, trigger: e}
    }(), n = function (a) {
        function c(a, c, d) {
            for (var e, f = [], g = 0, h = a.length; h > g; g++) {
                f.push(b.escapeRegExChars(a[g]))
            }
            return e = d ? "\\b(" + f.join("|") + ")\\b" : "(" + f.join("|") + ")", c ? new RegExp(e) : new RegExp(e, "i")
        }

        var d = {node: null, pattern: null, tagName: "strong", className: null, wordsOnly: !1, caseSensitive: !1};
        return function (e) {
            function f(b) {
                var c, d, f;
                return (c = h.exec(b.data)) && (f = a.createElement(e.tagName), e.className && (f.className = e.className), d = b.splitText(c.index), d.splitText(c[0].length), f.appendChild(d.cloneNode(!0)), b.parentNode.replaceChild(f, d)), !!c
            }

            function g(a, b) {
                for (var c, d = 3, e = 0; e < a.childNodes.length; e++) {
                    c = a.childNodes[e], c.nodeType === d ? e += b(c) ? 1 : 0 : g(c, b)
                }
            }

            var h;
            e = b.mixin({}, d, e), e.node && e.pattern && (e.pattern = b.isArray(e.pattern) ? e.pattern : [e.pattern], h = c(e.pattern, e.caseSensitive, e.wordsOnly), g(e.node, f))
        }
    }(window.document), o = function () {
        function c(c) {
            var e, f, h, i, j = this;
            c = c || {}, c.input || a.error("input is missing"), e = b.bind(this._onBlur, this), f = b.bind(this._onFocus, this), h = b.bind(this._onKeydown, this), i = b.bind(this._onInput, this), this.$hint = a(c.hint), this.$input = a(c.input).on("blur.tt", e).on("focus.tt", f).on("keydown.tt", h), 0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = b.noop), b.isMsie() ? this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function (a) {
                g[a.which || a.keyCode] || b.defer(b.bind(j._onInput, j, a))
            }) : this.$input.on("input.tt", i), this.query = this.$input.val(), this.$overflowHelper = d(this.$input)
        }

        function d(b) {
            return a('<pre aria-hidden="true"></pre>').css({
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
                fontFamily: b.css("font-family"),
                fontSize: b.css("font-size"),
                fontStyle: b.css("font-style"),
                fontVariant: b.css("font-variant"),
                fontWeight: b.css("font-weight"),
                wordSpacing: b.css("word-spacing"),
                letterSpacing: b.css("letter-spacing"),
                textIndent: b.css("text-indent"),
                textRendering: b.css("text-rendering"),
                textTransform: b.css("text-transform")
            }).insertAfter(b)
        }

        function e(a, b) {
            return c.normalizeQuery(a) === c.normalizeQuery(b)
        }

        function f(a) {
            return a.altKey || a.ctrlKey || a.metaKey || a.shiftKey
        }

        var g;
        return g = {
            9: "tab",
            27: "esc",
            37: "left",
            39: "right",
            13: "enter",
            38: "up",
            40: "down"
        }, c.normalizeQuery = function (a) {
            return (a || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ")
        }, b.mixin(c.prototype, m, {
            _onBlur: function () {
                this.resetInputValue(), this.trigger("blurred")
            }, _onFocus: function () {
                this.trigger("focused")
            }, _onKeydown: function (a) {
                var b = g[a.which || a.keyCode];
                this._managePreventDefault(b, a), b && this._shouldTrigger(b, a) && this.trigger(b + "Keyed", a)
            }, _onInput: function () {
                this._checkInputValue()
            }, _managePreventDefault: function (a, b) {
                var c, d, e;
                switch (a) {
                    case"tab":
                        d = this.getHint(), e = this.getInputValue(), c = d && d !== e && !f(b);
                        break;
                    case"up":
                    case"down":
                        c = !f(b);
                        break;
                    default:
                        c = !1
                }
                c && b.preventDefault()
            }, _shouldTrigger: function (a, b) {
                var c;
                switch (a) {
                    case"tab":
                        c = !f(b);
                        break;
                    default:
                        c = !0
                }
                return c
            }, _checkInputValue: function () {
                var a, b, c;
                a = this.getInputValue(), b = e(a, this.query), c = b ? this.query.length !== a.length : !1, this.query = a, b ? c && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query)
            }, focus: function () {
                this.$input.focus()
            }, blur: function () {
                this.$input.blur()
            }, getQuery: function () {
                return this.query
            }, setQuery: function (a) {
                this.query = a
            }, getInputValue: function () {
                return this.$input.val()
            }, setInputValue: function (a, b) {
                this.$input.val(a), b ? this.clearHint() : this._checkInputValue()
            }, resetInputValue: function () {
                this.setInputValue(this.query, !0)
            }, getHint: function () {
                return this.$hint.val()
            }, setHint: function (a) {
                this.$hint.val(a)
            }, clearHint: function () {
                this.setHint("")
            }, clearHintIfInvalid: function () {
                var a, b, c, d;
                a = this.getInputValue(), b = this.getHint(), c = a !== b && 0 === b.indexOf(a), d = "" !== a && c && !this.hasOverflow(), !d && this.clearHint()
            }, getLanguageDirection: function () {
                return (this.$input.css("direction") || "ltr").toLowerCase()
            }, hasOverflow: function () {
                var a = this.$input.width() - 2;
                return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= a
            }, isCursorAtEnd: function () {
                var a, c, d;
                return a = this.$input.val().length, c = this.$input[0].selectionStart, b.isNumber(c) ? c === a : document.selection ? (d = document.selection.createRange(), d.moveStart("character", -a), a === d.text.length) : !0
            }, destroy: function () {
                this.$hint.off(".tt"), this.$input.off(".tt"), this.$hint = this.$input = this.$overflowHelper = null
            }
        }), c
    }(), p = function () {
        function c(c) {
            c = c || {}, c.templates = c.templates || {}, c.source || a.error("missing source"), c.name && !f(c.name) && a.error("invalid dataset name: " + c.name), this.query = null, this.highlight = !!c.highlight, this.name = c.name || b.getUniqueId(), this.source = c.source, this.displayFn = d(c.display || c.displayKey), this.templates = e(c.templates, this.displayFn), this.$el = a(j.dataset.replace("%CLASS%", this.name))
        }

        function d(a) {
            function c(b) {
                return b[a]
            }

            return a = a || "value", b.isFunction(a) ? a : c
        }

        function e(a, c) {
            function d(a) {
                return "<p>" + c(a) + "</p>"
            }

            return {
                empty: a.empty && b.templatify(a.empty),
                header: a.header && b.templatify(a.header),
                footer: a.footer && b.templatify(a.footer),
                suggestion: a.suggestion || d
            }
        }

        function f(a) {
            return /^[_a-zA-Z0-9-]+$/.test(a)
        }

        var g = "ttDataset", h = "ttValue", i = "ttDatum";
        return c.extractDatasetName = function (b) {
            return a(b).data(g)
        }, c.extractValue = function (b) {
            return a(b).data(h)
        }, c.extractDatum = function (b) {
            return a(b).data(i)
        }, b.mixin(c.prototype, m, {
            _render: function (c, d) {
                function e() {
                    return p.templates.empty({query: c, isEmpty: !0})
                }

                function f() {
                    function e(b) {
                        var c;
                        return c = a(j.suggestion).append(p.templates.suggestion(b)).data(g, p.name).data(h, p.displayFn(b)).data(i, b), c.children().each(function () {
                            a(this).css(k.suggestionChild)
                        }), c
                    }

                    var f, l;
                    return f = a(j.suggestions).css(k.suggestions), l = b.map(d, e), f.append.apply(f, l), p.highlight && n({
                        className: "tt-highlight",
                        node: f[0],
                        pattern: c
                    }), f
                }

                function l() {
                    return p.templates.header({query: c, isEmpty: !o})
                }

                function m() {
                    return p.templates.footer({query: c, isEmpty: !o})
                }

                if (this.$el) {
                    var o, p = this;
                    this.$el.empty(), o = d && d.length, !o && this.templates.empty ? this.$el.html(e()).prepend(p.templates.header ? l() : null).append(p.templates.footer ? m() : null) : o && this.$el.html(f()).prepend(p.templates.header ? l() : null).append(p.templates.footer ? m() : null), this.trigger("rendered")
                }
            }, getRoot: function () {
                return this.$el
            }, update: function (a) {
                function b(b) {
                    c.canceled || a !== c.query || c._render(a, b)
                }

                var c = this;
                this.query = a, this.canceled = !1, this.source(a, b)
            }, cancel: function () {
                this.canceled = !0
            }, clear: function () {
                this.cancel(), this.$el.empty(), this.trigger("rendered")
            }, isEmpty: function () {
                return this.$el.is(":empty")
            }, destroy: function () {
                this.$el = null
            }
        }), c
    }(), q = function () {
        function c(c) {
            var e, f, g, h = this;
            c = c || {}, c.menu || a.error("menu is required"), this.isOpen = !1, this.isEmpty = !0, this.datasets = b.map(c.datasets, d), e = b.bind(this._onSuggestionClick, this), f = b.bind(this._onSuggestionMouseEnter, this), g = b.bind(this._onSuggestionMouseLeave, this), this.$menu = a(c.menu).on("click.tt", ".tt-suggestion", e).on("mouseenter.tt", ".tt-suggestion", f).on("mouseleave.tt", ".tt-suggestion", g), b.each(this.datasets, function (a) {
                h.$menu.append(a.getRoot()), a.onSync("rendered", h._onRendered, h)
            })
        }

        function d(a) {
            return new p(a)
        }

        return b.mixin(c.prototype, m, {
            _onSuggestionClick: function (b) {
                this.trigger("suggestionClicked", a(b.currentTarget))
            }, _onSuggestionMouseEnter: function (b) {
                this._removeCursor(), this._setCursor(a(b.currentTarget), !0)
            }, _onSuggestionMouseLeave: function () {
                this._removeCursor()
            }, _onRendered: function () {
                function a(a) {
                    return a.isEmpty()
                }

                this.isEmpty = b.every(this.datasets, a), this.isEmpty ? this._hide() : this.isOpen && this._show(), this.trigger("datasetRendered")
            }, _hide: function () {
                this.$menu.hide()
            }, _show: function () {
                this.$menu.css("display", "block")
            }, _getSuggestions: function () {
                return this.$menu.find(".tt-suggestion")
            }, _getCursor: function () {
                return this.$menu.find(".tt-cursor").first()
            }, _setCursor: function (a, b) {
                a.first().addClass("tt-cursor"), !b && this.trigger("cursorMoved")
            }, _removeCursor: function () {
                this._getCursor().removeClass("tt-cursor")
            }, _moveCursor: function (a) {
                var b, c, d, e;
                if (this.isOpen) {
                    if (c = this._getCursor(), b = this._getSuggestions(), this._removeCursor(), d = b.index(c) + a, d = (d + 1) % (b.length + 1) - 1, -1 === d) {
                        return void this.trigger("cursorRemoved")
                    }
                    -1 > d && (d = b.length - 1), this._setCursor(e = b.eq(d)), this._ensureVisible(e)
                }
            }, _ensureVisible: function (a) {
                var b, c, d, e;
                b = a.position().top, c = b + a.outerHeight(!0), d = this.$menu.scrollTop(), e = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10), 0 > b ? this.$menu.scrollTop(d + b) : c > e && this.$menu.scrollTop(d + (c - e))
            }, close: function () {
                this.isOpen && (this.isOpen = !1, this._removeCursor(), this._hide(), this.trigger("closed"))
            }, open: function () {
                this.isOpen || (this.isOpen = !0, !this.isEmpty && this._show(), this.trigger("opened"))
            }, setLanguageDirection: function (a) {
                this.$menu.css("ltr" === a ? k.ltr : k.rtl)
            }, moveCursorUp: function () {
                this._moveCursor(-1)
            }, moveCursorDown: function () {
                this._moveCursor(1)
            }, getDatumForSuggestion: function (a) {
                var b = null;
                return a.length && (b = {
                    raw: p.extractDatum(a),
                    value: p.extractValue(a),
                    datasetName: p.extractDatasetName(a)
                }), b
            }, getDatumForCursor: function () {
                return this.getDatumForSuggestion(this._getCursor().first())
            }, getDatumForTopSuggestion: function () {
                return this.getDatumForSuggestion(this._getSuggestions().first())
            }, update: function (a) {
                function c(b) {
                    b.update(a)
                }

                b.each(this.datasets, c)
            }, empty: function () {
                function a(a) {
                    a.clear()
                }

                b.each(this.datasets, a), this.isEmpty = !0
            }, isVisible: function () {
                return this.isOpen && !this.isEmpty
            }, destroy: function () {
                function a(a) {
                    a.destroy()
                }

                this.$menu.off(".tt"), this.$menu = null, b.each(this.datasets, a)
            }
        }), c
    }(), r = function () {
        function c(c) {
            var e, f, g;
            c = c || {}, c.input || a.error("missing input"), this.isActivated = !1, this.autoselect = !!c.autoselect, this.minLength = b.isNumber(c.minLength) ? c.minLength : 1, this.$node = d(c.input, c.withHint), e = this.$node.find(".tt-dropdown-menu"), f = this.$node.find(".tt-input"), g = this.$node.find(".tt-hint"), f.on("blur.tt", function (a) {
                var c, d, g;
                c = document.activeElement, d = e.is(c), g = e.has(c).length > 0, b.isMsie() && (d || g) && (a.preventDefault(), a.stopImmediatePropagation(), b.defer(function () {
                    f.focus()
                }))
            }), e.on("mousedown.tt", function (a) {
                a.preventDefault()
            }), this.eventBus = c.eventBus || new l({el: f}), this.dropdown = new q({
                menu: e,
                datasets: c.datasets
            }).onSync("suggestionClicked", this._onSuggestionClicked, this).onSync("cursorMoved", this._onCursorMoved, this).onSync("cursorRemoved", this._onCursorRemoved, this).onSync("opened", this._onOpened, this).onSync("closed", this._onClosed, this).onAsync("datasetRendered", this._onDatasetRendered, this), this.input = new o({
                input: f,
                hint: g
            }).onSync("focused", this._onFocused, this).onSync("blurred", this._onBlurred, this).onSync("enterKeyed", this._onEnterKeyed, this).onSync("tabKeyed", this._onTabKeyed, this).onSync("escKeyed", this._onEscKeyed, this).onSync("upKeyed", this._onUpKeyed, this).onSync("downKeyed", this._onDownKeyed, this).onSync("leftKeyed", this._onLeftKeyed, this).onSync("rightKeyed", this._onRightKeyed, this).onSync("queryChanged", this._onQueryChanged, this).onSync("whitespaceChanged", this._onWhitespaceChanged, this), this._setLanguageDirection()
        }

        function d(b, c) {
            var d, f, h, i;
            d = a(b), f = a(j.wrapper).css(k.wrapper), h = a(j.dropdown).css(k.dropdown), i = d.clone().css(k.hint).css(e(d)), i.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder required").prop("readonly", !0).attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            }), d.data(g, {
                dir: d.attr("dir"),
                autocomplete: d.attr("autocomplete"),
                spellcheck: d.attr("spellcheck"),
                style: d.attr("style")
            }), d.addClass("tt-input").attr({autocomplete: "off", spellcheck: !1}).css(c ? k.input : k.inputWithNoHint);
            try {
                !d.attr("dir") && d.attr("dir", "auto")
            } catch (l) {
            }
            return d.wrap(f).parent().prepend(c ? i : null).append(h)
        }

        function e(a) {
            return {
                backgroundAttachment: a.css("background-attachment"),
                backgroundClip: a.css("background-clip"),
                backgroundColor: a.css("background-color"),
                backgroundImage: a.css("background-image"),
                backgroundOrigin: a.css("background-origin"),
                backgroundPosition: a.css("background-position"),
                backgroundRepeat: a.css("background-repeat"),
                backgroundSize: a.css("background-size")
            }
        }

        function f(a) {
            var c = a.find(".tt-input");
            b.each(c.data(g), function (a, d) {
                b.isUndefined(a) ? c.removeAttr(d) : c.attr(d, a)
            }), c.detach().removeData(g).removeClass("tt-input").insertAfter(a), a.remove()
        }

        var g = "ttAttrs";
        return b.mixin(c.prototype, {
            _onSuggestionClicked: function (a, b) {
                var c;
                (c = this.dropdown.getDatumForSuggestion(b)) && this._select(c)
            }, _onCursorMoved: function () {
                var a = this.dropdown.getDatumForCursor();
                this.input.setInputValue(a.value, !0), this.eventBus.trigger("cursorchanged", a.raw, a.datasetName)
            }, _onCursorRemoved: function () {
                this.input.resetInputValue(), this._updateHint()
            }, _onDatasetRendered: function () {
                this._updateHint()
            }, _onOpened: function () {
                this._updateHint(), this.eventBus.trigger("opened")
            }, _onClosed: function () {
                this.input.clearHint(), this.eventBus.trigger("closed")
            }, _onFocused: function () {
                this.isActivated = !0, this.dropdown.open()
            }, _onBlurred: function () {
                this.isActivated = !1, this.dropdown.empty(), this.dropdown.close()
            }, _onEnterKeyed: function (a, b) {
                var c, d;
                c = this.dropdown.getDatumForCursor(), d = this.dropdown.getDatumForTopSuggestion(), c ? (this._select(c), b.preventDefault()) : this.autoselect && d && (this._select(d), b.preventDefault())
            }, _onTabKeyed: function (a, b) {
                var c;
                (c = this.dropdown.getDatumForCursor()) ? (this._select(c), b.preventDefault()) : this._autocomplete(!0)
            }, _onEscKeyed: function () {
                this.dropdown.close(), this.input.resetInputValue()
            }, _onUpKeyed: function () {
                var a = this.input.getQuery();
                this.dropdown.isEmpty && a.length >= this.minLength ? this.dropdown.update(a) : this.dropdown.moveCursorUp(), this.dropdown.open()
            }, _onDownKeyed: function () {
                var a = this.input.getQuery();
                this.dropdown.isEmpty && a.length >= this.minLength ? this.dropdown.update(a) : this.dropdown.moveCursorDown(), this.dropdown.open()
            }, _onLeftKeyed: function () {
                "rtl" === this.dir && this._autocomplete()
            }, _onRightKeyed: function () {
                "ltr" === this.dir && this._autocomplete()
            }, _onQueryChanged: function (a, b) {
                this.input.clearHintIfInvalid(), b.length >= this.minLength ? this.dropdown.update(b) : this.dropdown.empty(), this.dropdown.open(), this._setLanguageDirection()
            }, _onWhitespaceChanged: function () {
                this._updateHint(), this.dropdown.open()
            }, _setLanguageDirection: function () {
                var a;
                this.dir !== (a = this.input.getLanguageDirection()) && (this.dir = a, this.$node.css("direction", a), this.dropdown.setLanguageDirection(a))
            }, _updateHint: function () {
                var a, c, d, e, f, g;
                a = this.dropdown.getDatumForTopSuggestion(), a && this.dropdown.isVisible() && !this.input.hasOverflow() ? (c = this.input.getInputValue(), d = o.normalizeQuery(c), e = b.escapeRegExChars(d), f = new RegExp("^(?:" + e + ")(.+$)", "i"), g = f.exec(a.value), g ? this.input.setHint(c + g[1]) : this.input.clearHint()) : this.input.clearHint()
            }, _autocomplete: function (a) {
                var b, c, d, e;
                b = this.input.getHint(), c = this.input.getQuery(), d = a || this.input.isCursorAtEnd(), b && c !== b && d && (e = this.dropdown.getDatumForTopSuggestion(), e && this.input.setInputValue(e.value), this.eventBus.trigger("autocompleted", e.raw, e.datasetName))
            }, _select: function (a) {
                this.input.setQuery(a.value), this.input.setInputValue(a.value, !0), this._setLanguageDirection(), this.eventBus.trigger("selected", a.raw, a.datasetName), this.dropdown.close(), b.defer(b.bind(this.dropdown.empty, this.dropdown))
            }, open: function () {
                this.dropdown.open()
            }, close: function () {
                this.dropdown.close()
            }, setVal: function (a) {
                a = b.toStr(a), this.isActivated ? this.input.setInputValue(a) : (this.input.setQuery(a), this.input.setInputValue(a, !0)), this._setLanguageDirection()
            }, getVal: function () {
                return this.input.getQuery()
            }, destroy: function () {
                this.input.destroy(), this.dropdown.destroy(), f(this.$node), this.$node = null
            }
        }), c
    }();
    !function () {
        var c, d, e;
        c = a.fn.typeahead, d = "ttTypeahead", e = {
            initialize: function (c, e) {
                function f() {
                    var f, g, h = a(this);
                    b.each(e, function (a) {
                        a.highlight = !!c.highlight
                    }), g = new r({
                        input: h,
                        eventBus: f = new l({el: h}),
                        withHint: b.isUndefined(c.hint) ? !0 : !!c.hint,
                        minLength: c.minLength,
                        autoselect: c.autoselect,
                        datasets: e
                    }), h.data(d, g)
                }

                return e = b.isArray(e) ? e : [].slice.call(arguments, 1), c = c || {}, this.each(f)
            }, open: function () {
                function b() {
                    var b, c = a(this);
                    (b = c.data(d)) && b.open()
                }

                return this.each(b)
            }, close: function () {
                function b() {
                    var b, c = a(this);
                    (b = c.data(d)) && b.close()
                }

                return this.each(b)
            }, val: function (b) {
                function c() {
                    var c, e = a(this);
                    (c = e.data(d)) && c.setVal(b)
                }

                function e(a) {
                    var b, c;
                    return (b = a.data(d)) && (c = b.getVal()), c
                }

                return arguments.length ? this.each(c) : e(this.first())
            }, destroy: function () {
                function b() {
                    var b, c = a(this);
                    (b = c.data(d)) && (b.destroy(), c.removeData(d))
                }

                return this.each(b)
            }
        }, a.fn.typeahead = function (b) {
            var c;
            return e[b] && "initialize" !== b ? (c = this.filter(function () {
                return !!a(this).data(d)
            }), e[b].apply(c, [].slice.call(arguments, 1))) : e.initialize.apply(this, arguments)
        }, a.fn.typeahead.noConflict = function () {
            return a.fn.typeahead = c, this
        }
    }()
}(window.jQuery);
!function (a, b) {
    "object" == typeof exports && "object" == typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? exports.Handlebars = b() : a.Handlebars = b()
}(this, function () {
    return function (a) {
        function b(d) {
            if (c[d]) {
                return c[d].exports
            }
            var e = c[d] = {exports: {}, id: d, loaded: !1};
            return a[d].call(e.exports, e, e.exports, b), e.loaded = !0, e.exports
        }

        var c = {};
        return b.m = a, b.c = c, b.p = "", b(0)
    }([function (a, b, c) {
        function d() {
            var a = new g.HandlebarsEnvironment;
            return m.extend(a, g), a.SafeString = i["default"], a.Exception = k["default"], a.Utils = m, a.escapeExpression = m.escapeExpression, a.VM = o, a.template = function (b) {
                return o.template(b, a)
            }, a
        }

        var e = c(7)["default"];
        b.__esModule = !0;
        var f = c(1), g = e(f), h = c(2), i = e(h), j = c(3), k = e(j), l = c(4), m = e(l), n = c(5), o = e(n),
            p = c(6), q = e(p), r = d();
        r.create = d, q["default"](r), r["default"] = r, b["default"] = r, a.exports = b["default"]
    }, function (a, b, c) {
        function d(a, b) {
            this.helpers = a || {}, this.partials = b || {}, e(this)
        }

        function e(a) {
            a.registerHelper("helperMissing", function () {
                if (1 === arguments.length) {
                    return void 0
                }
                throw new k["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"')
            }), a.registerHelper("blockHelperMissing", function (b, c) {
                var d = c.inverse, e = c.fn;
                if (b === !0) {
                    return e(this)
                }
                if (b === !1 || null == b) {
                    return d(this)
                }
                if (o(b)) {
                    return b.length > 0 ? (c.ids && (c.ids = [c.name]), a.helpers.each(b, c)) : d(this)
                }
                if (c.data && c.ids) {
                    var g = f(c.data);
                    g.contextPath = i.appendContextPath(c.data.contextPath, c.name), c = {data: g}
                }
                return e(b, c)
            }), a.registerHelper("each", function (a, b) {
                function c(b, c, e) {
                    j && (j.key = b, j.index = c, j.first = 0 === c, j.last = !!e, l && (j.contextPath = l + b)), h += d(a[b], {
                        data: j,
                        blockParams: i.blockParams([a[b], b], [l + b, null])
                    })
                }

                if (!b) {
                    throw new k["default"]("Must pass iterator to #each")
                }
                var d = b.fn, e = b.inverse, g = 0, h = "", j = void 0, l = void 0;
                if (b.data && b.ids && (l = i.appendContextPath(b.data.contextPath, b.ids[0]) + "."), p(a) && (a = a.call(this)), b.data && (j = f(b.data)), a && "object" == typeof a) {
                    if (o(a)) {
                        for (var m = a.length; m > g; g++) {
                            c(g, g, g === a.length - 1)
                        }
                    } else {
                        var n = void 0;
                        for (var q in a) {
                            a.hasOwnProperty(q) && (n && c(n, g - 1), n = q, g++)
                        }
                        n && c(n, g - 1, !0)
                    }
                }
                return 0 === g && (h = e(this)), h
            }), a.registerHelper("if", function (a, b) {
                return p(a) && (a = a.call(this)), !b.hash.includeZero && !a || i.isEmpty(a) ? b.inverse(this) : b.fn(this)
            }), a.registerHelper("unless", function (b, c) {
                return a.helpers["if"].call(this, b, {fn: c.inverse, inverse: c.fn, hash: c.hash})
            }), a.registerHelper("with", function (a, b) {
                p(a) && (a = a.call(this));
                var c = b.fn;
                if (i.isEmpty(a)) {
                    return b.inverse(this)
                }
                if (b.data && b.ids) {
                    var d = f(b.data);
                    d.contextPath = i.appendContextPath(b.data.contextPath, b.ids[0]), b = {data: d}
                }
                return c(a, b)
            }), a.registerHelper("log", function (b, c) {
                var d = c.data && null != c.data.level ? parseInt(c.data.level, 10) : 1;
                a.log(d, b)
            }), a.registerHelper("lookup", function (a, b) {
                return a && a[b]
            })
        }

        function f(a) {
            var b = i.extend({}, a);
            return b._parent = a, b
        }

        var g = c(7)["default"];
        b.__esModule = !0, b.HandlebarsEnvironment = d, b.createFrame = f;
        var h = c(4), i = g(h), j = c(3), k = g(j), l = "3.0.1";
        b.VERSION = l;
        var m = 6;
        b.COMPILER_REVISION = m;
        var n = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1"
        };
        b.REVISION_CHANGES = n;
        var o = i.isArray, p = i.isFunction, q = i.toString, r = "[object Object]";
        d.prototype = {
            constructor: d, logger: s, log: t, registerHelper: function (a, b) {
                if (q.call(a) === r) {
                    if (b) {
                        throw new k["default"]("Arg not supported with multiple helpers")
                    }
                    i.extend(this.helpers, a)
                } else {
                    this.helpers[a] = b
                }
            }, unregisterHelper: function (a) {
                delete this.helpers[a]
            }, registerPartial: function (a, b) {
                if (q.call(a) === r) {
                    i.extend(this.partials, a)
                } else {
                    if ("undefined" == typeof b) {
                        throw new k["default"]("Attempting to register a partial as undefined")
                    }
                    this.partials[a] = b
                }
            }, unregisterPartial: function (a) {
                delete this.partials[a]
            }
        };
        var s = {
            methodMap: {0: "debug", 1: "info", 2: "warn", 3: "error"},
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            level: 1,
            log: function (a, b) {
                if ("undefined" != typeof console && s.level <= a) {
                    var c = s.methodMap[a];
                    (console[c] || console.log).call(console, b)
                }
            }
        };
        b.logger = s;
        var t = s.log;
        b.log = t
    }, function (a, b) {
        function c(a) {
            this.string = a
        }

        b.__esModule = !0, c.prototype.toString = c.prototype.toHTML = function () {
            return "" + this.string
        }, b["default"] = c, a.exports = b["default"]
    }, function (a, b) {
        function c(a, b) {
            var e = b && b.loc, f = void 0, g = void 0;
            e && (f = e.start.line, g = e.start.column, a += " - " + f + ":" + g);
            for (var h = Error.prototype.constructor.call(this, a), i = 0; i < d.length; i++) {
                this[d[i]] = h[d[i]]
            }
            Error.captureStackTrace && Error.captureStackTrace(this, c), e && (this.lineNumber = f, this.column = g)
        }

        b.__esModule = !0;
        var d = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        c.prototype = new Error, b["default"] = c, a.exports = b["default"]
    }, function (a, b) {
        function c(a) {
            return j[a]
        }

        function d(a) {
            for (var b = 1; b < arguments.length; b++) {
                for (var c in arguments[b]) {
                    Object.prototype.hasOwnProperty.call(arguments[b], c) && (a[c] = arguments[b][c])
                }
            }
            return a
        }

        function e(a, b) {
            for (var c = 0, d = a.length; d > c; c++) {
                if (a[c] === b) {
                    return c
                }
            }
            return -1
        }

        function f(a) {
            if ("string" != typeof a) {
                if (a && a.toHTML) {
                    return a.toHTML()
                }
                if (null == a) {
                    return ""
                }
                if (!a) {
                    return a + ""
                }
                a = "" + a
            }
            return l.test(a) ? a.replace(k, c) : a
        }

        function g(a) {
            return a || 0 === a ? o(a) && 0 === a.length ? !0 : !1 : !0
        }

        function h(a, b) {
            return a.path = b, a
        }

        function i(a, b) {
            return (a ? a + "." : "") + b
        }

        b.__esModule = !0, b.extend = d, b.indexOf = e, b.escapeExpression = f, b.isEmpty = g, b.blockParams = h, b.appendContextPath = i;
        var j = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"}, k = /[&<>"'`]/g,
            l = /[&<>"'`]/, m = Object.prototype.toString;
        b.toString = m;
        var n = function (a) {
            return "function" == typeof a
        };
        n(/x/) && (b.isFunction = n = function (a) {
            return "function" == typeof a && "[object Function]" === m.call(a)
        });
        var n;
        b.isFunction = n;
        var o = Array.isArray || function (a) {
            return a && "object" == typeof a ? "[object Array]" === m.call(a) : !1
        };
        b.isArray = o
    }, function (a, b, c) {
        function d(a) {
            var b = a && a[0] || 1, c = p.COMPILER_REVISION;
            if (b !== c) {
                if (c > b) {
                    var d = p.REVISION_CHANGES[c], e = p.REVISION_CHANGES[b];
                    throw new o["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + d + ") or downgrade your runtime to an older version (" + e + ").")
                }
                throw new o["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + a[1] + ").")
            }
        }

        function e(a, b) {
            function c(c, d, e) {
                e.hash && (d = m.extend({}, d, e.hash)), c = b.VM.resolvePartial.call(this, c, d, e);
                var f = b.VM.invokePartial.call(this, c, d, e);
                if (null == f && b.compile && (e.partials[e.name] = b.compile(c, a.compilerOptions, b), f = e.partials[e.name](d, e)), null != f) {
                    if (e.indent) {
                        for (var g = f.split("\n"), h = 0, i = g.length; i > h && (g[h] || h + 1 !== i); h++) {
                            g[h] = e.indent + g[h]
                        }
                        f = g.join("\n")
                    }
                    return f
                }
                throw new o["default"]("The partial " + e.name + " could not be compiled when running in runtime-only mode")
            }

            function d(b) {
                var c = void 0 === arguments[1] ? {} : arguments[1], f = c.data;
                d._setup(c), !c.partial && a.useData && (f = j(b, f));
                var g = void 0, h = a.useBlockParams ? [] : void 0;
                return a.useDepths && (g = c.depths ? [b].concat(c.depths) : [b]), a.main.call(e, b, e.helpers, e.partials, f, h, g)
            }

            if (!b) {
                throw new o["default"]("No environment passed to template")
            }
            if (!a || !a.main) {
                throw new o["default"]("Unknown template object: " + typeof a)
            }
            b.VM.checkRevision(a.compiler);
            var e = {
                strict: function (a, b) {
                    if (!(b in a)) {
                        throw new o["default"]('"' + b + '" not defined in ' + a)
                    }
                    return a[b]
                }, lookup: function (a, b) {
                    for (var c = a.length, d = 0; c > d; d++) {
                        if (a[d] && null != a[d][b]) {
                            return a[d][b]
                        }
                    }
                }, lambda: function (a, b) {
                    return "function" == typeof a ? a.call(b) : a
                }, escapeExpression: m.escapeExpression, invokePartial: c, fn: function (b) {
                    return a[b]
                }, programs: [], program: function (a, b, c, d, e) {
                    var g = this.programs[a], h = this.fn(a);
                    return b || e || d || c ? g = f(this, a, h, b, c, d, e) : g || (g = this.programs[a] = f(this, a, h)), g
                }, data: function (a, b) {
                    for (; a && b--;) {
                        a = a._parent
                    }
                    return a
                }, merge: function (a, b) {
                    var c = a || b;
                    return a && b && a !== b && (c = m.extend({}, b, a)), c
                }, noop: b.VM.noop, compilerInfo: a.compiler
            };
            return d.isTop = !0, d._setup = function (c) {
                c.partial ? (e.helpers = c.helpers, e.partials = c.partials) : (e.helpers = e.merge(c.helpers, b.helpers), a.usePartial && (e.partials = e.merge(c.partials, b.partials)))
            }, d._child = function (b, c, d, g) {
                if (a.useBlockParams && !d) {
                    throw new o["default"]("must pass block params")
                }
                if (a.useDepths && !g) {
                    throw new o["default"]("must pass parent depths")
                }
                return f(e, b, a[b], c, 0, d, g)
            }, d
        }

        function f(a, b, c, d, e, f, g) {
            function h(b) {
                var e = void 0 === arguments[1] ? {} : arguments[1];
                return c.call(a, b, a.helpers, a.partials, e.data || d, f && [e.blockParams].concat(f), g && [b].concat(g))
            }

            return h.program = b, h.depth = g ? g.length : 0, h.blockParams = e || 0, h
        }

        function g(a, b, c) {
            return a ? a.call || c.name || (c.name = a, a = c.partials[a]) : a = c.partials[c.name], a
        }

        function h(a, b, c) {
            if (c.partial = !0, void 0 === a) {
                throw new o["default"]("The partial " + c.name + " could not be found")
            }
            return a instanceof Function ? a(b, c) : void 0
        }

        function i() {
            return ""
        }

        function j(a, b) {
            return b && "root" in b || (b = b ? p.createFrame(b) : {}, b.root = a), b
        }

        var k = c(7)["default"];
        b.__esModule = !0, b.checkRevision = d, b.template = e, b.wrapProgram = f, b.resolvePartial = g, b.invokePartial = h, b.noop = i;
        var l = c(4), m = k(l), n = c(3), o = k(n), p = c(1)
    }, function (a, b) {
        (function (c) {
            b.__esModule = !0, b["default"] = function (a) {
                var b = "undefined" != typeof c ? c : window, d = b.Handlebars;
                a.noConflict = function () {
                    b.Handlebars === a && (b.Handlebars = d)
                }
            }, a.exports = b["default"]
        }).call(b, function () {
            return this
        }())
    }, function (a, b) {
        b["default"] = function (a) {
            return a && a.__esModule ? a : {"default": a}
        }, b.__esModule = !0
    }])
});
(function (factory) {
    var registeredInModuleLoader = false;
    if (typeof define === "function" && define.amd) {
        define(factory);
        registeredInModuleLoader = true
    }
    if (typeof exports === "object") {
        module.exports = factory();
        registeredInModuleLoader = true
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function () {
            window.Cookies = OldCookies;
            return api
        }
    }
}(function () {
    function extend() {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
                result[key] = attributes[key]
            }
        }
        return result
    }

    function init(converter) {
        function api(key, value, attributes) {
            var result;
            if (typeof document === "undefined") {
                return
            }
            if (arguments.length > 1) {
                attributes = extend({path: "/"}, api.defaults, attributes);
                if (typeof attributes.expires === "number") {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 86400000);
                    attributes.expires = expires
                }
                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : "";
                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result
                    }
                } catch (e) {
                }
                if (!converter.write) {
                    value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)
                } else {
                    value = converter.write(value, key)
                }
                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);
                var stringifiedAttributes = "";
                for (var attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue
                    }
                    stringifiedAttributes += "; " + attributeName;
                    if (attributes[attributeName] === true) {
                        continue
                    }
                    stringifiedAttributes += "=" + attributes[attributeName]
                }
                return (document.cookie = key + "=" + value + stringifiedAttributes)
            }
            if (!key) {
                result = {}
            }
            var cookies = document.cookie ? document.cookie.split("; ") : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;
            for (; i < cookies.length; i++) {
                var parts = cookies[i].split("=");
                var cookie = parts.slice(1).join("=");
                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1)
                }
                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);
                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie)
                        } catch (e) {
                        }
                    }
                    if (key === name) {
                        result = cookie;
                        break
                    }
                    if (!key) {
                        result[name] = cookie
                    }
                } catch (e) {
                }
            }
            return result
        }

        api.set = api;
        api.get = function (key) {
            return api.call(api, key)
        };
        api.getJSON = function () {
            return api.apply({json: true}, [].slice.call(arguments))
        };
        api.defaults = {};
        api.remove = function (key, attributes) {
            api(key, "", extend(attributes, {expires: -1}))
        };
        api.withConverter = init;
        return api
    }

    return init(function () {
    })
}));

function save_preferences(chartName, index, chart) {
    var seriesVisible = [];
    for (i = 0; i < chart.series.length; i++) {
        if (i == index) {
            seriesVisible[i] = !chart.series[i].visible
        } else {
            seriesVisible[i] = chart.series[i].visible
        }
    }
    Cookies.set("highcharts_" + chartName, seriesVisible, {expires: 180})
}

function series_is_visible(chartName, index, defaultState) {
    var preferences = Cookies.getJSON("highcharts_" + chartName);
    if (preferences === undefined) {
        return defaultState
    }
    return preferences[index]
}

function tooltip_format_market_cap() {
    val = format_market_cap(this.y);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ": <b>" + val + " USD</b><br/>"
}

function tooltip_format_crypto() {
    val = format_crypto(this.y);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ": <b>" + val + "</b><br/>"
}

function tooltip_format_fiat() {
    val = format_crypto(this.y);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ": <b>" + val + "</b><br/>"
}

function tooltip_format_percentage() {
    val = this.y.toFixed(2);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ": <b>" + val + "%</b><br/>"
}

function label_format_market_cap() {
    val = format_market_cap(this.value);
    return "$" + val
}

function label_format_crypto() {
    val = format_crypto(this.value);
    return val + " BTC"
}

function label_format_fiat() {
    val = format_crypto(this.value);
    return "$" + val
}

function is_altcoin(slug) {
    if (slug == "bitcoin") {
        return false
    }
    return true
}

function is_mobile() {
    var mobile = $("#metadata").data("mobile");
    return mobile == "True"
}

function HighChartsGraph(graphId, loadingId, noDataId) {
    this.graphId = graphId;
    this.loadingId = loadingId;
    this.noDataId = noDataId
}

HighChartsGraph.prototype.init = function (start, end) {
    var that = this;
    that.fetchAndLoad(that.initCharts, start, end)
};
HighChartsGraph.prototype.chartsLoaded = function () {
    var chart = $("#" + this.graphId).highcharts();
    return chart !== undefined
};
HighChartsGraph.prototype.hideLoading = function () {
    $("#" + this.loadingId).hide()
};
HighChartsGraph.prototype.showNoData = function () {
    $("#" + this.noDataId).removeClass("hidden")
};
HighChartsGraph.prototype.afterSetExtremes = function (e) {
    if (e.dataMin != e.min || e.dataMax != e.max) {
        that = this;
        var min = Math.round(e.min);
        var max = Math.round(e.max);
        that.updateCharts(min, max)
    }
};
HighChartsGraph.prototype.updateCharts = function (min, max) {
    var that = this;
    var chart = $("#" + that.graphId).highcharts();
    chart.showLoading("");
    that.fetchAndLoad(that.finishUpdateCharts, min, max)
};
HighChartsGraph.prototype.finishUpdateCharts = function (seriesData) {
};
HighChartsGraph.prototype.fetchAndLoad = function (callback, start, end) {
};
HighChartsGraph.prototype.initCharts = function (seriesData) {
};

function CurrencyDetailGraph(graphId, loadingId, noDataId) {
    HighChartsGraph.call(this, graphId, loadingId, noDataId);
    this.slug = $("#coincode").val();
    this.chartName = is_altcoin(this.slug) ? "altcoin" : "bitcoin"
}

CurrencyDetailGraph.prototype = new HighChartsGraph;
CurrencyDetailGraph.constructor = CurrencyDetailGraph;
CurrencyDetailGraph.prototype.finishUpdateCharts = function (seriesData) {
    var that = this;
    var chart = $("#" + that.graphId).highcharts();
    chart.series[0].setData(seriesData["market_cap_by_available_supply"]);
    chart.series[1].setData(seriesData["price_usd"]);
    chart.series[2].setData(seriesData["price_btc"]);
    chart.series[3].setData(seriesData["vol_usd"]);
    chart.hideLoading()
};
CurrencyDetailGraph.prototype.fetchAndLoad = function (callback, start, end) {
    var that = this;
    var slug = $("#coincode").val();
    var apiDomain = "http://api.feixiaohao.com";
    timeParams = "";
    if (start !== undefined && end !== undefined) {
        timeParams = start + "/" + end + "/"
    }
    $.ajax({
        url: apiDomain + "/coinhisdata/" + slug + "/" + timeParams,
        type: "GET",
        dataType: "json",
        error: function () {
            that.hideLoading();
            that.showNoData()
        },
        success: function (data) {
            callback.call(that, data)
        }
    })
};
CurrencyDetailGraph.prototype.initCharts = function (seriesData) {
    var that = this;
    Highcharts.setOptions({
        global: {useUTC: false},
        lang: {
            downloadJPEG: "下载jpg",
            downloadPDF: "下载pdf",
            downloadPNG: "下载png",
            downloadSVG: "下载svg",
            loading: "",
            months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            printChart: "打印图表",
            shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            rangeSelectorFrom: "从",
            rangeSelectorTo: "到",
            rangeSelectorZoom: "缩放",
            resetZoom: "恢复初始缩放等级",
            resetZoomTitle: " 1:1缩放等级",
            shortWeekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            numericSymbols: ["千", "百万", "十亿"],
            thousandsSep: ","
        }
    });
    var titleName = $("#coinname").val();
    $("#" + that.graphId).highcharts("StockChart", {
        chart: {
            type: "line",
            zoomType: is_mobile() ? "null" : "x",
            height: 520,
            ignoreHiddenSeries: true
        },
        tooltip: {shared: true, hideDelay: 50, xDateFormat: "%A, %b %d %Y, %H:%M:%S"},
        legend: {
            enabled: true,
            align: "center",
            backgroundColor: "#FFFFFF",
            borderColor: "black",
            borderWidth: 0,
            layout: "horizontal",
            verticalAlign: "bottom",
            y: 0,
            shadow: false,
            floating: false
        },
        navigator: {adaptToUpdatedData: false},
        scrollbar: {liveRedraw: false},
        title: {text: titleName + " 行情趋势图", align: "left", style: {fontSize: "24px"}},
        subtitle: {text: ""},
        rangeSelector: {
            allButtonsEnabled: true,
            buttons: [{type: "day", count: 1, text: "天"}, {type: "week", count: 1, text: "周"}, {
                type: "month",
                count: 1,
                text: "1月"
            }, {type: "month", count: 3, text: "3月"}, {type: "year", count: 1, text: "1年"}, {
                type: "ytd",
                count: 1,
                text: "今年"
            }, {type: "all", text: "所有"}],
            selected: 6,
            inputEnabled: true,
            enabled: true
        },
        xAxis: [{
            events: {
                afterSetExtremes: function (e) {
                    that.afterSetExtremes(e)
                }
            }, minRange: 24 * 3600 * 1000
        }],
        yAxis: [{
            labels: {
                formatter: function () {
                    return "$" + this.axis.defaultLabelFormatter.call(this)
                }, align: "right", style: {color: "#7cb5ec"}
            },
            title: {text: "市值", style: {color: "#7cb5ec", "font-weight": "bold"}},
            showEmpty: false,
            height: "80%",
            opposite: false,
            floor: 0
        }, {
            labels: {formatter: label_format_fiat, style: {color: "#009933",}, align: "left", x: 15},
            title: {text: "价格 (美元)", style: {color: "#009933", "font-weight": "bold"}},
            showEmpty: false,
            height: "80%",
            opposite: true,
            floor: 0
        }, {
            labels: {formatter: label_format_crypto, style: {color: "#f7931a",}, align: "left", x: 15},
            title: {text: "价格 (BTC)", style: {color: "#f7931a", "font-weight": "bold"}},
            showEmpty: false,
            height: "80%",
            opposite: true,
            floor: 0
        }, {
            labels: {align: "right", style: {color: "#777",}},
            title: {text: "24h 成交量", style: {color: "#777", "font-weight": "bold"}},
            showEmpty: false,
            top: "80%",
            height: "20%",
            offset: 2,
            lineWidth: 1,
            opposite: false
        }],
        series: [{
            name: "市值",
            color: "#7cb5ec",
            tooltip: {pointFormatter: tooltip_format_market_cap},
            data: seriesData["market_cap_by_available_supply"],
            visible: series_is_visible(this.chartName, 0, true),
            dataGrouping: {enabled: false}
        }, {
            name: "价格 (美元)",
            yAxis: 1,
            color: "#009933",
            tooltip: {pointFormatter: tooltip_format_fiat},
            data: seriesData["price_usd"],
            visible: series_is_visible(this.chartName, 1, (!is_altcoin(this.slug) || !is_mobile())),
            dataGrouping: {enabled: false}
        }, {
            name: "价格 (BTC)",
            color: "#f7931a",
            yAxis: 2,
            tooltip: {pointFormatter: tooltip_format_crypto},
            data: seriesData["price_btc"],
            visible: series_is_visible(this.chartName, 2, is_altcoin(this.slug)),
            dataGrouping: {enabled: false}
        }, {
            type: "column",
            name: "24h 成交量",
            color: "#777",
            yAxis: 3,
            tooltip: {pointFormatter: tooltip_format_market_cap},
            data: seriesData["vol_usd"],
            visible: series_is_visible(this.chartName, 3, true),
            dataGrouping: {approximation: "average", enabled: false}
        }],
        plotOptions: {
            series: {
                events: {
                    legendItemClick: function (event) {
                        var index = event.target.index;
                        save_preferences(that.chartName, index, this.chart)
                    }
                }
            }
        },
    });
    that.hideLoading()
};
$(document).ready(function () {
    $(function () {
        var hash = window.location.hash;
        if (!hash) {
            hash = "#trendgraph"
        }
        if (hash.indexOf("#markets") > -1 || hash.indexOf("#marketticker") > -1) {
            hash = "#markets"
        }
        var currencyDetailGraph = new CurrencyDetailGraph("highcharts-graph", "highcharts-loading", "highcharts-nodata");
        if (hash == "#trendgraph" && !currencyDetailGraph.chartsLoaded()) {
            currencyDetailGraph.init()
        }
        $(".tabTit2 .tit a").click(function () {
            var box = $(this).closest(".box").find(".tabBody");
            var index = $(this).closest(".tit").index();
            if (box.eq(index).css("display") !== "block") {
                $(this).closest(".tabTit2").find(".tit").removeClass("active");
                $(this).closest(".tit").addClass("active");
                box.css("display", "none");
                box.eq(index).fadeIn("100")
            }
            if (this.hash == "#trendgraph" && !currencyDetailGraph.chartsLoaded()) {
                currencyDetailGraph.init()
            }
        });
        if (hash.length > 0) {
            $('.tabTit2 .tit a[href="' + hash + '"]').trigger("click")
        }
    })
});