'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LoanCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LoanCategory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LoanCategory',
  });
  return LoanCategory;
};