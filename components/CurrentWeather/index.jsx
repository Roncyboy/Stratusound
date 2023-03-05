import { Flex } from "../Flex";
import { motion } from "framer-motion";
import { FaExpandAlt, FaCompressAlt } from 'react-icons/fa';
import { useEffect, useState } from "react";
import styled from "styled-components";
import { WeatherLotties } from "../Lotties/WeatherLotties";
import { useMantineTheme, Text } from "@mantine/core";
import { borderRadius } from "@mui/system";
import mood from '../../data/mood.json'

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
    <Flex as={motion.div} padding="1em" >
    <div style={{
      width: "100%",
      padding: "1rem",
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
        <Text fw={700}>{description}</Text>
        <Text fw={700}>{`H: ${max} L: ${min}`}</Text>
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}>
        <Text fw={600} style={{
          fontSize: "clamp(1.5rem, 5vw, 3rem)",
          padding: "0",
          margin: "0",
          position: "relative",
          left: "2em",
            }}>{temp}°</Text>
        <div style={{position: "relative", left: "2rem"}}>
        <WeatherLotties weather={`${main}`}/>
            </div>
      </div>
        </div>
      {expanded && <div>
        <div style={{display: "flex", justifyContent: "space-evenly", marginBottom: "1rem"}}>
        <div>
        <Text>Feels like</Text>
              <Text fw={700} style={{fontSize: "2rem"}}>{feelsLike}</Text>
            </div>
            <div>
              <Text>Humidity</Text>
        <Text fw={700} style={{fontSize: "2rem"}}>{humidity}</Text>
            </div>
            <div>
              <Text>Wind</Text>
              <Text fw={700} style={{fontSize: "2rem"}}>{wind}</Text>
            </div>
          </div>
        <Flex dir="row" justifyContent="true">
          <StyledInput type="text" value={location} onChange={onChange} />
          <StyledSubmit onClick={onSearch}>Search</StyledSubmit>
        </Flex>
      </div>}
      </div>
    </Flex>
  );
}

export default function EmptyWeather({ onChange, onSearch, location }) {
  return (
    <Flex as={motion.div} padding="2em">
      <Flex dir="row" alignSelf="flex-start" align="flex-start">
        <StyledInput type="text" value={location} onChange={onChange} />
        <StyledSubmit onClick={onSearch}>Search</StyledSubmit>
      </Flex>
      <FaCompressAlt />
      <p>Please search for a location. Maybe somewhere nice.</p>
    </Flex>
  );
}