"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class upload_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  upload_images.init(
    {
      foto: DataTypes.STRING,
      test: {
        type: DataTypes.INTEGER,
      },
      id_user: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "upload_images",
    }
  );
  return upload_images;
};
