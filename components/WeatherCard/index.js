import Image from "next/image"
import styles from './WeatherCard.module.css'
import { useMantineTheme } from '@mantine/core';

import { Spacer } from "../Spacer"

export default function WeatherCard({ location, description, high, low, main, weather}) {
  const theme = useMantineTheme();

  let accentColor = 'blue'
  if (weather === 'Clear') {
    accentColor = theme.colors.clear[5]
  } else if (weather === 'Clouds') {
    accentColor = theme.colors.cloudy[5]
  } else if (weather === 'Drizzle') {
    accentColor = theme.colors.drizzle[5]
  } else if (weather === 'Rain') {
    accentColor = theme.colors.rain[5]
  } else if (weather === 'Thunderstorm') {
    accentColor = theme.colors.rain[5]
  } else {
    accentColor = theme.colors.snow[5]
  }


  return (
    <div className={styles.wrapper} style={{ background: theme.fn.linearGradient(60, 'gray', accentColor)}}>
      <div>
      <h1>{location}</h1>
      <p>{description}</p>
      <p>H: {high}</p>
      <p>L: {low}</p>
      </div>
      <div className={styles.right}>
        <p className={styles.temp}>{main} °C</p>
        <Image
          src="/weather-icons/broken-clouds.png"
          alt="Broken clouds"
          width={100}
          height={100}
        />
      </div>

    </div>
  )
}