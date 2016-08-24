var common = {
    getScripts: function (url, callback) {
        chrome.storage.local.get('scripts', function (data) {
            var scripts = data.scripts || [];
            if (url) {
                scripts = scripts.filter(function (script) {
                   return url.match(script.pattern);
                });
            }
            callback && callback(scripts);
        });
    },
    saveScripts: function (scripts, callback) {
        chrome.storage.local.set({scripts: scripts}, function () {
            callback && callback();
        });
    },
    addScript: function (script, callback) {
        chrome.storage.local.get('scripts', function (data) {
            var scripts = data.scripts || [];
            scripts.push(script);
            chrome.storage.local.set({scripts: scripts}, function () {
                callback && callback();
            });
        });
    },
    removeScript: function (id, callback) {
        chrome.storage.local.get('scripts', function (data) {
            var scripts = data.scripts || [];
            scripts = scripts.filter(function (script) {
                return script.id != id;
            });
            common.saveScripts(scripts, function () {
                callback && callback();
            });
        });
    },
};

function getUrlParams(key) {
    var params = [];
    var search = location.search;
    if (search.indexOf('?') === 0) {
        search = search.substr(1);
    }
    search.split('&').forEach(function (item) {
        var data = item.split('=');
        params[data[0]] = unescape(data[1]);
    });
    if (key) {
        return params[key];
    } else {
        return params;
    }
}
