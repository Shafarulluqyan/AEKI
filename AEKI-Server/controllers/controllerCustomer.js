const { comparePassword } = require("../helpers/bcrypt");
const { signToken, decodedToken } = require("../helpers/jwt");
const { Product, Category, History, Customer, Bookmark } = require("../models");
const { Op } = require("sequelize");
const axios = require("axios");

class Controller {
  static async googleLogin(req, res) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.G_CLIENT,
      });
      // console.log(ticket, "<<<ticket");
      const payload = ticket.getPayload();

      let customer = await Customer.findOne({
        where: { email: payload.email },
      });
      if (!customer) {
        customer = await Customer.create(
          {
            email: payload.email,
            username: payload.name,
            password: String(Math.random()),
            role: "customer",
          },
          {
            hooks: false,
          }
        );
      }
      let access_token = signToken({
        id: customer.id,
      });
      res.status(200).json({ access_token });
      console.log(customer, "ini user");
      console.log(payload, "payload");
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async customerRegister(req, res) {
    try {
      const { email, password, role } = req.body;
      const customerRaw = await Customer.create({
        email,
        password,
        role: "customer",
      });
      const customer = customerRaw.toJSON();
      delete customer.password;
      res
        .status(201)
        .json({ message: `account with ${customer.email} success to create` });
    } catch (err) {
      if (
        err.name === "SequelizeUniqueConstraintError" ||
        err.name === "SequelizeValidationError"
      ) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        console.log(err);
        res.status(500).json({ message: err.errors[0].message });
      }
    }
  }

  static async customerLogin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email) return res.status(401).json({ message: "Email is required" });
      if (!password)
        return res.status(401).json({ message: "Password is required" });
      const customer = await Customer.findOne({ where: { email } });
      if (!customer || !comparePassword(password, customer.password))
        return res.status(401).json({ message: "Invalid email/password" });
      res.json({ access_token: signToken({ id: customer.id }) });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getAllProducts(req, res, next) {
    try {
      const { page } = req.query;
      const paramQuery = {};
      let limit;
      let offset;

      // Pagination
      if (page !== "" && typeof page !== "undefined") {
        const perPage = 8; // Default perPage value
        const pageNumber = parseInt(page, 10) || 1;
        limit = perPage;
        offset = (pageNumber - 1) * perPage;
        paramQuery.limit = limit;
        paramQuery.offset = offset;
      } else {
        limit = 8;
        offset = 0;
        paramQuery.limit = limit;
        paramQuery.offset = offset;
      }

      const { productName } = req.query;
      let filterCriteria = {};
      if (productName) {
        filterCriteria = {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${productName}%`,
              },
            },
            {
              "$Category.name$": {
                [Op.iLike]: `%${productName}%`,
              },
            },
          ],
        };
      }

      const products = await Product.findAll({
        include: [{ model: Category }],
        where: filterCriteria,
        ...paramQuery,
        order: [["id", "ASC"]],
      });

      if (products) {
        res.status(200).json({ products });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getAllCategories(req, res) {
    try {
      const category = await Category.findAll();
      res.status(200).json({ category });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getOneProduct(req, res) {
    try {
      const baseUrl = `http://localhost:3000`;
      const API_KEY =
        "dQHxV0E9yyjlI7iFnvrVRmX6jopCukkgeSaErAvzhZ2FRwJTJoS4-Hkaeyja1J4q";
      const qrCode = {
        url: `https://api.qr-code-generator.com/v1/create?access-token=${API_KEY}`,
        method: "post",
        data: {
          frame_name: "no-frame",
          qr_code_text: `${baseUrl}/products/${req.params.id}`,
          image_format: "SVG",
          qr_code_logo: "scan-me-square",
        },
      };
      const product = await Product.findOne({
        where: { id: req.params.id },
      });
      if (!product) {
        res.status(404).json({ message: "Not Found" });
      } else {
        const response = await axios.request(qrCode);
        // console.log(response, "ini data response browwww");
        res.status(200).json({ product, qr: response.data });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getBookmarks(req, res) {
    try {
      const bookmark = await Bookmark.findAll({
        include: {
          model: Product,
        },
      });
      res.status(200).json({ bookmark });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async postBookmark(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        req.status(404).json({ message: "Not Found" });
      }
      const bookmark = await Bookmark.create({
        CustomerId: req.customer.id,
        ProductId: req.params.id,
      });
      res.status(201).json(bookmark);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Controller;
