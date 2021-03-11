import { ApolloClient, InMemoryCache } from "@apollo/client";
import { TypedTypePolicies } from "./generated";

const typePolicies: TypedTypePolicies = {};

const cache = new InMemoryCache({
  typePolicies,
});

export const apolloClient = new ApolloClient({
  uri: "http://localhost:8000/",
  cache,
});