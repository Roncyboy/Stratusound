import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
    <SessionProvider session={session}>
      <MantineProvider withGlobalStyles withCSSVariables theme={{ colorScheme: 'dark' }}>
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  )
}
