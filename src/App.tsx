import React, { FC, useEffect } from 'react';
import useFetch from './hooks/useFetch';
import StatCard from './components/StatCard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ReactComponent as Moon } from './assets/moon.svg'

const App: FC = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark')
  const [worldData, wdLoading, wdError] = useFetch('https://covid19.mathdro.id/api');
  const [selectedCountry, setSelectedCountry] = useLocalStorage('country-selected', 'AR');
  const [countryData, cLoading, cError] = useFetch(
    `https://covid19.mathdro.id/api/countries/${selectedCountry}`
  )
  const [countries, countriesLoading] = useFetch(
    "https://covid19.mathdro.id/api/countries"
  )

  useEffect(() => {
    document.body.classList.add(theme)
  }, [])

  const handleCountrySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.currentTarget.value)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.body.classList.toggle('light')
    document.body.classList.toggle('dark')
  }

  // useEffect(() => {

  // }, [])

  return (
    <div className="App flex flex-col justify-center items-center min-h-screen">
      <div className="w-screen md:w-6/12">
        {/* <h1>
          <span role="img" aria-label="Crown icon">👑</span>
          <span role="img" aria-label="Microbe icon">🦠</span>
          COVID-19
        </h1> */}
        <button
          className="toggle-theme-button neumorph neumorph-outset rounded-full h-10 w-10 text-center"
          onClick={toggleTheme}
        >
          <Moon />
          {/* {moon} */}
          {/* <img src={moon} alt="Theme icon" /> */}
        </button>
        <div className="neumorph neumorph-inset mb-6 p-6 h-64">
          { !countriesLoading && countries && (
            <select 
              className="text-gray-900 w-full p-3 rounded-md mb-6" 
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
          { cError }
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

        <h2 className="my-3 text-2xl">World data</h2>

        {!wdLoading && worldData && (
          <div className="flex">
            <StatCard title="Confirmed" value={worldData?.confirmed.value} />
            <StatCard
              title={`Recovered (${(
                (worldData?.recovered.value / worldData?.confirmed.value) *
                100
              ).toFixed(2)}%)`}
              value={worldData?.recovered.value}
            />
            <StatCard
              title={`Deaths (${(
                (worldData?.deaths.value / worldData?.confirmed.value) *
                100
              ).toFixed(2)}%)`}
              value={worldData?.deaths.value}
            />
          </div>
        )}
      </div>
      <div className="mt-4 text-xs text-gray-500">
        Last update: {worldData?.lastUpdate}
      </div>
    </div>
  )
}

export default App;
