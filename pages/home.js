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
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([])
  const [weather, setWeather] = useState();
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [topTracks, setTopTracks] = useState({})
  const [topArtists, setTopArtists] = useState({})
  const [recommendations, setRecommendations] = useState({})
  const [playerId, setPlayerId] = useState('')


  const apiKey = 'd81e2880e7fc30576236bb01fd689147'
  let lang = 'en'
  let units = 'metric'
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`

  // Functions
  useEffect(() => {
    const location = localStorage.getItem("location");
    const genres = localStorage.getItem("genres");

    setLocation(location);
    setGenres(genres);
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

  // Get playlists and recommendations
  useEffect(() => {
    if (weather) {
      

    }
  }, [weather])

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

  const getWeather = async () => {
    try {
      const res = await axios.get(url)
      console.log(res.data)
      setWeather(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getSongs = async () => {
    const res = await fetch(`/api/songs?weather=${weather.weather[0].main}`)
    const data = await res.json()
    // console.log(data)
    setSongs(data)
    // console.log(songs)
  }

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
      return data
    }

    const getTopArtists = async () => {
      try {const res = await fetch(`/api/topArtists?time_range=medium_large&limit=5`)
      const data = await res.json()
      console.log(data)
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

      console.log(artistSeed)
      console.log(trackSeed)


      if (selectedGenres.length === 0) {
        setSelectedGenres(['pop', ...selectedGenres]);
        console.log('push pop');
      }

      const res = await fetch(`/api/recommendations?limit=5&seed_artists=${artistSeed}&seed_genres=${selectedGenres}&seed_tracks=${trackSeed}`)
      const data = await res.json()
      console.log('These are the recommendations', data)
      setRecommendations(data)
    }

    weather && getRecommendations()

  }, [weather])

  const handleGenreSelect = ({ genre }) => {
    let updatedGenres = [];

    if (selectedGenres.includes(genre)) {
      updatedGenres = selectedGenres.filter(selectedGenre => selectedGenre !== genre);
    } else {
      updatedGenres = [...selectedGenres, genre];
    }

    setSelectedGenres(updatedGenres);
  };

  function handleClick(id) {
    setPlayerId(id)
    console.log(id);
  }

  if (session) {
    if (weather) {
      return (
        // TEMPORARY WHITE DARK MODE IS BROKEN
        <div style={{color: "white"}}>
          <h1>Home</h1>
          <p>Location: {location}</p>
          <p>{weather.weather[0].description}</p>
          <p>H: {weather.main.temp_max}</p>
          <p>L: {weather.main.temp_min}</p>

          <GenreChips
            handleClick={handleGenreSelect}
          />

          {playerId.length > 0 && <div>
            <iframe
              allow="encrypted-media"
              src={`https://open.spotify.com/embed/track/${playerId}?utm_source=generator&theme=0`}
              width="100%"

              // 80 or 152
              height="152"
              title="Spotify Player"
              style={{border: "none"}}
            />
          </div>}

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