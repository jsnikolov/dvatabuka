// Помощна функция за прочитане на бисквитка по име
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

// Взимаме и парсваме съгласието от cookieyes-consent
function getConsentFromCookie() {
    const cookie = getCookie('cookieyes-consent');
    if (!cookie) return null;

    try {
        return JSON.parse(cookie);
    } catch (e) {
        return null;
    }
}

// Функция за създаване на скрипт елемент
function createScript(src, async = true) {
    const s = document.createElement('script');
    s.type = "text/javascript";
    s.async = async;
    s.src = src;
    return s;
}

// Скриптове по категории
const scriptsByCategory = {
    analytics: [
        () => createScript("https://www.googletagmanager.com/gtag/js?id=UA-58102164-1"),
        () => createScript("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js")
    ],
    social: [
        () => createScript(window.location.origin + "/wp-content/themes/greentheme/js/fb-min.js")
    ],
    functional: [
        () => createScript(window.location.origin + "/wp-content/themes/greentheme/js/services.js")
    ]
};

// Зареждаме GTM скрипта и iframe, ако има consent.analytics
function insertGTM() {
    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.text = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
        "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
        "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
        "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
        "})(window,document,'script','dataLayer','GTM-MSK9ZKQV');";
    document.head.appendChild(gtmScript);

    const iframe = document.createElement('iframe');
    iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-MSK9ZKQV";
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    document.body.insertBefore(iframe, document.body.firstChild);
}

// Основна функция за зареждане според consent
function loadScriptsBasedOnConsent() {
    const consent = getConsentFromCookie();
    if (!consent) return;

    // GTM (ако има съгласие за analytics)
    if (consent.analytics) {
        insertGTM();
    }

    // Зареждаме останалите скриптове по категории
    Object.entries(scriptsByCategory).forEach(([category, scriptCreators]) => {
        if (consent[category]) {
            scriptCreators.forEach(createFn => {
                const script = createFn();
                if (category === "social") {
                    document.body.appendChild(script);
                } else {
                    document.head.appendChild(script);
                }
            });
        }
    });
}

// Изчакваме пълно зареждане на страницата
window.addEventListener('load', function () {
    // Даваме 0.8-1 секунда да се зададе бисквитката cookieyes-consent
    setTimeout(loadScriptsBasedOnConsent, 900);
});