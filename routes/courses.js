const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getAllCourses,
  getCourse,
  addCourse,
} = require("../controllers/courses");

//router.get("/", getAllBootcamps).post("/", createBootcamp);

router.route("/").get(getAllCourses).post(addCourse);
router.route("/:id").get(getCourse);

module.exports = router;
