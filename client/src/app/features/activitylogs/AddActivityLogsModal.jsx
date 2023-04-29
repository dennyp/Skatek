import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Box } from '@mui/material'
import { Fragment, useState } from 'react'
import { toast } from 'react-toastify'
import { ButtonWithSpinner } from '../../../components/ButtonWithSpinner'
import DepartmentInputGroup from '../departments/DepartmentInputGroup'
import { useGetProductsWithSearchQuery } from '../products/productsApiSlice'
import LogTable from './LogTable'
import { useCreateActivityLogMutation } from './activityLogsApiSlice'

const AddActivityLogsModal = ({ open, setOpen }) => {
  const [selectedDepartment, setSelectedDepartment] = useState({})
  const [isSkip, setIsSkip] = useState(true)

  const [selectedDateLogged, setSelectedDateLogged] = useState(
    new Date().toISOString().slice(0, 10)
  )
  const [formContent, setFormContent] = useState([])

  const successMessage = () => toast.success('Loggar sparade')
  const failureMessage = () => toast.error('Loggar kunde inte sparas')

  const { data: products = [], isSuccess } = useGetProductsWithSearchQuery(
    {
      search: selectedDepartment?._id,
    },
    { skip: isSkip }
  )

  const [
    createActivityLog,
    { isLoading: isCreatingLog, isSuccess: isCreateSuccess },
  ] = useCreateActivityLogMutation()

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department)
    setIsSkip(false)
  }

  const handleDateChange = (event) => {
    setSelectedDateLogged(event.target.value)
  }

  let content
  if (Object.keys(selectedDepartment).length > 0) {
    if (isSuccess) {
      content = (
        <Box
          sx={{ height: '60vh', m: '1.5rem 1rem' }}
          className="overflow-y-auto"
        >
          <LogTable
            products={products}
            setFormContent={setFormContent}
            date={selectedDateLogged}
          />
        </Box>
      )
    }
  } else {
    content = (
      <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
        Välj en avdelning...
      </div>
    )
  }

  const handleSave = async () => {
    try {
      formContent.forEach(async (item) => {
        await createActivityLog(item)
      })

      setOpen(false)
      setIsSkip(true)
      successMessage()
    } catch (error) {
      failureMessage()
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
              <Dialog.Panel className="relative w-11/12 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex h-full flex-col"
                >
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Stäng</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Lägg till loggar
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Fyll i fälten nedan och klicka på spara för att logga
                          aktiviteter.
                        </p>
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
                      <label
                        htmlFor="date-logged"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Loggad datum
                      </label>
                      <input
                        id="date-logged"
                        type="date"
                        value={selectedDateLogged}
                        onChange={handleDateChange}
                        className="rounded-md border-gray-300"
                      />
                    </div>
                    {content}
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <ButtonWithSpinner
                      isLoading={isCreatingLog}
                      handleClick={handleSave}
                    >
                      {isCreatingLog ? 'Sparar...' : 'Spara'}
                    </ButtonWithSpinner>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Avbryt
                    </button>
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

export default AddActivityLogsModal
