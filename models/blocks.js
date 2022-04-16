'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blocks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  blocks.init({
    name: DataTypes.STRING,
    page_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'blocks',
  });
  return blocks;
};