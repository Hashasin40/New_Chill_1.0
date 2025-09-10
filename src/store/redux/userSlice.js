// src/store/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axiosInstance'
import IconProfile from '../../assets/icon profile2.png'

// 🔐 Signup
export const signupUser = createAsyncThunk(
  'user/signup',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/users')
      const existing = res.data.find(u => u.email === email)
      if (existing) return rejectWithValue('Email sudah terdaftar.')

      const newUser = { name, email, password, avatar: IconProfile }
      await axiosInstance.post('/users', newUser)
      return newUser
    } catch {
      return rejectWithValue('Gagal daftar. Coba lagi nanti.')
    }
  }
)

// 🔐 Login
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/users')
      const found = res.data.find(u => u.email === email && u.password === password)
      if (!found) return rejectWithValue('Email atau password salah!')
      return found
    } catch {
      return rejectWithValue('Gagal login. Coba lagi nanti.')
    }
  }
)

// 📝 Update Profil
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (updatedData, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/users/${updatedData.id}`, updatedData)
      localStorage.setItem('user', JSON.stringify(updatedData))
      return updatedData
    } catch {
      return rejectWithValue('Gagal update profil.')
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
    username: '',
    password: '',
    avatarLocal: null
  },
  reducers: {
    logoutUser: (state) => {
      state.data = null
      state.username = ''
      state.password = ''
      state.avatarLocal = null
      localStorage.removeItem('user')
    },
    restoreUser: (state, action) => {
      state.data = action.payload
      state.username = action.payload.name
      state.avatarLocal = action.payload.avatar
    },
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setAvatarLocal: (state, action) => {
      state.avatarLocal = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.username = action.payload.name
        state.avatarLocal = action.payload.avatar
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.username = action.payload.name
        state.avatarLocal = action.payload.avatar
        state.password = ''
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const {
  logoutUser,
  restoreUser,
  setUsername,
  setPassword,
  setAvatarLocal
} = userSlice.actions

export default userSlice.reducer
