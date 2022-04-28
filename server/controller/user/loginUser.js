const asyncHandler = require("express-async-handler");
const User = require("../../models/user");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw Error("Please Enter all the fields");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw Error("Invalid email or password");
  }
  const matchPassword = await user.matchPassword(password);
  if (!matchPassword) {
    res.status(401);
    throw Error("Invalid email or password");
  }
  const token = await user.generateToken();
  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    picture: user.picture,
    token,
  });
});

module.exports = login;
