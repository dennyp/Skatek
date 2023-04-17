import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SlideoverLayout from '../../../components/SlideoverLayout'
import LightTrapLogFormContent from './LightTrapLogFormContent'
import {
  useGetLightTrapLogQuery,
  useUpdateLightTrapLogMutation,
} from './lightTrapLogsApiSlice'

const LightTrapLogSlideover = ({ id, open, setOpen }) => {
  const [isChanged, setIsChanged] = useState(false)

  const [content, setContent] = useState({
    flyActivity: 0,
    bananaflyActivity: 0,
    waspActivity: 0,
    neuropteranActivity: 0,
    daddylonglegsActivity: 0,
    miscActivity: 0,
    comment: '',
    dateLogged: '',
    product: {},
  })

  const successMessage = () => toast.success('Logg sparad')
  const failureMessage = () => toast.error('Logg kunde inte sparas')
  const noChangeMessage = () => toast.warn('Ingen ändring att spara')

  const {
    isLoading: isLoadingGet,
    isSuccess,
    data: log,
  } = useGetLightTrapLogQuery(id)

  const [updateLightTrapLog, { isLoading: isLoadingUpdate }] =
    useUpdateLightTrapLogMutation()

  useEffect(() => {
    if (isSuccess) {
      setContent(log)
    }
  }, [isSuccess, log, setContent])

  const handleSave = async () => {
    try {
      if (!isChanged) {
        noChangeMessage()
        return
      }

      const response = await updateLightTrapLog({
        id,
        product: content?.product._id,
        comment: content?.comment,
        dateLogged: content?.dateLogged.slice(0, 10),
        flyActivity: parseInt(content?.flyActivity),
        bananaflyActivity: parseInt(content?.bananaflyActivity),
        waspActivity: parseInt(content?.waspActivity),
        neuropteranActivity: parseInt(content?.neuropteranActivity),
        daddylonglegsActivity: parseInt(content?.daddylonglegsActivity),
        miscActivity: parseInt(content?.miscActivity),
      }).unwrap()

      if (response) {
        successMessage()
        setIsChanged(false)
        setOpen(false)
      }
    } catch (error) {
      console.error('error saving the updated activity log', error)
      failureMessage()
    }
  }

  return (
    <>
      <SlideoverLayout
        open={open}
        setOpen={setOpen}
        isLoading={isLoadingUpdate}
        handleSave={handleSave}
        title="Ändra logg för ljusfälla"
      >
        <LightTrapLogFormContent
          id={id}
          setIsChanged={setIsChanged}
          content={content}
          setContent={setContent}
          isLoading={isLoadingGet}
        />
      </SlideoverLayout>
    </>
  )
}

export default LightTrapLogSlideover
