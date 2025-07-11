const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
// const authAdmin = require('../middleware/authAdmin');
const fs = require("fs");
const UserModel = require("../models/Usermodel");

// we will upload image cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload image only admin can use
router.post("/uploadimage", auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found." });
    // Check if the user is authorized to upload images
    const file = req.files?.file;

    if (!file) return res.status(400).json({ msg: "No file uploaded" });
    // if (file.size > 1024 * 1024) {
    //   removeTmp(file.tempFilePath);
    //   return res.status(400).json({ msg: "Size too large." });
    // }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File format is incorrect." });
    }
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "Go_Food",
    });

    // Save image URL to user document
    const updatedUser = await UserModel.findByIdAndUpdate(
      user,
      { profilePicture: result.secure_url },
      { new: true }
    );

    res.json({
      msg: "Uploaded successfully",
      url: result.secure_url,
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
  //   try {
  //     if (!req.files || Object.keys(req.files).length === 0)
  //       return res.status(500).json({ msg: 'No files were uploaded.' });

  //     const file = req.files.file;
  //     if (file.size > 1024 * 1024) {
  //       removeTmp(file.tempFilePath);
  //       return res.status(400).json({ msg: 'Size too large.' });
  //     }

  //     if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
  //       removeTmp(file.tempFilePath);
  //       return res.status(400).json({ msg: 'File format is incorrect.' });
  //     }

  //     cloudinary.v2.uploader.upload(
  //       file.tempFilePath,
  //       { folder: 'Go_Food' },
  //       async (err, result) => {
  //         if (err) throw err;

  //         removeTmp(file.tempFilePath);
  //         res.json({ url: result.secure_url });
  //         // res.json({ public_id: result.public_id, url: result.secure_url });
  //       }
  //     );
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
});

// Delete Image only admin can use
router.post("/destroy", auth, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No images selected." });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json({ msg: "Deleted image." });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
