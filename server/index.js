// Dependencies
var Path = require("path")
  , Formidable = require("formidable")
  , Fs = require("fs")
  ;

// Constants
const FLOW_LINKS = {
    UPLOAD: {
        IN: "upload",
        OUT: "upload"
    },
    SET_PROJECT: {
        IN: "setProject",
        OUT: "setProject"
    }
};

exports.init = function () {
    var self = this;
    Object.keys(FLOW_LINKS).forEach(function (c) {
        self._access[FLOW_LINKS[c].IN] = true;
        self.on(FLOW_LINKS[c].IN, engine.flow(self, [{
            call: FLOW_LINKS[c].OUT
        }]));
    });
    self.upload_dir = engine.repo + self._config.upload_dir;
};

exports[FLOW_LINKS.UPLOAD.OUT] = function (link) {

    var self = this;
    var form = new Formidable.IncomingForm(
        { uploadDir: self.upload_dir }
    );

    form.parse(link.req, function (err, fields, files) {

        if (!files.file) {
            return link.end(new Error("File is missing."));
        }

        Fs.rename(files.file.path, self.upload_dir + "/" + files.file.name, function (err) {

            if (err) {
                return link.end(err);
            }

            link.end(200, files.file.name);
        });
    });
};

exports[FLOW_LINKS.SET_PROJECT.OUT] = function (link) {
    var self = this;
    link.data(function (err, data) {
        if (err) {
            return link.end(err);
        }
        if (typeof jxService === "undefined") {
            return link.end(new Error("This function is only available for jxService"));
        }

        if (!data.project) { return link.end(new Error("Missing the project value.")); }

        self.upload_dir = Path.normalize(jxService.paths.projects + "/" + data.project + self._config.upload_dir);
        link.end(null, null);
    });
};
