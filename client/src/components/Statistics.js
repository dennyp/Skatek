import React, { useRef, useCallback } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import { jsPDF } from 'jspdf'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Aktivitet',
    },
  },
  devicePixelRatio: 1.5,
}

const labels = [
  'Januari',
  'Februari',
  'Mars',
  'April',
  'Maj',
  'Juni',
  'Juli',
  'Augusti',
  'September',
  'Oktober',
  'November',
  'December',
]

export const data = {
  labels,
  datasets: [
    {
      label: 'Bulkutlastningen',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dunk & Kartong',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

const Statistics = () => {
  const ref = useRef(null)

  const downloadPDF = useCallback(() => {
    let pdf = new jsPDF('landscape')
    // TODO: look into higher resolution
    pdf.addImage(ref.current.toBase64Image(), 'JPEG', 15, 10, 260, 190)
    // TODO: the PDF name should be based on what is selected and also the time period selected
    pdf.save('chart.pdf')
  }, [])

  return (
    <>
      <Bar options={options} data={data} ref={ref} />
      {/* TODO: make a tailwind button */}
      <button type="button" onClick={downloadPDF}>
        Ladda ner
      </button>
    </>
  )
}

export default Statistics
