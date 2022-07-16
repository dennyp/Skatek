import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'

import { createProduct } from '../../graphql/mutations'
import {
  listProducts,
  listDepartments,
  listProductTypes,
} from '../../graphql/queries'
import Select from 'react-select'
import ProductTable from './ProductTable.js'

const initialState = {
  name: '',
  productDepartmentId: '',
  productProductTypeId: '',
  placement: '',
}

const AddProduct = () => {
  const [formState, setFormState] = useState(initialState)
  const [products, setProducts] = useState([])
  const [departments, setDepartments] = useState([])
  const [productTypes, setProductTypes] = useState([])

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
      const productData = await API.graphql(graphqlOperation(listProducts))
      const products = productData.data.listProducts.items
      setProducts(products)
      console.log(products)
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

  return (
    <>
      <div style={styles.container}>
        <h2>Skapa Produkt</h2>
        <input
          onChange={(event) => setInput('name', event.target.value)}
          style={styles.input}
          value={formState.name}
          placeholder="Märke"
        />
        <Select
          placeholder="Avdelning"
          onChange={(event) => setInput('productDepartmentId', event.id)}
          options={departments}
          getOptionLabel={(options) => options['name']}
          getOptionValue={(options) => options['id']}
        />
        <Select
          placeholder="Produkttyp"
          onChange={(event) => setInput('productProductTypeId', event.id)}
          options={productTypes}
          getOptionLabel={(options) => options['name']}
          getOptionValue={(options) => options['id']}
        />
        <input
          onChange={(event) => setInput('placement', event.target.value)}
          style={styles.input}
          value={formState.placement}
          placeholder="Placering"
        />
        <button style={styles.button} onClick={addProduct}>
          Skapa
        </button>
        {/* {products.map((product, index) => (
          <div key={product.id ? product.id : index} style={styles.product}>
            <p>{product.name}</p>
            <p>{product.department}</p>
            <p>{product.productType}</p>
            <p>{product.placement}</p>
          </div>
        ))} */}
      </div>
      {/* <Heading level={1}>Hej {user.username}!</Heading> */}
      {/* <Button onClick={signOut}>Sign out</Button> */}
      <ProductTable products={products} />
    </>
  )
}

const styles = {
  container: {
    width: 400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  product: { marginBottom: 15 },
  input: {
    border: 'none',
    backgroundColor: '#ddd',
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  productName: { fontSize: 20, fontWeight: 'bold' },
  productDescription: { marginBottom: 0 },
  button: {
    backgroundColor: 'black',
    color: 'white',
    outline: 'none',
    fontSize: 18,
    padding: '12px 0px',
  },
}

export default withAuthenticator(AddProduct)
