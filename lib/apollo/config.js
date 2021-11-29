import {
    ApolloClient,
    InMemoryCache,
    HttpLink
  } from "@apollo/client";
import { fields } from "./resolver";

export const cache = new InMemoryCache(fields);
  
export default function createApolloClient(initialState, ctx) {
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: new HttpLink({
            uri: "https://b2cdemo.getswift.asia/graphql", // Server URL (must be absolute)
            credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
        }),
        cache: cache.restore(initialState),
      })
};