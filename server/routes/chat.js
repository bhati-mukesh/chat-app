const express = require("express");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const accessChatController = require("../controller/chat/accessChat");
const fetchAllChatController = require("../controller/chat/fetchAllChat");
const createGroupChatController = require("../controller/chat/createGroupChat");
const renameGroupController = require("../controller/chat/renameGroup");
const addToGroupController = require("../controller/chat/addToGroup");
const removeFromGroupController = require("../controller/chat/removeFromGroup");
const router = express.Router();

router.get("/", isAuthenticated, fetchAllChatController);
router.post("/", isAuthenticated, accessChatController);
router.post("/group", isAuthenticated, createGroupChatController);
router.put("/rename", isAuthenticated, renameGroupController);
router.put("/group-add", isAuthenticated, addToGroupController);
router.put("/group-remove", isAuthenticated, removeFromGroupController);
// router.post("/login", loginController);
// router.post("/register", registerUserController);

module.exports = router;
