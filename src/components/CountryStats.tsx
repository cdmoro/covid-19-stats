import React, { FC } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import useFetch from '../hooks/useFetch';
import StatCard from './StatCard';

const CountryStats: FC = () => {
    const [selectedCountry, setSelectedCountry] = useLocalStorage('country-selected', '{ "country": "Argentina", "code": "AR"}');
    const [countryData, cLoading, cError] = useFetch(
        `https://covid19.mathdro.id/api/countries/${selectedCountry.code}`
    )
    const [countries] = useFetch(
        "https://covid19.mathdro.id/api/countries"
    )
    const handleCountrySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(JSON.parse(e.currentTarget.value))
    }

    return (
        <div className="CountryStats neumorph mb-6 p-6">
            <select
                className="text-gray-900 w-full p-2 md:p-3 rounded-md mb-6 md:text-xl"
                onChange={handleCountrySelection}
                value={JSON.stringify(selectedCountry)}
            >
                {countries && Object.keys(countries.countries).map(countryName => {
                    return (
                        <option value={JSON.stringify({
                            "country": countryName,
                            "code": countries.countries[countryName]
                        })}>
                            {countryName} ({countries.countries[countryName]})
                        </option>
                    )
                })}
            </select>
            <div className="flex justify-center">
            {/* <h2>{selectedCountry}</h2> */}
                { cError.length > 0 && (
                    <div className="text-center text-gray-500 ">
                        <div className="font-sans text-5xl mb-3">¯\_(ツ)_/¯</div>
                        <div>{cError}</div>
                    </div>
                    )}
                {!cLoading && countryData && cError.length === 0 && (
                    <>
                        <StatCard
                            title="Confirmed"
                            value={countryData?.confirmed.value}
                        />
                        <StatCard
                            title="recovered"
                            value={countryData?.recovered.value}
                        />
                        <StatCard title="deaths" value={countryData?.deaths.value} />
                    </>
                )}
            </div>
        </div>
    )
}

export default CountryStats
