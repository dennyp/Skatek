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
import { useGetVisualActivityLogsQuery } from '../app/features/activitylogs/activityLogsApiSlice'

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

  let content
  if (isLoadingActivityLogs) {
    content = <p>Laddar...</p>
  } else {
    content = <Bar className="p-5 border" data={logs} options={options} />
  }

  return <>{content}</>
}

export default BarChart
