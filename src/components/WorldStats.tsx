import React, { FC } from 'react'
import StatCard from './StatCard'
import useFetch from '../hooks/useFetch';

const WorldStats: FC = () => {
    const [worldData, wdLoading] = useFetch('https://covid19.mathdro.id/api');
    
    return (
        <>
            <h2 className="my-3 text-2xl">World data</h2>

            {
                !wdLoading && worldData && (
                    <div className="flex">
                        <StatCard title="Confirmed" value={worldData?.confirmed.value} />
                        <StatCard
                            title={`Recovered (${(
                                (worldData?.recovered.value / worldData?.confirmed.value) *
                                100
                            ).toFixed(2)}%)`}
                            value={worldData?.recovered.value}
                        />
                        <StatCard
                            title={`Deaths (${(
                                (worldData?.deaths.value / worldData?.confirmed.value) *
                                100
                            ).toFixed(2)}%)`}
                            value={worldData?.deaths.value}
                        />
                    </div>
            )
            }

            <div className="mt-4 text-xs text-gray-500 text-center">
                Last update: {worldData?.lastUpdate} | Made by Carlos Bonadeo
            </div>
        </>
    )
}

export default WorldStats
