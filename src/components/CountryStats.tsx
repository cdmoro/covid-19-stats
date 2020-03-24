import React, { FC } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import useFetch from '../hooks/useFetch';
import StatCard from './StatCard';
import WorldMap from './WorldMap';

interface Country {
  name: string,
  iso2: string,
  iso3: string
}

const CountryStats: FC = () => {
    const [selectedCountry, setSelectedCountry] = useLocalStorage('country-selected', { 'country': 'Argentina', 'code': 'AR'});
    const [countryData, countryLoading, cError] = useFetch(
        `https://covid19.mathdro.id/api/countries/${selectedCountry.code}`
    )
    const [countries] = useFetch(
        'https://covid19.mathdro.id/api/countries'
    )
    const handleCountrySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(JSON.parse(e.currentTarget.value))
    }

    const getCountryName = (code: string) => {
        for(let country of countries.countries) {
          if(country.iso2 === code) {
            return country.name
          }
        }
    }
    return (
      <div className="CountryStats neumorph sm:shadow-neumorph-inset mb-6 sm:p-6 p-0">
        <WorldMap
          selectedCountry={selectedCountry.code}
          setSelectedCountry={(code: string) => {
              setSelectedCountry({
                country: getCountryName(code),
                code
              })
            }
          }
        />


        <select
          className="text-gray-900 w-full p-2 md:p-3 rounded-md mb-6 md:text-xl bg-primary text-back"
          disabled={countryLoading}
          onChange={handleCountrySelection}
          value={JSON.stringify(selectedCountry)}
        >
          {countries &&
            (Object as any).values(countries.countries).map((country: Country) => {
              return (
                <option
                  key={country.name}
                  value={JSON.stringify({
                    country: country.name,
                    code: country.iso2
                  })}
                >
                  {country.name} ({country.iso2})
                </option>
              )
            })}
        </select>

        <div className="flex justify-center">
          {/* <h2>{selectedCountry}</h2> */}
          {cError.length > 0 && (
            <div className="text-center text-gray-500 ">
              <div className="font-sans text-5xl mb-3">¯\_(ツ)_/¯</div>
              <div>{cError}</div>
            </div>
          )}
          {cError.length === 0 && (
            <>
              <StatCard
                title="Confirmed"
                value={countryLoading ? undefined : countryData?.confirmed.value}
              />
              <StatCard
                title="Recovered"
                className="ml-2 sm:ml-5"
                value={countryLoading ? undefined : countryData?.recovered.value}
              />
              <StatCard
                title="Deaths"
                className="ml-2 sm:ml-5"
                value={countryLoading ? undefined : countryData?.deaths.value}
              />
            </>
          )}
        </div>
      </div>
    )
}

export default CountryStats
