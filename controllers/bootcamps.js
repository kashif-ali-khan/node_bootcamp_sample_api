// @desc     Get All Bootcamps
// @route    /api/v1/bootcamps
// @access   public 

exports.getAllBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Get All Bootcamp `,
  });
};

// @desc     Get  Bootcamps By Id
// @route    /api/v1/bootcamps/:id
// @access   public 

exports.getBootcampsById = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Get Bootcamp with ${req.params.id}`,
  });
};

// @desc     Create  Bootcamps 
// @route    /api/v1/bootcamps
// @access   public 

exports.createBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Create Bootcamp`,
  });
};

// @desc     Update  Bootcamp By Id
// @route    /api/v1/bootcamps/:id
// @access   public 

exports.updateBootcampsById = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Update Bootcamp with ${req.params.id}`,
  });
};

// @desc     Delete  Bootcamp By Id
// @route    /api/v1/bootcamps/:id
// @access   public 

exports.deleteBootcampsById = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Delete Bootcamp with ${req.params.id}`,
  });
};
