import '../styles/globals.css'
import type { AppProps } from 'next/app'
// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
