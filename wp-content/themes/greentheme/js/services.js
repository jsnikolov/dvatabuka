/**
 *  AdSense
 *  Google Analytics
 */
//function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","UA-58102164-1");

/**
 * AdSense
 * Greentheme JS Functions
 */
/*
!function(o){o(".btn").click(function(){o("#nav").toggleClass("toggle")}),o("#book-cover .book-cover").hover(function(){o(".cover-title",this).slideToggle("200")}),o(window).resize(function(){o(window).width()>900&&o("#nav").removeClass("toggle"),o(".cover-title").removeAttr("style")}),o(".adsbygoogle").each(function(){(adsbygoogle=window.adsbygoogle||[]).push({})})}(jQuery);
*/

!function(o) {
  o(".btn").click(function() {
    o("#nav").toggleClass("toggle");
  });

  o("#book-cover .book-cover").hover(function() {
    o(".cover-title", this).slideToggle("200");
  });

  o(window).resize(function() {
    o(window).width() > 900 && o("#nav").removeClass("toggle");
    o(".cover-title").removeAttr("style");
  });

  function initAds() {
    if (typeof adsbygoogle === "undefined") {
      setTimeout(initAds, 100);
      return;
    }
    o(".adsbygoogle").each(function() {
      (adsbygoogle = window.adsbygoogle || []).push({});
    });
  }

  initAds();
}(jQuery);

