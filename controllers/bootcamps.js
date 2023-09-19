const Bootcamp = require("./../models/Bootcamp");
const asyncHandler = require("./../middleware/async");
const path = require("path");

const ErrorResponse = require("./../utils/errorResponse");
// @desc     Get All Bootcamps
// @route    /api/v1/bootcamps
// @access   public

exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
  //const query = req.query;
  res.status(200).json(res.advancedResults);

  // res.status(200).json({
  //   success: true,
  //   count: total,
  //   pagination,

  //   data: bootcamps,
  // });
  // exports.getBootcamps = asyncHandler(async (req, res, next) => {
  //     res.status(200).json(res.advancedResults);
  //   });
  //   try {
  //     const bootcamps = await Bootcamp.find();
  //     res.status(200).json({
  //       success: true,
  //       count: bootcamps.length,
  //       data: bootcamps,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
});

// @desc     Get  Bootcamps By Id
// @route    /api/v1/bootcamps/:id
// @access   public

exports.getBootcampsById = async (req, res, next) => {
  const returnObj = {
    success: false,
    status: 400,
  };
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (bootcamp) {
      returnObj.status = 200;
      returnObj.success = true;
    }
    return res.status(returnObj.status).json({
      success: returnObj.success,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc     Create  Bootcamps
// @route    /api/v1/bootcamps
// @access   public

exports.createBootcamp = async (req, res, next) => {
  console.log(req.body);

  try {
    const bc = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      message: `Create Bootcamp`,
      data: bc,
    });
  } catch (err) {
    next(error);
  }
};

// @desc     Update  Bootcamp By Id
// @route    /api/v1/bootcamps/:id
// @access   public

exports.updateBootcampsById = async (req, res, next) => {
  const returnObj = {
    success: false,
    status: 400,
  };

  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (bootcamp) {
      returnObj.status = 200;
      returnObj.success = true;
    }
    return res.json(returnObj.status, {
      success: returnObj.success,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc     Delete  Bootcamp By Id
// @route    /api/v1/bootcamps/:id
// @access   public

exports.deleteBootcampsById = async (req, res, next) => {
  const returnObj = {
    success: false,
    status: 400,
  };

  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (bootcamp) {
      returnObj.status = 200;
      returnObj.success = true;
      bootcamp.deleteOne();
    }
    return res.json(returnObj.status, {
      success: returnObj.success,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc     Upload Photo
// @route    /api/v1/bootcamp/:id/photo

// @access   public

exports.uploadBootcampPhoto = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp Not found with id ${req.params.id}`, 404)
    );
  }
  if (!req.files) {
    return next(new ErrorResponse(`Please upload files`, 400));
  }

  const file = req.files.file;

   file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  console.log(file.name);

  file.mv(`${process.env.UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse("File not uploaded", 500));
    }
    await Bootcamp.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    });
  });
  res.status(200).json({
    success: true,
    data: file.name,
  });
});
