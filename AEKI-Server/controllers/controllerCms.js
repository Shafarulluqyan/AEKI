const { comparePassword } = require("../helpers/bcrypt");
const { signToken, decodedToken } = require("../helpers/jwt");
const { Product, User, Category, History } = require("../models");

class Controller {
  static async googleLogin(req, res) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.G_CLIENT,
      });
      // console.log(ticket, "<<<ticket");
      const payload = ticket.getPayload();

      let user = await User.findOne({
        where: { email: payload.email },
      });
      if (!user) {
        user = await User.create(
          {
            email: payload.email,
            username: payload.name,
            password: String(Math.random()),
            role: "staff",
          },
          {
            hooks: false,
          }
        );
      }
      let access_token = signToken({
        id: user.id,
      });
      res.status(200).json({ access_token });
      console.log(user, "ini user");
      console.log(payload, "payload");
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getAllProducts(req, res, next) {
    try {
      const products = await Product.findAll({ include: User });
      res.status(200).json({ products });
    } catch (err) {
      next(err);
    }
  }

  static async getOneProduct(req, res, next) {
    try {
      const product = await Product.findOne({ where: { id: req.params.id } });
      if (!product) throw { name: "notFound" };
      res.status(200).json({ product });
    } catch (err) {
      next(err);
    }
  }

  static async postProduct(req, res, next) {
    try {
      const product = await Product.create({
        ...req.body,
        authorId: req.user.id,
      });
      res
        .status(201)
        .json({ message: `Product with id ${product.id} has been created` });
    } catch (err) {
      next(err);
    }
  }

  static async postCategory(req, res, next) {
    try {
      const category = await Category.create({
        ...req.body,
        authorId: req.user.id,
      });
      res
        .status(201)
        .json({ message: `Category with id ${category.id} has been created` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      // return res.send(req.params)
      const product = await Product.findOne({ where: { id } });
      if (!product) throw { name: "notFound" };
      await Product.destroy({ where: { id } });
      res.status(200).json({ message: `id ${product.id} success to delete` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    const { id } = req.params;
    try {
      // return res.send(req.params)
      const category = await Category.findOne({ where: { id } });
      if (!category) throw { name: "notFound" };
      await Category.destroy({ where: { id } });
      res
        .status(200)
        .json({ message: `category with id ${category.id} success to delete` });
    } catch (err) {
      next(err);
    }
  }

  static async getAllCategory(req, res) {
    try {
      const category = await Category.findAll();
      res.status(200).json({ category });
    } catch (err) {
      next(err);
    }
  }

  static async postRegister(req, res, next) {
    try {
      const { email, password, username, phoneNumber, address, role } =
        req.body;
      const userRaw = await User.create({
        email,
        password,
        username,
        phoneNumber,
        address,
        role: "admin",
      });
      const user = userRaw.toJSON();
      delete user.password;
      res.status(201).json({ id: user.id });
    } catch (err) {
      next(err);
    }
  }

  static async postLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "InvalidInput" };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "InvalidEmail/Password" };

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) throw { name: "InvalidEmail/Password" };

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async putProduct(req, res, next) {
    try {
      const updateProduct = await Product.update(
        {
          ...req.body,
        },
        {
          where: { id: req.params.id },
        }
      );
      const history = await History.create({
        name: req.body.name,
        description: `product with id ${req.params.id} updated`,
        updatedBy: req.user.email,
      });
      res
        .status(200)
        .json({ message: "successfully updated product ", updateProduct });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { status } = req.body;

      const updateStatus = await Product.findOne({
        where: { id: req.params.id },
      });
      const history = await History.create({
        name: req.body.name,
        description: `status with id ${req.params.id} has been updated from ${updateStatus.status} to ${status}`,
        updatedBy: req.user.email,
      });
      res
        .status(200)
        .json({ message: "successfully updated product ", updateStatus });
      await updateStatus.update({ status });
      res.status(200).json({ message: "success edit brow" });
    } catch (err) {
      next(err);
    }
  }

  static async getHistories(req, res, next) {
    try {
      const history = await History.findAll({
        order: [["id", "DESC"]],
      });
      res.status(200).json({ history });
    } catch (err) {
      console.log(err, "error history");
      next(err);
    }
  }
}

module.exports = Controller;
