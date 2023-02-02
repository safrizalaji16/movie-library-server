const { Actor } = require("../models");
const { GraphQLError } = require("graphql");

class Controller {
  static async addActor(_, args) {
    try {
      const { InputActor } = args;
      const newActor = await Actor.create(InputActor);

      return newActor;
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async readAllActors() {
    try {
      const actors = Actor.findAll();

      return actors;
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async readOneActor(_, args) {
    try {
      const { id } = args;
      const actor = await Actor.findByPk(id);

      if (!actor) {
        throw new GraphQLError("Actor Not Found", {
          extensions: {
            code: "NOT FOUND",
            http: { status: 404 },
          },
        });
      }

      return actor;
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async editActor(_, args) {
    try {
      const { id, InputActor } = args;
      await Actor.update(InputActor, { where: { id } });

      return { msg: "Actor updated" };
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async deleteActor(_, args) {
    try {
      const { id } = args;
      await Actor.destroy({ where: { id } });

      return { msg: "Actor deleted" };
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
}

module.exports = Controller;
