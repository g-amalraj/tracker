import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated:  false,
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
   
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
      
        setAuthenticated: (state, action) => {
           state.isAuthenticated = action.payload;
           
        },


      
}
});

export const { setAuthenticated,  setCredentials } = authSlice.actions;

export default authSlice.reducer;