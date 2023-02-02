import { getSongs } from '../../lib/spotify';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });
  const weather = req.query.weather;
  const songs = await getSongs(accessToken, weather);
  const data = await songs.json();

  return res.status(200).json(data);
};

export default handler;