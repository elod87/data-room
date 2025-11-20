const multer = require("multer");
const path = require("path");
const FileSystem = require("../models/FileSystem.model");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store files in user-specific directory
    const userId = req.userId; // From auth middleware
    let uploadPath = path.join(__dirname, "../../public/uploads", userId);

    if (req.body.parentId) {
      try {
        const parentFolder = FileSystem.findByIdAndUserId(req.body.parentId, userId);
        if (!parentFolder || !parentFolder.isDirectory) {
          return cb(new Error("Invalid parentId!"), false);
        }
        uploadPath = path.join(__dirname, "../../public/uploads", userId, parentFolder.path);
      } catch (error) {
        return cb(error, false);
      }
    }

    const fullFilePath = path.join(uploadPath, file.originalname);
    if (fs.existsSync(fullFilePath)) {
      return cb(new multer.MulterError("File already exists!", file), false);
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
