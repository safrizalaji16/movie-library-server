const { MovieActor } = require("../models");

class Controller {
  static async addMovieActor(_, args) {
    try {
      const { InputMovieActor } = args;
      const newMovieActor = await MovieActor.create(InputMovieActor);

      return newMovieActor;
    } catch (err) {
      console.log(err);
    }
  }
  static async readAllMovieActors() {
    try {
      const movieActors = MovieActor.findAll();

      return movieActors;
    } catch (err) {
      console.log(err);
    }
  }
  static async readOneMovieActor(_, args) {
    try {
      const { id } = args;
      const movieActor = await MovieActor.findByPk(id);

      return movieActor;
    } catch (err) {
      console.log(err);
    }
  }
  static async editMovieActor(_, args) {
    try {
      const { id, InputMovieActor } = args;
      await MovieActor.update(InputMovieActor, { where: { id } });

      return { msg: "MovieActor updated" };
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteMovieActor(_, args) {
    try {
      const { id } = args;
      await MovieActor.destroy({ where: { id } });

      return { msg: "MovieActor deleted" };
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Controller;
