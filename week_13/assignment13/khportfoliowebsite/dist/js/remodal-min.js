! function(t, n) {
    "function" == typeof define && define.amd ? define(["jquery"], function($) {
        return n(t, $)
    }) : "object" == typeof exports ? n(t, require("jquery")) : n(t, t.jQuery || t.Zepto)
}(this, function(t, $) {
    "use strict";

    function n(t) {
        if (O && "none" === t.css("animation-name") && "none" === t.css("-webkit-animation-name") && "none" === t.css("-moz-animation-name") && "none" === t.css("-o-animation-name") && "none" === t.css("-ms-animation-name")) return 0;
        var n = t.css("animation-duration") || t.css("-webkit-animation-duration") || t.css("-moz-animation-duration") || t.css("-o-animation-duration") || t.css("-ms-animation-duration") || "0s",
            a = t.css("animation-delay") || t.css("-webkit-animation-delay") || t.css("-moz-animation-delay") || t.css("-o-animation-delay") || t.css("-ms-animation-delay") || "0s",
            e = t.css("animation-iteration-count") || t.css("-webkit-animation-iteration-count") || t.css("-moz-animation-iteration-count") || t.css("-o-animation-iteration-count") || t.css("-ms-animation-iteration-count") || "1",
            i, o, s, r;
        for (n = n.split(", "), a = a.split(", "), e = e.split(", "), r = 0, o = n.length, i = Number.NEGATIVE_INFINITY; o > r; r++) s = parseFloat(n[r]) * parseInt(e[r], 10) + parseFloat(a[r]), s > i && (i = s);
        return s
    }

    function a() {
        if ($(document.body).height() <= $(window).height()) return 0;
        var t = document.createElement("div"),
            n = document.createElement("div"),
            a, e;
        return t.style.visibility = "hidden", t.style.width = "100px", document.body.appendChild(t), a = t.offsetWidth, t.style.overflow = "scroll", n.style.width = "100%", t.appendChild(n), e = n.offsetWidth, t.parentNode.removeChild(t), a - e
    }

    function e() {
        if (!N) {
            var t = $("body"),
                n = "noscroll",
                e, i;
            t.hasClass(n) || (i = $(document.body), e = parseInt(i.css("padding-right"), 10) + a(), i.css("padding-right", e + "px"), t.addClass(n))
        }
    }

    function i() {
        if (!N) {
            var t = $("body"),
                n = "noscroll",
                e, i;
            t.hasClass(n) && (i = $(document.body), e = parseInt(i.css("padding-right"), 10) - a(), i.css("padding-right", e + "px"), t.removeClass(n))
        }
    }

    function o(t, n, a, e) {
        var i = d("is", n),
            o = [d("is", v.CLOSING), d("is", v.OPENING), d("is", v.CLOSED), d("is", v.OPENED)].join(" ");
        t.$bg.removeClass(o).addClass(i), t.$overlay.removeClass(o).addClass(i), t.$wrapper.removeClass(o).addClass(i), t.$modal.removeClass(o).addClass(i), t.state = n, !a && t.$modal.trigger({
            type: n,
            reason: e
        }, [{
            reason: e
        }])
    }

    function s(t, a, e) {
        var i = 0,
            o = function(t) {
                t.target === this && i++
            },
            s = function(t) {
                t.target === this && 0 === --i && ($.each(["$bg", "$overlay", "$wrapper", "$modal"], function(t, n) {
                    e[n].off(f + " " + g)
                }), a())
            };
        $.each(["$bg", "$overlay", "$wrapper", "$modal"], function(t, n) {
            e[n].on(f, o).on(g, s)
        }), t(), 0 === n(e.$bg) && 0 === n(e.$overlay) && 0 === n(e.$wrapper) && 0 === n(e.$modal) && ($.each(["$bg", "$overlay", "$wrapper", "$modal"], function(t, n) {
            e[n].off(f + " " + g)
        }), a())
    }

    function r(t) {
        t.state !== v.CLOSED && ($.each(["$bg", "$overlay", "$wrapper", "$modal"], function(n, a) {
            t[a].off(f + " " + g)
        }), t.$bg.removeClass(t.settings.modifier), t.$overlay.removeClass(t.settings.modifier).hide(), t.$wrapper.hide(), i(), o(t, v.CLOSED, !0))
    }

    function c(t) {
        var n = {},
            a, e, i, o;
        for (t = t.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ","), a = t.split(","), o = 0, e = a.length; e > o; o++) a[o] = a[o].split(":"), i = a[o][1], ("string" == typeof i || i instanceof String) && (i = "true" === i || ("false" === i ? !1 : i)), ("string" == typeof i || i instanceof String) && (i = isNaN(i) ? i : +i), n[a[o][0]] = i;
        return n
    }

    function d() {
        for (var t = u, n = 0; n < arguments.length; ++n) t += "-" + arguments[n];
        return t
    }

    function l() {
        var t = location.hash.replace("#", ""),
            n, a;
        if (t) {
            try {
                a = $("[data-" + p + '-id="' + t + '"]')
            } catch (e) {}
            a && a.length && (n = $[p].lookup[a.data(p)], n && n.settings.hashTracking && n.open())
        } else y && y.state === v.OPENED && y.settings.hashTracking && y.close()
    }

    function m(t, n) {
        var a = $(document.body),
            e = this;
        e.settings = $.extend({}, h, n), e.index = $[p].lookup.push(e) - 1, e.state = v.CLOSED, e.$overlay = $("." + d("overlay")), e.$bg = $("." + d("bg")).addClass(d("is", v.CLOSED)), e.$modal = t.addClass(u + " " + d("is-initialized") + " " + e.settings.modifier + " " + d("is", v.CLOSED)).attr("tabindex", "-1"), e.$wrapper = $("<div>").addClass(d("wrapper") + " " + e.settings.modifier + " " + d("is", v.CLOSED)).hide().append(e.$modal), a.append(e.$wrapper), e.$wrapper.on("click." + u, "[data-" + p + '-action="close"]', function(t) {
            t.preventDefault(), e.close()
        }), e.$wrapper.on("click." + u, "[data-" + p + '-action="cancel"]', function(t) {
            t.preventDefault(), e.$modal.trigger(C.CANCELLATION), e.settings.closeOnCancel && e.close(C.CANCELLATION)
        }), e.$wrapper.on("click." + u, "[data-" + p + '-action="confirm"]', function(t) {
            t.preventDefault(), e.$modal.trigger(C.CONFIRMATION), e.settings.closeOnConfirm && e.close(C.CONFIRMATION)
        }), e.$wrapper.on("click." + u, function(t) {
            var n = $(t.target);
            n.hasClass(d("wrapper")) && e.settings.closeOnOutsideClick && e.close()
        })
    }
    var p = "modal",
        u = t.REMODAL_GLOBALS && t.REMODAL_GLOBALS.NAMESPACE || p,
        f = $.map(["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"], function(t) {
            return t + "." + u
        }).join(" "),
        g = $.map(["animationend", "webkitAnimationEnd", "MSAnimationEnd", "oAnimationEnd"], function(t) {
            return t + "." + u
        }).join(" "),
        h = $.extend({
            hashTracking: !0,
            closeOnConfirm: !0,
            closeOnCancel: !0,
            closeOnEscape: !0,
            closeOnOutsideClick: !0,
            modifier: ""
        }, t.REMODAL_GLOBALS && t.REMODAL_GLOBALS.DEFAULTS),
        v = {
            CLOSING: "closing",
            CLOSED: "closed",
            OPENING: "opening",
            OPENED: "opened"
        },
        C = {
            CONFIRMATION: "confirmation",
            CANCELLATION: "cancellation"
        },
        O = function() {
            var t = document.createElement("div").style;
            return void 0 !== t.animationName || void 0 !== t.WebkitAnimationName || void 0 !== t.MozAnimationName || void 0 !== t.msAnimationName || void 0 !== t.OAnimationName
        }(),
        N = /iPad|iPhone|iPod/.test(navigator.platform),
        y, E;
    m.prototype.open = function() {
        var t = this,
            n;
        t.state !== v.OPENING && t.state !== v.CLOSING && (n = t.$modal.attr("data-" + p + "-id"), n && t.settings.hashTracking && (E = $(window).scrollTop(), location.hash = n), y && y !== t && r(y), y = t, e(), t.$bg.addClass(t.settings.modifier), t.$overlay.addClass(t.settings.modifier).show(), t.$wrapper.show().scrollTop(0), t.$modal.focus(), s(function() {
            o(t, v.OPENING)
        }, function() {
            o(t, v.OPENED)
        }, t))
    }, m.prototype.close = function(t) {
        var n = this;
        n.state !== v.OPENING && n.state !== v.CLOSING && (n.settings.hashTracking && n.$modal.attr("data-" + p + "-id") === location.hash.substr(1) && (location.hash = "", $(window).scrollTop(E)), s(function() {
            o(n, v.CLOSING, !1, t)
        }, function() {
            n.$bg.removeClass(n.settings.modifier), n.$overlay.removeClass(n.settings.modifier).hide(), n.$wrapper.hide(), i(), o(n, v.CLOSED, !1, t)
        }, n))
    }, m.prototype.getState = function() {
        return this.state
    }, m.prototype.destroy = function() {
        var t = $[p].lookup,
            n;
        r(this), this.$wrapper.remove(), delete t[this.index], n = $.grep(t, function(t) {
            return !!t
        }).length, 0 === n && (this.$overlay.remove(), this.$bg.removeClass(d("is", v.CLOSING) + " " + d("is", v.OPENING) + " " + d("is", v.CLOSED) + " " + d("is", v.OPENED)))
    }, $[p] = {
        lookup: []
    }, $.fn[p] = function(t) {
        var n, a;
        return this.each(function(e, i) {
            a = $(i), null == a.data(p) ? (n = new m(a, t), a.data(p, n.index), n.settings.hashTracking && a.attr("data-" + p + "-id") === location.hash.substr(1) && n.open()) : n = $[p].lookup[a.data(p)]
        }), n
    }, $(document).ready(function() {
        $(document).on("click", "[data-" + p + "-target]", function(t) {
            t.preventDefault();
            var n = t.currentTarget,
                a = n.getAttribute("data-" + p + "-target"),
                e = $("[data-" + p + '-id="' + a + '"]');
            $[p].lookup[e.data(p)].open()
        }), $(document).find("." + u).each(function(t, n) {
            var a = $(n),
                e = a.data(p + "-options");
            e ? ("string" == typeof e || e instanceof String) && (e = c(e)) : e = {}, a[p](e)
        }), $(document).on("keydown." + u, function(t) {
            y && y.settings.closeOnEscape && y.state === v.OPENED && 27 === t.keyCode && y.close()
        }), $(window).on("hashchange." + u, l)
    })
});