if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 4000;
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  introspection: true,
});

startStandaloneServer(server, {
  listen: { port },
}).then(({ url }) => {
  console.log("Launching on port " + url);
});
