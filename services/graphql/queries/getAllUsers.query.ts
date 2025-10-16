import { gql } from 'graphql-request';


// Define your GraphQL query
export const GET_POSTS_QUERY = gql`
  query {
  Users {
    docs {
      firstName
      lastName
      phone
      id
    }
  }
}
`;