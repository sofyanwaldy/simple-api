'use strict';
const { Model } = require('sequelize');
// const { outlet } = require('../models');

module.exports = (sequelize, DataTypes) => {
  class brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.outlet)
      this.hasMany(models.product)
      // define association here
    }
  };
  brand.init({
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    banner: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'brand',
  });
  
  return brand;
};