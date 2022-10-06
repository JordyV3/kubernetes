"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)(); // eslint-disable-next-line import/no-anonymous-default-export

var _default = {
  BucketName: process.env.BUCKET_NAME || "",
  Endpoint: process.env.ENDPOINT || ""
};
exports.default = _default;