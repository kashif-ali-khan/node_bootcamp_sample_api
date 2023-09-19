const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth");
console.log('I am here, AUTH')
router.route("/register").post(register);
router.route("/login").post(login);

//router.post('/register',register);

module.exports = router;
