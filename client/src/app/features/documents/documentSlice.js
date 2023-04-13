import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const downloadFile = createAsyncThunk(
  'document/download',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/documents/download/${id}`,
        {
          responseType: 'blob',
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${name}`)
      document.body.appendChild(link)
      link.click()
      return { id }
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const documentSlice = createSlice({
  name: 'document',
  initialState: {
    documentId: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(downloadFile.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(downloadFile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.documentId = action.payload.documentId
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default documentSlice.reducer
