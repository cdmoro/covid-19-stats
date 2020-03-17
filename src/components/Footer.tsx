import React, { FC } from 'react'

interface Props {
    lastUpdate: string
}

const Footer: FC<Props> = ({ lastUpdate }) => {
    return (
        <div className="Footer mt-4 text-xs text-gray-500 text-center">
            <div>Last update: {lastUpdate}</div>
            <div className="flex flex-col md:flex-row justify-center items-center mt-2">
                <div>Powered by <a className="hover:underline" href="https://github.com/mathdroid/covid-19-api">COVID-19 API</a></div>
                <div className="hidden md:inline-block px-1">|</div>
                <div>Made by Carlos Bonadeo</div>
            </div>
        </div>
    )
}

export default Footer
