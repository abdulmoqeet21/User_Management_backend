const express = require("express");
const loginUserController = require("../controllers/loginUserController");

const router = express.Router();

router.post("/registration", loginUserController.Registration);
router.post("/login", loginUserController.Login);

module.exports = router;
