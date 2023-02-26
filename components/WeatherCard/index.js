import Image from "next/image"
import styles from './WeatherCard.module.css'

import { Spacer } from "../Spacer"

export default function WeatherCard({ location, description, high, low, main}) {
  return (
    <div className={styles.wrapper}>
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