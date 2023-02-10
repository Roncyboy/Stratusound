import { getUserTopTracks } from "@/lib/spotify";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });
  const topTracks = await getUserTopTracks(accessToken);
  const data = await topTracks.json();

  return res.status(200).json(data);
};

export default handler;