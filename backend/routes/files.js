const express = require("express");
const router = express.Router();
require("dotenv").config();
const { nanoid } = require("nanoid");
const Files = require("../models/filesModel");
const isAuthenticated = require("../middlewares/authJwt");
const hashing = require("../utils/hashing");
const base = process.env.base_url;
const filesUpload = require("../utils/fileUploads");
const File = require("../models/filesModel");
router.post("/upload", isAuthenticated, filesUpload, async (req, res) => {
  try {
    console.log("first");
    if (req.file == undefined) {
      return res.json({ message: `You must select a file.` });
    }
    const fileType = req.file.mimetype;
    const fileId = hashing();
    const shortUrl = `${base}/${fileId}`;
    const fileData = {
      fileId: fileId,
      file: req.file.buffer,
      shortUrl,
      fileType,
      createdBy: req.user._id,
    };
    const createFile = await new Files(fileData).save();

    res.status(200).json({ message: "success", url: shortUrl });
  } catch (error) {
    res.status(500).json({ message: `Server Error + ${error}` });
  }
});


router.delete("/:fileId", isAuthenticated, async (req, res) => {
  try {
    const deletedFile = await Files.findByIdAndDelete(req.params.fileId);
    if (!deletedFile) {
      return res.status(404).json({ message: "File not found" });
    }
    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: `Server Error + ${error.message}` });
  }
});

module.exports = router;
