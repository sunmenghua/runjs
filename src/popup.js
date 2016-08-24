var popup = {
    renderScripts: function (scripts) {
        var html = '';
        scripts.forEach(function (script) {
            html += '<div class="checkbox script">'
                 +      '<input type="hidden" name="id" value="' + script.id + '">'
                 +      '<label><input type="checkbox">' + script.pattern + '</label>'
                 +      '<a href="options.html" target="_bank"><span class="glyphicon glyphicon-cog pull-right"></span></a>'
                 +      '<pre>' + script.code + '</pre>'
                 +  '</div>';
        });

        if (html) {
            $(".scripts").html(html).show();
            $(".save-row").show();
        } else {
            $(".empty").show();
        }
    },
};

$(document).ready(function () {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        var url = tabs[0].url;
        common.getScripts(url, function (scripts) {
            popup.renderScripts(scripts);
        });
        $(".add-script").attr('href', 'add.html?url=' + escape(url));
    });
});
