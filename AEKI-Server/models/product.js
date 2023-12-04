'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey: "authorId" })
      Product.belongsTo(models.Category, { foreignKey: "categoryId" })
    }
  }
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "name is required",
        },
        notNull: {
          args: true,
          msg: "name is required",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
        msg: "description is required",
        },
        notNull: {
          msg: "description is required"
        }
      }
    },
    price: { 
      type: DataTypes.INTEGER,
      allowNull: false, 
      validate: {
        notEmpty: {
          msg: "price is required"
        },
        notNull: {
          msg: "price is required"
        }, 
        isMin(value){
          if(value < 100000){
            throw new Error('Price should be at least 100000')
          }
        }
      }
    },
    stock: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Categories"
        },
        key: "id"
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Users"
        },
        key: "id"
      }
    },
    status: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};