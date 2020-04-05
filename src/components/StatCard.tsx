import React, { FC } from 'react'

interface Props {
    title: string,
    value: number | undefined,
    className?: string
}

const StatCard: FC<Props> = ({ title, value, className }) => {
    return (
        <div className={`StatCard neumorph shadow-neumorph-inset px-4 py-3 flex-1 hover:shadow-neumorph-outset ${className}`}>
            <h1 className="font-bold leading-tight text-md sm:text-xl md:text-3xl">{value?.toLocaleString() || '--' }</h1>
            <h2 className="text-xs font-bold tracking-tight uppercase break-normal md:text-base sm:text-sm text-accent">{ title }</h2>
        </div>
    )
}

StatCard.defaultProps = {
    className: ''
}

export default StatCard
