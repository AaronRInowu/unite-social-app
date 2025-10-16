import { GraphQLClient } from 'graphql-request';

export function createGraphQLClient(endpoint: string, headers?: Record<string, string>) {
  return new GraphQLClient(endpoint, { headers });
}

export function fetcher<T>(client: GraphQLClient) {
  return async (query: string, variables?: Record<string, any>) => {
    console.log("Executing GraphQL query:", query, "with variables:", variables);
    return client.request<T>(query, variables);
  };
}
