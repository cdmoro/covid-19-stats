import React, { FC, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const Header: FC = () => {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')
    const themes: Record<string, any> = { dark: 'light', light: 'dark'}

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        document.body.classList.remove('hidden')
    }, [theme])

    return (
      <div className="header flex mb-2 items-center p-3">
        <h1 className="text-2xl flex-1">COVID-19 stats</h1>
        <button
          className="neumorph shadow-neumorph-outset rounded-full p-3 focus:outline-none focus:shadow-lg active:shadow overflow-hidden w-12 h-12"
          title="Change theme"
          onClick={() => setTheme(themes[theme])}
        >
            <div className="flex w-20 justify-between transform transition-transform duration-200 text-accent -translate-x-px">
                <FontAwesomeIcon size="lg" fixedWidth icon={faMoon} />
                <FontAwesomeIcon size="lg" fixedWidth icon={faSun} />
            </div>
        </button>
      </div>
    )
}

export default Header
