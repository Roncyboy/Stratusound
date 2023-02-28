import cloudy from '/public/lottie/weather/cloudy.json';
import rainy from '/public/lottie/weather/rainy.json';
import sunny from '/public/lottie/weather/sunny.json';
import snowy from '/public/lottie/weather/snowy.json';
import stormy from '/public/lottie/weather/stormy.json';
import sunnyCloudy from '/public/lottie/weather/sunnyCloudy.json';
import foggy from '/public/lottie/weather/foggy.json';
import drizzly from '/public/lottie/weather/drizzly.json';
import { useLottie } from 'lottie-react';

const style = {
       height: 150,
};

function returnWeather(weather) {
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

export const WeatherLotties = ({ weather }) => {
       const options = {
              loop: false,
              autoplay: true,
              initialSegment: [0, 141],
              animationData: { ...returnWeather(weather) },
       }

       const {View, playSegments, stop} = useLottie(options, style);
       return View;
}
