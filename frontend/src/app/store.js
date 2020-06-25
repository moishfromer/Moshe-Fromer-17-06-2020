import { configureStore } from '@reduxjs/toolkit';
import mailReducer from '../features/mail/mailSlice';
import filtersReducer from '../features/filters/filtersSlice';

export default configureStore({
  reducer: {
    mailApp: mailReducer,
    visibilityFilter: filtersReducer,
  },
});
