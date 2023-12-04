"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init(
    {
      email: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: {
          msg: "Email already registered",
        },
        validate: {
          isEmail: {
            msg: "Email format is invalid",
          },
          notEmpty: {
            msg: "email is required",
          },
          notNull: {
            msg: "email is required",
          },
        },
      },
      password: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "password is required",
          },
          notNull: {
            msg: "password is required",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  Customer.beforeCreate((el) => {
    el.password = hashPassword(el.password);
  });
  return Customer;
};
