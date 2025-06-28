//  Поставете този код възможно най-високо в маркера <head> на страницата: 
//  Google Tag Manager 
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

// Когато DOM е зареден, вмъкни скрипта
window.addEventListener('DOMContentLoaded', insertGTMscript);



//  Поставете този код непосредствено след отварящия маркер <body>:
//  Google Tag Manager (noscript) -->
function insertGTMiframeIfConsent() {
    // Проверка дали CookieYes е зареден
    if (window.CookieYes && typeof CookieYes.getConsentForCategory === 'function') {
        // Проверява дали има съгласие за категория 'analytics'
        if (CookieYes.getConsentForCategory('analytics')) {
            addIframe();
        }
    }

    function addIframe() {
        var iframe = document.createElement('iframe');
        iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-MSK9ZKQV";
        iframe.height = "0";
        iframe.width = "0";
        iframe.style.display = "none";
        iframe.style.visibility = "hidden";

        if (document.body.firstChild) {
            document.body.insertBefore(iframe, document.body.firstChild);
        } else {
            document.body.appendChild(iframe);
        }
    }
}

window.addEventListener('DOMContentLoaded', function () {
    // Изчакваме CMP да се зареди (1 секунда)
    setTimeout(insertGTMiframeIfConsent, 1000);
});
//  End Google Tag Manager 


function createCookieYesScript(src) {
    var element = document.createElement("script");
    element.id = "cookieyes";
    element.type = "text/javascript";
    element.src = src;
    element.setAttribute("data-cbid", "b0a62c40-90c8-40aa-b666-00f253009007");
    return element;
}
document.head.appendChild(createCookieYesScript("https://cdn-cookieyes.com/client_data/48089ea18522c94f7a3cc421/script.js"));



function createScript(src){
        var element = document.createElement("script");
        element.type = "text/javascript";
        element.async = true;
        element.src = src;
        return element;
}

function appendScript(items){
        items.forEach(function(item){
                document.head.appendChild(item);
        });
};

var scripts = [
        createScript("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"),
        createScript("https://www.googletagmanager.com/gtag/js?id=UA-58102164-1"),
        createScript(window.location.origin + "/wp-content/themes/greentheme/js/services.js")
];

function appendFb(items){
        items.forEach(function(item){
                document.body.appendChild(item);
        });
};

var fb = [
        createScript(window.location.origin + "/wp-content/themes/greentheme/js/fb-min.js")
];

function dbLoad(){
    appendScript(scripts);
    appendFb(fb);
}

if (window.addEventListener){
    window.addEventListener("load", dbLoad(), false);
}
else if (window.attachEvent){
    window.attachEvent("onload", dbLoad());
}
else {
    window.onload = dbLoad();
}