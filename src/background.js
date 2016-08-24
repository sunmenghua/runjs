chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action === 'test') {
        var code = getScript();
        executeScript(sender.tab.id, code, function () {
            console.log('run done');
        });
    }
    sendResponse({result: 'ok'});
});

function getScript(url) {
    return '$("#s_upfunc_menus").hide();';
}

function executeScript(tabId, code, callback) {
    chrome.tabs.executeScript(tabId, {code: code}, callback);
}
