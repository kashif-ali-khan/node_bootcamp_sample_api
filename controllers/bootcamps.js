const Bootcamp = require("./../models/Bootcamp");
const asyncHandler = require("./../middleware/async");

// @desc     Get All Bootcamps
// @route    /api/v1/bootcamps
// @access   public

exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
  //const query = req.query;

  const reqQuery = { ...req.query };

  const removeField = ["select", "sort", "limit", "page"];

  removeField.forEach((field) => delete reqQuery[field]);

  let queryString = JSON.stringify(reqQuery);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  console.log(queryString);

  let query = Bootcamp.find(JSON.parse(queryString));

  // Select fields
  if (req.query.select) {
    const selectFields = req.query.select
      .split(",")
      .map((name) => name.trim())
      .join(" ");
    query = query.select(selectFields);
  }

  // Sort By
  if (req.query.sort) {
    const sortField = req.query.sort.split(",").join(" ");
    query = query.sort(sortField);
  }

  // Pagination

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit,10) || 100;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  query = query.skip(startIndex).limit(limit);

  // Pagination Data
  const total = await Bootcamp.countDocuments();

  // Executing query
  const bootcamps = await query.populate({
    path:'courses',
    select: 'title'
  });

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page-1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: total,
    pagination,

    data: bootcamps,
  });
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
