import React, { FC, useEffect } from 'react'
import { useTranslation } from "react-i18next"
import { useLocalStorage } from '../hooks/useLocalStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const Header: FC = () => {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')
    const themes: Record<string, any> = { dark: 'light', light: 'dark'}
    const { t, i18n } = useTranslation()

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        document.body.classList.remove('hidden')
    }, [theme])

    const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      i18n.changeLanguage(e.currentTarget.value)
    }

    return (
      <div className="header flex items-center p-3">
        <h1 className="text-2xl flex-1">{t("title")}</h1>
        <select
          className="text-sm md:text-base mr-1 md:mr-2 focus:outline-none text-accent px-3 appearance-none bg-transparent h-12 cursor-pointer underline"
          onChange={handleLocaleChange}
          value={window.localStorage.getItem("i18nextLng") || "en"}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
        <button
          className="neumorph shadow-neumorph-outset rounded-full p-3 focus:outline-none focus:shadow-lg active:shadow overflow-hidden w-12 h-12"
          title={t("change-theme")}
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
