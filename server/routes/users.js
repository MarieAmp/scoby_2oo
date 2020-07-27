const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fileUploader = require("../config/cloudinary");
const bcrypt = require("bcrypt");

const salt = 10;

router.patch("/me", fileUploader.single("profileImg"), (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  User.findOne({ email })
    .then((userDocument) => {
      if (userDocument) {
        return res.status(400).json({ message: "Email already taken" });
      }

      try {
        // hashSync can fail, we have to wrap the hashing in a try/catch block.
        const hashedPassword = bcrypt.hashSync(password, salt);
        const updatedUser = {
          email,
          lastName,
          firstName,
          password: hashedPassword,
          phoneNumber,
        };
        if (req.file) updatedUser.profileImg = req.file.secure_url;

        User.findByIdAndUpdate(req.session.currentUser._id, updatedUser, {new: true}).then(
          (updatedUser) => {
            const userObj = updatedUser.toObject();
            delete userObj.password;
            req.session.currentUser = userObj;
            res.status(200).json(userObj);
          }
        );
      } catch (error) {
        res.status(500).json(error);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
