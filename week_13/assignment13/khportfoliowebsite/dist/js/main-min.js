$(window).scroll(function() {
    function o() {
        $(".info .info-block").each(function(o) {
            var i = this;
            setTimeout(function() {
                $(i).addClass("visible")
            }, 500 * o)
        })
    }
    var i = $(window).scrollTop(),
        n = $(window).height(),
        t = $(".info").offset();
    $(".intro").css("opacity", 1 - i / 300), t.top - i <= n / 2 && o()
}), $(".intro").click(function() {
    $("html,body").animate({
        scrollTop: $(".projects").offset().top
    }, 800)
}), window.REMODAL_GLOBALS = {
    NAMESPACE: "over",
    DEFAULTS: {
        hashTracking: !1,
        closeOnOutsideClick: !1
    }
};