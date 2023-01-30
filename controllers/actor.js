const { Actor } = require("../models");

class Controller {
  static async addActor(_, args) {
    try {
      const { InputActor } = args;
      const newActor = await Actor.create(InputActor);

      return newActor;
    } catch (err) {
      console.log(err);
    }
  }
  static async readAllActors() {
    try {
      const actors = Actor.findAll();

      return actors;
    } catch (err) {
      console.log(err);
    }
  }
  static async readOneActor(_, args) {
    try {
      const { id } = args;
      const actor = await Actor.findByPk(id);

      return actor;
    } catch (err) {
      console.log(err);
    }
  }
  static async editActor(_, args) {
    try {
      const { id, InputActor } = args;
      await Actor.update(InputActor, { where: { id } });

      return { msg: "Actor updated" };
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteActor(_, args) {
    try {
      const { id } = args;
      await Actor.destroy({ where: { id } });

      return { msg: "Actor deleted" };
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Controller;
