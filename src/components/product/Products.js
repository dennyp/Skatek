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
  const [departments, setDepartments] = useState([])
  const [productTypes, setProductTypes] = useState([])
  // const [isEditing, setIsEditing] = useState(false)
  // const [selectedProduct, setSelectedProduct] = useState('')

  useEffect(() => {
    fetchProducts()
    fetchDepartments()
    fetchProductTypes()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchProducts() {
    try {
      const productData = await API.graphql(
        graphqlOperation(listProductsWithExtraInfo)
      )

      const products = productData.data.listProducts.items
      setProducts(products)
    } catch (err) {
      console.log('error fetching products')
    }
  }

  async function fetchDepartments() {
    try {
      const departmentData = await API.graphql(
        graphqlOperation(listDepartments)
      )
      const departments = departmentData.data.listDepartments.items
      setDepartments(departments)
    } catch (err) {
      console.log('error fetching departments')
    }
  }

  async function fetchProductTypes() {
    try {
      const productTypeData = await API.graphql(
        graphqlOperation(listProductTypes)
      )
      const productTypes = productTypeData.data.listProductTypes.items
      setProductTypes(productTypes)
    } catch (err) {
      console.log('error fetching product types')
    }
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
      console.log('error creating product:', err)
    }
  }

  // const handleEditClick = (event) => {
  //   setSelectedProduct(event.target.value)
  //   setIsEditing(true)
  // }

  return (
    <>
      <ProductTable products={products} />
    </>
  )
}

export default withAuthenticator(Product)
