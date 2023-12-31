const express = require("express");
const router = express.Router();

const {
  getAllBootcamps,
  getBootcampsById,
  createBootcamp,
  updateBootcampsById,
  deleteBootcampsById,
  uploadBootcampPhoto,
} = require("../controllers/bootcamps");

const { protect, authorize } = require('./../middleware/auth'); 

const course = require("./courses");

const Bootcamps = require("./../models/Bootcamp");
const advancedResults = require("./../middleware/advancedResults");
// Re-route into other resourse routers
router.use("/:bootcampId/courses", course);
//router.get("/", getAllBootcamps).post("/", createBootcamp);

router
  .route("/")
  .get(advancedResults(Bootcamps, "courses"), getAllBootcamps)
  .post(protect,authorize('admin','publisher'), createBootcamp);
router
  .route("/:id")
  .get(protect,authorize('admin','publisher'),getBootcampsById)
  .put(protect,authorize('admin','publisher'),updateBootcampsById)
  .delete(deleteBootcampsById);

router.route("/:id/photo").put(uploadBootcampPhoto);

//Bring all routes

// // Get All Bootcamps
// router.get("/", (req, res) => {
//   //res.send("<h1>Hello</h1>")
//   res.status(200).json({
//     success: true,
//     message: "Show all Bootcamps",
//   });
// });

// // Create Bootcamps

// router.post("/", (req, res) => {
//   //res.send("<h1>Hello</h1>")
//   res.status(200).json({
//     success: true,
//     message: "Create  Bootcamp",
//   });
// });

// // Get Bootcamp By Id
// router.get("/:id", (req, res) => {
//   //res.send("<h1>Hello</h1>")
// });

// // Delete Bootcamp By Id
// router.delete("/:id", (req, res) => {
//   //res.send("<h1>Hello</h1>")
//   res.status(200).json({
//     success: true,
//     message: `Delete Bootcamp with ${req.params.id}`,
//   });
// });

// // Update Bootcamp By Id
// router.put("/:id", (req, res) => {
//   //res.send("<h1>Hello</h1>")
//   res.status(200).json({
//     success: true,
//     message: `Update Bootcamp with ${req.params.id}`,
//   });
// });

module.exports = router;
