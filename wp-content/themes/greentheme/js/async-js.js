function getCookieYesConsentCategories() {
    const cookie = document.cookie.split('; ')
        .find(row => row.startsWith('cookieyes-consent='));
    if (!cookie) return {};

    const value = decodeURIComponent(cookie.split('=')[1]);
    const parts = value.split(',');
    const consent = {};
    parts.forEach(part => {
        const [key, val] = part.split(':');
        consent[key] = val === 'yes';
    });
    return consent;
}

// Създава script таг
function createScript(src) {
    const s = document.createElement('script');
    s.type = "text/javascript";
    s.async = true;
    s.src = src;
    return s;
}

// Категории
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

// Зареждане на GTM
function insertGTMscript() {
    const script = document.createElement('script');
    script.text = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
        "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
        "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
        "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
        "})(window,document,'script','dataLayer','GTM-MSK9ZKQV');";
    document.head.appendChild(script);
}

function insertGTMiframe() {
    const iframe = document.createElement('iframe');
    iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-MSK9ZKQV";
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    document.body.insertBefore(iframe, document.body.firstChild);
}

// Основна логика
function loadScriptsBasedOnConsent() {
    const consent = getCookieYesConsentCategories();

    if (consent.analytics) {
        insertGTMscript();
        insertGTMiframe();
    }

    Object.entries(scriptsByCategory).forEach(([category, scripts]) => {
        if (consent[category]) {
            scripts.forEach(script => {
                if (category === "social") {
                    document.body.appendChild(script);
                } else {
                    document.head.appendChild(script);
                }
            });
        }
    });
}

// Изпълни след зареждане на страницата
window.addEventListener('load', function () {
    setTimeout(loadScriptsBasedOnConsent, 1000);
});