import { gql } from "apollo-server";

// queries for reading/fetching data
// mutations are for unpdating/changing data

export const typeDefs = gql`
    type User{
    id: ID!
    firstName: String,
    lastName: String,
    username: String!
    email: String!
    role: String!
    }

    type AuthPayload{
    user: User!
    token: String!
    }

    type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    quantity: Int!
    }

    input loginInput{
    identifier: String!
    password: String!
    }

    input registerInput{
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    role: String
    }



    input ProductInput{
        name: String!
        description: String
        price: Float!
        quantity:Int!
        }
        
    type Query{
        me: User
        getProducts: [Product]
        getProduct(id: ID!): Product
        }

    type Mutation{
    addProduct(product: ProductInput):Product
    updateProduct(id: ID!, product:ProductInput): Product
    deleteProduct(id: ID!): String
    loginUser(input: loginInput!): AuthPayload!
    registerUser(input: registerInput!): AuthPayload!
    }
`;