import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    movies:[],
    status:'idle',
    error:null
}

export const apiData = createAsyncThunk('movie/data',async(_,{rejectWithValue})=>{
    try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const URL = `${BASE_URL}/show/get/movies`;
        const response = await axios.get(URL);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message)
    }
})
const movieData = createSlice({
    name:'movie',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(apiData.pending, (state) => {
            state.status = "loading";
        })
        .addCase(apiData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.movies = action.payload;
        })
        .addCase(apiData.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    }
})

export default movieData.reducer