import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const sendMessage = createAsyncThunk(
  'mail/sendMessage',
  async (message, thunkAPI) => {
    const response = await axios.post('http://localhost:8000/emails/messages/', message)
    return response.data
  }
)

export const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    messagePending: false,
    openDialog: false
  },
  reducers: {
      setOpenDialog: (state, action) => {state.openDialog = action.payload}
  },
  extraReducers: {
      [sendMessage.pending]: (state, action) => {state.messagePending = true},
      [sendMessage.fulfilled]: (state, action) => {state.messagePending = false},
      [sendMessage.rejected]: (state, action) => {state.messagePending = false},
  }
});

export const { setOpenDialog } = mailSlice.actions;

export default mailSlice.reducer;
