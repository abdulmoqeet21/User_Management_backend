const express = require("express");
const userController = require("../controllers/userController");
const login = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/userGroups", login, userController.createUsergroup);
router.get("/userGroups", login, userController.getGroups);
router.get("/userGroups/:id", login, userController.getSingleGroup);
router.put("/userGroups/:id", login, userController.updateFormdata);
router.delete(
  "/userGroups/:arrayElement_id",
  login,
  userController.deleteGroupform
);

module.exports = router;
