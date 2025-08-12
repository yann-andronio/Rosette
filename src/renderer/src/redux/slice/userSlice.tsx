import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// mila alagna reto @finition
const initialState = {
  name: 'luca',
  role: 'Secrétaire'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; role: string }>) => {
      state.name = action.payload.name
      state.role = action.payload.role
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
