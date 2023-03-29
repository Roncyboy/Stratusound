import { Flex } from "../Flex";
import { motion } from "framer-motion";
import { FaExpandAlt, FaCompressAlt } from 'react-icons/fa';
import { useEffect, useState } from "react";
import styled from "styled-components";
import { WeatherLotties } from "../Lotties/WeatherLotties";
import { borderRadius } from "@mui/system";
import mood from '../../data/mood.json'
import { Spacer } from "../Spacer";
import { useMantineTheme } from "@mantine/core";
import HomeWindow from "../HomeWindow";

const StyledInput = styled.input`
  
`;
const StyledSubmit = styled.button`

`;

export function CurrentWeather({
  name,
  temp,
  description,
  main,
  onSearch,
  onChange,
  location,
  weather,
  max,
  min,
}) {
  const theme = useMantineTheme();
  const [expanded, setExpanded] = useState(false);
  const [color, setColor] = useState('blue')

  useEffect(() => {
    getMoodColor()
    console.log('useEffect ran')
    console.log(color)
  }, weather)

  function getMoodColor() {
    for (let i = 0; i < mood.mood.length; i++) {
      if (mood.mood[i].name === main) {
        setColor(mood.mood[i].color)
      }
    }
  }

  function changeExpanded() {
    setExpanded(!expanded);
  }

  console.log(weather)

  const feelsLike = weather.main.feels_like
  const humidity = weather.main.humidity
  const wind = weather.wind.speed


  return (
    <Flex as={motion.div} padding="2rem 2rem 1rem 0rem" align='flex-start' maxWidth='70%'>
    <div style={{
      width: "100%",
      padding: "2rem 2rem 2rem 3rem",
      backgroundImage: `linear-gradient(45deg, #222, ${color})`,
      borderRadius: "2rem",
    }}>
      <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between"}}>
      <h1 style={{
        fontSize: "2rem",
        fontWeight: "bold",
      }}>{name}</h1>
      <button aria-label="Toggle weather details" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        border: "none",
      }}>
        {expanded ? (
          <FaCompressAlt
            size={25}
            className="flexEnd"
            onClick={changeExpanded}
          />
        ) : (
          <FaExpandAlt
            size={25}
            className="flexEnd"
            onClick={changeExpanded} />
        )}
        </button>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "40% 60%",
      }}>
      <div style={{
        marginTop: "0.5em"
      }}>
        <p>{description}</p>
        <p>{`H: ${max} L: ${min}`}</p>
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}>
        <p style={{
          fontSize: "clamp(1.5rem, 5vw, 3rem)",
          padding: "0",
          margin: "0",
          position: "relative",
          left: "2em",
            }}>{temp}°</p>
        <div style={{position: "relative", left: "2rem"}}>
        <WeatherLotties weather={`${main}`}/>
            </div>
      </div>
        </div>
      {expanded && <div>
        <div style={{display: "flex", justifyContent: "space-evenly", marginBottom: "1rem"}}>
        <div>
        <p>Feels like</p>
              <p style={{fontSize: "2rem"}}>{feelsLike}</p>
            </div>
            <div>
              <p>Humidity</p>
        <p style={{fontSize: "2rem"}}>{humidity}</p>
            </div>
            <div>
              <p>Wind</p>
              <p style={{fontSize: "2rem"}}>{wind}</p>
            </div>
          </div>
        <Flex dir="row" justifyContent="true">
          <StyledInput type="p" value={location} onChange={onChange} />
          <StyledSubmit onClick={onSearch}>Search</StyledSubmit>
        </Flex>
      </div>}
      </div>
      {/* <HomeWindow /> */}
    </Flex>
  );
}

export default function EmptyWeather({ onChange, onSearch, location }) {
  const theme = useMantineTheme();
  return (
    <>
      <Spacer vertical size={12} />
        {/* <StyledInput type="p" value={location} onChange={onChange} /> */}
        <input type="p" value={location} onChange={onChange} placeholder="Search location" style={{
          width: "90%",
          padding: "0.5rem 1rem",
        }}/>
        {/* <StyledSubmit onClick={onSearch} style={{width: "10%"}}>Search</StyledSubmit> */}
        <button type="submit" onClick={onSearch} style={{
          padding: "0.5rem 1rem",
          width: "10%",
          cursor: "pointer",
        }}
        >Search</button>
    </>
  );
}
