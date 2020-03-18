import React, { FC, useEffect } from 'react'
import { ReactComponent as Moon } from '../assets/moon.svg'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Header: FC = () => {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')
    const themes: Record<string, any> = { dark: 'light', light: 'dark'}

    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.currentTarget.blur();
        setTheme(themes[theme])
    }

    return (
        <div className="flex mb-2 items-center p-3">
            <h1 className="text-2xl flex-1">COVID-19 stats</h1>
            <button
                className="neumorph rounded-full p-3 outline-none"
                title="Change theme"
                onClick={toggleTheme}
            >
                <Moon />
            </button>
        </div>
    )
}

export default Header
