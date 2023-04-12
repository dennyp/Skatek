import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  userInfo: { user: { isAdmin: false } },
  token: null,
  email: null,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = { user: { isAdmin: false } }
      state.token = null
      state.email = null
      state.loading = false
      state.error = null
    },
    setCredentials: (state, { payload }) => {
      const { email, accessToken } = payload
      state.userInfo = payload
      state.email = email
      state.token = accessToken
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    },
  },
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentEmail = (state) => state.auth.email
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentIsAdmin = (state) =>
  state.auth.userInfo?.user?.isAdmin
