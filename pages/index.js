import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Carousel from "framer-motion-carousel";

import { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import axios from "axios"

import GenreChips from "@/components/GenreChips"
import EmptyWeather from '@/components/CurrentWeather'
import {CurrentWeather} from '@/components/CurrentWeather'
import { Spacer } from "@/components/Spacer";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession()
  // const [playlists, setPlaylists] = useState([])
  const [location, setLocation] = useState('')
  const [weather, setWeather] = useState()
  const [selectedGenres, setSelectedGenres] = useState([])

  const apiKey = 'd81e2880e7fc30576236bb01fd689147'
  let lang = 'en'
  let units = 'metric'
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`

  useEffect(() => {
    localStorage.setItem('genres', JSON.stringify(selectedGenres));
    console.log(`save ${selectedGenres} to localstorage`)
  }, [selectedGenres])

  // not being used
  // const getMyPlaylists = async () => {
  //   const res = await fetch('/api/playlists');
  //   const { items } = await res.json();
  //   console.log(items)
  //   setPlaylists(items);
  // };

  const searchLocation = async () => {
    try {
      const res = await axios.get(url)
      console.log(res.data)
      setWeather(res.data)
      localStorage.setItem('location', res.data.name);
      console.log(`save ${res.data.name} to localstorage`)
      // return res.data
    } catch (err) {
      console.log(err)
    }

    console.log('search location done')

  }

  const handleGenreSelect = ({ genre }) => {
    let updatedGenres = [];

    if (selectedGenres.includes(genre)) {
      updatedGenres = selectedGenres.filter(selectedGenre => selectedGenre !== genre);
    } else {
      updatedGenres = [...selectedGenres, genre];
    }

    setSelectedGenres(updatedGenres);
  };

  if (session) {
    return (
      <>
      <Head>
        <title>Stratusound</title>
        <meta name="description" content="Stratusound, the weather-based music recommendation app that enhances your Spotify listening experience!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/" />
      </Head>
        {/* <p>Signed in {session?.token?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>

        <hr /> */}
        <div style={{
          padding: "0 1rem"
        }}>
        <Spacer vertical size={80} />

        <h2>Enter your city. Or a different city. Maybe somewhere nice.</h2>
        {weather ?
          <CurrentWeather 
            weather={weather}
            name = {weather.name} 
            temp = {weather.main.temp} 
            description = {weather.weather[0].description}
            main = {weather.weather[0].main}
            onSearch = {() => searchLocation()} 
            onChange = {event => setLocation(event.target.value)}
            location = {location}
            max={weather.main.temp_max}
            min={weather.main.temp_min}
          />
          : <EmptyWeather
          onSearch = {() => searchLocation()} 
          onChange = {event => setLocation(event.target.value)}
          location = {location}/>}

        <Spacer vertical size={80} />

        <h2>Now pick a few genres you like to listen to.</h2>
        <Spacer vertical size={20} />
        <GenreChips handleClick={handleGenreSelect} selectedGenres={selectedGenres} expand/>

        <Spacer vertical size={80} />

        <Link href="/home">Continue</Link>
        </div>
      </>
    )
  }
  return (
    <>
    <Head>
      <title>Stratusound</title>
      <meta name="description" content="Stratusound, the weather-based music recommendation app that enhances your Spotify listening experience!" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/" />
    </Head>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      <div style={{ width: 400, height: 600, margin: "0 auto" }}>
        <Carousel
          interval={7500}
          loop={true}
          autoPlay={true}
        >
          {[1, 2, 3, 4].map((item, i) => (
            <img
              draggable="false"
              src={`./carousel/${item}.jpg`}
              key={i}
              width="100%"
              height="100%"
              alt=""
            />
          ))}
        </Carousel>
      </div>
    </>
  )
}
