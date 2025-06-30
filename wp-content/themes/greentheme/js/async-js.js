(function() {
    function loadCookieYes() {
        if (document.getElementById("cookieyes")) return;
        const script = document.createElement("script");
        script.id = "cookieyes";
        script.type = "text/javascript";
        script.src = "https://cdn-cookieyes.com/client_data/48089ea18522c94f7a3cc421/script.js";
        script.async = true;
        document.head.appendChild(script);
    }

    function getCookie(name) {
        const value = document.cookie.split('; ').find(row => row.startsWith(name + '='));
        return value ? decodeURIComponent(value.split('=')[1]) : null;
    }

    function getConsentCategories() {
        const cookie = getCookie("cookieyes-consent");
        if (!cookie) return null;
        const categories = {};
        cookie.split(',').forEach(part => {
            const [key, value] = part.split(':');
            if (key && value && !['consentid', 'consent', 'action'].includes(key.trim())) {
                categories[key.trim()] = value.trim() === 'yes';
            }
        });
        return categories;
    }

    function createScript(src) {
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = src;
        return s;
    }

    const scriptsByCategory = {
        analytics: [
            "https://www.googletagmanager.com/gtag/js?id=UA-58102164-1",
            "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ],
        advertisement: [
            window.location.origin + "/wp-content/themes/greentheme/js/fb-min.js"
        ],
        functional: [
            window.location.origin + "/wp-content/themes/greentheme/js/services.js"
        ]
    };

    const addedScripts = new Set();

    function insertGTMscript() {
        if (addedScripts.has('gtm')) return;
        const script = document.createElement('script');
        script.async = true;
        script.text = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
            "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
            "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
            "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
            "})(window,document,'script','dataLayer','GTM-MSK9ZKQV');";
        document.head.appendChild(script);
        addedScripts.add('gtm');
    }

    function insertGTMiframe() {
        if (document.getElementById('gtm-iframe')) return;
        const iframe = document.createElement('iframe');
        iframe.id = 'gtm-iframe';
        iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-MSK9ZKQV";
        iframe.height = "0";
        iframe.width = "0";
        iframe.style.display = "none";
        iframe.style.visibility = "hidden";
        document.body.insertBefore(iframe, document.body.firstChild);
    }

    function loadScriptsBasedOnConsent() {
        const categories = getConsentCategories();
        if (!categories) return;

        if (categories.analytics) {
            insertGTMscript();
            insertGTMiframe();
        }

        Object.entries(scriptsByCategory).forEach(([category, urls]) => {
            if (categories[category]) {
                urls.forEach(src => {
                    if (!addedScripts.has(src)) {
                        const script = createScript(src);
                        const target = category === "advertisement" ? document.body : document.head;
                        target.appendChild(script);
                        addedScripts.add(src);
                    }
                });
            }
        });
    }

    function observeConsentChange() {
        let lastConsent = getCookie("cookieyes-consent");

        // Наблюдаваме DOM, дали банерът е премахнат => съгласие е дадено
        const observer = new MutationObserver(() => {
            const currentConsent = getCookie("cookieyes-consent");
            if (currentConsent && currentConsent !== lastConsent) {
                lastConsent = currentConsent;
                loadScriptsBasedOnConsent();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    window.addEventListener("load", function () {
        loadCookieYes();
        setTimeout(() => {
            loadScriptsBasedOnConsent();  // ако вече има съгласие
            observeConsentChange();       // ако ще бъде дадено тепърва
        }, 1000);
    });
})();
