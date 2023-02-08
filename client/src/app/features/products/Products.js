import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useGetProductsQuery } from '../products/productsApiSlice'
import { setProducts } from './productSlice'
import ProductTable from './ProductTable'

// TODO: add delete functionality. The product should perhaps be "inactivated" instead of deleted so that we can still use history of activity etc.
// TODO: add functionality to add a product.
const Product = () => {
  const { isLoading, error, data: products } = useGetProductsQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setProducts())
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
