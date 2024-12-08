import '../globals.css';
import type { AppProps } from 'next/app';
import {AuthProvider} from '../context/authContext';

export default function MyApp({Component, pageProps}: AppProps){
    return(
        <AuthProvider>
            {/* insert cart component providers here */}
            <Component {...pageProps} />
        </AuthProvider>
    );
};