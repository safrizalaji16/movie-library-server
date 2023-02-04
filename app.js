if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 4000;
const { ApolloServer } = require("@apollo/server");
const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const httpServer = http.createServer(app);
const {
  typeDefs: authorTypeDefs,
  resolvers: authorResolvers,
} = require("./schemas/author");
const {
  typeDefs: actorTypeDefs,
  resolvers: actorResolvers,
} = require("./schemas/actor");
const {
  typeDefs: movieTypeDefs,
  resolvers: movieResolvers,
} = require("./schemas/movie");
const {
  typeDefs: movieActorTypeDefs,
  resolvers: movieActorResolvers,
} = require("./schemas/movieactor");

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs: [
      authorTypeDefs,
      actorTypeDefs,
      movieTypeDefs,
      movieActorTypeDefs,
    ],
    resolvers: [
      authorResolvers,
      actorResolvers,
      movieResolvers,
      movieActorResolvers,
    ],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
  });
  await server.start();

  app.use(
    "/graphiql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => req,
    })
  );

  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphiql`);
  return { server, app };
}

startApolloServer();
