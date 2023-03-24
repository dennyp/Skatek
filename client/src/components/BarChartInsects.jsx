import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { utils, writeFileXLSX } from 'xlsx'
import { useGetVisualTotalLightTrapLogsQuery } from '../app/features/lighttraplogs/lightTrapLogsApiSlice'
import { ButtonWithSpinner } from './ButtonWithSpinner'

ChartJS.register(
  BarElement,
  BarController,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  annotationPlugin
)

const BarChartInsects = ({
  department,
  dateStart,
  dateEnd,
  dateStartTwo,
  dateEndTwo,
}) => {
  const {
    isLoading: isLoadingLightTrapLogs,
    error: errorLightTrapLogsLogs,
    data: logs,
  } = useGetVisualTotalLightTrapLogsQuery({
    department: department._id,
    dateStart,
    dateEnd,
    dateStartTwo,
    dateEndTwo,
  })

  let activityData = { datasets: [], labels: [] }
  if (!isLoadingLightTrapLogs) {
    if (Object.keys(logs.plotData).length > 0) {
      const periodOneData = {
        label: 'Period 1',
        data: logs.plotData.datasets[0].data,
        backgroundColor: 'rgba(99, 132, 0, 0.5)',
      }

      const periodTwoData = {
        label: 'Period 2',
        data: logs.plotData.datasets[1].data,
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
      }

      activityData = {
        labels: logs.plotData.labels,
        datasets: [periodOneData, periodTwoData],
      }
    }
  }

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
          `Genomsnittligt antal insekter för ljusfällor i avdelning ${department.name}`,
          `Period 1: ${dateStart} till ${dateEnd}`,
          `Period 2: ${dateStartTwo} till ${dateEndTwo}`,
        ],
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            borderColor: 'red',
            borderWidth: 3,
            xMin: 500,
            xMax: 500,
          },
        },
      },
    },
    borderColor: 'rgba(79, 70, 229, 1)',
    borderWidth: 1.5,
    borderSkipped: 'left',
    indexAxis: 'y',
    scales: {
      y: {
        ticks: {
          autoSkip: false,
        },
      },
    },
  }

  const handleDownloadExcelClick = async () => {
    try {
      const header = [
        'Id',
        'Märke',
        'Placering',
        'Avdelning',
        'Antal mättillfällen',
        'Antal flugor totalt',
        'Genomsnittligt antal flugor',
        'Antal bananflugor totalt',
        'Genomsnittligt antal bananflugor',
        'Antal getingar totalt',
        'Genomsnittligt antal getingar',
        'Antal nätvingar totalt',
        'Genomsnittligt antal nätvingar',
        'Antal harkrankar totalt',
        'Genomsnittligt antal harkrankar',
        'Antal övrigt totalt',
        'Genomsnittligt antal övrigt',
      ]

      const wb = utils.book_new()

      logs.productObjects.map((period, index) => {
        const excelRows = Object.keys(period).map((key) => {
          return period[key]
        })

        const ws = utils.json_to_sheet([], {
          header: header,
        })

        utils.sheet_add_json(ws, excelRows, {
          origin: 'A2',
          skipHeader: true,
        })
        utils.book_append_sheet(wb, ws, `Period ${index + 1}`)
      })

      writeFileXLSX(
        wb,
        `Genomsnittlig aktivitet för ljusfällor i ${department.name} (${dateStart} - ${dateEnd}).xlsx`
      )
    } catch (error) {
      console.error(error)
    }
  }

  let content
  if (isLoadingLightTrapLogs) {
    content = <p>Laddar...</p>
  } else {
    if (Object.keys(logs.plotData).length > 0) {
      content = (
        <>
          <div className="mb-2 mt-8 -ml-4">
            <ButtonWithSpinner handleClick={handleDownloadExcelClick}>
              <DocumentArrowDownIcon className="h-4 w-4" />
              &nbsp; Ladda ner excel
            </ButtonWithSpinner>
          </div>
          <Bar className="p-5 border" data={activityData} options={options} />
        </>
      )
    }
  }

  return <>{content}</>
}

export default BarChartInsects
