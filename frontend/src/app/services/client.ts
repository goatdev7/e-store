// Creating a shared apollo client 
import { HttpLink, ApolloClient, InMemoryCache, ApolloLink, from, operationName } from "@apollo/client";
import { ErrorLink, onError } from "@apollo/client/link/error";
import fetch from "cross-fetch";

const httplink = new HttpLink({
    uri: "http://127.0.0.1:4000",
    fetch
});

const errorLinks = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
            console.error(`GraphQL Error: ${message}`);
        });
    }
    if (networkError) {
        console.error(`Network Error: ${networkError}`);
    }

});

// factory fucntion  for dynanmic tokens
export function createApolloClient(token?: string) {
    const authLink = new ApolloLink((operation, forward) => {
        console.log("Token", token);
        operation.setContext({
            headers: {
                authorization: `Bearer ${token}`
                // token || null
            }
        });
        return forward(operation);
    });

    return new ApolloClient({
        link: from([errorLinks, authLink, httplink]),
        cache: new InMemoryCache()
    });

}