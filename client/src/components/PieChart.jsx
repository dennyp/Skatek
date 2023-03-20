import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js'
import React, { Fragment } from 'react'
import { Pie } from 'react-chartjs-2'
import { utils, writeFileXLSX } from 'xlsx'
import { useGetVisualLightTrapLogsQuery } from '../app/features/lighttraplogs/lightTrapLogsApiSlice'
import { ButtonWithSpinner } from './ButtonWithSpinner'

ChartJS.register(ArcElement, Legend, Title, Tooltip)

const PieChart = ({ department, dateStart, dateEnd }) => {
  const {
    isLoading: isLoadingActivityLogs,
    error: errorActivityLogs,
    data: logs,
  } = useGetVisualLightTrapLogsQuery({
    department: department._id,
    dateStart,
    dateEnd,
  })

  let activityData = { datasets: [], labels: [] }
  if (!isLoadingActivityLogs) {
    if (Object.keys(logs.plotData).length > 0) {
      activityData = {
        labels: logs.plotData.labels,
        datasets: logs.plotData.datasets,
      }
    }
  }

  let options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    backgroundColor: [
      'rgba(255, 99, 132, 0.4)',
      'rgba(54, 162, 235, 0.4)',
      'rgba(255, 206, 86, 0.4)',
      'rgba(75, 192, 192, 0.4)',
      'rgba(153, 102, 255, 0.4)',
      'rgba(255, 159, 64, 0.4)',
    ],
    borderWidth: 2,
    borderColor: 'rgb(255, 255, 255)',
  }

  const handleDownloadExcelClick = async () => {
    try {
      const header = [
        'Märke',
        'Placering',
        'Avdelning',
        'Aktivitet',
        'Antal mättillfällen',
        'Genomsnittlig aktivitet',
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
        `Genomsnittlig aktivitet i ${department.name} mellan ${dateStart} till ${dateEnd}.xlsx`
      )
    } catch (error) {
      console.error(error)
    }
  }

  let content
  if (isLoadingActivityLogs) {
    content = <p>Laddar...</p>
  } else {
    if (Object.keys(logs.plotData).length > 0) {
      content = logs.plotData.datasets.map((dataset) => {
        const data = {
          labels: logs.plotData.labels,
          datasets: [{ label: 'Antal', data: dataset.data }],
        }

        options = {
          ...options,
          plugins: {
            title: {
              display: true,
              font: {
                size: 14,
              },
              text: [
                `Aktivitetsgenomsnitt för ljusfälla "${dataset.productName}"`,
                ` i avdelning ${department.name}`,
                `mellan ${dateStart} till ${dateEnd}`,
              ],
            },
          },
        }

        return (
          <Fragment key={dataset.id}>
            {/* <div className="mb-2 mt-8 -ml-4">
              <ButtonWithSpinner handleClick={handleDownloadExcelClick}>
                <DocumentArrowDownIcon className="h-4 w-4" />
                &nbsp; Ladda ner
              </ButtonWithSpinner>
            </div> */}
            <Pie className="p-3 border" data={data} options={options} />
          </Fragment>
        )
      })
    }
  }

  return content
}

export default PieChart
