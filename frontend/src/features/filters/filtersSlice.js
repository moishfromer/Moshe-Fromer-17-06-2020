import { createSlice } from '@reduxjs/toolkit'

export const VisibilityFilters = {
  SHOW_INBOX: 'SHOW_INBOX',
  SHOW_SENT: 'SHOW_SENT'
}

const filtersSlice = createSlice({
  name: 'visibilityFilters',
  initialState: VisibilityFilters.SHOW_INBOX,
  reducers: {
    setVisibilityFilter(state, action) {
      return action.payload
    }
  }
})

export const { setVisibilityFilter } = filtersSlice.actions

export default filtersSlice.reducer