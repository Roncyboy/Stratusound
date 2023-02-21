const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';

// not being used because we want to insert a dynamic weather query
const QUERY_SONGS_ENDPOINT = 'https://api.spotify.com/v1/search?q=overcast&type=track'

/**
 * @description calls token endpoint and passes refresh token in
 * @param {*} refresh_token 
 * @returns an access token to query with
 */
const getAccessToken = async (refresh_token) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

/**
 * @description calls playlist endpoint
 * @param {*} refresh_token 
 * @returns returns fetch request to playlist endpoint
 */
export const getUsersPlaylists = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getWeatherPlaylists = async (refresh_token, weather) => {
  const { access_token } = await getAccessToken(refresh_token)

  // TODO: avoid making this call if we already have the access token
  // console.log('refresh token', refresh_token)
  // console.log('access token', access_token)

    return fetch(`https://api.spotify.com/v1/search?q=${weather}%20&type=playlist&limit=9&offset=1`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
  }

export const getUserTopTracks = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token)
  return fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getUserTopArtists = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token)
  return fetch(`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}


// example of how to get recommendations
// https://api.spotify.com/v1/recommendations?limit=5&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=rap%2Ccantonese&seed_tracks=0c6xIDDpzE81m2q797ordA

export const getRecommendations = async (refresh_token, limit, seed_artists, seed_genres, seed_tracks) => {
  const { access_token } = await getAccessToken(refresh_token)
  console.log(limit, seed_artists, seed_genres, seed_tracks)
  return fetch(`https://api.spotify.com/v1/recommendations?limit=${limit}&seed_artists=${seed_artists}&seed_genres=${seed_genres}&seed_tracks=${seed_tracks}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}