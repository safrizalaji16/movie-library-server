const Controller = require("../controllers/movieactor");

const typeDefs = `#graphql
  type MovieActor {
    id: Int
    movieId: Int
    actorId: Int
  }

  type Message {
    msg: String
  }

  type Query {
    movieActors: [MovieActor]
    movieActor(id: ID): MovieActor
  }

  input InputMovieActor {
    movieId: Int
    actorId: Int
  }

  type Mutation{
    addMovieActor( InputMovieActor: InputMovieActor ): MovieActor
    editMovieActor(id: ID, InputMovieActor: InputMovieActor): Message
    deleteMovieActor(id: ID): Message
  }
`;

const resolvers = {
  Query: {
    movieActors: Controller.readAllMovieActors,
    movieActor: Controller.readOneMovieActor,
  },
  Mutation: {
    addMovieActor: Controller.addMovieActor,
    editMovieActor: Controller.editMovieActor,
    deleteMovieActor: Controller.deleteMovieActor,
  },
};

module.exports = { typeDefs, resolvers };
