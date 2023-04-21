import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SlideoverLayout from '../../../components/SlideoverLayout'
import DeviationFormContent from './DeviationFormContent'
import {
  useGetDeviationQuery,
  useUpdateDeviationMutation,
} from './deviationsApiSlice'

const DeviationSlideover = ({ id, open, setOpen }) => {
  const [isChanged, setIsChanged] = useState(false)
  const [content, setContent] = useState({
    department: {},
    comment: '',
    date: '',
  })

  const successMessage = () => toast.success('Avvikelse uppdaterad')
  const failureMessage = () => toast.error('Avvikelse kunde inte uppdateras')
  const noChangeMessage = () => toast.warn('Ingen ändring att spara')

  const { isLoading, isSuccess, data } = useGetDeviationQuery(id)
  const [updateDeviation, { isLoading: isLoadingUpdate }] =
    useUpdateDeviationMutation()

  useEffect(() => {
    if (isSuccess) {
      setContent(data)
    }
  }, [isSuccess, data])

  const handleSave = async () => {
    try {
      if (!isChanged) {
        noChangeMessage()
        return
      }

      const response = await updateDeviation({ id, ...content })

      if (response?.data) {
        successMessage()
        setIsChanged(false)
        setOpen(false)
      }
    } catch (error) {
      console.error('error saving the updated deviation', error)
      failureMessage()
    }
  }

  return (
    <SlideoverLayout
      open={open}
      setOpen={setOpen}
      isLoading={isLoadingUpdate}
      handleSave={handleSave}
      title="Ändra avvikelse"
    >
      <DeviationFormContent
        id={id}
        setIsChanged={setIsChanged}
        content={content}
        setContent={setContent}
        isLoading={isLoading}
      />
    </SlideoverLayout>
  )
}

export default DeviationSlideover
