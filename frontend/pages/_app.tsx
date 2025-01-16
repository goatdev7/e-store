import '../src/app/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../src/app/context/authContext';
import { ApolloProvider } from '@apollo/client';
import Header from '../src/app/components/header';
import Footer from '@/app/components/footer';
import { createApolloClient } from '@/app/services/client';
import { CartProvider } from '../src/app/context/cartContext';

export default function MyApp({ Component, pageProps }: AppProps) {
    const client = createApolloClient();
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <CartProvider>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </CartProvider>
            </AuthProvider>
        </ApolloProvider>
    );
};