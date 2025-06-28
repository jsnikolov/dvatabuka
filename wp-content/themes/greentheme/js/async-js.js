function createCookiebotScript(src){
        var element = document.createElement("script");
        element.id = "Cookiebot";
        element.type = "text/javascript";
        element.async = true;
        element.src = src;
        element.setAttribute("data-cbid", "b0a62c40-90c8-40aa-b666-00f253009007");
        return element;
}
document.head.appendChild(createCookiebotScript("https://consent.cookiebot.com/uc.js"));


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