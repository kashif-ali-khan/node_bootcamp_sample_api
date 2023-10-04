const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("./../controllers/users");

const { protect, authorize } = require("./../middleware/auth");
const Users = require("./../models/User");
const advancedResults = require("./../middleware/advancedResults");

router.use(protect);
router.use(authorize("admin"));

router.route("/").get(advancedResults(Users), getAllUsers).post(createUser);

router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
