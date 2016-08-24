var edit = {
    getScript: function () {
        var $script = $(".script");
        return {
            id: $script.find("input[name=id]").val(),
            pattern: $script.find("input[name=pattern]").val(),
            code: $script.find("textarea[name=code]").val(),
        }
    },
};

$(document).ready(function () {
    var params = getUrlParams();
    if (params.id) {
        common.getScripts(params, function (scripts) {
            if (scripts) {
                $("input[name=id]").val(scripts[0].id);
                $("input[name=pattern]").val(scripts[0].pattern);
                $("textarea[name=code]").val(scripts[0].code);
            }
        });
    } else if (params.url) {
        $("input[name=pattern]").val(params.url);
    }

    $(".edit").click(function () {
        var script = edit.getScript();
        if (script.id) {
            common.editScript(script, function () {
                location.href = "options.html";
            });
        } else {
            script.id = Date.now();
            common.addScript(script, function () {
                location.href = "options.html";
            });
        }
    });
});
