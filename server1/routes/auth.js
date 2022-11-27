const router = require("express").Router();
const admin = require("../config/firebase.config");
const user = require("../models/user");
router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(500).json({ message: "Un authorized" });
    } else {
      // check user exits
      const userExists = await user.findOne({ user_id: decodeValue.user_id });
      if (!userExists) {
        newUserData(decodeValue, req, res);
      } else {
        updateUser(decodeValue, req, res);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageURL: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verfied: decodeValue.email_verified,
    role: "member",
    auth_time: decodeValue.auth_time,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

const updateUser = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: err });
  }
};

router.get("/getUsers", async (req, res) => {
  const options = {
    sort: {
      createAt: 1,
    },
  };
  const data = await user.find(options);
  if (data) {
    return res.status(200).send({ success: true, data: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

router.put("/updateRole/:userId", async (req, res) => {
  const fillter = { _id: req.params.userId };
  const role = req.body.data.role;
  try {
    const result = await user.findByIdAndUpdate(fillter, { role: role });
    res.status(200).send({ success: true, user: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});
router.delete("/deleteUser/:userId", async (req, res) => {
  const fillter = { _id: req.params.userId };
  const result = await user.deleteOne(fillter);

  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "User remove" });
  } else {
    res.status(500).send({ success: false, msg: "User not Found" });
  }
});

module.exports = router;
