const asyncHandler = require("express-async-handler");
const User = require("../../models/user");

// /api/users?search=john
const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .select("-password -createdAt -updatedAt -isAdmin -__v");
  return res.status(200).send(users);
});

module.exports = getAllUsers;
