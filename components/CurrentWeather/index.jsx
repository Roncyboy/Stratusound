import { Flex } from "../Flex";
import { motion } from "framer-motion";
import { FaExpandAlt, FaCompressAlt } from 'react-icons/fa';
import { useState } from "react";
import styled from "styled-components";
import { WeatherLotties } from "../Lotties/WeatherLotties";

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
}) {
  const [expanded, setExpanded] = useState(false);

  function changeExpanded() {
    setExpanded(!expanded);
  }

  let weather = main;
  // console.log(weather)

  return (
    <Flex as={motion.div} padding="2em">
      <Flex dir="row" alignSelf="flex-start" align="flex-start">
        <StyledInput type="text" value={location} onChange={onChange} />
        <StyledSubmit onClick={onSearch}>Search</StyledSubmit>
      </Flex>
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
      <div>{name}</div>
      <div>{temp}</div>
      <div>{description}</div>
      <div>
        <WeatherLotties weather={`${weather}`} />
      </div>
      {expanded && <div>hidden weather things</div>}
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