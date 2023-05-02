import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AddButton from '../../../components/AddButton'
import DataGridActions from '../actions/DataGridActions'
import AddProductSlideover from './AddProductSlideover'
import ProductSlideover from './ProductSlideover'
import { useGetProductsQuery } from './productsApiSlice'
import { setProducts } from './productsSlice'

const Product = () => {
  const [openEditSlider, setOpenEditSlider] = useState(false)
  const [openAddSlider, setOpenAddSlider] = useState(false)
  const [productId, setProductId] = useState('')

  let { isLoading, error, data: products } = useGetProductsQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setProducts(products))
  }, [dispatch, products])

  const onEditClick = (row) => {
    setOpenEditSlider(true)
    setProductId(row._id)
  }

  const columns = [
    {
      field: 'department',
      headerName: 'Avdelning',
      flex: 1.2,
      valueGetter: (params) => params.row?.department?.name,
    },
    { field: 'name', headerName: 'Namn', flex: 0.5 },
    { field: 'placement', headerName: 'Placering', flex: 3 },
    // {
    //   field: 'productType',
    //   headerName: 'Produkttyp',
    //   flex: 1,
    //   valueGetter: (params) => params.row?.productType?.name,
    // },
    // {
    //   field: 'location',
    //   headerName: 'Lokalisering',
    //   flex: 1,
    //   valueGetter: (params) => params.row?.location?.name,
    // },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 0.5,
      renderCell: (params) => <DataGridActions {...{ params, onEditClick }} />,
    },
  ]

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mt-6 ml-5 mr-5">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Produkter</h1>
            <p className="mt-2 text-sm text-gray-700">
              Här listas alla produkter som finns skapade.
            </p>
          </div>
          <AddButton openSlider={setOpenAddSlider} text="Lägg till" />
        </div>
        <Box sx={{ height: '80vh', m: '1.5rem 1rem' }}>
          <DataGrid
            loading={isLoading || !products}
            getRowId={(product) => product._id}
            rows={products || []}
            columns={columns}
          />
        </Box>
        {openEditSlider && (
          <ProductSlideover
            open={openEditSlider}
            setOpen={setOpenEditSlider}
            productId={productId}
          />
        )}
        {openAddSlider && (
          <AddProductSlideover
            open={openAddSlider}
            setOpen={setOpenAddSlider}
          />
        )}
      </div>
    </>
  )
}

export default Product
