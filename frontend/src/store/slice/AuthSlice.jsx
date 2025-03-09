import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'), // Ensure boolean
    isAdmin: localStorage.getItem('isAdmin') === 'true', // Convert string to Boolean
    email: localStorage.getItem('email') || '' // Default to empty string
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkLogin(state, action) {
            state.token = action.payload.token || null;
            state.isAuthenticated = true;
            state.isAdmin = action.payload.isAdmin ?? false;
            state.email = action.payload.email || '';

            // Store in localStorage
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('isAdmin', action.payload.isAdmin.toString());
            localStorage.setItem('email', action.payload.email);
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.email = '';

            // Remove from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('email');
        }
    },
    extraReducers: (builder) => {
        builder.addCase('@@INIT', (state) => {
            // Automatically restore state from localStorage when Redux initializes
            state.token = localStorage.getItem('token') || null;
            state.isAuthenticated = !!localStorage.getItem('token');
            state.isAdmin = localStorage.getItem('isAdmin') === 'true';
            state.email = localStorage.getItem('email') || '';
        });
    }
});

export const { checkLogin, logout } = AuthSlice.actions;
export default AuthSlice.reducer;