import React, { FC } from 'react'
import StatCard from './StatCard'
import useFetch from '../hooks/useFetch';
import Footer from './Footer';

const WorldStats: FC = () => {
    const [worldData, wdLoading] = useFetch('https://covid19.mathdro.id/api');
    
    return (
        <>
            <h2 className="my-3 text-2xl flex justify-between items-baseline">
                <span>World data</span>
                {/* <span className="text-xs text-gray-500 mr-2">{worldData?.lastUpdate}</span> */}
            </h2>

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

            <Footer lastUpdate={worldData?.lastUpdate}/>
        </>
    )
}

export default WorldStats
