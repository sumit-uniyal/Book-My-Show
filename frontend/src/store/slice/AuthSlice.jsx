import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token:  null,
    isAuthenticated: false,
    isAdmin: false,
    email: ''
};


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        Login(state, action) {
            state.token = action.payload.token || null;
            state.isAuthenticated = true;
            state.isAdmin = action.payload.isAdmin ?? false;
            state.email = action.payload.email || '';
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.email = '';
        },
    },
});

export const { Login, logout} = AuthSlice.actions;
export default AuthSlice.reducer;