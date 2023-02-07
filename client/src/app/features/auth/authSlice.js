import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const { REACT_APP_API_URL } = process.env

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userInfo: {},
  userToken,
  error: null,
  success: false,
}

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = { 'Content-Type': 'application/json' }

      const { data } = await axios.post(
        `${REACT_APP_API_URL}/users/login`,
        {
          email,
          password,
        },
        config
      )

      localStorage.setItem('userToken', data.token)

      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = {}
      state.userToken = null
      state.loading = false
      state.error = null
      localStorage.removeItem('userToken')
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loading = false
      state.userInfo = action.payload.userInfo
      state.userToken = action.payload.token
    },
    [userLogin.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUserInfo = (state) => state.auth.userInfo
