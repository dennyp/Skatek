import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import NumberInputGroup from '../../../components/NumberInputGroup'
import TextInputGroup from '../../../components/TextInputGroup'
import ProductInputGroup from '../products/ProductInputGroup'

const LightTrapLogFormContent = ({
  setIsChanged,
  content,
  setContent,
  isLoading = false,
}) => {
  const handleProductChange = (product) => {
    setContent({ ...content, product })
    setIsChanged?.(true)
  }

  const handleCommentChange = (comment) => {
    setContent({ ...content, comment })
    setIsChanged?.(true)
  }

  const handleDateLoggedChange = (event) => {
    setContent({ ...content, dateLogged: event.target.value })
    setIsChanged?.(true)
  }

  const handleFlyActivityChange = (flyActivity) => {
    setContent({ ...content, flyActivity })
    setIsChanged?.(true)
  }

  const handlebananaflyActivityChange = (bananaflyActivity) => {
    setContent({ ...content, bananaflyActivity })
    setIsChanged?.(true)
  }

  const handleWaspActivityChange = (waspActivity) => {
    setContent({ ...content, waspActivity })
    setIsChanged?.(true)
  }

  const handleNeuropteranActivityChange = (neuropteranActivity) => {
    setContent({ ...content, neuropteranActivity })
    setIsChanged?.(true)
  }

  const handleDaddylonglegsActivityChange = (daddylonglegsActivity) => {
    setContent({ ...content, daddylonglegsActivity })
    setIsChanged?.(true)
  }

  const handleMiscActivityChange = (miscActivity) => {
    setContent({ ...content, miscActivity })
    setIsChanged?.(true)
  }

  let formContent
  if (isLoading) {
    formContent = (
      <>
        <Box className="flex justify-center">
          <CircularProgress className="mt-20" size={84} />
        </Box>
      </>
    )
  } else {
    formContent = (
      <>
        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
          <ProductInputGroup
            value={content?.product}
            department={content?.product?.department}
            onChange={handleProductChange}
            onlyLightTraps={true}
          />
        </div>
        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
          <div className="columns-2">
            <NumberInputGroup
              label="Flugor"
              value={content?.flyActivity}
              onChange={handleFlyActivityChange}
            />
            <NumberInputGroup
              label="Bananflugor"
              value={content?.bananaflyActivity}
              onChange={handlebananaflyActivityChange}
            />
          </div>
          <div className="columns-2">
            <NumberInputGroup
              label="Getingar"
              value={content?.waspActivity}
              onChange={handleWaspActivityChange}
            />
            <NumberInputGroup
              label="Nätvingar"
              value={content?.neuropteranActivity}
              onChange={handleNeuropteranActivityChange}
            />
          </div>
          <div className="columns-2">
            <NumberInputGroup
              label="Harkrankar"
              value={content?.daddylonglegsActivity}
              onChange={handleDaddylonglegsActivityChange}
            />
            <NumberInputGroup
              label="Övrigt"
              value={content?.miscActivity}
              onChange={handleMiscActivityChange}
            />
          </div>
        </div>
        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
          <TextInputGroup
            label="Kommentar"
            value={content?.comment}
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
            value={content?.dateLogged.slice(0, 10)}
            onChange={handleDateLoggedChange}
            className="rounded-md border-gray-300"
          />
        </div>
      </>
    )
  }

  return formContent
}

export default LightTrapLogFormContent
