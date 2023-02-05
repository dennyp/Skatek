import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'
import NumberInputGroup from '../../../components/NumberInputGroup'
import ProductInputGroup from '../../../components/ProductInputGroup'
import TextInputGroup from '../../../components/TextInputGroup'
import { selectLogById, updateLog } from './activitylogSlice'

const ActivityLogSlideover = ({ open, setOpen, id, onSave }) => {
  const [isChanged, setIsChanged] = useState(false)
  const dispatch = useDispatch()

  const selectedLog = useSelector((state) => selectLogById(state, id))

  const [activity, setActivity] = useState(selectedLog?.activity)
  const [comment, setComment] = useState(selectedLog?.comment)
  const [dateLogged, setDateLogged] = useState(
    selectedLog?.dateLogged.slice(0, 10)
  )
  const [product, setProduct] = useState(selectedLog?.product)
  const noChangeMessage = () => toast.warn('Ingen ändring att spara')

  const handleClose = () => {
    setOpen(false)
  }

  const handleProductChange = (changedProduct) => {
    setProduct(changedProduct)
    setIsChanged(true)
  }

  const handleActivityChange = (changedActivity) => {
    setActivity(changedActivity)
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

  const handleSave = async (event) => {
    try {
      if (!isChanged) {
        noChangeMessage()
        return
      }

      dispatch(
        updateLog({
          _id: id,
          activity,
          comment,
          dateLogged,
          product: product._id,
        })
      ).unwrap()

      setIsChanged(false)
      setActivity(0)
      setComment('')
      setDateLogged('')
      setProduct({})

      handleClose()
    } catch (err) {
      console.error('error saving activity log', err)
    }
  }

  return (
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
                            Ändra aktivitetslogg{' '}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              onClick={handleClose}
                            >
                              <span className="sr-only">Stäng</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <ProductInputGroup
                            value={product}
                            onChange={handleProductChange}
                            department={product.department}
                          />
                        </div>
                        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <NumberInputGroup
                            label="Aktivitet"
                            value={activity}
                            onChange={handleActivityChange}
                          />
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
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleSave}
                      >
                        Spara
                      </button>
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

export default ActivityLogSlideover
