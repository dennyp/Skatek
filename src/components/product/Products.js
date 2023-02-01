import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { fetchProducts } from '../../app/features/products/productSlice'
import ProductTable from './ProductTable'

// TODO: add delete functionality. The product should perhaps be "inactivated" instead of deleted so that we can still use history of activity etc.
// TODO: add functionality to add a product.
const Product = () => {
  const [products, setProducts] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    try {
      const fetchProductsData = async () => {
        const products = await dispatch(fetchProducts()).unwrap()
        setProducts(products)
      }

      fetchProductsData()
    } catch (err) {
      console.error('error fetching products')
    }
  }, [dispatch])

  const handleSave = (editedProduct) => {
    const productList = products.map((product) => {
      return product.id === editedProduct.id ? editedProduct : product
    })

    setProducts(productList)
  }

  return <>{<ProductTable products={products} onSave={handleSave} />}</>
}

export default Product
