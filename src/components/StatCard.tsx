import React, { FC } from 'react'

interface Props {
    title: string,
    value: number
}

const StatCard: FC<Props> = ({ title, value }) => {
    return (
        <div className="StatCard neumorph neumorph-inset p-4 flex-1">
            <h1 className="text-3xl font-bold">{value}</h1>
            <h2 className="text-pink-600 font-bold uppercase">{ title }</h2>
        </div>
    )
}

export default StatCard
