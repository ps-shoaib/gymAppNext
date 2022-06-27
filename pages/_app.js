import * as React from "react";
// import { Suspense } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme/theme";
import createEmotionCache from "../src/createEmotionCache";
import FullLayout from "../src/layouts/FullLayout";
import "../styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css"
import App from 'next/app'

import Cookie from 'js-cookie'
import fallbackView from "../src/components/fallbackView";
import { toast } from 'react-toastify'

import 'react-datepicker/dist/react-datepicker.css'

import axios, { AxoisError } from "axios";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

axios.interceptors.response.use(undefined, function (error) {
  (error).originalMessage = error.message;
  Object.defineProperty(error, "message", {
    get: function () {
      if (!error.response) {
        return (error).originalMessage;
      }
      return JSON.stringify(error.response.data);
    }
  });
  return Promise.reject(error);
})


export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  toast.configure();

  if (Component.getLayout) {
    return Component.getLayout(
      // <Suspense fallback={'loading'}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Component {...pageProps} />
        {/* // </Suspense> */}
      </ThemeProvider>
    )
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Spartan Fitness & Gym</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* <Suspense fallback={<fallbackView />}> */}

        <FullLayout>

          <Component {...pageProps} />

        </FullLayout>
        {/* </Suspense> */}

      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};




// App.getInitialProps = async (context) => {
//   if (typeof window !== undefined) {
//     const CookieObj = parseCookies(context.req);

//     if (!CookieObj) {
//       return {
//         redirect: {
//           destination: '/login?callbackUrl=http://localhost:3000',
//           permanent: false
//         }
//       }
//     }

//     return {
//       props: {
//         CookieObj,
//         data: 'Data form getServerSideProps'
//       }
//     }
//   }
// }
