function createScript(src){
        var element = document.createElement("script");
        element.type = "text/javascript";
        element.async = "async";
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
        createScript("https://dvatabuka.site/wp-content/themes/greentheme/js/services.js")
];

function appendFb(items){
        items.forEach(function(item){
                document.body.appendChild(item);
        });
};

var fb = [
        createScript("https://dvatabuka.site/wp-content/themes/greentheme/js/fb-min.js")
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