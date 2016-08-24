var add = {
    getScript: function () {
        var $script = $(".script");
        return {
            id: Date.now(),
            pattern: $script.find("input[name=pattern]").val(),
            code: $script.find("textarea[name=code]").val(),
        }
    },
};

$(document).ready(function () {
    var url = getUrlParams('url');
    if (url) {
        $("input[name=pattern]").val(url);
    }
    $(".add").click(function () {
        var script = add.getScript();
        common.addScript(script, function () {
            location.href = "options.html";
        });
    });
});
