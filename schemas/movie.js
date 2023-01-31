const Controller = require("../controllers/movie");

const typeDefs = `#graphql
  type Movie {
    id: Int
    title: String
    synopsis: String
    imgUrl: String
    authorId: Int
  }

  type Message {
    msg: String
  }

  type Query {
    movies: [Movie]
    movie(id: ID): Movie
  }

  input InputMovie {
    title: String
    synopsis: String
    imgUrl: String
    authorId: Int
  }

  type Mutation{
    addMovie( InputMovie: InputMovie ): Movie
    editMovie(id: ID, InputMovie: InputMovie): Message
    deleteMovie(id: ID): Message
  }
`;

const resolvers = {
  Query: {
    movies: Controller.readAllMovies,
    movie: Controller.readOneMovie,
  },
  Mutation: {
    addMovie: Controller.addMovie,
    editMovie: Controller.editMovie,
    deleteMovie: Controller.deleteMovie,
  },
};

module.exports = { typeDefs, resolvers };
