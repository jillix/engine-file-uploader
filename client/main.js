var $ = require("/jquery");
var Dropzone = require("./libs/dropzone");

exports.load = function (data) {
    var self = this;
    var config = self._config;

    // get containers
    var $zone = $(config.ui.zone);
    var $previews = $(config.ui.previews);
    var $clickable = $(config.ui.clickable);

    // if no containers found return;
    if (!$zone.length) {
        return;
    }

    // add dropzone class to containers (in order for the dropzone css to work)
    if(!$zone.hasClass("dropzone")) {
        $zone.addClass("dropzone");
    }
    if ($previews.length && !$previews.hasClass("dropzone")) {
        $previews.addClass("dropzone");
    }
    if ($clickable.length && !$clickable.hasClass("dropzone")) {
        $clickable.addClass("dropzone");
    }

    // init dropzone
    self.dz = new Dropzone($zone.get(0), {
        url: ["/@", self._name, "upload"].join("/"),
        clickable: $clickable.get(0) || true,
        previewsContainer: $previews.get(0)
    });

    $previews.hide();

    self.dz.on("success", function () {
        setTimeout(function() {
            $previews.fadeOut();
        }, 1000);
    });

    self.dz.on("sending", function () {
        $previews.fadeIn();
    });
};
