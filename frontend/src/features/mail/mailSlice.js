import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const baseUrl = window.location.hostname == 'localhost' ? 'http://localhost:8000' : '';

export const sendMessage = createAsyncThunk(
  'mail/sendMessage',
  async (message, thunkAPI) => {
    const response = await axios.post(baseUrl + '/emails/messages/', message)
    return response.data
  }
)

export const getMessages = createAsyncThunk(
  'mail/getMessages',
  async (userId, thunkAPI) => {
    const response = await axios.get(baseUrl + '/emails/messages/', {
      params:{user_id: userId}
    })
    return response.data
  }
)

export const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    messagePending: false,
    openDialog: false,
    mails: []
  },
  reducers: {
      setOpenDialog: (state, action) => { state.openDialog = action.payload}
  },
  extraReducers: {
      [sendMessage.pending]: (state, action) => {state.messagePending = true},
      [sendMessage.fulfilled]: (state, action) => {state.messagePending = false},
      [sendMessage.rejected]: (state, action) => {state.messagePending = false},
      [getMessages.pending]: (state, action) => {state.messagePending = true},
      [getMessages.fulfilled]: (state, action) => {
        state.messagePending = false
        state.mails = action.payload
      },
      [getMessages.rejected]: (state, action) => {state.messagePending = false},
  }
});

export const { setOpenDialog } = mailSlice.actions;

export default mailSlice.reducer;
