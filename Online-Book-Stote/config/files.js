//config/files.js

const multer = require("multer");
const fileTypes = require("../constants/fileTypes");
const path = require("path");

const upload = multer({
    limits: {
        fileSize: 536870912,
    },
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            if (file) {
                callback(null, "./server/images");
            } else {
                req.file.error = "No file was found";
                callback("No file was found", null);
            }
        },
        filename: (req, file, callback) => {
            if (file) {
                callback(null, Date.now() + "_" + file.originalname);
            } else {
                callback("No file was found", null);
            }
        },
    }),
    fileFilter: (req, file, callback) => {
        if (file) {
            const extension = path.extname(file.originalname);
            req.file_extension = extension;
            if (fileTypes.includes(extension)) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        } else {
            callback("No file found", false);
        }
    },
});

module.exports = upload;
