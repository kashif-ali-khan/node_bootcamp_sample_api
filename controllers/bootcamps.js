const Bootcamp = require("./../models/Bootcamp");

// @desc     Get All Bootcamps
// @route    /api/v1/bootcamps
// @access   public

exports.getAllBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (error) {
    next(error);
  }
};

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
    const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);

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
