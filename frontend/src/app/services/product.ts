import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
    query GetProduct($id:ID!){
    getProduct(id:$id) {
        id
        name
        description
        price
        quantity
        iamgeUrl
        }
    }
`;

export const GET_PRODUCTS = gql`
    query {
    getProducts {
        id
        name
        description
        price
        quantity
        imageUrl
        }
    }
`;

export const ADD_PRODUCT = gql`
    mutation AddProduct($product: ProductInput!) {
    addProduct(product: $product) {
        id
        name
        description
        price
        quantity
        imageUrl
        }
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($id:ID!, $product: ProductInput) {
    updateProduct(id:$id, product:$product){
        id 
        name
        description
        price 
        quantity
        imageUrl
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation DeleteProduct ($id: ID!) {
    deleteProduct(id:$id)
    }
`;