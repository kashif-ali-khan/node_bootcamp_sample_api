const express = require("express");
const router = express.Router();

const { register, login, getLoggedInUser } = require("../controllers/auth");
const { protect } = require('./../middleware/auth');
console.log('I am here, AUTH')

router.route("/logininfo").get(protect, getLoggedInUser);

router.route("/register").post(register);
router.route("/login").post(login);

//router.post('/register',register);

module.exports = router;
