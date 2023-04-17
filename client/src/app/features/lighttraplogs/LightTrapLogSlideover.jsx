import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import NumberInputGroup from '../../../components/NumberInputGroup'
import SlideoverLayout from '../../../components/SlideoverLayout'
import TextInputGroup from '../../../components/TextInputGroup'
import ProductInputGroup from '../products/ProductInputGroup'
import {
  useGetLightTrapLogQuery,
  useUpdateLightTrapLogMutation,
} from './lightTrapLogsApiSlice'

const LightTrapLogSlideover = ({ id, open, setOpen }) => {
  const [isChanged, setIsChanged] = useState(false)
  const [product, setProduct] = useState({})
  const [comment, setComment] = useState('')
  const [dateLogged, setDateLogged] = useState('')
  const [flyActivity, setFlyActivity] = useState(0)
  const [bananaflyActivity, setBananaflyActivity] = useState(0)
  const [waspActivity, setWaspActivity] = useState(0)
  const [neuropteranActivity, setNeuropteranActivity] = useState(0)
  const [daddylonglegsActivity, setDaddylonglegsActivity] = useState(0)
  const [miscActivity, setMiscActivity] = useState(0)

  const successMessage = () => toast.success('Logg sparad')
  const failureMessage = () => toast.error('Logg kunde inte sparas')

  const [updateLightTrapLog, { isLoading }] = useUpdateLightTrapLogMutation()

  const {
    isLoading: isLogLoading,
    isSuccess,
    data: log,
  } = useGetLightTrapLogQuery(id)

  useEffect(() => {
    if (isSuccess) {
      setComment(log?.comment)
      setDateLogged(log?.dateLogged.slice(0, 10))
      setProduct(log?.product)
      setFlyActivity(log?.flyActivity)
      setBananaflyActivity(log?.bananaflyActivity)
      setWaspActivity(log?.waspActivity)
      setNeuropteranActivity(log?.neuropteranActivity)
      setDaddylonglegsActivity(log?.daddylonglegsActivity)
      setMiscActivity(log?.miscActivity)
    }
  }, [isSuccess, log])

  const handleSave = async () => {
    try {
      const response = await updateLightTrapLog({
        id,
        product: product._id,
        comment,
        dateLogged,
        flyActivity: parseInt(flyActivity),
        bananaflyActivity: parseInt(bananaflyActivity),
        waspActivity: parseInt(waspActivity),
        neuropteranActivity: parseInt(neuropteranActivity),
        daddylonglegsActivity: parseInt(daddylonglegsActivity),
        miscActivity: parseInt(miscActivity),
      }).unwrap()

      if (response) {
        successMessage()
        setIsChanged(false)
        setOpen(false)
        setComment('')
        setFlyActivity(0)
        setBananaflyActivity(0)
        setWaspActivity(0)
        setNeuropteranActivity(0)
        setDaddylonglegsActivity(0)
        setMiscActivity(0)
      }
    } catch (error) {
      console.error('error saving the updated activity log', error)
      failureMessage()
    }
  }

  const handleProductChange = (product) => {
    setProduct(product)
    setIsChanged(true)
  }

  const handleCommentChange = (changedComment) => {
    setComment(changedComment)
    setIsChanged(true)
  }

  const handleDateLoggedChange = (event) => {
    setDateLogged(event.target.value)
    setIsChanged(true)
  }

  const handleFlyActivityChange = (flyActivity) => {
    setFlyActivity(flyActivity)
    setIsChanged(true)
  }

  const handlebananaflyActivityChange = (bananaflyActivity) => {
    setBananaflyActivity(bananaflyActivity)
    setIsChanged(true)
  }

  const handleWaspActivityChange = (waspActivity) => {
    setWaspActivity(waspActivity)
    setIsChanged(true)
  }

  const handleNeuropteranActivityChange = (neuropteranActivity) => {
    setNeuropteranActivity(neuropteranActivity)
    setIsChanged(true)
  }

  const handleDaddylonglegsActivityChange = (daddylonglegsActivity) => {
    setDaddylonglegsActivity(daddylonglegsActivity)
    setIsChanged(true)
  }

  const handleMiscActivityChange = (miscActivity) => {
    setMiscActivity(miscActivity)
    setIsChanged(true)
  }

  return (
    <>
      {log && !isLogLoading && (
        <SlideoverLayout
          open={open}
          setOpen={setOpen}
          isLoading={isLoading}
          handleSave={handleSave}
          title="Ändra logg för ljusfälla"
        >
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <ProductInputGroup
              value={product}
              department={product?.department}
              onChange={handleProductChange}
              onlyLightTraps={true}
            />
          </div>
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <div className="columns-2">
              <NumberInputGroup
                label="Flugor"
                value={flyActivity}
                onChange={handleFlyActivityChange}
              />
              <NumberInputGroup
                label="Bananflugor"
                value={bananaflyActivity}
                onChange={handlebananaflyActivityChange}
              />
            </div>
            <div className="columns-2">
              <NumberInputGroup
                label="Getingar"
                value={waspActivity}
                onChange={handleWaspActivityChange}
              />
              <NumberInputGroup
                label="Nätvingar"
                value={neuropteranActivity}
                onChange={handleNeuropteranActivityChange}
              />
            </div>
            <div className="columns-2">
              <NumberInputGroup
                label="Harkrankar"
                value={daddylonglegsActivity}
                onChange={handleDaddylonglegsActivityChange}
              />
              <NumberInputGroup
                label="Övrigt"
                value={miscActivity}
                onChange={handleMiscActivityChange}
              />
            </div>
          </div>
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <TextInputGroup
              label="Kommentar"
              value={comment}
              onChange={handleCommentChange}
            />
          </div>
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <label
              htmlFor="date-logged"
              className="block text-xs font-medium text-gray-900"
            >
              Loggad datum
            </label>
            <input
              id="date-logged"
              type="date"
              value={dateLogged}
              onChange={handleDateLoggedChange}
              className="rounded-md border-gray-300"
            />
          </div>
        </SlideoverLayout>
      )}
    </>
  )
}

export default LightTrapLogSlideover
