'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.Product, { foreignKey: "ProductId" })
      Bookmark.belongsTo(models.Customer, { foreignKey: "CustomerId" })
    }
  }
  Bookmark.init({
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Products"
        },
        key: "id"
      }
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Customer"
        },
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};