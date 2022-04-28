const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Chat = require("../../models/chat");
const User = require("../../models/user");

// /api/users?search=john
const getAllUsers = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

// const getAllUsers = asyncHandler(async (req, res) => {
//   const userId = req.body.userId;
//   if (!userId) {
//     res.status(400);
//     throw Error("Required receiver's ID");
//   }
//   let isChatExists = await Chat.find({
//     isGroup: false,
//     $and: [
//       { users: { $elemMatch: { $eq: mongoose.Types.ObjectId(req.user._id) } } },
//       { users: { $elemMatch: { $eq: mongoose.Types.ObjectId(userId) } } },
//     ],
//   })
//     .populate("users", "-password -createdAt -updatedAt -isAdmin -__v")
//     .populate("latestMessage");

//   isChatExists = await User.populate(isChatExists, {
//     path: "latestMessage.sender",
//     select: "name email picture",
//   });
//   if (isChatExists.length > 0) return res.status(200).send(isChatExists[0]);
//   const chatData = {
//     chatName: "sender",
//     isGroup: false,
//     users: [req.user._id, userId],
//   };

//   const createdChat = await Chat.create(chatData);
//   const fullChat = await Chat.findOne({
//     _id: mongoose.Types.ObjectId(createdChat._id),
//   }).populate("users", "-password -createdAt -updatedAt -isAdmin -__v");
//   return res.status(200).send(fullChat);
// });

module.exports = getAllUsers;
