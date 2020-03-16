import React, { FC, useEffect } from 'react'
import { ReactComponent as Moon } from '../assets/moon.svg'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Header: FC = () => {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')

    useEffect(() => {
        document.body.classList.add(theme)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        document.body.classList.toggle('light')
        document.body.classList.toggle('dark')
    }

    return (
        <div className="flex mb-2 items-center p-3">
            <h1 className="flex-1">COVID-19 stats</h1>
            <button
                className="toggle-theme-button neumorph neumorph-outset rounded-full p-3 active:neumorph-inset"
                onClick={toggleTheme}
            >
                <Moon />
            </button>
        </div>
    )
}

export default Header
