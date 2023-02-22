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
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { utils, writeFileXLSX } from 'xlsx'
import { useGetVisualActivityLogsQuery } from '../app/features/activitylogs/activityLogsApiSlice'
import { ButtonWithSpinner } from './ButtonWithSpinner'

ChartJS.register(
  BarElement,
  BarController,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
)

const BarChart = ({ department, dateStart, dateEnd }) => {
  const {
    isLoading: isLoadingActivityLogs,
    error: errorActivityLogs,
    data: logs,
  } = useGetVisualActivityLogsQuery({
    department: department._id,
    dateStart,
    dateEnd,
  })

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
          `Aktivitetsgenomsnitt för produkter i avdelning ${department.name}`,
          'Visar endast produkter med uppmätt aktivitet under vald tidsperiod',
          `${dateStart} till ${dateEnd}`,
        ],
      },
    },
    backgroundColor: 'rgba(79, 70, 229, 0.5)',
    borderColor: 'rgba(79, 70, 229, 1)',
    borderWidth: 1.5,
    borderSkipped: 'left',
    indexAxis: 'y',
    scales: {
      x: {
        max: 100,
      },
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
        'Märke',
        'Placering',
        'Avdelning',
        'Aktivitet',
        'Antal mättillfällen',
        'Genomsnittlig aktivitet',
      ]

      const excelRows = Object.keys(logs.productObjects).map(
        (key) => logs.productObjects[key]
      )

      const ws = utils.json_to_sheet([], {
        header: header,
      })
      utils.sheet_add_json(ws, excelRows, {
        origin: 'A2',
        skipHeader: true,
      })

      const wb = utils.book_new()
      utils.book_append_sheet(wb, ws, 'Data')
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
    content = (
      <>
        <div className="mb-2 mt-8 -ml-4">
          <ButtonWithSpinner handleClick={handleDownloadExcelClick}>
            <DocumentArrowDownIcon className="h-4 w-4" />
            &nbsp; Ladda ner
          </ButtonWithSpinner>
        </div>
        <Bar className="p-5 border" data={logs.plotData} options={options} />
      </>
    )
  }

  return <>{content}</>
}

export default BarChart
