import React, { FC, useEffect, useRef, useMemo } from 'react'
import { format } from "date-fns"
import useFetch from '../hooks/useFetch'
import { DAILY_URL } from '../api'
import { Chart } from 'frappe-charts/dist/frappe-charts.esm'
import "frappe-charts/dist/frappe-charts.min.css"
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

interface Day {
    reportDate: string,
    confirmed: number,
    deltaConfirmed: number,
    deaths: number
}

const DailyStats: FC = () => {
    const { t, i18n } = useTranslation()
    const [daily] = useFetch<Day[]>(DAILY_URL, (data: Record<string, any>[]) => {
        return data.map((day: Record<string, any>) => ({
            reportDate: day.reportDate,
            confirmed: day.confirmed.total,
            deltaConfirmed: day.deltaConfirmedDetail.total,
            deaths: day.deaths.total
        } as Day))
    })

    const chart = useRef(null)

    const dataChart = useMemo(
      () => {
        const confirmedValues = daily?.map((day: Day) => day.confirmed)
        const deathsValues = daily?.map((day: Day) => day.deaths)
        return {
          type: 'line',
          data: {
            labels: daily?.map((day: Day) =>
              format(new Date(day.reportDate), 'MM/dd/yyyy')
            ),
            datasets: [
              {
                name: t('confirmed'),
                values: confirmedValues
              },
              {
                name: t('deaths'),
                values: deathsValues
              }
            ]
          },
          axisOptions: {
            xIsSeries: true,
            xAxisMode: 'tick'
          },
          lineOptions: {
            hideDots: 1,
            regionFill: 1
          },
          height: 276,
          colors: ['green', 'red'],
          tooltipOptions: {
            formatTooltipY: (d: number) => d.toLocaleString()
          }
        }
        },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [daily, i18n.language]
    )

    useEffect(() => {
        chart.current = new Chart("#daily-chart", dataChart)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [daily])

    useEffect(() => {
      // @ts-ignore
      chart.current?.update(dataChart.data)
    }, [dataChart])

    return (
      <div className="flex-grow">
        <div className="flex justify-between">
          <h2 className="my-3 text-2xl">{t("daily-stats")}</h2>
          <button 
            className="px-4 text-sm font-bold uppercase text-accent"
            title={t('export-chart')}
            onClick={() => {
                // @ts-ignore
                chart.current?.export()
            }}
            >
            <FontAwesomeIcon size="lg" fixedWidth icon={faDownload} />
            <span className="sr-only md:inline md:relative md:ml-2">{t('export-chart')}</span>
          </button>
        </div>

        <div className="px-4 py-3 daily-stats neumorph shadow-neumorph-inset hover:shadow-neumorph-outset">
          <div id="daily-chart"></div>
        </div>
      </div>
    )
}

export default DailyStats