import { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import axios from "axios"
import { SimpleGrid } from "@mantine/core"

import GenreChips from "@/components/GenreChips";
import MantineCard from '@/components/MantineCard';

export default function Home() {
  // Variables
  const { data: session } = useSession()
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [genres, setGenres] = useState({});
  const [selectedGenres, setSelectedGenres] = useState([])
  const [weather, setWeather] = useState();
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [topTracks, setTopTracks] = useState({})
  const [topArtists, setTopArtists] = useState({})
  const [recommendations, setRecommendations] = useState({})
  const [playerId, setPlayerId] = useState('')
  const [type, setType] = useState('')


  const apiKey = 'd81e2880e7fc30576236bb01fd689147'
  let lang = 'en'
  let units = 'metric'
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`

  // Functions
  // Get location and genres from local storage
  useEffect(() => {
    const location = localStorage.getItem("location");
    const genres = JSON.parse(localStorage.getItem("genres"));

    setLocation(location);
    setGenres(genres);
    setSelectedGenres(genres);
    console.log("Genres", genres)
  }, [])

  // Get the weather on after getting location from local storage
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

  // Get recommendations and playlists
  useEffect(() => {
    const getWeatherPlaylists = async () => {
      const res = await fetch(`/api/weather-playlists?weather=${weather.weather[0].main}`)
      const data = await res.json()
      // console.log(data.playlists.items)
      setSongs(data.playlists.items)
      // console.log(songs)
    }

    const getTopTracks = async () => {
      const res = await fetch(`/api/topTracks?time_range=medium_large&limit=5`)
      const data = await res.json()
      console.log("Top Tracks", data)
      setTopTracks(data)
      return data
    }

    const getTopArtists = async () => {
      try {const res = await fetch(`/api/topArtists?time_range=medium_large&limit=5`)
      const data = await res.json()
      console.log("Top Artists", data)
      setTopArtists(data)
      return data}
      catch (err) {
        console.log(err)
      }
    }

    const getRecommendations = async () => {
      const topArtists = await getTopArtists()
      const topTracks = await getTopTracks()

      const artistSeed = await topArtists.items[0].id
      const trackSeed = await topTracks.items[0].id

      // console.log(artistSeed)
      // console.log(trackSeed)

      if (genres === []) {
        setSelectedGenres(['pop', ...selectedGenres]);
        console.log('push pop');
      }

      const res = await fetch(`/api/recommendations?limit=5&seed_artists=${artistSeed}&seed_genres=${selectedGenres}&seed_tracks=${trackSeed}`)
      const data = await res.json()
      // console.log('These are the recommendations', data)
      setRecommendations(data)
    }

    weather && getRecommendations() && getWeatherPlaylists()

  }, [weather])

  const handleGenreSelect = ({ genre }) => {
    console.log(selectedGenres)
    let updatedGenres = []

    // if (selectedGenres.includes(genre)) {
    //   updatedGenres = selectedGenres.filter(selectedGenre => selectedGenre !== genre);
    // } else {
      updatedGenres = [...selectedGenres, genre];
    // }

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

  if (session) {
    if (weather) {
      return (
        // TEMPORARY WHITE DARK MODE IS BROKEN
        <div style={{color: "white"}}>
          <h1>Home</h1>
          <button onClick={handleLocalStorageClear}>Clear local storage</button>
          <p>Location: {location}</p>
          <p>{weather.weather[0].description}</p>
          <p>H: {weather.main.temp_max}</p>
          <p>L: {weather.main.temp_min}</p>

          <h3>Select genres</h3>
          <GenreChips
            handleClick={handleGenreSelect}
            selectedGenres={selectedGenres}
          />

          {playerId.length > 0 && <div>
            <iframe
              allow="encrypted-media"
              src={`https://open.spotify.com/embed/${type}/${playerId}?utm_source=generator&theme=0`}
              width="100%"

              // 80 or 152
              height="152"
              title="Spotify Player"
              style={{border: "none"}}
            />
          </div>}

          <h2>Playlists for a rainy day</h2>
          <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[
              { maxWidth: 'md', cols: 3, spacing: 'md' },
              { maxWidth: 'sm', cols: 2, spacing: 'sm' },
              { maxWidth: 'xs', cols: 1, spacing: 'sm' },
            ]}
          >
            {songs && songs.map((item) => (
              <div key={item.id}>
                <MantineCard
                  title={item.name}
                  id={item.id}
                  img={item.images[0].url}
                  type="playlist"
                  handleClick={handleClick}
                />
              </div>
            ))}
          </SimpleGrid>

          <h2>Songs for a rainy day</h2>
          <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[
              { maxWidth: 'md', cols: 3, spacing: 'md' },
              { maxWidth: 'sm', cols: 2, spacing: 'sm' },
              { maxWidth: 'xs', cols: 1, spacing: 'sm' },
            ]}
          >
            {recommendations.tracks && recommendations.tracks.map((item) => (
              <div key={item.id}>
                <MantineCard
                  title={item.name}
                  artist={item.artists.map((artist) => artist.name).join(', ')}
                  img={item.album.images[1].url}
                  id={item.id}
                  type="track"
                  handleClick={handleClick}
                />
              </div>
            ))}
          </SimpleGrid>
        </div>
      )
    }
  }

}