(function($) {
    $(".btn").click(function() {
        $("#nav").toggleClass("toggle");
    });
    $(window).resize(function() {
        if ($(window).width() > 900) {
            $('#nav').removeClass("toggle");
        }
    });
    $(window).load(function() {
        $(".tagcloud").mCustomScrollbar({
            autoHideScrollbar: true,
            theme: "dark"
        });
    });
    $('#book-cover .book-cover').hover(function() {
        $(".cover-title", this).slideToggle('200');
    });
    $(window).resize(function() {
        if ($(window).width() > 900) {
            $('#nav').removeClass("toggle");
        }
        $('.cover-title').removeAttr("style");
    });
})(jQuery);