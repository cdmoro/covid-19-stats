import React, { FC } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import useFetch from '../hooks/useFetch';
import StatCard from './StatCard';
import WorldMap from './WorldMap';
import ICountry from '../definitions/ICountry';

const CountryStats: FC = () => {
    const [selectedCountry, setSelectedCountry] = useLocalStorage('country-selected', { name: 'Argentina', iso2: 'AR', iso3: 'ARG' } as ICountry);
    const [countryData, countryLoading, cError] = useFetch(
        `https://covid19.mathdro.id/api/countries/${selectedCountry.name}`
    )
    const [countries] = useFetch(
        'https://covid19.mathdro.id/api/countries'
    )
    const handleCountrySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(JSON.parse(e.currentTarget.value))
    }

    const getCountryByIso2 = (iso2: string) => {
        for(let country of countries.countries) {
          if(country.iso2 === iso2) {
            return country
          }
        }

        throw new Error('Country not found')
    }

    const toPercentage = (value: number): string => {
      const percentage: number = (value / countryData?.confirmed.value) * 100 || 0
      return `${percentage.toFixed(2)}%`;
    }

    return (
      <div className="CountryStats neumorph sm:shadow-neumorph-inset mb-6 sm:p-6 p-0">
        <WorldMap
          countries={countries}
          selectedCountry={selectedCountry.iso2}
          setSelectedCountry={(iso2: string) => {
              try {
                setSelectedCountry(getCountryByIso2(iso2))
              } catch(e) {

              }
            }
          }
        />


        <select
          className="block text-gray-900 w-full p-2 md:p-3 rounded-md mb-6 md:text-xl bg-primary text-back focus:outline-none focus:outline-shadow"
          disabled={countryLoading}
          onChange={handleCountrySelection}
          value={JSON.stringify(selectedCountry)}
        >
          <option value="{}"></option>
          { countries &&
            countries.countries.map((country: ICountry) => {
              return (
                <option
                  key={country.name}
                  value={JSON.stringify(country)}
                >
                  {country.name}
                </option>
              )
            })}
        </select>

        <div className="flex justify-center sx-2 sm:sx-5">
          {cError.length > 0 && (
            <div className="text-center text-gray-500 ">
              <div className="font-sans text-5xl mb-3">¯\_(ツ)_/¯</div>
              <div>{cError}</div>
            </div>
          )}
          {cError.length === 0 && (
            <>
              <StatCard
                title="Confirmed (100%)"
                value={countryLoading ? undefined : countryData?.confirmed.value}
              />
              <StatCard
                title={`Recovered (${toPercentage(countryData?.recovered.value)})`}
                value={countryLoading ? undefined : countryData?.recovered.value}
              />
              <StatCard
                title={`Deaths (${toPercentage(countryData?.deaths.value)})`}
                value={countryLoading ? undefined : countryData?.deaths.value}
              />
            </>
          )}
        </div>
      </div>
    )
}

export default CountryStats
