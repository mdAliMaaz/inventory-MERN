
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../api/axios";

import { handleError, handleSuccess } from "../../helper/notifications";



export const login = createAsyncThunk('login', async (formData) => {
    try {

        const { data } = await axios.post('/users/login', formData, { withCredentials: true });

        localStorage.setItem("user", data.user);

        if (data.success) {

            handleSuccess(data.message)
            setInterval(() => {
                window.location.replace('/dashboard')
            }, 1000)
        }

        return data.user

    } catch (error) {
        handleError(error.response.data.message)
    }
})


export const register = createAsyncThunk('register', async (formData) => {

    try {

        const { data } = await axios.post('/users/register', formData, { withCredentials: true });

        if (data.success) {
            handleSuccess(data.message)
            setInterval(() => {
                window.location.replace('/login')
            }, 1000)

        }
    } catch (error) {
        handleError(error.response.data.message || error.message)
    }
})

export const logout = createAsyncThunk('logout', async () => {
    try {
        const { data } = await axios.post('/users/logout', {}, { withCredentials: true });
        if (data.success) {
            handleSuccess(data.message)
            window.location.replace('/login')
            localStorage.removeItem("user")
        }
        else {
            handleError(data.message)
        }
    } catch (error) {
        handleError(error.message)
    }
})
const initialState = {
    isLoading: false,
    isError: false,
    user: localStorage.getItem("user") || {}
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        }).addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        }).addCase(login.rejected, (state) => {
            state.isError = true;
        })
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(register.rejected, (state, action) => {
            state.isError = true;
        });
    }
})
export default authSlice.reducer;
