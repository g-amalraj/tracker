

// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from '../features/checkInOut/authSlice'

import checkInOutReducer from '../features/checkInOut/checkInOutSlice';

export const store= configureStore({
  reducer: {
    auth: authSliceReducer,

    checkInOut: checkInOutReducer,
    // other reducers...
  },
});


 