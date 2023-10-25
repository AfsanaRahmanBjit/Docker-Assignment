//controller/FileController.js

const path = require("path");
const fileTypes = require("../constants/fileTypes");
const HTTP_STATUS = require("../constants/statusCodes");
const { sendResponse } = require("../util/common");
const fs = require("fs");

class FileController {
    async uploadFile(req, res, next) {
        try {
            if (!fileTypes.includes(req.file_extension)) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Only .jpg, .png, .jpeg, .txt, .pdf");
            }

            if (!req.file) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Failed to upload file");
            }

            return sendResponse(res, HTTP_STATUS.OK, "Successfully uploaded file", req.file);
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    async getFile(req, res, next) {
        try {
            const { filepath } = req.params;
            const exists = fs.existsSync(path.join(__dirname, "..", "server", filepath));

            if (!exists) {
                return sendResponse(res, HTTP_STATUS.NOT_FOUND, "File not found");
            }
            return res.status(200).sendFile(path.join(__dirname, "..", "server", filepath));
        } catch (error) {
            console.log(error);
            return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }
}

module.exports = new FileController();
