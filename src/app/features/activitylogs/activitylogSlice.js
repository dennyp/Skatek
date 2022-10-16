import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { API, graphqlOperation } from 'aws-amplify'
import {
  getActivityLogWithExtraInfo,
  listActivityLogsWithExtraInfo,
  updateActivityLogWithExtraInfo,
} from '../../../graphql/custom-queries'
import {
  createActivityLog,
  deleteActivityLog,
} from '../../../graphql/mutations'
import { getDepartment } from '../../../graphql/queries'

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

// should probably restructure the tables so it's possible to filter in backend
export const fetchActivityLogsFromDepartment = createAsyncThunk(
  'logs/fetchLogsFromDepartment',
  async (department) => {
    const activityLogsData = await API.graphql(
      graphqlOperation(listActivityLogsWithExtraInfo, { limit: 10000 })
    )
    const filteredData = activityLogsData.data.listActivityLogs.items.filter(
      (log) => department?.id === log.product.department.id
    )

    return filteredData
  }
)

export const fetchActivityLogById = createAsyncThunk(
  'logs/fetchLogById',
  async (id) => {
    try {
      const activityLogData = await API.graphql(
        graphqlOperation(getActivityLogWithExtraInfo, { id: id })
      )

      return activityLogData.data.getActivityLog
    } catch (err) {
      console.error(err)
    }
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

export const updateLog = createAsyncThunk('logs/updateLog', async (log) => {
  try {
    const response = await API.graphql(
      graphqlOperation(updateActivityLogWithExtraInfo, {
        input: {
          id: log.id,
          activity: log.activity,
          activityLogProductId: log.activityLogProductId,
          comment: log.comment,
          dateLogged: log.dateLogged,
        },
      })
    )
    return response.data.updateActivityLog
  } catch (err) {
    console.error(err)
  }
})

export const deleteLog = createAsyncThunk('logs/deleteLog', async (log) => {
  try {
    const { id } = log
    const response = await API.graphql(
      graphqlOperation(deleteActivityLog, { input: { id: id } })
    )

    return response.data.deleteActivityLog
  } catch (err) {
    console.error(err)
  }
})

export const fetchDepartmentById = createAsyncThunk(
  'logs/fetchDepartmentById',
  async (id) => {
    const response = API.graphql(graphqlOperation(getDepartment, { id: id }))

    return response.data
  }
)

export const activitylogSlice = createSlice({
  name: 'activity',
  initialState: activityLogAdapter.getInitialState({
    selectedLog: {},
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
      .addCase(fetchActivityLogsFromDepartment.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchActivityLogsFromDepartment.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.logs = action.payload
      })
      .addCase(fetchActivityLogsFromDepartment.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchActivityLogById.fulfilled, (state, action) => {
        state.selectedLog = action.payload
      })
      .addCase(updateLog.fulfilled, (state, action) => {
        const { id } = action.payload

        const logs = state.logs.filter((log) => log.id !== id)
        state.logs = [...logs, action.payload]
      })
      .addCase(deleteLog.fulfilled, (state, action) => {
        const { id } = action.payload
        const logs = state.logs.filter((log) => log.id !== id)
        state.logs = logs
      })
  },
})

export const selectAllLogs = (state) => state.activity.logs
export const getLogsError = (state) => state.activity.error
export const getLogsStatus = (state) => state.activity.status

export const selectLogById = (state, logId) =>
  state.activity.logs.find((log) => log.id === logId)

export default activitylogSlice.reducer
