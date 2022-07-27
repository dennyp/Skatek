import { useState } from 'react'
import Pagination from './Pagination.js'
import ProductSlideover from './ProductSlideover.js'

const ProductTable = ({ products, onSave }) => {
  const [openSlider, setOpenSlider] = useState(false)
  const [productId, setProductId] = useState('')

  const handleEditClick = async (event) => {
    setOpenSlider(true)
    setProductId(event.target.value)
  }

  const handleSave = (product) => {
    onSave(product)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Produkter</h1>
          <p className="mt-2 text-sm text-gray-700">
            Här listas alla produkter som finns skapade.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Lägg till
          </button>
        </div>
      </div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Märke
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Avdelning
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Produkttyp
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Placering
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Ändra</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {product.name}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Title</dt>
                    <dd className="mt-1 truncate text-gray-700">
                      {product.department.name}
                    </dd>
                    <dt className="sr-only sm:hidden">Email</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {product.productType.name}
                    </dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {product.department.name}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {product.productType.name}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {product.placement}
                </td>
                <td className="py-4 pl-1.5 pr-1.5 text-right text-sm font-medium sm:pr-3">
                  <button
                    type="button"
                    className="inline-flex items-center px-1 py-1.5 text-xs font-medium rounded-full text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleEditClick}
                    value={product.id}
                  >
                    Ändra<span className="sr-only">, {product.name}</span>
                  </button>
                </td>
                <td className="py-4 pl-1.5 pr-1.5 text-right text-sm font-medium sm:pr-3">
                  <button
                    type="button"
                    className="inline-flex items-center px-1 py-1.5 text-xs font-medium rounded-full text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-indigo-500"
                  >
                    Radera<span className="sr-only">, {product.name}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {openSlider && (
          <ProductSlideover
            open={openSlider}
            setOpen={setOpenSlider}
            productId={productId}
            onSave={handleSave}
          />
        )}
        {/* <Pagination /> */}
      </div>
    </div>
  )
}

export default ProductTable
