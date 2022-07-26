import React from 'react'
import { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listDepartments } from '../graphql/queries'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'

// Only keeping truthy values, filtering out nulls and undefined
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DepartmentInputGroup = ({ value, onChange }) => {
  const [query, setQuery] = useState('')
  const [departments, setDepartments] = useState([])

  const filteredDepartments =
    query === ''
      ? departments
      : departments.filter((department) => {
          return department.name.toLowerCase().includes(query.toLowerCase())
        })

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentData = await API.graphql(
          graphqlOperation(listDepartments)
        )
        const departments = departmentData.data.listDepartments.items

        setDepartments(departments)
      } catch (err) {
        console.error('error fetching departments')
      }
    }

    fetchDepartments()
  }, [value])

  const handleChange = (departmentValue) => {
    onChange(departmentValue)
  }

  return (
    <Combobox as="div" value={value} onChange={handleChange}>
      <div className="relative mt-1 pb-4">
        <Combobox.Label className="block text-xs font-medium text-gray-900">
          Avdelning
        </Combobox.Label>
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(department) => department?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredDepartments.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredDepartments.map((department) => (
              <Combobox.Option
                key={department.id}
                value={department}
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
                      {department.name}
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
