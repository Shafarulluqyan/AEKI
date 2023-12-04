"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: "authorId" });
      //   User.belongsToMany(models.Category, {
      //     through: "Products",
      //     foreignKey: "authorId"
      //   })
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: { 
        type: DataTypes.INTEGER,
        allowNull: false, 
        unique:{
          msg: "Email already registered"
        },
        validate: {
          isEmail: {
            msg: "Email format is invalid"
          },
          notEmpty: {
            msg: "email is required"
          },
          notNull: {
            msg: "email is required"
          },
        }
      },
      password: { 
        type: DataTypes.INTEGER,
        allowNull: false, 
        validate: {
          notEmpty: {
            msg: "password is required"
          },
          notNull: {
            msg: "password is required"
          },
        }
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    })
    User.beforeCreate((el) => {
      el.password = hashPassword(el.password)
    })
  return User;
};
