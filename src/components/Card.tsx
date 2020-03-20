import React, { FC } from 'react'

interface Props {
    title: string
}

const Card: FC<Props> = ({ title, children }) => {
    return (
        <div className="card neumorph shadow-neumorph-inset p-4 mx-3 flex-1">
            {children}
            <h2 className="text-pink-600 font-bold uppercase">{ title }</h2>
        </div>
    )
}

export default Card
