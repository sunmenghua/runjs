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

function executeScript(tabId, code, callback) {
    chrome.tabs.executeScript(tabId, {code: code}, callback);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action === 'run') {
        getScripts(sender.tab.url, function (scripts) {
            scripts.forEach(function (script) {
                executeScript(sender.tab.id, script.code, function () {
                    console.log('tab[' + sender.tab.id + '] ran script[' + script.id + ']');
                });
            });
            sendResponse('RunJS ran!');
        });
    }
});
