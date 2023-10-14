import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { handleError, handleSuccess } from '../../helper/notifications'


export const getSales = createAsyncThunk("getSales", async () => {

    try {
        const { data } = await axios.get("/sales", { withCredentials: true });
        return data
    } catch (error) {
        handleError(error.response.data.message || error.message);
    }
})


export const getSingleSales = createAsyncThunk("getSingleSales", async (id) => {
    try {
        const { data } = await axios.get(`/sales/${id}`, { withCredentials: true });
        return data;
    } catch (error) {
        handleError(error.response.data.message || error.message);
    }
});

export const updateSales = createAsyncThunk("updateSales", async (id) => {
    try {
        const { data } = await axios.put(`/sales/${id}`, {}, { withCredentials: true });
        if (data.success) {
            handleSuccess(data.message);
            window.location.replace('/sales')
        }
        else {
            handleError(data.message);
        }
    } catch (error) {
        handleError(error.response.data.message || error.message);
    }
})


export const addSales = createAsyncThunk('addSales', async (formData) => {
    try {
        const { data } = await axios.post("sales/new", formData, { withCredentials: true });
        if (data.success) {
            handleSuccess(data.message);
            window.location.reload();
            return data;
        }
        else {
            handleError(error.message);
        }
    } catch (error) {
        handleError(error.response.data.message || error.message);
    }
})



export const deleteSales = createAsyncThunk('deleteSales', async (id) => {
    try {
        const { data } = await axios.delete(`/sales/${id}`, { withCredentials: true });
        if (data.success) {
            handleSuccess(data.message);
            setTimeout(() => {
                window.location.reload();
            }, 300)
        }
        else {
            handleError(data.message);
        }
    } catch (error) {
        handleError(error.response.data.message || error.message);
    }
})

const initialState = {
    allSales: {
        isLoading: false,
        isError: false,
        data: []
    },
    salesDetails: {
        isLoading: false,
        isError: false,
        data: {}
    }
}


const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSales.pending, (state, action) => {
            state.allSales.isLoading = true;
        }).addCase(getSales.fulfilled, (state, action) => {
            state.allSales.isLoading = false;
            state.allSales.data = action.payload;
        }).addCase(getSales.rejected, (state, action) => {
            state.allSales.isLoading = false;
            state.allSales.isError = true;
        });
        builder.addCase(getSingleSales.pending, (state, action) => {
            state.salesDetails.isLoading = true;
        }).addCase(getSingleSales.fulfilled, (state, action) => {
            state.salesDetails.isLoading = false;
            state.salesDetails.data = action.payload;
        }).addCase(getSingleSales.rejected, (state, action) => {
            state.salesDetails.isLoading = false;
            state.salesDetails.isError = true;
        });
    }
})

export default salesSlice.reducer;