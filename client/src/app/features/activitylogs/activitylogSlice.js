import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

const activityLogAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const { REACT_APP_API_URL } = process.env

// export const fetchActivityLogs = createAsyncThunk(
//   'logs/fetchLogs',
//   async () => {
//     const activityLogsData = await API.graphql(
//       graphqlOperation(listActivityLogsWithExtraInfo, { limit: 10000 })
//     )
//     return activityLogsData.data.listActivityLogs.items
//   }
// )

export const fetchActivityLogsFromDepartment = createAsyncThunk(
  'logs/fetchLogsFromDepartment',
  async (department) => {
    try {
      const activityLogs = await axios.get(
        `${REACT_APP_API_URL}/activityLogs/department/${department._id}`
      )

      return activityLogs.data
    } catch (error) {
      console.error(error)
    }
  }
)

// export const fetchActivityLogById = createAsyncThunk(
//   'logs/fetchLogById',
//   async (id) => {
//     try {
//       const activityLogData = await API.graphql(
//         graphqlOperation(getActivityLogWithExtraInfo, { id: id })
//       )

//       return activityLogData.data.getActivityLog
//     } catch (err) {
//       console.error(err)
//     }
//   }
// )

// export const createLog = createAsyncThunk('logs/createLog', async (log) => {
//   try {
//     if (log.input.activity > 100) return

//     const response = await API.graphql(
//       graphqlOperation(createActivityLogWithExtraInfo, log)
//     )
//     return response.data.createActivityLog
//   } catch (err) {
//     console.error(err)
//   }
// })

// export const updateLog = createAsyncThunk('logs/updateLog', async (log) => {
//   try {
//     const response = await API.graphql(
//       graphqlOperation(updateActivityLogWithExtraInfo, {
//         input: {
//           id: log.id,
//           activity: log.activity,
//           activityLogProductId: log.activityLogProductId,
//           comment: log.comment,
//           dateLogged: log.dateLogged,
//         },
//       })
//     )
//     return response.data.updateActivityLog
//   } catch (err) {
//     console.error(err)
//   }
// })

// export const deleteLog = createAsyncThunk('logs/deleteLog', async (log) => {
//   try {
//     const { id } = log
//     const response = await API.graphql(
//       graphqlOperation(deleteActivityLog, { input: { id: id } })
//     )

//     return response.data.deleteActivityLog
//   } catch (err) {
//     console.error(err)
//   }
// })

// export const fetchDepartmentById = createAsyncThunk(
//   'logs/fetchDepartmentById',
//   async (id) => {
//     const response = API.graphql(graphqlOperation(getDepartment, { id: id }))

//     return response.data
//   }
// )

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
    // .addCase(fetchActivityLogById.fulfilled, (state, action) => {
    //   state.selectedLog = action.payload
    // })
    // .addCase(createLog.fulfilled, (state, action) => {
    //   state.logs = [...state.logs, action.payload]
    // })
    // .addCase(updateLog.fulfilled, (state, action) => {
    //   const { id } = action.payload

    //   const logs = state.logs.filter((log) => log.id !== id)
    //   state.logs = [...logs, action.payload]
    // })
    // .addCase(deleteLog.fulfilled, (state, action) => {
    //   const { id } = action.payload
    //   const logs = state.logs.filter((log) => log.id !== id)
    //   state.logs = logs
    // })
  },
})

export const selectAllLogs = (state) => state.activity.logs
export const getLogsError = (state) => state.activity.error
export const getLogsStatus = (state) => state.activity.status

export const selectLogById = (state, logId) =>
  state.activity.logs.find((log) => log._id === logId)

export default activitylogSlice.reducer
