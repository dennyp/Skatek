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
import { useGetLightTrapsFromDepartmentQuery } from '../app/features/lighttraps/lightTrapsApiSlice'
import BarChartLightTrap from './BarChartLightTrap'

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
const LightTrapChartLayout = ({
  department,
  dateStart,
  dateEnd,
  dateStartTwo = '',
  dateEndTwo = '',
}) => {
  const { isLoading: isLoadingTraps, data: traps } =
    useGetLightTrapsFromDepartmentQuery(department._id)

  let content
  if (!isLoadingTraps) {
    content = traps.map((trap) => {
      return (
        <BarChartLightTrap
          key={trap._id}
          trap={trap}
          dateStart={dateStart}
          dateEnd={dateEnd}
        />
      )
    })
  }

  return content
}

export default LightTrapChartLayout
