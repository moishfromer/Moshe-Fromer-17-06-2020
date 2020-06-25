import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:8000' : '';

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

export const deleteMessage = createAsyncThunk(
  'mail/deleteMessage',
  async (messageId, thunkAPI) => {
    const response = await axios.delete(baseUrl + '/emails/messages/' + messageId)
    return messageId
  }
)

export const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    messagePending: false,
    getMessagesPending: false,
    deletePending: false,
    openDialog: false,
    mails: [],
    userId: '',
  },
  reducers: {
      setOpenDialog: (state, action) => { state.openDialog = action.payload},
      setUserId: (state, action) => {state.userId = action.payload}
  },
  extraReducers: {
      [sendMessage.pending]: (state, action) => {state.messagePending = true},
      [sendMessage.fulfilled]: (state, action) => {state.messagePending = false},
      [sendMessage.rejected]: (state, action) => {state.messagePending = false},

      [getMessages.pending]: (state, action) => {state.getMessagesPending = true},
      [getMessages.fulfilled]: (state, action) => {
        state.getMessagesPending = false
        state.mails = action.payload.reverse()
      },
      [getMessages.rejected]: (state, action) => {state.getMessagesPending = false},

      [deleteMessage.pending]: (state, action) => {state.deletePending = true},
      [deleteMessage.fulfilled]: (state, action) => {
        state.deletePending = false
        state.mails = state.mails.filter(mail => mail.id !== action.payload)
      },
      [deleteMessage.rejected]: (state, action) => {state.deletePending = false},
  }
});

export const { setOpenDialog, setUserId } = mailSlice.actions;

export default mailSlice.reducer;
