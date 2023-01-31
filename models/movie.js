"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Author, { foreignKey: "authorId" });
      this.hasMany(models.MovieActor, { foreignKey: "movieId" });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },
      },
      synopsis: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Synopsis is required",
          },
          notEmpty: {
            msg: "Synopsis is required",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Img url is required",
          },
          notEmpty: {
            msg: "Img url is required",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Author id is required",
          },
          notEmpty: {
            msg: "Author id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
