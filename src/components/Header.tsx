import React, { FC, useEffect } from 'react'
import { useTranslation } from "react-i18next"
import { useLocalStorage } from '../hooks/useLocalStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun, faGlobeAmericas, faVirus } from '@fortawesome/free-solid-svg-icons'
import locales from '../locales'

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
      <div className="header flex items-center p-3 mb-1">
        <h1 className="text-xl sm:text-2xl flex-1">
          <FontAwesomeIcon className="virus-icon transition-all duration-200 ease-in-out text-accent mr-2" size="lg" fixedWidth icon={faVirus} />
          {t("title")}
        </h1>
        <div className="inline-block relative text-accent">
          <select
            className="cursor-pointer text-xs sm:text-sm font-bold uppercase focus:outline-none appearance-none bg-transparent h-10 sm:h-12 pr-3 pl-3 sm:pl-10"
            onChange={handleLocaleChange}
            value={i18n.language}
          >
            {
              Object.keys(locales).sort().map((key: string) => (
                <option key={key} value={key}>
                  {locales[key as keyof typeof locales].name}
                </option>
              ))
            }
          </select>
          <FontAwesomeIcon 
            className="hidden sm:inline-block pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center h-12 ml-4"
            fixedWidth 
            icon={faGlobeAmericas}
          />
        </div>
        <button
          className="neumorph shadow-neumorph-outset rounded-full p-2 sm:p-3 focus:outline-none focus:shadow-lg active:shadow overflow-hidden w-10 h-10 sm:w-12 sm:h-12"
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
