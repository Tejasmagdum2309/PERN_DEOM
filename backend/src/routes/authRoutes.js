const authController = require("../controllers/authController.js");

const router = require("express").Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
module.exports = router;