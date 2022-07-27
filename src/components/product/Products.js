import React, { useEffect, useState } from 'react'

import { withAuthenticator } from '@aws-amplify/ui-react'
import { API, graphqlOperation } from 'aws-amplify'
import { listProductsWithExtraInfo } from '../../graphql/custom-queries'
import { createProduct } from '../../graphql/mutations'
import ProductTable from './ProductTable.js'

const initialState = {
  name: '',
  productDepartmentId: '',
  productProductTypeId: '',
  placement: '',
}

// TODO: add delete functionality. The product should perhaps be "inactivated" instead of deleted so that we can still use history of activity etc.
// TODO: add functionality to add a product.
const Product = () => {
  const [formState, setFormState] = useState(initialState)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await API.graphql(
          graphqlOperation(listProductsWithExtraInfo)
        )

        const products = productData.data.listProducts.items
        setProducts(products)
      } catch (err) {
        console.error('error fetching products')
      }
    }

    fetchProducts()
  }, [])

  async function addProduct() {
    try {
      if (
        !formState.name ||
        !formState.productDepartmentId ||
        !formState.productProductTypeId ||
        !formState.placement
      )
        return
      const product = { ...formState }
      setProducts([...products, product])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createProduct, { input: product }))
    } catch (err) {
      console.error('error creating product:', err)
    }
  }

  const handleSave = (editedProduct) => {
    const productList = products.map((product) => {
      return product.id === editedProduct.id ? editedProduct : product
    })

    setProducts(productList)
  }

  return <>{<ProductTable products={products} onSave={handleSave} />}</>
}

export default withAuthenticator(Product)
