const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')

const JWT_SECRET = "SECRETHere@";

// create user using /api/auth/createUser
router.post('/createUser', [
  body('email', "Enter Valid Mail").isEmail(),
  body('name', "Enter Valid Name").isLength({ min: 3 }),
  body('password').isLength({ min: 5 }),
], async (req, res) => {

  let success=false;

  // if  there are errors while creating user, return error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  // if user with this email already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ success, error: "User with this email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const secPassword = await bcrypt.hash(req.body.password, salt);

  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPassword,
  })

  const data = {
    user: {
      id: user.id
    }
  }

  const auth_token = jwt.sign(data, JWT_SECRET);
  // console.log(auth_token);

  success=true;
  res.json({ success, auth_token })
  // res.send(req.body)
})




// authenticate user using /api/auth/login
router.post('/login', [
  body('email', "Enter Valid Mail").isEmail(),
  body('password', "Password cannot be blank").exists()
], async (req, res) => {

  let success=false;

  const errors = validationResult(req);
  // if any errors are there return errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // fetch email and password from request
  const { email, password } = req.body

  try {
    // check whether user with given email exists or not
    let user = await User.findOne( {email })
    if (!user) {
      return res.status(400).json({ error: "Use correct credentials" });
    }
    // compare passwords using bcrypt
    const passComp = await bcrypt.compare(password, user.password)
    if (!passComp) {
      success=false;
      return res.status(400).json({ success, error: "Use correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }

    const auth_token = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({ success, auth_token })
  } catch (error) {
    console.log(error)
    return res.status(500).send("Interal server error!");
  }
})



// Get loggedin user detail
router.post('/getuser',fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error)
    return res.status(500).send("Interal server error!");
  }
}
)

module.exports = router