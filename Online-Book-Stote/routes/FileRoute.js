//Route/FileRoute.js
const express = require("express");
const routes = express();
const upload = require("../config/files");
const FileController = require("../controller/FileController");
const { MulterError } = require("multer");
const { sendResponse } = require("../util/common");

routes.post("/upload-file", upload.single("file_to_upload"), FileController.uploadFile);
routes.get("/get/:filepath", FileController.getFile);

module.exports = routes;
