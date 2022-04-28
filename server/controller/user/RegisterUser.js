const asyncHandler = require("express-async-handler");
const User = require("../../models/user");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw Error("Please Enter all the fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw Error("Email is already used");
  }
  const user = await User.create({
    name,
    email,
    password,
    picture,
  });

  if (user) {
    const token = await user.generateToken();
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token,
    });
  }
  res.status(500);
  throw Error("Something went wrong");
});

module.exports = registerUser;
