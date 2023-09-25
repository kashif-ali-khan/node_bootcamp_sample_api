const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getLoggedInUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const { protect } = require("./../middleware/auth");

router.route("/logininfo").get(protect, getLoggedInUser);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);

router.route("/resetpassword/:resettoken").put(resetPassword);

module.exports = router;
