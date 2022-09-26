import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { API, graphqlOperation } from 'aws-amplify'
import { listActivityLogsWithExtraInfo } from '../../../graphql/custom-queries'
import { createActivityLog } from '../../../graphql/mutations'

const activityLogAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

export const fetchActivityLogs = createAsyncThunk(
  'logs/fetchLogs',
  async () => {
    const activityLogsData = await API.graphql(
      graphqlOperation(listActivityLogsWithExtraInfo)
    )
    return activityLogsData.data.listActivityLogs.items
  }
)

export const addNewLog = createAsyncThunk(
  'logs/addNewLog',
  async (initialLog) => {
    const response = await API.graphql(
      graphqlOperation(createActivityLog, initialLog)
    )
    return response.data
  }
)

export const activitylogSlice = createSlice({
  name: 'activity',
  initialState: activityLogAdapter.getInitialState({
    logs: [],
    error: null,
    status: 'idle',
  }),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActivityLogs.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchActivityLogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.logs = action.payload
      })
      .addCase(fetchActivityLogs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewLog.fulfilled, (state, action) => {
        state.logs.push(action.payload)
      })
  },
})

// export const { selectAllLogs, selectLogById } = activityLogAdapter.getSelectors(
//   (state) => state.activity
// )

export const selectAllLogs = (state) => state.activity.logs
export const getLogsError = (state) => state.activity.error
export const getLogsStatus = (state) => state.activity.status

// export const { fetchActivityLogs } = activitylogSlice.actions

export default activitylogSlice.reducer
