if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 4000;
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
// const { errHandler } = require("./middlewares/errHandler");
const {
  typeDefs: authorTypeDefs,
  resolvers: authorResolvers,
} = require("./schemas/author");
const {
  typeDefs: actorTypeDefs,
  resolvers: actorResolvers,
} = require("./schemas/actor");

const server = new ApolloServer({
  typeDefs: [authorTypeDefs, actorTypeDefs],
  resolvers: [authorResolvers, actorResolvers],

  introspection: true,
});

// server.express.use(errHandler);

startStandaloneServer(server, {
  listen: { port },
}).then(({ url }) => {
  console.log("Launching on port " + url);
});
