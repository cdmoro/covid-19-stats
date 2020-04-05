import React, { FC, useState, useEffect, useMemo } from 'react'
import { useTranslation } from "react-i18next"
import { useLocalStorage } from '../hooks/useLocalStorage';
import useFetch from '../hooks/useFetch';
import StatCard from './StatCard';
import WorldMap from './WorldMap';
import { ICountry } from '../definitions/ICountry';
import { toPercentage } from '../utils/toPercentage';
import { COUNTRIES_URL, COUNTRY_DATA_URL } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faMap } from '@fortawesome/free-solid-svg-icons'
import continents from '../utils/continents.json'

const COUNTRY_DEFAULT: ICountry = {
  name: 'Argentina',
  iso2: 'AR',
  iso3: 'ARG'
}

interface ICountries {
  countries: ICountry[]
}

interface ICountryData {
  name: string,
  flag: string,
  population: number,
  area: number,
  latlng: [number, number]
}

type ICountryRest = Record<ICountry['iso2'], ICountryData>

const CountryStats: FC = () => {
    const { t } = useTranslation()
    const [selectedCountry, setSelectedCountry] = useLocalStorage('country-selected', COUNTRY_DEFAULT);
    const [countriesData, setCountriesData] = useState<ICountryRest>({})
    
    const [countryData, countryLoading, cError] = useFetch(
        `${COUNTRIES_URL}/${selectedCountry.iso2 || selectedCountry.name}`
    )
    
    const [countries] = useFetch<ICountry[]>(COUNTRIES_URL, (data: ICountries) => {
      return data.countries.map((country: ICountry) => {
        if (country.name === 'US')
          country.name = 'United States'

        return country
      })
    })

    const countriesByContinents = useMemo(() => {
      return Object.keys(continents).map((continent: string) =>
        <optgroup label={continent} key={continent}>
          {
            // @ts-ignore
            countries?.filter(country => continents[continent].includes(country.iso2))
              .map((country: ICountry) => {
                return (
                  <option key={country.name} value={JSON.stringify(country)}>
                    {country.name}
                  </option>
                )
              }
            )
          }
        </optgroup>
      )
    }, [countries])
    
    const handleCountrySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(JSON.parse(e.currentTarget.value))
    }

    const getCountryByIso2 = (iso2: string) => {
        for(let country of countries!) {
          if(country.iso2 === iso2) {
            return country
          }
        }

        throw new Error('Country not found')
    }

    useEffect(() => {
      const getCountryData = async (country: ICountry) => {
        if (!countriesData[country.iso2]) {
          const r = await fetch(
            `${COUNTRY_DATA_URL}/${country.iso2}?fields=name;flag;population;area;latlng`
          )
          const data = await r.json()

          setCountriesData({
            ...countriesData,
            [country.iso2]: data
          })
        }
      }

      getCountryData(selectedCountry)
    }, [countriesData, selectedCountry])

    return (
      <div className="flex flex-col lg:flex-row">
        <WorldMap
          countries={countries!}
          selectedCountry={selectedCountry.iso2}
          setSelectedCountry={(iso2: string) => {
            try {
              setSelectedCountry(getCountryByIso2(iso2))
            } catch (e) {}
          }}
        />

        <div className="neumorph lg:shadow-neumorph-inset lg:hover:shadow-neumorph-outset lg:ml-5 lg:w-4/12 lg:overflow-hidden">
          <div className="flex flex-row items-center mb-4 lg:flex-col lg:mb-0">
            <div className="w-12 h-12 mr-3 overflow-hidden transition-all duration-200 ease-in-out rounded-full shadow md:w-16 md:h-16 lg:w-full lg:h-40 lg:rounded-none lg:shadow-none md:mr-4 lg:mr-0 lg:mb-px bg-muted">
              <img
                className="object-cover h-full lg:w-full"
                src={countriesData[selectedCountry.iso2]?.flag}
                alt=""
              />
            </div>
            <div className="flex-grow lg:w-full">
              <div className="relative">
                <select
                  className="block w-full p-1 mb-1 leading-tight text-gray-900 rounded-md appearance-none lg:p-2 lg:rounded-none md:mb-2 md:text-lg lg:text-xl bg-primary text-back focus:outline-none focus:outline-shadow"
                  disabled={countryLoading}
                  onChange={handleCountrySelection}
                  value={JSON.stringify(selectedCountry)}
                >
                  {countriesByContinents}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="flex text-xs md:text-sm text-muted sx-4 lg:justify-center">
                <span>
                  <FontAwesomeIcon
                    className="mr-1"
                    fixedWidth
                    icon={faUserFriends}
                  />
                  {countriesData[
                    selectedCountry.iso2
                  ]?.population?.toLocaleString() || 0}
                </span>
                <span>
                  <FontAwesomeIcon className="mr-1" fixedWidth icon={faMap} />
                  {countriesData[
                    selectedCountry.iso2
                  ]?.area?.toLocaleString() || 0}
                  km<sup>2</sup>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center stats-cards lg:flex-col sx-2 sm:sx-5 lg:sx-0 lg:sy-3 lg:text-center lg:p-4">
            {cError.length > 0 && (
              <div className="text-gray-500">
                <div className="mb-3 font-sans text-5xl">¯\_(ツ)_/¯</div>
                <div>{cError}</div>
              </div>
            )}

            {cError.length === 0 && (
              <>
                <StatCard
                  className="lg:shadow-none lg:p-0 lg:hover:shadow-none"
                  title={`${t('confirmed')} (100%)`}
                  value={countryData?.confirmed?.value}
                />
                <StatCard
                  className="lg:shadow-none lg:p-0 lg:hover:shadow-none"
                  title={`${t('recovered')} (${toPercentage(
                    countryData?.recovered.value,
                    countryData?.confirmed.value
                  )})`}
                  value={countryData?.recovered?.value}
                />
                <StatCard
                  className="lg:shadow-none lg:p-0 lg:hover:shadow-none"
                  title={`${t('deaths')} (${toPercentage(
                    countryData?.deaths.value,
                    countryData?.confirmed.value
                  )})`}
                  value={countryData?.deaths?.value}
                />
              </>
            )}
          </div>
        </div>
      </div>
    )
}

export default CountryStats
