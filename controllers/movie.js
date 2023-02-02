const { Movie } = require("../models");
const { GraphQLError } = require("graphql");

class Controller {
  static async addMovie(_, args) {
    try {
      const { InputMovie } = args;
      const newMovie = await Movie.create(InputMovie);

      return newMovie;
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async readAllMovies() {
    try {
      const movies = Movie.findAll();

      return movies;
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async readOneMovie(_, args) {
    try {
      const { id } = args;
      const movie = await Movie.findByPk(id);

      if (!movie) {
        throw new GraphQLError("Movie Not Found", {
          extensions: {
            code: "NOT FOUND",
            http: { status: 404 },
          },
        });
      }

      return movie;
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async editMovie(_, args) {
    try {
      const { id, InputMovie } = args;
      await Movie.update(InputMovie, { where: { id } });

      return { msg: "Movie updated" };
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async deleteMovie(_, args) {
    try {
      const { id } = args;
      await Movie.destroy({ where: { id } });

      return { msg: "Movie deleted" };
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
