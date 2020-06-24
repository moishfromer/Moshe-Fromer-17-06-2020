import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import mailReducer from '../features/mail/mailSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    mailApp: mailReducer
  },
});
