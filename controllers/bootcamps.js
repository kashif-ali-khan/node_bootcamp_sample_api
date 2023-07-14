exports.getAllBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Get All Bootcamp `,
  });
};

exports.getBootcampsById = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Get Bootcamp with ${req.params.id}`,
  });
};

exports.createBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Create Bootcamp`,
  });
};

exports.updateBootcampsById = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Update Bootcamp with ${req.params.id}`,
  });
};

exports.deleteBootcampsById = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Delete Bootcamp with ${req.params.id}`,
  });
};
