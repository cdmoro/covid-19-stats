import React, { FC } from 'react'
import { useTranslation } from "react-i18next"

const Footer: FC = () => {
    const { t } = useTranslation()

    return (
        <div className="Footer mt-2 text-xs text-muted text-center">
            <div className="flex flex-col md:flex-row justify-center items-center mt-2">
                <div>{t('provided-by')} <a className="underline hover:no-underline" href="https://github.com/mathdroid/covid-19-api">COVID-19 API</a></div>
                <div className="hidden md:inline-block px-1">|</div>
                <div>
                    {t('powered-by')} <a className="underline hover:no-underline" href="https://www.linkedin.com/in/cdbonadeo/" target="_blank" rel="noopener noreferrer">Carlos Bonadeo</a>
                    <div className="md:hidden inline-block px-1">|</div>
                    <a className="md:hidden inline-block underline hover:no-underline" href="https://github.com/cdmoro/covid-19-stats">GitHub</a>
                </div>
            </div>
        </div>
    )
}

export default Footer
