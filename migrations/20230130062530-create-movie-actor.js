"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MovieActors", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      movieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Movies",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      actorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Actors",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MovieActors");
  },
};
