import { CircularProgress } from '@mui/material'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import annotationPlugin from 'chartjs-plugin-annotation'
import { parseISO, startOfYear } from 'date-fns'
import { sv } from 'date-fns/locale'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { useGetVisualLightTrapLogsForTrapQuery } from '../app/features/lighttraplogs/lightTrapLogsApiSlice'

ChartJS.register(
  BarElement,
  BarController,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  annotationPlugin,
  TimeScale
)

const BarChartLightTrap = ({ trap, dateStart, dateEnd }) => {
  const { isLoading: isLoadingLogs, data: logs } =
    useGetVisualLightTrapLogsForTrapQuery({
      trap: trap._id,
      dateStart,
      dateEnd,
    })

  let content
  if (isLoadingLogs) {
    content = (
      <div className="flex justify-center">
        <CircularProgress size={96} />
      </div>
    )
  } else {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          font: {
            size: 14,
          },
          text: [
            `Totalt antal insekter i ljusfälla "${trap?.name} - ${trap?.placement}"`,
            `i avdelning ${trap?.department?.name}`,
            `Period: ${dateStart} till ${dateEnd}`,
          ],
        },
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              borderColor: 'red',
              borderWidth: 3,
              yMin: 500,
              yMax: 500,
            },
          },
        },
      },

      scales: {
        x: {
          offset: true,
          type: 'time',
          time: {
            unit: 'month',
            round: 'month',
            tooltipFormat: 'MMM yyyy',
            displayFormats: {
              month: 'MMM',
            },
          },
          min: startOfYear(parseISO(dateStart)),
          adapters: {
            date: {
              locale: sv,
            },
          },
        },
      },
      backgroundColor: 'rgba(99, 132, 0, 0.5)',
      borderColor: 'rgba(79, 70, 229, 1)',
      borderWidth: 1.5,
      borderSkipped: 'bottom',
    }

    content = (
      <>
        <Bar className="p-5 border" data={logs} options={options} />
      </>
    )
  }

  return content
}

export default BarChartLightTrap
