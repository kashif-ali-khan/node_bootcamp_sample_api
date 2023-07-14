const express = require("express");
const router = express.Router();

//Bring all routes

// Get All Bootcamps
router.get("/", (req, res) => {
  //res.send("<h1>Hello</h1>")
  res.status(200).json({
    success: true,
    message: "Show all Bootcamps",
  });
});

// Create Bootcamps

router.post("/", (req, res) => {
  //res.send("<h1>Hello</h1>")
  res.status(200).json({
    success: true,
    message: "Create  Bootcamp",
  });
});

// Get Bootcamp By Id
router.get("/:id", (req, res) => {
  //res.send("<h1>Hello</h1>")
  res.status(200).json({
    success: true,
    message: `Get Bootcamp with ${req.params.id}`,
  });
});

// Delete Bootcamp By Id
router.delete("/:id", (req, res) => {
  //res.send("<h1>Hello</h1>")
  res.status(200).json({
    success: true,
    message: `Delete Bootcamp with ${req.params.id}`,
  });
});

// Update Bootcamp By Id
router.put("/:id", (req, res) => {
  //res.send("<h1>Hello</h1>")
  res.status(200).json({
    success: true,
    message: `Update Bootcamp with ${req.params.id}`,
  });
});

module.exports = router;
