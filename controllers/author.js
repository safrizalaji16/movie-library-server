const { Author } = require("../models");

class Controller {
  static async addAuthor(_, args) {
    try {
      const { InputAuthor } = args;
      const newAuthor = await Author.create(InputAuthor);

      return newAuthor;
    } catch (err) {
      console.log(err);
    }
  }
  static async readAllAuthors() {
    try {
      const authors = Author.findAll();

      return authors;
    } catch (err) {
      console.log(err);
    }
  }
  static async readOneAuthor(_, args) {
    try {
      const { id } = args;
      const author = await Author.findByPk(id);

      return author;
    } catch (err) {
      console.log(err);
    }
  }
  static async editAuthor(_, args) {
    try {
      const { id, InputAuthor } = args;
      await Author.update(InputAuthor, { where: { id } });

      return { msg: "Author updated" };
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteAuthor(_, args) {
    try {
      const { id } = args;
      await Author.destroy({ where: { id } });

      return { msg: "Author deleted" };
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Controller;
