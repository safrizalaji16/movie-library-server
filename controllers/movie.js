const { Movie } = require("../models");

class Controller {
  static async addMovie(_, args) {
    try {
      const { InputMovie } = args;
      const newMovie = await Movie.create(InputMovie);

      return newMovie;
    } catch (err) {
      console.log(err);
    }
  }
  static async readAllMovies() {
    try {
      const movies = Movie.findAll();

      return movies;
    } catch (err) {
      console.log(err);
    }
  }
  static async readOneMovie(_, args) {
    try {
      const { id } = args;
      const movie = await Movie.findByPk(id);

      return movie;
    } catch (err) {
      console.log(err);
    }
  }
  static async editMovie(_, args) {
    try {
      const { id, InputMovie } = args;
      await Movie.update(InputMovie, { where: { id } });

      return { msg: "Movie updated" };
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteMovie(_, args) {
    try {
      const { id } = args;
      await Movie.destroy({ where: { id } });

      return { msg: "Movie deleted" };
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Controller;
