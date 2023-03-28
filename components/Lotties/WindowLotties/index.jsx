import cat from "/public/windowAssets/pal/cat.json"
import fish from "/public/windowAssets/pal/fish.json"
import plant from "/public/windowAssets/pal/plant.json"
import { useLottie } from 'lottie-react';

import cloudy from "public/windowAssets/frontWeather/drizzle.json"
import rainy from "public/windowAssets/frontWeather/rain.json"
import sunny from "public/windowAssets/frontWeather/clear.json"
import snowy from "public/windowAssets/frontWeather/snow.json"
import stormy from "public/windowAssets/frontWeather/storm.json"
import sunnyCloudy from "public/windowAssets/frontWeather/clear.json"
import drizzly from "public/windowAssets/frontWeather/drizzle.json"
// import atomsphere from "public/windowAssets/frontWeather/atomsphere.json"


const style = {
    height: 150,
}

function returnPalLotties(pal){
    switch(pal) {
        case 'Cat':
            return cat;
        case 'Fish':
            return fish;
        case 'Plant':
            return plant;
        case 'Null':
            return;
    }
}


export const PalLotties = ({ pal }) => {
    const options = {
           loop: true,
           autoplay: true,
           initialSegment: [0, 141],
           animationData: { ...returnPalLotties(pal) },
    }

    const {View, playSegments, stop} = useLottie(options, style);
    return View;
}


function returnWindowWeather(weather) {
       switch (weather) {
              case 'Clouds':
                     return cloudy;
              case 'Rain':
                     return rainy;
              case 'Clear':
                     return sunny;
              case 'Snow':
                     return snowy;
              case 'Thunderstorm':
                     return stormy;
              case 'Drizzle':
                     return drizzly;
              case 'Fog':
                     return foggy;
              case 'Mist':
                     return foggy;
              case 'Haze':
                     return foggy;
              case 'Sunny':
                     return sunny;
              case 'Sunny Cloudy':
                     return sunnyCloudy;
              default:
                     return sunny;
       }
}

export const WindowWeather = ({ weather }) => {
       const options = {
              loop: true,
              autoplay: true,
              initialSegment: [0, 141],
              animationData: { ...returnWindowWeather(weather) },
       }

       const {View, playSegments, stop} = useLottie(options, style);
       return View;
}
