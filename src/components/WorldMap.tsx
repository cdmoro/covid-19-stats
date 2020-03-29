import React, { FC } from 'react'
import country from "world-map-country-shapes";

interface Props {
    countries: Record<string, any>
    selectedCountry: string,
    setSelectedCountry: Function
}

const WorldMap: FC<Props> = ({ countries, selectedCountry, setSelectedCountry }) => {
  const hasData = (id: string): Boolean => {
    for (let country of countries.countries) {
      if (country.iso2 === id)
        return true
    }
    return false
  }

  const getCountryName = (id: string) => {
    for (let country of countries.countries) {
      if (country.iso2 === id)
        return country.name
    }
    return id
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="world-map"
      width="100%"
      viewBox="0 0 2000 1001"
    >
      {
        country.map((country: Record<string, any>) => {
          const countryName = getCountryName(country.id)
          
          if (hasData(country.id)) {
            return <path
              key={country.id}
              d={country.shape}
              className={
                `cursor-pointer transition-colors duration-200 ease-in-out stroke-gray-500 ${selectedCountry === country.id ? 'fill-accent' : 'fill-current'}`
              }
              onClick={() => setSelectedCountry(country.id)}
            >
              <title>{countryName}</title>
            </path>
          } else {
            return <path
              key={country.id} 
              d={country.shape} 
              className="fill-current opacity-75 stroke-gray-500"
            >
              <title>{countryName} (no data)</title>
            </path>
          }
        })
      }
    </svg>
  )
}

WorldMap.defaultProps = {
  countries: { countries: [] },
  setSelectedCountry: () => {}
}

export default WorldMap
