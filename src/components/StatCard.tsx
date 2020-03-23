import React, { FC } from 'react'

interface Props {
    title: string,
    value: number | undefined
}

const StatCard: FC<Props> = ({ title, value }) => {
    return (
        <div className="StatCard neumorph shadow-neumorph-inset p-4 flex-1 hover:shadow-neumorph-outset">
            <h1 className="text-xl md:text-3xl font-bold">{value?.toLocaleString() || '-' }</h1>
            <h2 className="md:text-base text-xs text-accent font-bold uppercase">{ title }</h2>
        </div>
    )
}

export default StatCard
