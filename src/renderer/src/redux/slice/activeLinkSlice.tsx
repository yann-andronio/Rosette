import { createSlice, PayloadAction } from '@reduxjs/toolkit'



const initialState = {
  activeName: 'Dashboard',
  closeBar: false
}

const activeLinkSlice = createSlice({
  name: 'activeLink',
  initialState,
  reducers: {
    setActiveName: (state, action: PayloadAction<string>) => {
      state.activeName = action.payload
    },
    toggleCloseBar: (state) => {
      state.closeBar = !state.closeBar
    },
    resetActiveName: (state) => {
  state.activeName = 'Dashboard'
}

  }
})

export const { setActiveName, toggleCloseBar, resetActiveName } = activeLinkSlice.actions
export default activeLinkSlice.reducer
