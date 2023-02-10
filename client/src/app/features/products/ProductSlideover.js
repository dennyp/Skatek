import { Fragment, useEffect, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'
import { ButtonWithSpinner } from '../../../components/ButtonWithSpinner'
import TextInputGroup from '../../../components/TextInputGroup'
import DepartmentInputGroup from '../departments/DepartmentInputGroup'
import ProductLocationInputGroup from '../locations/ProductLocationInputGroup'
import ProductTypeInputGroup from '../producttypes/ProductTypeInputGroup'
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from './productsApiSlice'
import { setProduct } from './productSlice'

const ProductSlideover = ({ open, setOpen, productId }) => {
  const {
    isLoading,
    isSuccess,
    error,
    data: product,
  } = useGetProductQuery(productId)

  const [isChanged, setIsChanged] = useState(false)
  const [department, setDepartment] = useState({})
  const [name, setName] = useState('')
  const [productType, setProductType] = useState({})
  const [placement, setPlacement] = useState('')
  const [location, setLocation] = useState({})

  const [updateProduct, { isLoading: isLoadingUpdate }] =
    useUpdateProductMutation()

  const noChangeMessage = () => toast.warn('Ingen ändring att spara')

  useEffect(() => {
    if (isSuccess) {
      setDepartment(product.department)
      setName(product.name)
      setProductType(product.productType)
      setPlacement(product.placement)
      setLocation(product.location)
    }
  }, [isSuccess, product])

  const handleClose = () => {
    setOpen(false)
  }

  const handleDepartmentChange = (department) => {
    setDepartment(department)
    setIsChanged(true)
  }

  const handleNameChange = (name) => {
    setName(name)
    setIsChanged(true)
  }

  const handleProductTypeChange = (productType) => {
    setProductType(productType)
    setIsChanged(true)
  }

  const handlePlacementChange = (placement) => {
    setPlacement(placement)
    setIsChanged(true)
  }

  const handleLocationChange = (location) => {
    setLocation(location)
    setIsChanged(true)
  }

  const handleSave = async (event) => {
    try {
      if (!isChanged) {
        noChangeMessage()
        return
      }

      const updatedProduct = {
        _id: product._id,
        department: department,
        name: name,
        productType: productType,
        placement: placement,
        location: location,
      }
      await updateProduct(updatedProduct).unwrap()

      setIsChanged(false)
      setProduct({})

      setDepartment({})
      setName('')
      setProductType({})
      setPlacement('')
      setLocation({})

      handleClose()
    } catch (err) {
      console.error('error saving product', err)
    }
  }

  let content
  if (isLoading) {
    content = <p>Laddar...</p>
  } else {
    content = (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <div className="fixed inset-0" />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                      <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              {' '}
                              Ändra produkt{' '}
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onClick={handleClose}
                              >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <DepartmentInputGroup
                            value={department}
                            onChange={handleDepartmentChange}
                          />
                          <TextInputGroup
                            label="Märke"
                            value={name}
                            onChange={handleNameChange}
                          />
                          <TextInputGroup
                            label="Placering"
                            value={placement}
                            onChange={handlePlacementChange}
                          />
                          <ProductTypeInputGroup
                            value={productType}
                            onChange={handleProductTypeChange}
                          />
                          <ProductLocationInputGroup
                            label="Invändig/utvändig"
                            value={location}
                            onChange={handleLocationChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 justify-end px-4 py-4">
                        <button
                          type="button"
                          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={handleClose}
                        >
                          Avbryt
                        </button>
                        <ButtonWithSpinner
                          isLoading={isLoadingUpdate}
                          handleClick={handleSave}
                        >
                          {isLoadingUpdate ? 'Sparar...' : 'Spara'}
                        </ButtonWithSpinner>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  }

  return content
}

export default ProductSlideover
