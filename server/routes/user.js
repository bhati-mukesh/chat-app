const express = require("express");
const loginController = require("../controller/user/loginUser");
const registerUserController = require("../controller/user/RegisterUser");
const getAllUsersController = require("../controller/user/getAllUsers");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const router = express.Router();

router.get("/", isAuthenticated, getAllUsersController);
router.post("/login", loginController);
router.post("/register", registerUserController);

module.exports = router;
