
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkedIn: false,
  checkedOut: false,
};

export const checkInOutSlice = createSlice({
  name: 'checkInOut',
  initialState,
  reducers: {
    checkIn: state => {
      state.checkedIn = true;
    },
    checkOut: state => {
      state.checkedOut = true;
    },
  },
});

export const { checkIn, checkOut } = checkInOutSlice.actions;

export default checkInOutSlice.reducer;

