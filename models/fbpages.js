'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fbpages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  fbpages.init({
    page_id: DataTypes.STRING,
    access_token: DataTypes.STRING,
    app_id: DataTypes.STRING,
    app_secret: DataTypes.STRING,
    verify_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fbpages',
  });
  return fbpages;
};