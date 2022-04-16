'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  profiles.init({
    page_id: DataTypes.INTEGER,
    profile: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'profiles',
  });
  return profiles;
};