import '../src/app/globals.css';
import type { AppProps } from 'next/app';
import {AuthProvider} from '../src/app/context/authContext';

export default function MyApp({Component, pageProps}: AppProps){
    return(
        <AuthProvider>
            {/* insert cart component providers here */}
            <Component {...pageProps} />
        </AuthProvider>
    );
};