# Stratusound
Welcome to Stratusound, the weather-based music recommendation app that enhances your Spotify listening experience!

With Stratusound, you can enjoy personalized music recommendations based on the current weather in your location. Our app uses real-time weather data to recommend playlists and tracks that match your mood and surroundings.

## Limitations
Stratusound is built on the Spotify API, which currently limits us to a maximum of 25 users. Unfortunately, we cannot request an increase in this limit until the app is fully developed. As a result, only invited users can currently run the app.

To ensure the best user experience, we recommend using the Google Chrome browser on a desktop computer to run the app. While other browsers and devices may work, we have optimized the app for use on Chrome and desktop devices.

## Requirements
To run the app, you will need to set up your own .env.local file with the necessary credentials. These credentials will not be available to everyone who views our repository. If you are an invited user, please follow the instructions provided in the invitation email or message to obtain the necessary credentials.

## Getting Started
To run this application, clone the repository and navigate to the project directory. 

1. Clone the repository to your local machine:

```bash
git clone https://github.com/username/repo.git
```

2. Navigate to the closed repository.
```bash
cd repo
```

3. Move the .env.local files to the root directory of the project:
```bash
mv path/to/.env.local .env.local
```

4. Install the required dependencies using npm:
```bash
npm install
```

5. Run the development server:
```bash
npm run dev
```

6. Navigate to localhost:3000 in your browser to view the app.

## Tools used
- Next.js 13
- Mantine
- Playwright
- Axios

## APIs used
- [OpenWeatherMap](https://openweathermap.org/api)
- [Spotify](https://developer.spotify.com/documentation/web-api/)
