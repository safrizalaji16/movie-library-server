const Controller = require("../controllers/author");

const typeDefs = `#graphql
  type Author {
    id: Int
    name: String
    email: String
    password: String
  }

  type Message {
    msg: String
  }

  type Query {
    authors: [Author]
    author(id: ID): Author
  }

  input InputAuthor {
    name: String
    email: String
    password: String
  }
  
  input EditAuthor {
    name: String
    email: String
  }

  type Mutation{
    addAuthor( InputAuthor: InputAuthor ): Author
    editAuthor(id: ID, InputAuthor: EditAuthor): Message
    deleteAuthor(id: ID): Message
  }
`;

const resolvers = {
  Query: {
    authors: Controller.readAllAuthors,
    author: Controller.readOneAuthor,
  },
  Mutation: {
    addAuthor: Controller.addAuthor,
    editAuthor: Controller.editAuthor,
    deleteAuthor: Controller.deleteAuthor,
  },
};

module.exports = { typeDefs, resolvers };
