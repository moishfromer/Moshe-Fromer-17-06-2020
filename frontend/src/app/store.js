import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import mailReducer from '../features/mail/mailSlice';
import filtersReducer from '../features/filters/filtersSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    mailApp: mailReducer,
    visibilityFilter: filtersReducer,
  },
});
