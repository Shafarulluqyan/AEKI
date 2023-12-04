const express = require("express");
const Controller = require("../controllers/controllerCms");
const {
  authenticationUser,
} = require("../middleware/authentication");
const {
  authorization,
  authorizationAdmin,
} = require("../middleware/authorization");
const router = express.Router();

router.post("/google-login", Controller.googleLogin);

router.post("/register", Controller.postRegister);

router.post("/login", Controller.postLogin);

router.use(authenticationUser);

router.get("/products", Controller.getAllProducts);

router.get("/products/:id", Controller.getOneProduct);

router.post("/products", Controller.postProduct);

router.get("/categories", Controller.getAllCategory);

router.post("/categories", Controller.postCategory);

router.get("/histories", authorization, Controller.getHistories);

router.put("/products/:id", authorizationAdmin, Controller.putProduct);

router.patch("/products/:id", Controller.updateStatus);

router.delete("/categories/:id", authorization, Controller.deleteCategory);

router.delete("/products/:id", authorization, Controller.deleteProduct);

module.exports = router;
