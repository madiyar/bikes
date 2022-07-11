import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface IBike {
  id: number
  name: string
  description: string
}

export interface IState {
  loading: boolean,
  data: IBike[],
  error: string | undefined,
  bike: IBike | undefined
}

const initialState: IState = {
  loading: false,
  data: [],
  bike: undefined,
  error: ''
}

export const http = axios.create({ baseURL: 'http://localhost:3004/bikes' })

export const fetchBikes = createAsyncThunk('bike/fetchBikes', async () => {
  return http.get('').then(res => res.data)
})

export const getBike = createAsyncThunk('bike/getBike', async (id: string | undefined, dispatch) => {
  return http.get(`/${id}`).then(res => res.data)
})

export const deleteBike = createAsyncThunk('bike/deleteBike', async (id: number | undefined, { dispatch }) => {
  return http.delete(`/${id}`).then(res => {
    dispatch(bikeSlice.actions.removeBike(id));
    return res.data
  })
})

export const bikeSlice = createSlice({
  name: 'bike',
  initialState,
  reducers: {
    removeBike: (state, action: PayloadAction<number | undefined>) => {
      state.data = state.data.filter(item => item.id !== action.payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchBikes.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchBikes.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
    })
    builder.addCase(fetchBikes.rejected, (state, action) => {
      state.data = []
      state.loading = false
      state.error = action.error.message
    })
    // get bike
    builder.addCase(getBike.pending, state => {
      state.loading = true
    })
    builder.addCase(getBike.rejected, (state, action) => {
      state.bike = undefined
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(getBike.fulfilled, (state, action) => {
      state.bike = action.payload
      state.loading = false
    })
  }
})

export default bikeSlice.reducer