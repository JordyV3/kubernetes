"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _path = _interopRequireDefault(require("path"));

var _index = _interopRequireDefault(require("./routes/index.routes"));

var _images = _interopRequireDefault(require("./routes/images.routes"));

require("./database");

var app = (0, _express.default)();
app.use((0, _expressFileupload.default)({
  tempFileDir: "/temp" // put temp directory path here

}));
app.set("port", 4000);
app.use(_index.default);
app.use(_images.default);
app.use(_express.default.static(_path.default.join(__dirname, "public")));
app.use("/uploads", _express.default.static(_path.default.join(__dirname, "../uploads")));
app.listen(app.get("port"));
console.log("Server on port 4000");