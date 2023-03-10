import { Chip, ScrollArea } from '@mantine/core';
import { useEffect, useState } from "react";

const genres = [
  "acoustic",
  "afrobeat",
  "alt-rock",
  "alternative",
  "ambient",
  "anime",
  "black-metal",
  "bluegrass",
  "blues",
  "bossanova",
  "brazil",
  "breakbeat",
  "british",
  "cantopop",
  "chicago-house",
  "children",
  "chill",
  "classical",
  "club",
  "comedy",
  "country",
  "dance",
  "dancehall",
  "death-metal",
  "deep-house",
  "detroit-techno",
  "disco",
  "disney",
  "drum-and-bass",
  "dub",
  "dubstep",
  "edm",
  "electro",
  "electronic",
  "emo",
  "folk",
  "forro",
  "french",
  "funk",
  "garage",
  "german",
  "gospel",
  "goth",
  "grindcore",
  "groove",
  "grunge",
  "guitar",
  "happy",
  "hard-rock",
  "hardcore",
  "hardstyle",
  "heavy-metal",
  "hip-hop",
  "holidays",
  "honky-tonk",
  "house",
  "idm",
  "indian",
  "indie",
  "indie-pop",
  "industrial",
  "iranian",
  "j-dance",
  "j-idol",
  "j-pop",
  "j-rock",
  "jazz",
  "k-pop",
  "kids",
  "latin",
  "latino",
  "malay",
  "mandopop",
  "metal",
  "metal-misc",
  "metalcore",
  "minimal-techno",
  "movies",
  "mpb",
  "new-age",
  "new-release",
  "opera",
  "pagode",
  "party",
  "philippines-opm",
  "piano",
  "pop",
  "pop-film",
  "post-dubstep",
  "power-pop",
  "progressive-house",
  "psych-rock",
  "punk",
  "punk-rock",
  "r-n-b",
  "rainy-day",
  "reggae",
  "reggaeton",
  "road-trip",
  "rock",
  "rock-n-roll",
  "rockabilly",
  "romance",
  "sad",
  "salsa",
  "samba",
  "sertanejo",
  "show-tunes",
  "singer-songwriter",
  "ska",
  "sleep",
  "songwriter",
  "soul",
  "soundtracks",
  "spanish",
  "study",
  "summer",
  "swedish",
  "synth-pop",
  "tango",
  "techno",
  "trance",
  "trip-hop",
  "turkish",
  "work-out",
  "world-music"
]

// TODO: Make responsive, get selected genres from user account/local storage

export default function GenreChips({ handleClick, selectedGenres, expand }) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(selectedGenres);
  }, []);

  if (expand) {
    return (
      <ScrollArea style={{ height: 300, transition: "0.25s" }}>
        <Chip.Group multiple>
          {genres.map((genre, index) => (
            <Chip checked={selectedGenres.includes(genre) ? true : false} genre={genre} variant="filled" key={index} value={genre} onClick={() => {
              handleClick({ genre })
            }}>{genre}</Chip>
          ))}
        </Chip.Group>
      </ScrollArea>
    );
  } else {
    return (
      <ScrollArea style={{ height: 50, transition: "0.25s" }}>
        {/* ... content */}
        <Chip.Group multiple>
          {/* {genres.map((genre, index) => (
            <Chip checked={selectedGenres.includes(genre) ? true : false} genre={genre} variant="filled" key={index} value={genre} onClick={() => {
              handleClick({ genre })
            }}>{genre}</Chip>
          ))} */}
          {selectedGenres.map((genre, index) => (
            <Chip checked={selectedGenres.includes(genre) ? true : false} genre={genre} variant="filled" key={index} value={genre} onClick={() => {
              handleClick({ genre })
            }}>{genre}</Chip>
          ))}


        {selectedGenres.length < 3 && genres.map((genre, index) => {
          if (index < 3) {
            return (
              <Chip checked={selectedGenres.includes(genre) ? true : false} genre={genre} variant="filled" key={index} value={genre} onClick={() => {
                handleClick({ genre })
              }}>{genre}</Chip>
            )
          }
        })}


        </Chip.Group>
      </ScrollArea>
    );
  }
}

// throws error on refresh
// checked={selectedGenres.includes(genre) ? true : false} 