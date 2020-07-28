const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fileUploader = require("../config/cloudinary");
const bcrypt = require("bcrypt");

const salt = 10;

router.patch(
  "/me",
  fileUploader.single("profileImg"),
  async (req, res, next) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    let updatedUser = null;
   
    if (phoneNumber) {
      updatedUser = { phoneNumber };
    } else {
      const userDocument = await User.findOne({ email });

      if (userDocument) {
        return res.status(400).json({ message: "Email already taken" });
      } else {
        try {
          // hashSync can fail, we have to wrap the hashing in a try/catch block.
          const hashedPassword = bcrypt.hashSync(password, salt);
          updatedUser = {
            email,
            lastName,
            firstName,
            password: hashedPassword,
            phoneNumber,
          };
          if (req.file) updatedUser.profileImg = req.file.secure_url;
        } catch (error) {
          return res.status(500).json(error);
        }
      }
    }
    console.log('updateduser',updatedUser);
    User.findByIdAndUpdate(req.session.currentUser._id, updatedUser, {
      new: true,
    })
      .then((newUpdatedUser) => {
        const userObj = newUpdatedUser.toObject();
        delete userObj.password;
        req.session.currentUser = userObj;
        res.status(200).json(userObj);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
);
//     catch(error) {
//       res.status(500).json(error);
//     };
// });
// })

router.get(
  "/profile/settings",
  fileUploader.single("profileImg"),
  (req, res, next) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    User.findOne(req.session.currentUser._id)
      .then((userDocument) => {
        const userObj = userDocument.toObject();
        delete userObj.password;
        req.session.currentUser = userObj;
        res.send(userDocument);
      })

      .catch((error) => {
        res.status(500).json(error);
      });
  }
);

module.exports = router;
