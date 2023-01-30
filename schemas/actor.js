const Controller = require("../controllers/actor");

const typeDefs = `#graphql
  type Actor {
    id: Int
    name: String
    email: String
    password: String
  }

  type Message {
    msg: String
  }

  type Query {
    actors: [Actor]
    actor(id: ID): Actor
  }

  input InputActor {
    name: String
    email: String
    password: String
  }

  type Mutation{
    addActor( InputActor: InputActor ): Actor
    editActor(id: ID, InputActor: InputActor): Message
    deleteActor(id: ID): Message
  }
`;

const resolvers = {
  Query: {
    actors: Controller.readAllActors,
    actor: Controller.readOneActor,
  },
  Mutation: {
    addActor: Controller.addActor,
    editActor: Controller.editActor,
    deleteActor: Controller.deleteActor,
  },
};

module.exports = { typeDefs, resolvers };
