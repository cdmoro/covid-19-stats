import React, { FC } from 'react'

interface Props {
    title: string,
    value: number
}

const StatCard: FC<Props> = ({ title, value }) => {
    return (
        <div className="StatCard neumorph p-4 flex-1">
            <h1 className="text-xl md:text-3xl font-bold">{value}</h1>
            <h2 className="md:text-base text-xs text-pink-600 font-bold uppercase">{ title }</h2>
        </div>
    )
}

export default StatCard
