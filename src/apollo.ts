import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
export const client = new ApolloClient({
  link: new HttpLink({
    uri: "/graphql",
    credentials: "include", // Include cookies in requests
  }),
  cache: new InMemoryCache(),
});
