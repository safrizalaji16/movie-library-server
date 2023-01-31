const { Actor } = require("../models");

class Controller {
  static async addActor(_, args, context, info) {
    try {
      const { InputActor } = args;
      const newActor = await Actor.create(InputActor);

      return newActor;
    } catch (err) {
      context.next(err);
    }
  }
  static async readAllActors() {
    try {
      const actors = Actor.findAll();

      return actors;
    } catch (err) {
      context.next(err);
    }
  }
  static async readOneActor(_, args, context, info) {
    try {
      const { id } = args;

      console.log(context);
      const actor = await Actor.findByPk(id);

      return actor;
    } catch (err) {
      context.next(err);
    }
  }
  static async editActor(_, args, context, info) {
    try {
      const { id, InputActor } = args;
      await Actor.update(InputActor, { where: { id } });

      return { msg: "Actor updated" };
    } catch (err) {
      context.next(err);
    }
  }
  static async deleteActor(_, args, context, info) {
    try {
      const { id } = args;
      await Actor.destroy({ where: { id } });

      return { msg: "Actor deleted" };
    } catch (err) {
      context.next(err);
    }
  }
}

module.exports = Controller;
