import {gql} from "apollo-server";

// queries for reading/fetching data
// mutations are for unpdating/changing data

export const typeDefs = gql`
    type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    quantity: Int!
    }

    type Query{
    getProducts: [Product]
    getProduct(id: ID!): Product
    }

    input ProductInput{
    name: String!
    description: String
    price: Float!
    quantity:Int!
    }

    type Mutation{
    addProduct(product: ProductInput):Product
    updateProduct(id: ID!, product:ProductInput): Product
    deleteProduct(id: ID!): String
    }
`;