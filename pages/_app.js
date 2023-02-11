import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import MantineNav from '@/components/MantineNav';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const links = [
    {
      link: "/",
      label: "Home"
    },
    {
      link: "/window",
      label: "Window"
    },
    {
      link: "/profile",
      label: "Profile"
    },
    {
      link: "/settings",
      label: "Settings"
    }
  ]

  return (
    <SessionProvider session={session}>
      <MantineProvider withGlobalStyles withCSSVariables theme={{ colorScheme: 'dark' }}>
        <MantineNav links={links} />
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  )
}
