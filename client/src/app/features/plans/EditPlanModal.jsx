import { Dialog, Transition } from '@headlessui/react'
import { SettingsSystemDaydreamRounded } from '@mui/icons-material'
import React, { Fragment, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { ButtonWithSpinner } from '../../../components/ButtonWithSpinner'
import TextInputGroup from '../../../components/TextInputGroup'
import { useUpdatePlanMutation } from './plansApiSlice'

const EditPlanModal = ({
  plan,
  open,
  setOpen,
  title = '',
  editInformation = '',
}) => {
  const [name, setName] = useState(plan.name)
  const [desc, setDesc] = useState(plan.desc)
  const [image, setImage] = useState(plan.img)
  const [selectedFile, setSelectedFile] = useState({})

  const cancelButtonRef = useRef(null)

  const successMessage = () => toast.success('Ritning sparad')
  const failureMessage = () => toast.error('Ritning kunde inte sparas')

  const [updatePlan, { isLoadingUpdate }] = useUpdatePlanMutation()

  const handleNameChange = (newValue) => {
    setName(newValue)
  }

  const handleDescChange = (newValue) => {
    setDesc(newValue)
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
  }

  const handleSave = async () => {
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('_id', plan._id)
      formData.append('department', plan.department)
      formData.append('name', name)
      formData.append('desc', desc)

      const response = await updatePlan(formData)
      console.log(
        '🚀 ~ file: EditPlanModal.jsx:48 ~ handleSave ~ response:',
        response
      )

      if (!response.error) {
        successMessage()
        setSelectedFile({})
        setName('')
        setDesc('')
        setOpen(false)
      } else {
        failureMessage()
      }
    } catch (error) {
      console.error('error uploading floor plan', error)
      failureMessage()
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {editInformation}
                        </p>
                      </div>
                      <div className="space-y-1 px-4 text-left sm:space-y-0 sm:px-6 sm:py-5">
                        <TextInputGroup
                          label="Namn"
                          value={name}
                          onChange={handleNameChange}
                        />
                      </div>
                      <div className="space-y-1 px-4 text-left sm:space-y-0 sm:px-6 sm:py-5">
                        <TextInputGroup
                          label="Beskrivning"
                          value={desc}
                          onChange={handleDescChange}
                        />
                      </div>
                      <div className="space-y-1 px-4 text-left sm:space-y-0 sm:px-6 sm:py-5">
                        <p className="mb-1 text-xs">Nuvarande bild</p>
                        <img
                          className="border-2 rounded-lg"
                          src={image.url}
                          alt={desc}
                          title={name}
                        />
                      </div>
                      <div className="space-y-1 px-4 text-left sm:space-y-0 sm:px-6 sm:py-5">
                        <label
                          className="block mb-1 text-xs font-medium text-gray-900"
                          htmlFor="file_input"
                        >
                          Ladda upp ny bild
                        </label>
                        <input
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none"
                          aria-describedby="file_input_help"
                          id="file_input"
                          type="file"
                          onChange={handleFileChange}
                          accept="image/png, image/jpeg, image/jpg"
                        />
                        <p
                          className="ml-1 pt-1 text-xs text-gray-900"
                          id="file_input_help"
                        >
                          PNG, JPG eller JPEG
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Avbryt
                    </button>
                    <ButtonWithSpinner handleClick={handleSave}>
                      {isLoadingUpdate ? 'Sparar...' : 'Spara'}
                    </ButtonWithSpinner>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default EditPlanModal
