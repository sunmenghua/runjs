chrome.extension.sendRequest({action: 'test'}, function(response) {
    console.log(response);
});
