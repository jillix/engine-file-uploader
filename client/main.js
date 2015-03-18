var $ = require("/jquery");

exports.init = function () {
    var config = this._config;

    var $zone = $(config.ui.zone);
    var $previews = $(config.ui.previews);
    var $clickable = $(config.ui.clickable);

    var url = config.url;

    this.dz = new Dropzone($zone.get(0), {
        url: url || "/",
//        previewsContainer: $previews.get(0),
        clickable: $clickable.get(0)
    });

    $previews.hide();

    this.dz.on("success", function () {
        setTimeout(function() {
            $previews.fadeOut();
        }, 1000);
    });
};
