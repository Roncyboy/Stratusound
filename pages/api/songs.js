import { getSongs } from '../../lib/spotify';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });
  const response = await getSongs(accessToken);
  const data = await response.json();

  return res.status(200).json(data);
};

export default handler;