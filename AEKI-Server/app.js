if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const env = process.env.NODE_ENV || "development";
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./router/index");
const errHandler = require("./middleware/errHandler");
const { User, Customer } = require("./models");
const { OAuth2Client } = require("google-auth-library");
const { signToken } = require("./helpers/jwt");

const client = new OAuth2Client();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world yahooo");
});

app.use(router);

app.use(errHandler);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
module.exports = app;

 
