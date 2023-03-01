import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Carousel from "framer-motion-carousel";

import { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import axios from "axios"

import GenreChips from "@/components/GenreChips"
import MantineCard from '../components/MantineCard'
import MantineNav from "@/components/MantineNav"
import EmptyWeather from '@/components/CurrentWeather'
import {CurrentWeather} from '@/components/CurrentWeather'

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
        <p>Signed in {session?.token?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>

        <hr />

        {/* <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder='Enter location'
          type='text'
        />
        <button onClick={() => searchLocation()}>Search</button> */}
        {/* <button onClick={() => getMyPlaylists()}>Get playlists</button> */}

        {weather ?
          <CurrentWeather 
          name = {weather.name} 
          temp = {weather.main.temp} 
          description = {weather.weather[0].description}
          main = {weather.weather[0].main}
          onSearch = {() => searchLocation()} 
          onChange = {event => setLocation(event.target.value)}
          location = {location}/>
          : <EmptyWeather
          onSearch = {() => searchLocation()} 
          onChange = {event => setLocation(event.target.value)}
          location = {location}/>}

        <GenreChips handleClick={handleGenreSelect} selectedGenres={selectedGenres} expand/>
      </>
    )
  }
  return (
    <>
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
