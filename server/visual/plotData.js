import { ActivityLog } from '../models/ActivityLog.js'
import { LightTrapLog } from '../models/LightTrapLog.js'
import { Product } from '../models/Product.js'

const createProductObjectsActivityLog = (array) => {
  return array.reduce(
    (acc, current) => ({
      ...acc,
      [current.product._id]: {
        product: current.product.name,
        placement: current.product.placement,
        department: current.product.department.name,
        activity:
          current.activity +
          (acc[current.product._id] ? acc[current.product._id].activity : 0),
        numberOfLogs: acc[current.product._id]
          ? acc[current.product._id].numberOfLogs + 1
          : 1,
        averageActivity: acc[current.product._id]
          ? (current.activity + acc[current.product._id].activity) /
            (acc[current.product._id].numberOfLogs + 1)
          : 0,
      },
    }),
    {}
  )
}

const createProductObjectsLightTrapTotal = (array) => {
  return array.reduce(
    (acc, current) => ({
      ...acc,
      [current.product._id]: {
        id: current.product._id,
        product: current.product.name,
        placement: current.product.placement,
        department: current.product.department.name,
        numberOfLogs: acc[current.product._id]
          ? acc[current.product._id].numberOfLogs + 1
          : 1,
        flyActivity:
          current.flyActivity +
          (acc[current.product._id] ? acc[current.product._id].flyActivity : 0),
        averageFlyActivity: acc[current.product._id]
          ? (current.flyActivity + acc[current.product._id].flyActivity) /
            (acc[current.product._id].numberOfLogs + 1)
          : 0,
        bananaflyActivity:
          current.bananaflyActivity +
          (acc[current.product._id]
            ? acc[current.product._id].bananaflyActivity
            : 0),
        averageBananaflyActivity: acc[current.product._id]
          ? (current.bananaflyActivity +
              acc[current.product._id].bananaflyActivity) /
            (acc[current.product._id].numberOfLogs + 1)
          : 0,
        waspActivity:
          current.waspActivity +
          (acc[current.product._id]
            ? acc[current.product._id].waspActivity
            : 0),
        averageWaspActivity: acc[current.product._id]
          ? (current.waspActivity + acc[current.product._id].waspActivity) /
            (acc[current.product._id].numberOfLogs + 1)
          : 0,
        neuropteranActivity:
          current.neuropteranActivity +
          (acc[current.product._id]
            ? acc[current.product._id].neuropteranActivity
            : 0),
        averageNeuropteranActivity: acc[current.product._id]
          ? (current.neuropteranActivity +
              acc[current.product._id].neuropteranActivity) /
            (acc[current.product._id].numberOfLogs + 1)
          : 0,
        daddylonglegsActivity:
          current.daddylonglegsActivity +
          (acc[current.product._id]
            ? acc[current.product._id].daddylonglegsActivity
            : 0),
        averageDaddylonglegsActivity: acc[current.product._id]
          ? (current.daddylonglegsActivity +
              acc[current.product._id].daddylonglegsActivity) /
            (acc[current.product._id].numberOfLogs + 1)
          : 0,
        miscActivity:
          current.miscActivity +
          (acc[current.product._id]
            ? acc[current.product._id].miscActivity
            : 0),
        averageMiscActivity: acc[current.product._id]
          ? (current.miscActivity + acc[current.product._id].miscActivity) /
            (acc[current.product._id].numberOfLogs + 1)
          : 0,
      },
    }),
    {}
  )
}

export const getActivityLogPlotData = async (
  productsIds,
  dateStart,
  dateEnd
) => {
  const activityLogsFromProducts = await ActivityLog.getByProducts(
    productsIds,
    dateStart,
    dateEnd
  )

  const productObjects = createProductObjectsActivityLog(
    activityLogsFromProducts
  )

  const filteredProducts = Object.keys(productObjects).map((key) => {
    if (productObjects[key].averageActivity > 0) return productObjects[key]
  })

  const readyToPlotProducts = filteredProducts.filter(
    (product) => product !== undefined
  )

  return { readyToPlotProducts, productObjects }
}

const createProductObjectsPerLightTrap = (array) => {}

export const getLightTrapLogPlotData = async (
  productsIds,
  dateStart,
  dateEnd,
  calculateTotal
) => {
  const lightTrapLogsFromProducts = await LightTrapLog.getByProducts(
    productsIds,
    dateStart,
    dateEnd
  )

  let productObjects
  if (calculateTotal) {
    productObjects = createProductObjectsLightTrapTotal(
      lightTrapLogsFromProducts
    )
  } else {
    productObjects = createProductObjectsPerLightTrap(lightTrapLogsFromProducts)
  }

  const filteredProducts = Object.keys(productObjects).map((key) => {
    if (productObjects[key].averageFlyActivity > 0) return productObjects[key]
  })

  const readyToPlotProducts = filteredProducts.filter(
    (product) => product !== undefined
  )

  return { readyToPlotProducts, productObjects }
}

export const getPlottableData = async (query) => {
  const {
    department,
    dateStart,
    dateEnd,
    dateStartTwo = '',
    dateEndTwo = '',
  } = query

  const products = await Product.getByDepartment(department)
  const productsIds = products.map((product) => product._id)

  const {
    readyToPlotProducts: productsPeriodOne,
    productObjects: productObjectsPeriodOne,
  } = await getLightTrapLogPlotData(productsIds, dateStart, dateEnd, true)

  const {
    readyToPlotProducts: productsPeriodTwo,
    productObjects: productObjectsPeriodTwo,
  } = await getLightTrapLogPlotData(productsIds, dateStartTwo, dateEndTwo, true)

  return {
    productsPeriodOne,
    productsPeriodTwo,
    productObjectsPeriodOne,
    productObjectsPeriodTwo,
  }
}
