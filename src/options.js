var options = {
    getScripts: function () {
        var scripts = [];
        var $scripts = $(".script");
        $scripts.each(function (index, script) {
            var $script = $(script);
            scripts.push({
                id: $script.find("input[name=id]").val(),
                pattern: $script.find("input[name=pattern]").val(),
                code: $script.find("textarea[name=code]").val(),
            })
        });
        return scripts;
    },
    renderScripts: function (scripts) {
        var html = '';
        scripts.forEach(function (script) {
            html += '<div class="form-horizontal script">'
                 +      '<input type="hidden" name="id" value="' + script.id + '">'
                 +      '<div class="form-group">'
                 +          '<label class="col-sm-1 control-label">Pattern</label>'
                 +          '<div class="col-sm-5">'
                 +              '<input type="text" name="pattern" class="form-control" value="' + script.pattern + '">'
                 +          '</div>'
                 +          '<span class="glyphicon glyphicon-remove remove"></span>'
                 +      '</div>'
                 +      '<div class="form-group">'
                 +          '<label class="col-sm-1 control-label sr-only">Script</label>'
                 +          '<div class="col-sm-8">'
                 +              '<textarea name="code" class="form-control" rows="3">' + script.code + '</textarea>'
                 +          '</div>'
                 +      '</div>'
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
    chrome.storage.local.get('scripts', function (data) {
        options.renderScripts(data.scripts || []);
    });

    $(".save").click(function () {
        var scripts = options.getScripts();
        common.saveScripts(scripts, function () {
            console.log('save success');
        })
    });

    $(".scripts").on('click', '.remove', function () {
        var $script = $(this).parents('.script');
        var id = $script.find("input[name=id]").val();
        common.removeScript(id, function () {
            $script.remove();
            if ($(".script").length === 0) {
                $(".save-row").hide();
                $(".empty").show();
            }
        });
    });
});
