import { createSlice } from "@reduxjs/toolkit";

const InitialState={
    isAuthenticated: false,
    user: null,
    error: null,
}

export const authSlice=createSlice({
    name:"todos",
    initialState:InitialState,
    reducers:{
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload; 
            state.error = null;
          },
          logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
          },
          setError: (state, action) => {
            state.error = action.payload; 
          },
      
      
    }
})

export const {login, logout, setError}= authSlice.actions


export default authSlice.reducer