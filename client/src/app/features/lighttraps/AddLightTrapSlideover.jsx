import React, { Fragment, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'
import { ButtonWithSpinner } from '../../../components/ButtonWithSpinner'
import TextInputGroup from '../../../components/TextInputGroup'
import DepartmentInputGroup from '../departments/DepartmentInputGroup'
import ProductTypeInputGroup from '../producttypes/ProductTypeInputGroup'
import { useCreateLightTrapMutation } from './lightTrapsApiSlice'

// TODO: make a generic slideover to be more DRY
const AddLightTrapSlideover = ({ open, setOpen }) => {
  const [selectedDepartment, setSelectedDepartment] = useState({})
  const [selectedName, setSelectedName] = useState('')
  const [selectedPlacement, setSelectedPlacement] = useState('')
  const [selectedProductType, setSelectedProductType] = useState({})

  const [createLightTrap, { isLoading: isLoadingCreate }] =
    useCreateLightTrapMutation()

  const successMessage = () => toast.success('Ljusfälla sparad')
  const failureMessage = () => toast.error('Ljusfälla kunde inte sparas')

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department)
  }

  const handleNameChange = (name) => {
    setSelectedName(name)
  }

  const handlePlacementChange = (placement) => {
    setSelectedPlacement(placement)
  }

  const handleProductTypeChange = (productType) => {
    setSelectedProductType(productType)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
  }

  const handleSave = async (event) => {
    try {
      const newLightTrap = {
        department: selectedDepartment._id,
        name: selectedName,
        placement: selectedPlacement,
        productType: selectedProductType._id,
      }

      const response = await createLightTrap(newLightTrap)

      if (!response.error?.data?.status) {
        successMessage()
        setSelectedName('')
        setSelectedPlacement('')
      } else {
        failureMessage()
      }
    } catch (error) {
      console.error('error creating a light trap', error)
      failureMessage()
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <form
                    onSubmit={handleSubmit}
                    className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                  >
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              {' '}
                              Ny ljusfälla{' '}
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">
                              Fyll i fälten nedan och klicka på skapa för att
                              skapa en ljusfälla.
                            </p>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Stäng panelen</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <DepartmentInputGroup
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                          />
                        </div>
                        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <TextInputGroup
                            label="Märke"
                            value={selectedName}
                            onChange={handleNameChange}
                          />
                        </div>
                        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <TextInputGroup
                            label="Placering"
                            value={selectedPlacement}
                            onChange={handlePlacementChange}
                          />
                        </div>
                        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <ProductTypeInputGroup
                            label="Produkttyp"
                            value={selectedProductType}
                            onChange={handleProductTypeChange}
                          />
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            Avbryt
                          </button>
                          <ButtonWithSpinner
                            isLoading={isLoadingCreate}
                            handleClick={handleSave}
                          >
                            {isLoadingCreate ? 'Sparar...' : 'Spara'}
                          </ButtonWithSpinner>
                        </div>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AddLightTrapSlideover
