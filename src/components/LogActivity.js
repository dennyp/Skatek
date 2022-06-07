import React, { Fragment, useEffect, useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { API, graphqlOperation } from 'aws-amplify'
import { createLogProduct } from '../graphql/mutations'
import { listProducts } from '../graphql/queries'
import Select from 'react-select'
// import { Combobox } from '@headlessui/react'
import SearchableCombobox from './SearchableCombobox.js'

const people = [
  { id: 1, name: 'test1' },
  { id: 2, name: 'test2' },
  { id: 3, name: 'test3' },
  { id: 4, name: 'test4' },
  { id: 5, name: 'hej' },
]

const LogActivity = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  // TODO: Make a DAL where useful functions are stored
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const productData = await API.graphql(graphqlOperation(listProducts))
      const products = productData.data.listProducts.items
      setProducts(products)
    } catch (err) {
      console.log('error fetching products')
    }
  }

  return (
    <>
      <div className="flex bg-stone-200 max-w-7xl w-2/3 mx-auto mt-5 p-5 sm:px-6 lg:px-8 rounded-lg">
        <SearchableCombobox label="Produkt" array={people} />

        {/* <Combobox value={selectedPerson} onChange={setSelectedPerson}>
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(person) => person.name}
            className="max-w-7xl mt-5 p-2"
          />
          <Combobox.Button>x</Combobox.Button>
          <Combobox.Options className="w-1/3">
            {filteredPeople.map((person) => (
              <Combobox.Option key={person.id} value={person} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                    }`}
                  >
                    {person.name}
                  </li>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox> */}
        <p>Datum</p>
        <p>Aktivitet</p>
        <p>Gnagt</p>
        <p>Nytt bete</p>
        <p>Kommentar</p>
      </div>
    </>
  )
}

export default withAuthenticator(LogActivity)
