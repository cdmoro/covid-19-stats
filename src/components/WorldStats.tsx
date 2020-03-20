import React, { FC } from 'react'
import StatCard from './StatCard'
import useFetch from '../hooks/useFetch';

const WorldStats: FC = () => {
    const [data, loading] = useFetch('https://covid19.mathdro.id/api');

    const toPercentage = (value: number): string => {
        return `${((value / data.confirmed.value) * 100).toFixed(2)}%`;
    }
    
    return (
        <>
            <h2 className="my-3 text-2xl">World data</h2>

            {
                !loading && (
                    <div className="flex">
                        <StatCard 
                            title="Confirmed"
                            value={data.confirmed.value}
                        />
                        <StatCard
                            title={`Recovered (${toPercentage(data.recovered.value)})`}
                            value={data?.recovered.value}
                        />
                        <StatCard
                            title={`Deaths (${toPercentage(data.deaths.value)})`}
                            value={data.deaths.value}
                        />
                    </div>
                )
            }

            <div className="mt-3 text-xs text-muted text-center">
                Last updated: {data?.lastUpdate}
            </div>
        </>
    )
}

export default WorldStats
