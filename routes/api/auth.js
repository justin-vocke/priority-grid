const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//Item Model
const User = require('../../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');


// @route POST api/users
// @desc Register new user
// @access Public
router.post('/',
  async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill out all fields" });
    }
    try {
      //check for existing user *since we'd write email:email we can shorthand to just email
      let user = await User.findOne({ email });

      if (user) return res.status(400).json({ msg: "User already exists" });
      let newUser = new User({
        name,
        email,
        password
      });

      //Create salt and hash
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save(async (err, user) => {

        jwt.sign(
          { id: user.id },
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            })
          }
        )


      });


    }
    catch (err) {
      console.error(err.message);
      res.status(500).send('sever error');
    }


  })


module.exports = router;