import React, { FC } from 'react'
// @ts-ignore
import country from "world-map-country-shapes";

interface Props {
    selectedCountry: string,
    setSelectedCountry: Function
}

const WorldMap: FC<Props> = ({ selectedCountry = 'AR', setSelectedCountry = () => {} }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 2000 1001"
    >
      {country.map((country: Record<string, any>) => (
        <path
          key={country.id}
          d={country.shape}
          className={
            selectedCountry === country.id ? 'fill-accent' : 'fill-current'
          }
          style={{
            cursor: "pointer",
            stroke: "#ccc"
          }}
          onClick={() => setSelectedCountry(country.id)}
        >
          <title>{country.id}</title>
        </path>
      ))}
    </svg>
  )
}

export default WorldMap
