import React, { useState } from 'react'
import { toast } from 'react-toastify'
import SlideoverLayout from '../../../components/SlideoverLayout'
import DeviationFormContent from './DeviationFormContent'
import { useCreateDeviationMutation } from './deviationsApiSlice'

const AddDeviationSlideover = ({ open, setOpen }) => {
  const [content, setContent] = useState({
    department: '',
    comment: '',
    date: new Date().toISOString().slice(0, 10),
  })

  const successMessage = () => toast.success('Avvikelse sparad')
  const failureMessage = () => toast.error('Avvikelse kunde inte sparas')
  const failureDepartmentMessage = () => toast.error('Ingen avdelning angiven')
  const failureCommentMessage = () => toast.error('Ingen avvikelse angiven')
  const failureDateMessage = () => toast.error('Inget datum valt')

  const [createDeviation, { isLoading }] = useCreateDeviationMutation()

  const handleSave = async () => {
    try {
      if (!content?.department) {
        failureDepartmentMessage()
        return
      }

      if (!content?.comment) {
        failureCommentMessage()
        return
      }

      if (!content?.date) {
        failureDateMessage()
        return
      }

      const response = await createDeviation(content).unwrap()

      if (response) {
        successMessage()
        setContent({
          ...content,
          department: '',
          comment: '',
        })
      }
    } catch (error) {
      console.error('error creating deviation', error)
      failureMessage()
    }
  }

  return (
    <SlideoverLayout
      open={open}
      setOpen={setOpen}
      isLoading={isLoading}
      handleSave={handleSave}
      title="Lägg till avvikelse"
    >
      <DeviationFormContent content={content} setContent={setContent} />
    </SlideoverLayout>
  )
}

export default AddDeviationSlideover
