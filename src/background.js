function getScripts (url, callback) {
    chrome.storage.local.get('scripts', function (data) {
        var scripts = data.scripts || [];
        if (url) {
            scripts = scripts.filter(function (script) {
               return url.match(script.pattern);
            });
        }
        callback && callback(scripts);
    });
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action === 'test') {
        getScripts(sender.tab.url, function (scripts) {
            scripts.forEach(function (script) {
                executeScript(sender.tab.id, script.code, function () {
                    console.log('tab[' + sender.tab.id + '] run script[' + script.id + ']');
                    console.log(script.pattern);
                    console.log(script.code);
                });
            });
            sendResponse('RunJS ran!');
        });
    }
});

function getScript(url) {
    return '$("#s_upfunc_menus").hide();';
}

function executeScript(tabId, code, callback) {
    chrome.tabs.executeScript(tabId, {code: code}, callback);
}
