const asyncHandler = require("./../middleware/async");
const ErrorResponse = require("./../utils/errorResponse");
const User = require("./../models/User");

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

  if(!email || !password){
    return next(new ErrorResponse('Please provide email and password User', 400))
  }

  const user = await User.findOne({email}).select("+password");

  if(!user){
    return next(new ErrorResponse('Invalid User', 401))
  }

  const isMatched = await user.comparePassword(password);

  if(!isMatched){
    return next(new ErrorResponse('Invalid Credentials', 401))

  }
  const token =  user.getSignedJWTToken();

  res.status(200).json({
    success: true,
    token,
  });
});



