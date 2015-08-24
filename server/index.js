// Dependencies
var Path = require("path")
  , Formidable = require("formidable")
  , Fs = require("fs")
  ;

const SERVICE_PROJECTS = process.env.ENGINE_APPS || Ul.home() + "/engine_repos";

exports.upload = function (stream) {
    var self = this;

    // check if module was configured correctly
    if (!self._config.upload_dir) {
        return stream.end(400, "The upload directory was not configured");
    }

    var uploadDir = engine.repo + self._config.upload_dir;
    var form = new Formidable.IncomingForm({
        uploadDir: uploadDir
    });

    // parse the request
    form.parse(stream.context.req, function (err, fields, files) {

        if (!files.file) {
            return stream.write("File is missing");
        }

        Fs.rename(files.file.path, uploadDir + "/" + files.file.name, function (err) {

            if (err) {
                return stream.write(err);
            }

            stream.end(200, {"content-type": "text/plain"});
        });
    });
};

exports.setProject = function (stream) {
    var self = this;
    stream.data(function (data) {

        // check if module was configured correctly
        if (!self._config.upload_dir) {
            return stream.write("The upload directory was not configured");
        }

        // validate data
        if (!data || !data.project) { return link.end(new Error("Missing the project value.")); }

        self.upload_dir = Path.normalize(SERVICE_PROJECTS + "/" + data.project + self._config.upload_dir);
        link.end(null, null);
    });
};