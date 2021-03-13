import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import { TypedTypePolicies } from "./generated";
import { accessTokenKey } from "./settings";

const typePolicies: TypedTypePolicies = {};

const cache = new InMemoryCache({
  typePolicies,
});

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(accessTokenKey);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: {
    mutate: { errorPolicy: "all" },
  },
});
