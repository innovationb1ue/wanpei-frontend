import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import store from "@/store";
import {SnackbarProvider} from "notistack";


function MyApp({Component, pageProps}: AppProps) {
    return (
        <SnackbarProvider>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </SnackbarProvider>
    )
}

export default MyApp
