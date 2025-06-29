(function() {
    // 1. Зареждане на CookieYes скрипта
    function loadCookieYes(callback) {
        const script = document.createElement("script");
        script.id = "cookieyes";
        script.type = "text/javascript";
        script.src = "https://cdn-cookieyes.com/client_data/48089ea18522c94f7a3cc421/script.js";
        script.async = true;
        script.onload = callback;
        document.head.appendChild(script);
    }

    // 2. Четене на бисквитка
    function getCookie(name) {
        const value = document.cookie.split('; ').find(row => row.startsWith(name + '='));
        return value ? decodeURIComponent(value.split('=')[1]) : null;
    }

    // 3. Извличане на съгласие от cookieyes-consent
    function getConsentCategories() {
        const cookie = getCookie("cookieyes-consent");
        if (!cookie) return null;

        const categories = {};
        cookie.split(',').forEach(part => {
            const [key, value] = part.split(':');
            if (key && value && !['consentid', 'consent', 'action'].includes(key)) {
                categories[key.trim()] = value.trim() === 'yes';
            }
        });

        return categories;
    }

    // 4. Utility: създаване на скриптове
    function createScript(src) {
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = src;
        return s;
    }

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

    // 5. GTM
    function insertGTMscript() {
        const script = document.createElement('script');
        script.async = true;
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

    // 6. Зареждане на скриптове според съгласие
    function loadScriptsBasedOnConsent() {
        const categories = getConsentCategories();
        if (!categories) return;

        if (categories.analytics) {
            insertGTMscript();
            insertGTMiframe();
        }

        Object.entries(scriptsByCategory).forEach(([category, scripts]) => {
            if (categories[category]) {
                scripts.forEach(script => {
                    const target = category === "social" ? document.body : document.head;
                    target.appendChild(script);
                });
            }
        });
    }

    // 7. Изчакване DOM и зареждане на CookieYes
    window.addEventListener("load", function () {
        loadCookieYes(() => {
            // Първоначално изчакваме за наличието на бисквитка
            setTimeout(loadScriptsBasedOnConsent, 1000);

            // Слушаме промяна на съгласието
            window.addEventListener("cookieyes_consent_update", function () {
                loadScriptsBasedOnConsent();
            });
        });
    });
})();
