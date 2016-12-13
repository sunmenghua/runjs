function renderScripts(scripts) {
    var html = "";
    scripts.forEach(function (script) {
        html += '<div class="checkbox script">'
             +      '<input type="hidden" name="id" value="' + script.id + '">'
             +      '<label>'
             +          '<input type="checkbox" checked disabled>'
             +          '<a href="edit.html?id=' + script.id + '" target="_bank">' + script.pattern + '</a>'
             +      '</label>'
             +      '<pre class="pre-scrollable">' + script.code + '</pre>'
             +  '</div>';
    });

    if (html) {
        $(".scripts").html(html).show();
        $(".save-row").show();
    } else {
        $(".empty").show();
    }
}

$(document).ready(function () {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        common.getScripts({url: tabs[0].url}, function (scripts) {
            renderScripts(scripts);
        });
        $(".add-script").attr("href", "edit.html?url=" + escape(tabs[0].url));
    });
});
