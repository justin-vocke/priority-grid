const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//Item Model
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// @route POST api/auth
// @desc Auth user
// @access Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please fill out all fields" });
  }
  try {
    //check for existing user *since we'd write email:email we can shorthand to just email
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User Does Not Exist!" });

    //Validate password

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route GET api/auth/user
// @desc GET user data
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
