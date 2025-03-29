import { createSlice, PayloadAction } from '@reduxjs/toolkit'



const initialState = {
  activeName: 'Accueil',
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
    }
  }
})

export const { setActiveName, toggleCloseBar } = activeLinkSlice.actions
export default activeLinkSlice.reducer
