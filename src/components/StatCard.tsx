import React, { FC } from 'react'

interface Props {
    title: string,
    value: number | undefined,
    className?: string
}

const StatCard: FC<Props> = ({ title, value, className }) => {
    return (
        <div className={`StatCard neumorph shadow-neumorph-inset px-4 py-3 flex-1 hover:shadow-neumorph-outset ${className}`}>
            <h1 className="text-md sm:text-xl md:text-3xl font-bold leading-tight">{value?.toLocaleString() || '--' }</h1>
            <h2 className="md:text-base sm:text-sm text-xs text-accent font-bold uppercase break-normal tracking-tight">{ title }</h2>
        </div>
    )
}

StatCard.defaultProps = {
    className: ''
}

export default StatCard
