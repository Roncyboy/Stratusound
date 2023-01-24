import axios from "axios"
import { useState } from "react";
import { resolve } from "styled-jsx/css";

export default async function handler() {

  const apiKey = 'd81e2880e7fc30576236bb01fd689147'
  const lang = 'en'
  const units = 'metric'
  const location = 'vancouver'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`

  try {
    const res = await axios.get(url)
    console.log(res.data.main)
    return res.data
  } catch (err) {
    console.log(err)
  }
}