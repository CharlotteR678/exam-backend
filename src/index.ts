import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { dataSource } from "./datasource";
import { CountriesResolver } from "./resolvers/CountriesResolver";

const port = 5000;

async function initialize() {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountriesResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port },
    context: async ({ req, res }) => ({
      req,
      res,
      user: undefined,
    }),
  });
  console.log(`GraphQL server ready at ${url}`);
}

initialize();
