import React, { FC } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import useFetch from '../hooks/useFetch';
import StatCard from './StatCard';

const CountryStats: FC = () => {
    const [selectedCountry, setSelectedCountry] = useLocalStorage('country-selected', 'AR');
    const [countryData, cLoading, cError] = useFetch(
        `https://covid19.mathdro.id/api/countries/${selectedCountry}`
    )
    const [countries, countriesLoading] = useFetch(
        "https://covid19.mathdro.id/api/countries"
    )
    const handleCountrySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(e.currentTarget.value)
    }

    return (
        <div className="neumorph neumorph-inset mb-6 p-6">
            {!countriesLoading && countries && (
                <select
                    className="text-gray-900 w-full p-2 md:p-3 rounded-md mb-6 md:text-xl"
                    onChange={handleCountrySelection}
                    value={selectedCountry}
                >
                    {Object.keys(countries.countries).map(countryName => {
                        return (
                            <option value={countries.countries[countryName]}>
                                {countryName}
                            </option>
                        )
                    })}
                </select>
            )}
            {/* <h2>{selectedCountry}</h2> */}
            {cError}
            {!cLoading && countryData && cError.length === 0 && (
                <div className="flex">
                    <StatCard
                        title="Confirmed"
                        value={countryData?.confirmed.value}
                    />
                    <StatCard
                        title="recovered"
                        value={countryData?.recovered.value}
                    />
                    <StatCard title="deaths" value={countryData?.deaths.value} />
                </div>
            )}
        </div>
    )
}

export default CountryStats
