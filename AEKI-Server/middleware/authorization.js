const { Product, History, Category } = require("../models");

async function authorization(req, res, next) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product && !History && !Category) throw { name: "notFound" };
    if (req.user.role !== "admin" && req.user.id !== product.authorId) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
}

async function authorizationAdmin(req, res, next) {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) throw { name: "notFound" };
    if (req.user.role !== "admin") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
}
module.exports = {authorization, authorizationAdmin};
