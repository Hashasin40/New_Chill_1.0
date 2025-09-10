// src/store/redux/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axiosInstance'

export const fetchSearchResults = createAsyncThunk(
  'search/fetchResults',
  async (query) => {
    const res = await axiosInstance.get('/posters')
    return res.data
      .filter((item) => item.searchText?.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => b.searchBoost - a.searchBoost)
  }
)

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    loading: false
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false
        state.results = action.payload
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.loading = false
        state.results = []
      })
  }
})

export const { setQuery } = searchSlice.actions
export default searchSlice.reducer
