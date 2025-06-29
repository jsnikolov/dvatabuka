// 1. CookieYes
function createCookieYesScript(src) {
    var element = document.createElement("script");
    element.id = "cookieyes";
    element.type = "text/javascript";
    element.src = src;
    element.async = true;
    return element;
}
document.head.appendChild(createCookieYesScript("https://cdn-cookieyes.com/client_data/48089ea18522c94f7a3cc421/script.js"));

// 2. Utility
function createScript(src) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = src;
    return s;
}

// 3. Категоризирани скриптове
const scriptsByCategory = {
    analytics: [
        createScript("https://www.googletagmanager.com/gtag/js?id=UA-58102164-1"),
        createScript("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js")
    ],
    social: [
        createScript(window.location.origin + "/wp-content/themes/greentheme/js/fb-min.js")
    ],
    functional: [
        createScript(window.location.origin + "/wp-content/themes/greentheme/js/services.js")
    ]
};

// 4. GTM
function insertGTMscript() {
    var script = document.createElement('script');
    script.async = true;
    script.text = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
        "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
        "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
        "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
        "})(window,document,'script','dataLayer','GTM-MSK9ZKQV');";
    document.head.appendChild(script);
}
function insertGTMiframe() {
    var iframe = document.createElement('iframe');
    iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-MSK9ZKQV";
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    document.body.insertBefore(iframe, document.body.firstChild);
}

// 5. Инициализация на gtag след зареждане
function initializeAnalytics() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'UA-58102164-1');
}

// 6. Зареждане на скриптове според съгласие
function loadScriptsBasedOnConsent() {
    const consent = window.CookieYes?.getUserConsent?.();
    if (!consent) return;

    // GTM
    if (consent.analytics) {
        insertGTMscript();
        insertGTMiframe();
    }

    // По категории
    Object.entries(scriptsByCategory).forEach(([category, scripts]) => {
        if (consent[category]) {
            scripts.forEach(script => {
                if (category === "social") {
                    document.body.appendChild(script);
                } else {
                    document.head.appendChild(script);
                }
            });

            // Специално за analytics – инициализация на gtag
            if (category === "analytics") {
                // Изчакваме да се зареди скриптът, после инициализираме
                setTimeout(initializeAnalytics, 1000);
            }
        }
    });
}

// 7. Изчакване след DOM + реакция на промяна на съгласие
window.addEventListener('load', function () {
    setTimeout(loadScriptsBasedOnConsent, 800);
});
window.addEventListener('cookieyes_consent_update', loadScriptsBasedOnConsent);