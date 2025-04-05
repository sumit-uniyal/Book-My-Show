import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user_id: null,
    token: null,
    isAuthenticated: false,
    isAdmin: false,
    email: ''
};


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        Login(state, action) {
            state.user_id = action.payload.user_id || null;
            state.token = action.payload.token || null;
            state.isAuthenticated = true;
            state.isAdmin = action.payload.isAdmin ?? false;
            state.email = action.payload.email || '';
        },
        logout(state) {
            state.user_id = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.email = '';
        },
    },
});

export const { Login, logout} = AuthSlice.actions;
export default AuthSlice.reducer;