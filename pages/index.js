import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"
import axios from "axios"

export default function Home() {
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [location, setLocation] = useState()
  const [weather, setWeather] = useState()

  const getMyPlaylists = async () => {
    const res = await fetch('/api/playlists');
    const { items } = await res.json();
    setPlaylists(items);
  };

  const searchLocation = async () => {

    const apiKey = 'd81e2880e7fc30576236bb01fd689147'
    const lang = 'en'
    const units = 'metric'
    const location = 'vancouver'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`

    try {
      const res = await axios.get(url)
      console.log(res.data)
      setWeather(res.data)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

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
