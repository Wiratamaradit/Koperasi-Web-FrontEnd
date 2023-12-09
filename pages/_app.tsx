import type {ReactElement, ReactNode} from "react";

import type {NextPage} from "next";
import Head from "next/head";
import {AppProps} from "next/app";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {CacheProvider, EmotionCache} from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import {baselightTheme} from "../src/theme/DefaultColors";
import {store} from '../src/base/store/store'
import {Provider as ProviderRedux} from 'react-redux'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
    Component: NextPageWithLayout;
}

const MyApp = (props: MyAppProps) => {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
    const theme = baselightTheme;
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <ProviderRedux store={store}>
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <title>Koperasi</title>
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    {getLayout(<Component {...pageProps} />)}
                </ThemeProvider>
            </CacheProvider>
        </ProviderRedux>
    );
};

export default MyApp;
