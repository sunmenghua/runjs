function renderScripts(scripts) {
    var html = "";
    scripts.forEach(function (script) {
        console.log(script);
        html += '<div class="form-horizontal script">'
             +      '<input type="hidden" name="id" value="' + script.id + '">'
             +      '<div class="form-group">'
             +          '<label class="col-md-1 hidden-xs hidden-sm control-label">Pattern</label>'
             +          '<div class="col-md-10">'
             +              '<p class="form-control-static">'
             +                  script.pattern
             +                  '<a class="btn btn-link pull-right" href="edit.html?id=' + script.id + '">Edit</a>'
             +                  '<button class="btn btn-link pull-right script-del">Delete</button>'
             +              '</p>'
             +          '</div>'
             +      '</div>'
             +      '<div class="form-group">'
             +          '<div class="col-md-offset-1 col-md-10">'
             +              '<pre>' + $('<div />').text(script.code).html() + '</pre>'
             +          '</div>'
             +      '</div>'
             +      '<div class="form-group">'
             +          '<div class="col-md-offset-1 col-md-10">'
             +              '<hr>'
             +          '</div>'
             +      '</div>'
             +  '</div>';
    });

    if (html) {
        $(".scripts").html(html).show();
    } else {
        $(".empty").show();
    }
}

$(document).ready(function () {
    chrome.storage.local.get("scripts", function (data) {
        renderScripts(data.scripts || []);
    });

    $(".scripts").on("click", ".script-del", function () {
        if ( ! confirm("Confirm delete this script?")) {
            return;
        }

        var $script = $(this).parents(".script");
        var id = $script.find("input[name=id]").val();
        common.removeScript(id, function () {
            $script.remove();
            if ($(".script").length === 0) {
                $(".empty").show();
            }
        });
    });
});
