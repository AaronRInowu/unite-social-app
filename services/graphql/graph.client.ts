import { GraphQLClient } from 'graphql-request';

export function createGraphQLClient(endpoint: string, headers?: Record<string, string>) {
  return new GraphQLClient(endpoint, { headers });
}

export function fetcher(client: GraphQLClient) {
  return async (query: string, variables?: Record<string, any>) => {
    return client.request(query, variables);
  };
}
