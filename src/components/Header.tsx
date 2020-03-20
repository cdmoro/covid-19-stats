import React, { FC, useEffect } from 'react'
import { ReactComponent as Moon } from '../assets/moon.svg'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Header: FC = () => {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')
    const themes: Record<string, any> = { dark: 'light', light: 'dark'}

    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])

    return (
        <div className="flex mb-2 items-center p-3">
            <h1 className="text-2xl flex-1">COVID-19 stats</h1>
            <button
                className="neumorph shadow-neumorph-outset rounded-full p-3 focus:outline-none active:shadow"
                title="Change theme"
                onClick={() => setTheme(themes[theme])}
            >
                <Moon />
            </button>
        </div>
    )
}

export default Header
