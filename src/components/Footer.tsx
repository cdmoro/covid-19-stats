import React, { FC } from 'react'

interface Props {
    lastUpdate: string
}

const Footer: FC<Props> = ({ lastUpdate }) => {
    return (
        <div className="Footer mt-4 text-xs text-gray-500 text-center">
            <div className="flex flex-col md:flex-row justify-center items-center">
                <span>Last update: {lastUpdate}</span>
                <span className="hidden md:inline-block px-1">|</span>
                <span>Powered by <a className="hover:underline" href="https://github.com/mathdroid/covid-19-api">COVID-19 API</a></span>
            </div>
            <div className="mt-1">Made by Carlos Bonadeo</div>
        </div>
    )
}

export default Footer
