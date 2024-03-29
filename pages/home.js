import Head from "next/head";
import { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import axios from "axios"
import styles from '@/styles/Home.module.css'
import { SimpleGrid, Loader } from "@mantine/core"
import {motion, AnimatePresence} from "framer-motion"
import { FaExpandAlt, FaCompressAlt } from 'react-icons/fa'

import GenreChips from "@/components/GenreChips";
import MantineCard from '@/components/MantineCard';
import { Spacer } from "@/components/Spacer";
import { CurrentWeather } from "@/components/CurrentWeather";
import  HomeWindow from "@/components/HomeWindow";


export default function Home() {
  // Variables
  const { data: session } = useSession()
  const router = useRouter();

  const [loading, setLoading] = useState(true)
  const [fakeLoading, setFakeLoading] = useState(true)
  const [location, setLocation] = useState("");
  const [genres, setGenres] = useState({});
  const [selectedGenres, setSelectedGenres] = useState([])
  const [weather, setWeather] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [topTracks, setTopTracks] = useState({})
  const [topArtists, setTopArtists] = useState({})
  const [recommendations, setRecommendations] = useState({})
  const [playerId, setPlayerId] = useState('')
  const [type, setType] = useState('')
  const [expand, setExpand] = useState(false)
  
  const [selectedBackground, setSelectedBackground] = useState([0]);
  const [selectedRoom, setSelectedRoom] = useState([0]);
  const [selectedWindowFrame, setSelectedWindowFrame] = useState([0]);
  const [selectedWindowSill, setSelectedWindowSill] = useState([0]);

  const apiKey = 'd81e2880e7fc30576236bb01fd689147'
  let lang = 'en'
  let units = 'metric'
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`

  // Functions
  // Redirect to login page if not logged in
  useEffect(() => {
    if (session === undefined) {
      return; // wait for authentication state to initialize
    }
    if (!session) {
      router.push("/");
      console.log("pushed");
    }
  }, [session])

  // Get location and genres from local storage
  useEffect(() => {
    const location = localStorage.getItem("location");
    const genres = JSON.parse(localStorage.getItem("genres"));
    const background = JSON.parse(localStorage.getItem("background"));
    const room = JSON.parse(localStorage.getItem("room"));
    const windowFrame = JSON.parse(localStorage.getItem("windowFrame"));
    const windowSill = JSON.parse(localStorage.getItem("windowSill"));

    setSelectedBackground(background);
    setSelectedRoom(room);
    setSelectedWindowFrame(windowFrame);
    setSelectedWindowSill(windowSill);
    
    setLocation(location);
    setGenres(genres);
    setSelectedGenres(genres);
    console.log("Genres", genres)
  }, [])

  // Get the weather after getting location from local storage
  useEffect(() => {
    if (location !== "") {
      const getWeather = async () => {
        try {
          const res = await axios.get(url)
          console.log(res.data)
          setWeather(res.data)
        } catch (err) {
          console.log(err)
        }
      }
      getWeather()
    }
  }, [location])

  // Get recommendations and playlists
  useEffect(() => {
    const getWeatherPlaylists = async () => {
      const res = await fetch(`/api/weather-playlists?weather=${weather.weather[0].main}`)
      const data = await res.json()
      console.log(data.playlists.items)
      setPlaylists(data.playlists.items)
    }

    const getTopTracks = async () => {
      const res = await fetch(`/api/topTracks?time_range=medium_large&limit=5`)
      const data = await res.json()
      // console.log("Top Tracks", data)
      setTopTracks(data)
      return data
    }

    const getTopArtists = async () => {
      try {const res = await fetch(`/api/topArtists?time_range=medium_large&limit=5`)
      const data = await res.json()
      // console.log("Top Artists", data)
      setTopArtists(data)
      return data}
      catch (err) {
        console.log(err)
      }
    }

    const getRecommendations = async () => {
      const topArtists = await getTopArtists()
      const topTracks = await getTopTracks()

      // We're getting the top 5 artists, so choose 2 from them

      let randomNumber = []
      while (randomNumber.length < 2) {
        var r = Math.floor(Math.random() * 4) + 1;
        if (randomNumber.indexOf(r) === -1) randomNumber.push(r);
      }

      const artistSeed = await topArtists.items[randomNumber[0]].id
      const secondArtistSeed = await topArtists.items[randomNumber[1]].id
      const artistSeeds = [artistSeed, secondArtistSeed]
      const trackSeed = await topTracks.items[0].id

      let genreString = ''

      for (let i = 0; i < selectedGenres.length; i++) {
        genreString += selectedGenres[i] + ','
      }

      if (genres === []) {
        setSelectedGenres(['pop', ...selectedGenres]);
        console.log('The pop genre was pushed to the selected genres array');
      }

      // Limit genres to 2 because 
      // You need one seed at least for artist, genre, and track
      // You can have max 2 seeds for artists, max 2 seeds for tracks, and max 3 seeds for genres
      // If you have more than 1 seed for artists, you can’t have more than 2 seeds for genres or 1 seed for tracks
      // If you have more than 2 seeds for genres, you can’t have more than 1 seed each for artists or tracks
      // If you have more than 1 seed for tracks, you can’t have more than 2 seeds for genres or 1 seed for artists
      const res = await fetch(`/api/recommendations?limit=6&seed_artists=${artistSeeds}&seed_genres=${genreString.slice(0, 2)}&seed_tracks=${trackSeed}`)
      const data = await res.json()
      // console.log('These are the recommendations', data)
      setRecommendations(data)
    }

    weather && getRecommendations() && getWeatherPlaylists()

    setLoading(false)

  }, [weather])

  // Fake loading effect to prevent flickers
  useEffect(() => {
    setTimeout(() => {
      setFakeLoading(false)
    }, 1500)
  }, [])

  const handleGenreSelect = ({ genre }) => {
    console.log(selectedGenres)
    let updatedGenres = []

    if (selectedGenres.includes(genre)) {
      updatedGenres = selectedGenres.filter(selectedGenre => selectedGenre !== genre);
    } else {
      updatedGenres = [...selectedGenres, genre];
    }

    setSelectedGenres(updatedGenres);
    localStorage.setItem('genres', JSON.stringify(updatedGenres));
  };

  function handleClick(id, type) {
    setPlayerId(id)
    setType(type)
    // console.log(id);
  }

  function handleLocalStorageClear() {
    localStorage.clear()
  }

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

  if (session) {
    if (weather) {
      if (fakeLoading) {
        return (
          <>
          <Head>
            <title>Stratusound</title>
            <meta name="description" content="Stratusound home page" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
          </Head>
          <div style={{width: "100%", display: "grid", placeContent: "center", height: "100vh"}}>
            <Loader />
          </div>
          </>
        )
      } else {
      return (
        <>
        <Head>
          <title>Stratusound</title>
          <meta name="description" content="Stratusound home page" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/" />
        </Head>
        <div className={styles.wrapper}>
          {/* <h1>Home</h1> */}
          {/* <button onClick={handleLocalStorageClear}>Clear local storage</button> */}
          {/* <WeatherCard
            location={location}
            description={weather.weather[0].description}
            high={weather.main.temp_max}
            low={weather.main.temp_min}
            main={weather.main.temp.toFixed(0)}
            weather={weather.weather[0].main}
          /> */}

          {weather ?
            <CurrentWeather
              name={weather.name}
              temp={weather.main.temp}
              description={weather.weather[0].description}
              main={weather.weather[0].main}
              onSearch={() => searchLocation()}
              onChange={event => setLocation(event.target.value)}
              location={location}
              max={weather.main.temp_max}
              min={weather.main.temp_min}
              weather={weather}
            />
            : <EmptyWeather
              onSearch={() => searchLocation()}
              onChange={event => setLocation(event.target.value)}
              location={location} />}

          {playerId.length > 0 && <div className={styles.player}>
            <iframe
              allow="encrypted-media"
              src={`https://open.spotify.com/embed/${type}/${playerId}?utm_source=generator&theme=1`}
              width="100%"
              // 80 or 152
              height="160"
              title="Spotify Player"
              style={{borderRadius: "1rem", border: "none"}}
            />
          </div>}
          <HomeWindow 
            selectedBackground={selectedBackground} 
            selectedRoom={selectedRoom} 
            selectedWindowFrame={selectedWindowFrame} 
            selectedWindowSill={selectedWindowSill} 
          />
          <Spacer vertical size={64} />
          
          <div className="genres">
          <h3 className="genresTitle">Select genres
            {expand ? ( <FaCompressAlt
          size={25}
          className="flexEnd"
          onClick={() => { setExpand(!expand) }}
        /> ) : (
          <FaExpandAlt 
          size={25} 
          className="flexEnd" 
          onClick={() => { setExpand(!expand) }}
           />
        )}
        </h3>
          <GenreChips
            handleClick={handleGenreSelect}
            selectedGenres={selectedGenres}
            expand={expand}
          />
        </div>

          <Spacer vertical size={64} />

          <h2>Songs for a {(weather.weather[0].main).toLowerCase()} day</h2>
          <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[
              { maxWidth: 'lg', cols: 4, spacing: 'lg' },
              { maxWidth: 'md', cols: 3, spacing: 'md' },
              { maxWidth: 'sm', cols: 2, spacing: 'sm' },
              { maxWidth: 'xs', cols: 1, spacing: 'sm' },
            ]}
          >
          <AnimatePresence>
            {recommendations.tracks && recommendations.tracks.map((item, i) => (
              <motion.div key={item.id}
                initial={{ opacity: 0, translateX: 50, translateY: -20 }}
                animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <MantineCard
                  title={item.name}
                  artist={item.artists.map((artist) => artist.name).join(', ')}
                  img={item.album.images[1].url}
                  id={item.id}
                  type="track"
                  handleClick={handleClick}
                />
              </motion.div>
            ))}
            </AnimatePresence>
          </SimpleGrid>

          <Spacer vertical size={64} />

          <h2>Playlists for a {(weather.weather[0].main).toLowerCase()} day</h2>
          {loading ? <div><Loader /></div> :
            <SimpleGrid
              cols={6}
              spacing="lg"
              breakpoints={[
                { maxWidth: 'lg', cols: 4, spacing: 'lg' },
                { maxWidth: 'md', cols: 3, spacing: 'md' },
                { maxWidth: 'sm', cols: 2, spacing: 'sm' },
                { maxWidth: 'xs', cols: 1, spacing: 'sm' },
              ]}
            >
              {playlists && playlists.map((item, i) => (
                <motion.div key={item.id}
                  initial={{ opacity: 0, translateX: 50, translateY: -20 }}
                  animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <MantineCard
                    title={item.name}
                    id={item.id}
                    img={item.images[0].url}
                    alt={item.name}
                    type="playlist"
                    handleClick={handleClick}
                  />
                </motion.div>
              ))}
            </SimpleGrid>
          }
          <Spacer vertical size={164} />
        </div>
        </>
      )
    }
  }
  }
}