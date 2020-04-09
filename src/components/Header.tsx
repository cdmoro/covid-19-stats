import React, { FC, useEffect, useMemo } from 'react'
import { useTranslation } from "react-i18next"
import { useLocalStorage } from '../hooks/useLocalStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'
import locales from '../locales'

type localesKey = keyof typeof locales

const Header: FC = () => {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')
    const themes: Record<string, any> = { dark: 'light', light: 'dark'}
    const { t, i18n } = useTranslation()
    const languageSelected = useMemo(() => {
      return i18n.language.split('-')[0]
    }, [i18n.language])

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        document.body.classList.remove('hidden')
    }, [theme])

    const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      i18n.changeLanguage(e.currentTarget.value)
    }

    return (
      <div className="flex items-center p-3 mb-1 header">
        <h1 className="flex-1 text-xl sm:text-2xl">
          <img 
            className="inline w-10 mr-2 transition-all duration-200 ease-in-out lg:mr-3 virus-icon text-accent lg:w-12" 
            src="logo192.png" 
            alt="COVID-19 stats main logo" 
          />
          {t("title")}
        </h1>
        <div className="relative inline-block text-accent">
          <select
            className="h-10 pl-3 pr-3 text-xs font-bold uppercase bg-transparent appearance-none cursor-pointer sm:text-sm focus:outline-none sm:h-12 sm:pl-10"
            onChange={handleLocaleChange}
            value={languageSelected}
          >
            {
              Object.keys(locales).sort().map((key: string) => (
                <option key={key} value={key}>
                  {locales[key as localesKey].name}
                </option>
              ))
            }
          </select>
          <FontAwesomeIcon 
            className="absolute inset-y-0 left-0 flex items-center justify-center hidden h-12 ml-4 pointer-events-none sm:inline-block"
            fixedWidth 
            icon={faGlobeAmericas}
          />
        </div>
        <button
          className="w-10 h-10 p-2 overflow-hidden rounded-full neumorph shadow-neumorph-outset sm:p-3 focus:outline-none focus:shadow-lg active:shadow sm:w-12 sm:h-12"
          title={t("change-theme")}
          onClick={() => setTheme(themes[theme])}
        >
          <div className="flex justify-between w-20 transition-transform duration-200 transform -translate-x-px text-accent">
            <FontAwesomeIcon size="lg" fixedWidth icon={faMoon} />
            <FontAwesomeIcon size="lg" fixedWidth icon={faSun} />
          </div>
        </button>
      </div>
    )
}

export default Header
