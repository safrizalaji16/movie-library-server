"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MovieActor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Movie, { foreignKey: "movieId" });
      this.belongsTo(models.Actor, { foreignKey: "actorId" });
    }
  }
  MovieActor.init(
    {
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Movie id is required",
          },
          notEmpty: {
            msg: "Movie id is required",
          },
        },
      },
      actorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Actor id is required",
          },
          notEmpty: {
            msg: "Actor id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "MovieActor",
    }
  );
  return MovieActor;
};
