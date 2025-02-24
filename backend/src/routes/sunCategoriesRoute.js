const subcategoriesController = require("../controllers/subCategoriesController.js");

const router = require("express").Router();
router.post("/signup", subcategoriesController.sas);
router.post("/login", authController.login);
module.exports = router;