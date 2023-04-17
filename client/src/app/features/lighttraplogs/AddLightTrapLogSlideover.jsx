import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SlideoverLayout from '../../../components/SlideoverLayout'
import LightTrapLogFormContent from './LightTrapLogFormContent'
import { useCreateLightTrapLogMutation } from './lightTrapLogsApiSlice'

const AddLightTrapLogSlideover = ({ open, setOpen }) => {
  const [content, setContent] = useState({
    flyActivity: 0,
    bananaflyActivity: 0,
    waspActivity: 0,
    neuropteranActivity: 0,
    daddylonglegsActivity: 0,
    miscActivity: 0,
    comment: '',
    dateLogged: new Date().toISOString().slice(0, 10),
    product: {},
  })

  const [createActivityLog, { isLoading }] = useCreateLightTrapLogMutation()

  const successMessage = () => toast.success('Logg sparad')
  const failureMessage = () => toast.error('Logg kunde inte sparas')
  const failureProductMessage = () => toast.error('Ingen produkt vald')
  const failureDateMessage = () => toast.error('Inget datum valt')

  const handleSave = async (event) => {
    try {
      if (!content?.product?._id) {
        failureProductMessage()
        return
      }

      if (!content?.dateLogged) {
        failureDateMessage()
        return
      }

      const newLog = {
        product: content?.product?._id,
        dateLogged: content?.dateLogged,
        comment: content?.comment,
        flyActivity: parseInt(content?.flyActivity),
        bananaflyActivity: parseInt(content?.bananaflyActivity),
        waspActivity: parseInt(content?.waspActivity),
        neuropteranActivity: parseInt(content?.neuropteranActivity),
        daddylonglegsActivity: parseInt(content?.daddylonglegsActivity),
        miscActivity: parseInt(content?.miscActivity),
      }

      const response = await createActivityLog(newLog)
      console.log(
        '🚀 ~ file: AddLightTrapLogSlideover.jsx:53 ~ handleSave ~ response:',
        response
      )

      if (response) {
        successMessage()
        setContent({
          ...content,
          flyActivity: 0,
          bananaflyActivity: 0,
          waspActivity: 0,
          neuropteranActivity: 0,
          daddylonglegsActivity: 0,
          miscActivity: 0,
          comment: '',
        })
      }
    } catch (error) {
      console.error('error creating an activity log', error)
      failureMessage()
    }
  }

  return (
    <SlideoverLayout
      open={open}
      setOpen={setOpen}
      isLoading={isLoading}
      handleSave={handleSave}
      title="Skapa ny logg för ljusfälla"
    >
      <LightTrapLogFormContent content={content} setContent={setContent} />
    </SlideoverLayout>
  )
}

export default AddLightTrapLogSlideover
