const { decodedToken } = require("../helpers/jwt");
const { Product, User, Category, Customer } = require("../models");

async function authenticationUser(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "InvalidToken" };

    const decoded = decodedToken(access_token);

    const user = await User.findByPk(decoded.id);
    if(!user) throw { name: "InvalidToken"}

    req.user = user;
    next()
  } catch (error) {
    next(error)
  }
}

async function authenticationCustomer(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "InvalidToken" };

    const decoded = decodedToken(access_token);

    const customer = await Customer.findByPk(decoded.id);
    if(!customer) throw { name: "InvalidToken"}
    if(customer.role !== 'customer') throw { name: "InvalidToken"}



    req.customer = customer;
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {authenticationUser, authenticationCustomer};
