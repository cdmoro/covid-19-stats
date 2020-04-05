import React, { FC } from 'react'
import { useTranslation } from "react-i18next"
import { formatDistanceToNow, format } from 'date-fns';
import StatCard from './StatCard'
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../api';
import { toPercentage } from '../utils/toPercentage';
import { IStat } from '../definitions/IStat';
import DailyStats from './DailyStats';

const WorldStats: FC = () => {
    const { t } = useTranslation()
    const [data, , error] = useFetch<IStat>(BASE_URL);
    
    return (
      <>
        <div className="lg:flex">
          <div className="lg:mr-5 lg:w-3/12">
            <h2 className="my-3 text-2xl">{t("world-data")}</h2>

            {error.length === 0 && (
              <div className="flex stats-cards sx-2 sm:sx-5 lg:flex-col lg:sy-5 lg:sx-0">
                <StatCard
                  title={`${t("confirmed")} (100%)`}
                  value={data?.confirmed?.value}
                />
                <StatCard
                  title={`${t("recovered")} (${toPercentage(
                    data?.recovered?.value,
                    data?.confirmed?.value
                  )})`}
                  value={data?.recovered?.value}
                />
                <StatCard
                  title={`${t("deaths")} (${toPercentage(
                    data?.deaths?.value,
                    data?.confirmed?.value
                  )})`}
                  value={data?.deaths?.value}
                />
              </div>
            )}
          </div>

          <DailyStats />
        </div>

        <div className="mt-3 text-xs text-center text-muted">
          <span>{t("last-updated")}: </span>
          {data?.lastUpdate && (
            <>
              <span>
                {format(new Date(data?.lastUpdate), "MM/dd/yyyy @ hh:mma")}{" "}
              </span>
              <span>({formatDistanceToNow(new Date(data?.lastUpdate))})</span>
            </>
          )}
        </div>
      </>
    )
}

export default WorldStats
