import React, { FC } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import useFetch from '../hooks/useFetch';
import StatCard from './StatCard';
import WorldMap from './WorldMap';

const CountryStats: FC = () => {
    const [selectedCountry, setSelectedCountry] = useLocalStorage('country-selected', { 'country': 'Argentina', 'code': 'AR'});
    const [countryData, , cError] = useFetch(
        `https://covid19.mathdro.id/api/countries/${selectedCountry.code}`
    )
    const [countries] = useFetch(
        'https://covid19.mathdro.id/api/countries'
    )
    const handleCountrySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(JSON.parse(e.currentTarget.value))
    }

    const getCountryName = (code: string) => {
        let name = Object.entries(countries.countries).filter(
          country => country[1] === code
        )
        return name[0][0]
    }

    return (
      <div className="CountryStats neumorph shadow-neumorph-inset mb-6 p-6">
        <WorldMap
          selectedCountry={selectedCountry.code}
          setSelectedCountry={(code: string) =>
            setSelectedCountry({
                country: getCountryName(code),
                code
            })
          }
        />

        <select
          className="text-gray-900 w-full p-2 md:p-3 rounded-md mb-6 md:text-xl"
          onChange={handleCountrySelection}
          value={JSON.stringify(selectedCountry)}
        >
          {countries &&
            Object.keys(countries.countries).map(countryName => {
              return (
                <option
                  key={countryName}
                  value={JSON.stringify({
                    country: countryName,
                    code: countries.countries[countryName]
                  })}
                >
                  {countryName} ({countries.countries[countryName]})
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
                value={countryData?.confirmed.value}
              />
              <StatCard
                title="Recovered"
                value={countryData?.recovered.value}
              />
              <StatCard title="Deaths" value={countryData?.deaths.value} />
            </>
          )}
        </div>
      </div>
    )
}

export default CountryStats
