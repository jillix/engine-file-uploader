var $ = require("/jquery");

exports.setProject = function (_, data) {
    this.link("setProject").send(null, data);
};

exports.init = function () {
    var config = this._config;

    var $zone = $(config.ui.zone);
    var $previews = $(config.ui.previews);
    var $clickable = $(config.ui.clickable);

    this.dz = new Dropzone($zone.get(0), {
        url: ["/@", this._name, "upload"].join("/"),
        previewsContainer: $previews.get(0),
        clickable: $clickable.get(0)
    });

    $previews.hide();

    this.dz.on("success", function () {
        setTimeout(function() {
            $previews.fadeOut();
        }, 1000);
    });
};
