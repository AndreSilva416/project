const router = require("express").Router();
//const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model')

/* GET signin page */
router.get("/signin", (req, res, next) => {
  // Shows the sign in form to the user
  res.render('auth/signin.hbs')
});

/* GET signup page */
router.get("/signup", (req, res, next) => {
  // Shows the sign up form to the user
  res.render('auth/signup.hbs')
});

module.exports = router;