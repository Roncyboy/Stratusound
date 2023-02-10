import { getUserTopArtists } from "@/lib/spotify";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });
  const topArtists = await getUserTopArtists(accessToken);
  const data = await topArtists.json();

  return res.status(200).json(data);
};

export default handler;