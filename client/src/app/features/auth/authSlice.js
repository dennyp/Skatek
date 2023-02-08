import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  userInfo: {},
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
      state.userInfo = {}
      state.token = null
      state.email = null
      state.loading = false
      state.error = null
      localStorage.removeItem('userToken')
    },
    setCredentials: (state, { payload }) => {
      const { email, accessToken } = payload
      state.userInfo = payload
      state.email = email
      state.token = accessToken
    },
  },
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentEmail = (state) => state.auth.email
export const selectCurrentToken = (state) => state.auth.token
