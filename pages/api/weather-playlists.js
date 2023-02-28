import { getWeatherPlaylists } from '../../lib/spotify';
import { getSession } from 'next-auth/react';
import { useEffect } from "react";

import data from '../../data/mood.json'

const handler = async (req, res) => {

  let result = data.mood.find(mood => mood.name === req.query.weather)
  let moodsArray = result.moods

  let randomNumber = []
  while (randomNumber.length < 2) {
    var r = Math.floor(Math.random() * 5) + 1;
    if (randomNumber.indexOf(r) === -1) randomNumber.push(r);
  }

  let moods = `${moodsArray[randomNumber[0]]},${moodsArray[randomNumber[1]]}`
  console.log(moods)

  const {
    token: { accessToken },
  } = await getSession({ req });
  const songs = await getWeatherPlaylists(accessToken, moods);
  const responseData = await songs.json();

  return res.status(200).json(responseData);
};

export default handler;