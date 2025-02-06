import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ModelState {
  Class: string,
  Teacher:string,
  limit:string

}

const initialState: ModelState = {
  Class: '',
  Teacher: '',
  limit: '',
}

export const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<{Class: string; Teacher: string; limit: string}>) => {
      state.Class = action.payload.Class;
      state.Teacher = action.payload.Teacher;
      state.limit = action.payload.limit;
    },
  },
})

// Action creators are generated for each case reducer function
export const {  incrementByAmount } = ModalSlice.actions

export default ModalSlice.reducer