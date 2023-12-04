const express = require("express");
const router = express.Router();
const customer = require("./customer");
const cms = require("./cms");

router.use("/pub", customer);

router.use(cms);

module.exports = router;
