const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//Reqires User models
const User = require('../../Modules/User');

// @route POST api/User
// @dest Register User
// @access Public
router.post(
  '/',
  [
    //checking conditions
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'enter a valid Email').isEmail(),
    check('password', 'password must have at leat 6 charecters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //check if user esists
      let user = await User.findOne({ email: email });

      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exist' }] });
      }

      //add gravatar
      const avatar = gravatar.url(email, {
        s: '600',
        r: 'pg',
        d: 'mm',
      });

      //Create an instance of the user
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      //save user to database
      await user.save();

      //create webtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecter'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
