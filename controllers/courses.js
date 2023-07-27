const Course = require("./../models/Course");
const asyncHandler = require("./../middleware/async");
const ErrorResponse = require("./../middleware/errors");
const Bootcamp = require("./../models/Bootcamp");

// @desc     Get All Courses
// @route    /api/v1/courses/
// @route    /api/v1/bootcamp/:bootcampId/courses

// @access   public

exports.getAllCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @desc     Get Single Course
// @route    /api/v1/courses/:id
// @access   public

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    next(new ErrorResponse(`Course not found with id ${req.param.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc     Add  Course
// @route    /api/v1/bootcamps/:id/courses
// @access   public

exports.addCourse = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(bootcampId);
  if (!bootcamp) {
    next(new ErrorResponse(`Bootcamp not found with id ${bootcampId}`, 404));
  }

  req.body.bootcamp = bootcampId

  const course = await Course.create(req.body)

  res.status(200).json({
    success: true,
    data: course,
  });
});



// @desc     Update  Course
// @route    /api/v1/courses/:id
// @access   public

exports.updateCourse = asyncHandler(async (req, res, next) => {

  let course = await Course.findById(req.params.id);
  if (!course) {
    next(new ErrorResponse(`Course not found with id ${req.params.id}`, 404));
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })


  res.status(200).json({
    success: true,
    data: course
  });
});



// @desc     Delete  Course
// @route    /api/v1/courses/:id
// @access   public

exports.deleteCourse = asyncHandler(async (req, res, next) => {

  const course = await Course.findById(req.params.id);
  if (!course) {
    next(new ErrorResponse(`Course not found with id ${req.params.id}`, 404));
  }


  course.deleteOne();
  res.status(200).json({
    success: true,
    data: {},
  });
});
