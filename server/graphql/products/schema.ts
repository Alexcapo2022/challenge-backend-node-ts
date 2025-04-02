import { gql } from "apollo-server-express";

export const schema = gql`
  enum ProductStatus {
    ACTIVE
    INACTIVE
    OUT_OF_STOCK
  }

  type Product {
    _id: ID
    name: String
    sku: String
    status: ProductStatus
    account: Account
  }

  input ProductInput {
    name: String!
    sku: String!
    status: ProductStatus
    accountId: ID!
  }

  type ProductListResult {
    total: Int
    totalPages: Int
    currentPage: Int
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    data: [Product]
  }

  extend type Mutation {
    testProdM: Boolean
    createProducts(input: [ProductInput!]!): [Product]
  }

  extend type Query {
    testProdQ: Int
    listProducts(page: Int, limit: Int, search: String): ProductListResult
  }
`;
