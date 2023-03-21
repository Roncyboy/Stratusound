import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import MantineNav from '@/components/MantineNav';
import { useState } from 'react';
import Menu from '@/components/Menu';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [colorScheme, setColorScheme] = useState('dark');
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const links = [
    {
      link: "/home",
      label: "Home",
      icon: 'homeIcon'
    },
    {
      link: "/window",
      label: "Window",
      icon: 'windowIcon'
    },
    // {
    //   link: "/profile",
    //   label: "Profile",
    //   icon: 'profileIcon'
    // },
    {
      link: "/settings",
      label: "Settings",
      icon: 'settingsIcon'
    }
  ]

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider 
          withGlobalStyles 
          withCSSVariables 
          theme={{ 
            colorScheme,
            colors: {
              dark: [
                //0 text color, 5 accent, 7 body background color
                'white',
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
              light:[
                '#0e0e0e',
                '#f6f6f6',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#9CDEA7',
                '#FEFEFE',
                '#f6f6f6',
                '#D6D6D6',
                '#BDBDBD',
                
              ],
              clear: [
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
              cloudy: [
                '#0e0e0e',
                '#f6f6f6',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#ADE3B6',
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
                '#7DD9E6',
                '#262626',
                '#232323',
                '#171717',
                '#0E0E0E',
              ], 
              rain: [
                '#0e0e0e',
                '#f6f6f6',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#4A96EF',
                '#262626',
                '#232323',
                '#171717',
                '#0E0E0E',
              ], 
              thunderstorm: [
                '#0e0e0e',
                '#f6f6f6',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#7369E8',
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
          {/* <MantineNav links={links} toggleColorScheme={toggleColorScheme}/> */}
          <Menu links={links} />
          <Component {...pageProps} toggleColorScheme={toggleColorScheme}/>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  )
}
