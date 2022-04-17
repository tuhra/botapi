'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      page.belongsTo(models.user, {
        foreignKey: 'user_id',
      });
    }
  };
  page.init({
    user_id: DataTypes.INTEGER,
    fb_page_id: DataTypes.STRING,
    fb_verify_token: DataTypes.STRING,
    fb_app_id: DataTypes.STRING,
    fb_app_secret: DataTypes.TEXT,
    fb_access_token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'page',
  });
  return page;
};