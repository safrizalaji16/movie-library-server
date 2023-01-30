"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      synopsis: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imgUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Authors",
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
    await queryInterface.dropTable("Movies");
  },
};
