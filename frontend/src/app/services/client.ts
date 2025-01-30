// Creating a shared apollo client 
import { HttpLink, ApolloClient, InMemoryCache, ApolloLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
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
export function createApolloClient() {
    const authLink = new ApolloLink((operation, forward) => {
        let token;

        // Check if the environment is the browser
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('token');
        }
        const headers = token ? { authorization: `Bearer ${token}` } : {};
        operation.setContext({ headers });
        return forward(operation);
    });
    
    return new ApolloClient({
        link: from([errorLinks, authLink, httplink]),
        cache: new InMemoryCache()
    }
    );

}