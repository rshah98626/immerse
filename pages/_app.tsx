import '../styles/globals.css'
import type { AppProps } from 'next/app'
// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";
import SSRProvider from 'react-bootstrap/SSRProvider';


export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </>
  )
}
