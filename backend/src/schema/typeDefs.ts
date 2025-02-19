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
    imageUrl: String
    }

    type CartItem{
    product: Product!
    quantity: Int!
    }

    type Cart{
    id: ID!
    user: User!
    items: [CartItem]
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
        imageUrl: String
    }
        
    type Query{
        me: User
        getProducts: [Product]
        getProduct(id: ID!): Product
        getCart: Cart
    }

    type Mutation{
    addProduct(product: ProductInput!):Product
    updateProduct(id: ID!, product:ProductInput): Product
    deleteProduct(id: ID!): String
    loginUser(input: loginInput!): AuthPayload!
    registerUser(input: registerInput!): AuthPayload!
    updateCartItem(productId: ID!, quantity: Int!): Cart
    addToCart(productId: ID!, quantity: Int!): Cart
    removeFromCart(productId: ID!): Cart
    }
`;