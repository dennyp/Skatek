import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { API, graphqlOperation } from 'aws-amplify'
import { Fragment, useEffect, useState } from 'react'
import NumberInputGroup from '../../../components/NumberInputGroup'
import ProductInputGroup from '../../../components/ProductInputGroup'
import TextInputGroup from '../../../components/TextInputGroup'
import { createActivityLog } from '../../../graphql/mutations'
import { listProducts } from '../../../graphql/queries'

const AddActivityLogSlideover = ({ open, setOpen }) => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState({})
  const [selectedActivity, setSelectedActivity] = useState(0)
  const [selectedComment, setSelectedComment] = useState('')
  const [selectedDateLogged, setSelectedDateLogged] = useState(
    new Date().toISOString().slice(0, 10)
  )

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await API.graphql(graphqlOperation(listProducts))

        const products = productData.data.listProducts.items
        setProducts(products)
      } catch (err) {
        console.error('error fetching products', err)
      }
    }

    fetchProducts()
  }, [])

  const handleProductChange = (product) => {
    setSelectedProduct(product)
  }

  const handleActivityChange = (activity) => {
    setSelectedActivity(activity)
  }

  const handleCommentChange = (comment) => {
    setSelectedComment(comment)
  }

  const handleDateChange = (event) => {
    setSelectedDateLogged(event.target.value)
  }

  const handleCreateClick = async (event) => {
    try {
      const newActivityLog = {
        input: {
          activity: selectedActivity,
          activityLogProductId: selectedProduct.id,
          dateLogged: selectedDateLogged,
          comment: selectedComment,
        },
      }
      const savedActivityLog = await API.graphql(
        graphqlOperation(createActivityLog, newActivityLog)
      )
    } catch (err) {
      console.error('error creating an activity log', err)
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
                  <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              {' '}
                              Ny aktivitetslogg{' '}
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">
                              Fyll i fälten nedan och klicka på skapa för att
                              logga en aktivitet.
                            </p>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Stäng panelen</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <ProductInputGroup
                            value={selectedProduct}
                            onChange={handleProductChange}
                          />
                        </div>
                        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <NumberInputGroup
                            label="Aktivitet"
                            value={selectedActivity}
                            onChange={handleActivityChange}
                          />
                        </div>
                        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <TextInputGroup
                            label="Kommentar"
                            value={selectedComment}
                            onChange={handleCommentChange}
                          />
                        </div>
                        <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <input
                            type="date"
                            value={selectedDateLogged}
                            onChange={handleDateChange}
                          />
                        </div>
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
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={handleCreateClick}
                        >
                          Skapa
                        </button>
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

export default AddActivityLogSlideover
