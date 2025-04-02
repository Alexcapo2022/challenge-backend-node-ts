import { gql } from "apollo-server-express";

export const schema = gql`
  type Account {
    _id: ID
    name: String
    email: String
  }

  type AccountListResult {
    total: Int
    data: [Account]
  }

  input AccountInput {
    name: String!
    email: String!
  }

  extend type Query {
    testAccQ: Int
    listAccounts(page: Int, limit: Int, search: String): AccountListResult
  }

  extend type Mutation {
    testAccM: Boolean
    createAccount(input: AccountInput!): Account
  }
`;
