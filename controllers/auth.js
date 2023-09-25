const asyncHandler = require("./../middleware/async");
const ErrorResponse = require("./../utils/errorResponse");
const User = require("./../models/User");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const sendJsonTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJWTToken();
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  return res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

// @desc     Register User
// @route    /api/v1/auth/register/

// @access   public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, role, password } = req.body;

  const result = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = result.getSignedJWTToken();
  res.status(200).json({
    success: true,
    token,
  });
});

// @desc     Login User
// @route    /api/v1/auth/login/

// @access   public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide email and password User", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid User", 401));
  }

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  sendJsonTokenResponse(user, 200, res);
});

exports.getLoggedInUser = asyncHandler(async (req, res, next) => {
  //const userInfo = await User.findById(req.user.id)
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const userDetail = await User.findOne({ email });
  if (!userDetail) {
    return next(new ErrorResponse(`User not found with ${email}`, 404));
  }

  const resetToken = userDetail.getResetPasswordToken();

  await userDetail.save({ validateBeforeSave: false });

  try {
    const resetUrl = `${req.protocol}//${req.get(
      "host"
    )}/api/v1/resetpassword/${resetToken}`;
    const message = `You are recieving thi email , because you have have choosen to reset your password ${resetUrl}`;
    const options = {
      email: userDetail.email,
      message: message,
      subject: "Password reset token ",
    };
    sendEmail(options);
    return res.status(200).json({
      success: true,
      user: userDetail,
    });
  } catch (error) {
    return next(new ErrorResponse("Email not sent", 500));
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const token = req.params.resettoken;
  const password = req.body.password;

  if(!token){
    return next(new ErrorResponse(' Token not passed', 400))
  }

  if(!password){
    return next(new ErrorResponse('Password not supplied', 400))
  }

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

 const user =  await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if(!user){
    return next(new ErrorResponse('Invalid token', 400))
  }

 
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  user.password = password;
  await user.save();
  sendJsonTokenResponse(user, 200, res);




});
