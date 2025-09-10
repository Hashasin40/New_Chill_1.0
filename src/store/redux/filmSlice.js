import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axiosInstance'

export const fetchPosters = createAsyncThunk('film/fetchPosters', async () => {
  const res = await axiosInstance.get('/posters')
  return res.data.filter(
    (item) => item.id && item.title && item.poster && item.landscape
  )
})

const filmSlice = createSlice({
  name: 'film',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosters.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPosters.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchPosters.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default filmSlice.reducer
