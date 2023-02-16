import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

const activityLogAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

export const activitylogSlice = createSlice({
  name: 'activity',
  initialState: activityLogAdapter.getInitialState({
    selectedLog: {},
    logs: [],
    error: null,
    status: 'idle',
  }),
  reducers: {},
})

export const selectAllLogs = (state) => state.activity.logs
export const getLogsError = (state) => state.activity.error
export const getLogsStatus = (state) => state.activity.status

export const selectLogById = (state, logId) =>
  state.activity.logs.find((log) => log._id === logId)

export default activitylogSlice.reducer
