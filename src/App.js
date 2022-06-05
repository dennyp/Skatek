/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createProduct } from './graphql/mutations'
import { listProducts } from './graphql/queries'

// import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import awsExports from './aws-exports'
Amplify.configure(awsExports)

const initialState = {
  name: '',
  department: '',
  productType: '',
  placement: '',
}

const App = ({ signOut, user }) => {
  const [formState, setFormState] = useState(initialState)
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchProducts() {
    try {
      const productData = await API.graphql(graphqlOperation(listProducts))
      const products = productData.data.listProducts.items
      setProducts(products)
    } catch (err) {
      console.log('error fetching products')
    }
  }

  async function addProduct() {
    try {
      console.log(formState)
      if (
        !formState.name ||
        !formState.department ||
        !formState.productType ||
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
        <input
          onChange={(event) => setInput('department', event.target.value)}
          style={styles.input}
          value={formState.department}
          placeholder="Avdelning"
        />
        <input
          onChange={(event) => setInput('productType', event.target.value)}
          style={styles.input}
          value={formState.productType}
          placeholder="Produkttyp"
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
        {products.map((product, index) => (
          <div key={product.id ? product.id : index} style={styles.product}>
            <p style={styles.productName}>{product.name}</p>
            <p style={styles.productDescription}>{product.department}</p>
            <p style={styles.productDescription}>{product.productType}</p>
            <p style={styles.productDescription}>{product.placement}</p>
          </div>
        ))}
      </div>
      {/* <Heading level={1}>Hej {user.username}!</Heading> */}
      {/* <Button onClick={signOut}>Sign out</Button> */}
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

export default App
