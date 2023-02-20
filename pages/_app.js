import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import MantineNav from '@/components/MantineNav';
import { useState } from 'react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const links = [
    {
      link: "/home",
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
      {/* <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}> */}
        <MantineProvider 
          withGlobalStyles 
          withCSSVariables 
          theme={{ 
            // colorScheme,
            colorScheme: 'dark',
            colors: {
              dark: [
                //0 text color, 5 accent, 7 body background color
                '#0e0e0e',
                '#f6f6f6',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#9CDEA7',
                '#262626',
                '#232323',
                '#171717',
                '#0E0E0E',
              ],
              sunny: [
                '#0e0e0e',
                '#f6f6f6',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#FADF81',
                '#262626',
                '#232323',
                '#171717',
                '#0E0E0E',
              ], 
              partlyCloudy: [
                '#0e0e0e',
                '#f6f6f6',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#D4EBAF',
                '#262626',
                '#232323',
                '#171717',
                '#0E0E0E',
              ], 
              mostlyCloudy: [
                '#0e0e0e',
                '#f6f6f6',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#9CDEA7',
                '#262626',
                '#232323',
                '#171717',
                '#0E0E0E',
              ], 
              overcast: [
                '#0e0e0e',
                '#f6f6f6',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#73CAB5',
                '#262626',
                '#232323',
                '#171717',
                '#0E0E0E',
              ], 
              drizzle: [
                '#0e0e0e',
                '#f6f6f6',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#5BBADD',
                '#262626',
                '#232323',
                '#171717',
                '#0E0E0E',
              ], 
              lightRain: [
                '#0e0e0e',
                '#f6f6f6',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#3E83DC',
                '#262626',
                '#232323',
                '#171717',
                '#0E0E0E',
              ], 
              heavyRain: [
                '#0e0e0e',
                '#f6f6f6',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#369FF2',
                '#262626',
                '#232323',
                '#171717',
                '#0E0E0E',
              ], 
              snow: [
                '#0e0e0e',
                '#f6f6f6',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#FAFAFA',
                '#262626',
                '#232323',
                '#171717',
                '#0E0E0E',
              ], 
            }
          }}>
          <MantineNav links={links} />
          <Component {...pageProps} />
        </MantineProvider>
      {/* </ColorSchemeProvider> */}
    </SessionProvider>
  )
}
