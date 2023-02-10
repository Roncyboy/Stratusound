import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import axios from "axios"

import GenreChips from "@/components/GenreChips"

export default function Home() {
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [songs, setSongs] = useState([])
  const [location, setLocation] = useState('')
  const [weather, setWeather] = useState()
  const [selectedGenres, setSelectedGenres] = useState([])

  const [topTracks, setTopTracks] = useState({})
  const [topArtists, setTopArtists] = useState({})

  const apiKey = 'd81e2880e7fc30576236bb01fd689147'
  let lang = 'en'
  let units = 'metric'
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`

  useEffect(() => {
    const getSongs = async () => {
      const res = await fetch(`/api/songs?weather=${weather.weather[0].main}`)
      const data = await res.json()
      // console.log(data)
      setSongs(data)
      // console.log(songs)
    }

    const getTopTracks = async () => {
      const res = await fetch(`/api/topTracks?time_range=medium_large&limit=5`)
      const data = await res.json()
      console.log(data)
      setTopTracks(data)
    }

    const getTopArtists = async () => {
      const res = await fetch(`/api/topArtists?time_range=medium_large&limit=5`)
      const data = await res.json()
      console.log(data)
      setTopArtists(data)
    }

    weather && getSongs() && getTopTracks() && getTopArtists()

  }, [weather])

  const getMyPlaylists = async () => {
    const res = await fetch('/api/playlists');
    const { items } = await res.json();
    console.log(items)
    setPlaylists(items);
  };

  const searchLocation = async () => {
    try {
      const res = await axios.get(url)
      console.log(res.data)
      setWeather(res.data)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleGenreSelect = ({ genre }) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
      console.log(selectedGenres)
    } else {
      setSelectedGenres([...selectedGenres, genre]);
      console.log(selectedGenres)
    }
  };

  if (session) {
    return (
      <>
        <p>Signed in {session?.token?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>

        <hr />

        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder='Enter location'
          type='text'
        />
        <button onClick={() => searchLocation()}>Search</button>
        <button onClick={() => getMyPlaylists()}>Get playlists</button>

        {weather ?
          <div>
            <p>{weather.name}</p>
            <p>{weather.main.temp} Celsius</p>
            <p>{weather.weather[0].description}</p>
          </div>
          : <></>}

        <GenreChips handleClick={handleGenreSelect} />

        <h1>Song seeds</h1>

        {topTracks.items && topTracks.items.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.id}</p>
          </div>
        ))}

        <h1>Artist Seeds</h1>

        {topArtists.items && topArtists.items.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.id}</p>
          </div>
        ))}

        <h1>Genre Seeds</h1>

        {/* {songs.tracks.items.length > 0 ? songs.tracks.items.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        )) : <></>} */}

        {playlists.map((item) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <img src={item.images[0]?.url} width="100" />
          </div>
        ))}
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
