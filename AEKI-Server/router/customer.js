const express = require("express");
const Controller = require("../controllers/controllerCustomer");
const { authenticationCustomer } = require("../middleware/authentication");
const {
  authorization,
  authorizationAdmin,
} = require("../middleware/authorization");
const router = express.Router();

router.post("/google-login", Controller.googleLogin);

router.post("/register", Controller.customerRegister);

router.post("/login", Controller.customerLogin);

router.get("/products", Controller.getAllProducts);

router.get("/categories", Controller.getAllCategories);

router.get("/products/:id", Controller.getOneProduct);

router.use(authenticationCustomer);

router.get("/bookmarks", Controller.getBookmarks);

router.post("/bookmarks/:id", Controller.postBookmark);

module.exports = router;
