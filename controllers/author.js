const { Author } = require("../models");
const { GraphQLError } = require("graphql");

class Controller {
  static async addAuthor(_, args) {
    try {
      const { InputAuthor } = args;
      const newAuthor = await Author.create(InputAuthor);

      return newAuthor;
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async readAllAuthors() {
    try {
      const authors = Author.findAll();

      return authors;
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async readOneAuthor(_, args) {
    try {
      const { id } = args;
      const author = await Author.findByPk(id);

      if (!author) {
        throw new GraphQLError("Author Not Found", {
          extensions: {
            code: "NOT FOUND",
            http: { status: 404 },
          },
        });
      }

      return author;
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async editAuthor(_, args) {
    try {
      const { id, InputAuthor } = args;
      await Author.update(InputAuthor, { where: { id } });

      return { msg: "Author updated" };
    } catch (err) {
      throw new GraphQLError("Internal Server Error", {
        extensions: {
          code: "INTERNAL SERVER ERROR",
          http: { status: 500 },
        },
      });
    }
  }
  static async deleteAuthor(_, args) {
    try {
      const { id } = args;
      await Author.destroy({ where: { id } });

      return { msg: "Author deleted" };
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
