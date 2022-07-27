import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'

import { createProduct } from '../../graphql/mutations'
import { listDepartments, listProductTypes } from '../../graphql/queries'
import { listProductsWithExtraInfo } from '../../graphql/custom-queries'
import ProductTable from './ProductTable.js'

const initialState = {
  name: '',
  productDepartmentId: '',
  productProductTypeId: '',
  placement: '',
}

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
  }, [products])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

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
    products.map((product) => {
      if (product.id === editedProduct.id) {
        return { ...products, editedProduct }
      }
    })
  }

  return <>{<ProductTable products={products} onSave={handleSave} />}</>
}

export default withAuthenticator(Product)
