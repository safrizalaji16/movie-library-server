const { MovieActor } = require("../models");
const { GraphQLError } = require("graphql");

class Controller {
  static async addMovieActor(_, args) {
    try {
      const { InputMovieActor } = args;
      const newMovieActor = await MovieActor.create(InputMovieActor);

      return newMovieActor;
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async readAllMovieActors() {
    try {
      const movieActors = MovieActor.findAll();

      return movieActors;
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async readOneMovieActor(_, args) {
    try {
      const { id } = args;
      const movieActor = await MovieActor.findByPk(id);

      if (!movieActor) {
        throw new GraphQLError("MovieActor Not Found", {
          extensions: {
            code: "NOT FOUND",
            http: { status: 404 },
          },
        });
      }

      return movieActor;
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async editMovieActor(_, args) {
    try {
      const { id, InputMovieActor } = args;
      await MovieActor.update(InputMovieActor, { where: { id } });

      return { msg: "MovieActor updated" };
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async deleteMovieActor(_, args) {
    try {
      const { id } = args;
      await MovieActor.destroy({ where: { id } });

      return { msg: "MovieActor deleted" };
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
