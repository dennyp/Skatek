import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { API, graphqlOperation } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { listProductTypes } from '../graphql/queries'

// Only keeping truthy values, filtering out nulls and undefined
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DepartmentInputGroup = ({ value, onChange }) => {
  const [query, setQuery] = useState('')
  const [productTypes, setProductTypes] = useState([])

  const filteredProductTypes =
    query === ''
      ? productTypes
      : productTypes.filter((productType) => {
          return productType.name.toLowerCase().includes(query.toLowerCase())
        })

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const productTypesData = await API.graphql(
          graphqlOperation(listProductTypes)
        )
        const productTypes = productTypesData.data.listProductTypes.items

        setProductTypes(productTypes)
      } catch (err) {
        console.error('error fetching product types')
      }
    }

    fetchProductTypes()
  }, [value])

  const handleChange = (productTypesValue) => {
    onChange(productTypesValue)
  }

  return (
    <Combobox as="div" value={value} onChange={handleChange}>
      <div className="relative mt-1 pb-4">
        <Combobox.Label className="block text-xs font-medium text-gray-900">
          Produkttyp
        </Combobox.Label>
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(productType) => productType?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredProductTypes.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredProductTypes.map((productType) => (
              <Combobox.Option
                key={productType.id}
                value={productType}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected && 'font-semibold'
                      )}
                    >
                      {productType.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 left-0 flex items-center pl-1.5',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}

export default DepartmentInputGroup
