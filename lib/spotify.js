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

export const getSongs = async (refresh_token, weather) => {
  const { access_token } = await getAccessToken(refresh_token)
  console.log('refresh token', refresh_token)
  console.log('access token', access_token)
  return fetch(`https://api.spotify.com/v1/search?q=${weather}t&type=track`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}