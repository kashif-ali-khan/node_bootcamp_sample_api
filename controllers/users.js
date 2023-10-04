const User = require("./../models/User");
const asyncHandler = require("./../middleware/async");
const ErrorResponse = require("./../middleware/errors");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getUserById = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return next(new ErrorResponse("Userid not passed", 400));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorResponse("Invalid UserId", 400));
  }

  res.status(200).json({
    success: true,
    user: user,
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    success: true,
    user: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorResponse("Userid not passed", 400));
  }

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new ErrorResponse("Invalid UserId", 400));
  }

  res.status(200).json({
    success: true,
    user: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return next(new ErrorResponse("Userid not passed", 400));
  }

  await User.findByIdAndDelete(userId);
  res.status(200).json({
    success: true,
    data: {},
  });
});
