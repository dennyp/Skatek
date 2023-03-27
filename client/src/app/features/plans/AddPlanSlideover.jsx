import React, { useState } from 'react'
import { toast } from 'react-toastify'
import SlideoverLayout from '../../../components/SlideoverLayout'
import TextInputGroup from '../../../components/TextInputGroup'
import DepartmentInputGroup from '../departments/DepartmentInputGroup'
import { useCreatePlanMutation } from './plansApiSlice'

const AddPlanSlideover = ({ open, setOpen }) => {
  const [selectedDepartment, setSelectedDepartment] = useState({})
  const [selectedName, setSelectedName] = useState('')
  const [selectedDescription, setSelectedDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState({})

  const [createPlan, { isLoading }] = useCreatePlanMutation()

  const successMessage = () => toast.success('Ritning sparad')
  const failureMessage = () => toast.error('Ritning kunde inte sparas')

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department)
  }

  const handleNameChange = (name) => {
    setSelectedName(name)
  }

  const handleDescriptionChange = (description) => {
    setSelectedDescription(description)
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleSave = async () => {
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('department', selectedDepartment._id)
      formData.append('name', selectedName)
      formData.append('desc', selectedDescription)

      const response = await createPlan(formData)

      if (!response.error) {
        successMessage()
        setSelectedName('')
        setSelectedDescription('')
        setSelectedFile({})
      } else {
        failureMessage()
      }
    } catch (error) {
      console.error('error creating a floor plan', error)
      failureMessage()
    }
  }

  return (
    <SlideoverLayout
      open={open}
      setOpen={setOpen}
      isLoading={isLoading}
      handleSave={handleSave}
      encType="multipart/form-data"
    >
      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
          <DepartmentInputGroup
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          />
        </div>
        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
          <TextInputGroup
            label="Namn"
            value={selectedName}
            onChange={handleNameChange}
          />
        </div>
        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
          <TextInputGroup
            label="Beskrivning"
            value={selectedDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
          <label
            className="block mb-2 text-xs font-medium text-gray-900"
            htmlFor="file_input"
          >
            Ladda upp bild
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={handleFileChange}
          />
          <p className="ml-1 pt-1 text-xs text-gray-900" id="file_input_help">
            PNG, JPG eller JPEG
          </p>
        </div>
      </div>
    </SlideoverLayout>
  )
}

export default AddPlanSlideover
