import { gql } from "@apollo/client";

export const GET_CART = gql`
    query GetCart {
        getCart {
            id
            user{
                id
                username
            }
            items{
                product{
                    id
                    name
                    description
                    price
                    quantity
                }
            quantity
            }
        }
}`;

export const ADD_TO_CART = gql`
    mutation AddToCart($productId: ID!, $quantity: Int!) {
        addToCart(productId: $productId, quantity: $quantity) {
        id
        items{
        product {
            id 
            name
            description
            price
            quantity
        }
        quantity
        }
    }
}`;

export const UPDATE_CART_ITEM = gql`
    mutation UpdateCartItem($productId:ID!, $quantity:INT!){
        updateCartITem(priductId: $productId, quantity: $quantity){
            id 
            items{
                product {
                    id
                    name
                    description
                    price
                    quantity
                }
                quantity
            }
        }
    }
`;

export const REMOVE_FROM_CART = gql `
    mutation RemoveFromCart($productId: ID!){
        removeFromCart (productId: $productId){
            id
            items {
                product{
                    id
                    name
                    description
                    price
                    quantity
                }
                quantity
            }
        }
    }
`;