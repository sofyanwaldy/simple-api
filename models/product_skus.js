'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_skus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  product_skus.init({
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product_skus',
  });
  return product_skus;
};