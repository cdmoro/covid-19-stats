import React, { FC } from 'react'
import { ReactComponent as GithubLogo } from '../assets/github.svg'
import '../styles/github-corner.css'

const GithubCorner: FC = () => {
    return (
        <a
            href="https://github.com/cdmoro/covid-19-stats"
            className="fixed top-0 right-0 hidden github-corner md:inline-block"
            aria-label="View source on GitHub"
            target="_blank"
            rel="noopener noreferrer"
        >
            <GithubLogo />
        </a>
    )
}

export default GithubCorner
