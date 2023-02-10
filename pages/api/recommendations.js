import { getRecommendations } from "@/lib/spotify";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });
  const { limit, seed_artists, seed_genres, seed_tracks } = req.query;
  console.log(req.query)
  const splitSeedGenres = seed_genres.split(',')
  console.log(splitSeedGenres)
  const recommendations = await getRecommendations(accessToken, limit, seed_artists, seed_genres, seed_tracks);
  const data = await recommendations.json();

  return res.status(200).json(data);
};

export default handler;