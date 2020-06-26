import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

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
    await axios.delete(baseUrl + '/emails/messages/' + messageId)
    return messageId
  }
)

const emptyToast = {show: false, message: ''}

export const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    messagePending: false,
    getMessagesPending: false,
    deletePending: false,
    openComposeDialog: false,
    mails: [],
    userId: '',
    feedbackToast: {...emptyToast},
  },
  reducers: {
      setOpenComposeDialog: (state, action) => { state.openComposeDialog = action.payload},
      setUserId: (state, action) => {state.userId = action.payload},
      closeToast: (state) => {state.feedbackToast = {...emptyToast}}
  },
  extraReducers: {
      [sendMessage.pending]: (state, action) => {state.messagePending = true},
      [sendMessage.fulfilled]: (state, action) => {
        state.messagePending = false;
        state.openComposeDialog = false;
        state.feedbackToast = {
          show: true, 
          message: 'message sent'
        }
      },
      [sendMessage.rejected]: (state, action) => {
        state.messagePending = false;
        state.feedbackToast = {show: true, message: 'message failed'}
      },

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
        state.feedbackToast = {show: true, message: 'message deleted'}
      },
      [deleteMessage.rejected]: (state, action) => {
        state.deletePending = false
        state.feedbackToast = {show: true, message: 'delete failed'}
      },
  }
});

export const { setOpenComposeDialog, setUserId, closeToast } = mailSlice.actions;

export default mailSlice.reducer;
