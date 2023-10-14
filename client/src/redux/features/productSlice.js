import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { handleError, handleSuccess } from '../../helper/notifications'
import axios from '../../api/axios';

export const getProducts = createAsyncThunk('getProducts', async () => {
    try {
        const { data } = await axios.get("/products", { withCredentials: true });
        return data;
    } catch (error) {
        handleError(error.message)
    }
})

export const addProduct = createAsyncThunk('addProduct', async (formdata) => {
    try {
        const { data } = await axios.post('/products/new', formdata, { withCredentials: true })
        if (data.success) {
            handleSuccess(data.message)
            window.location.reload();
        }
        else {
            handleError(data.message)
        }
    } catch (error) {
        handleError(error.message)
    }
    return data
})

export const getSingleProduct = createAsyncThunk('getSingleProduct', async (id) => {
    try {
        const { data } = await axios.get(`/products/${id}`, { withCredentials: true })
        return data
    } catch (error) {
        handleError(error.message)
    }
});

export const updateProduct = createAsyncThunk('updateProduct', async ({ id, formData }) => {
    try {
        const { data } = await axios.put(`/products/${id}`, formData, { withCredentials: true })
        if (data.success) {
            handleSuccess(data.message)
            window.location.reload();
        }
        else {
            handleError(data.message)
        }
        return data
    } catch (error) {
        handleError(error.message)
    }
})

export const deleteProduct = createAsyncThunk('deleteProduct', async (id) => {

    try {
        const { data } = await axios.delete(`/products/${id}`, { withCredentials: true })

        if (data.success) {
            handleSuccess(data.message)
            window.location.replace('/products')
        }
        else {
            handleError(data.message)
        }
    } catch (error) {
        handleError(error.message)
    }
})

export const getStocks = createAsyncThunk('getStocks', async () => {
    try {
        const { data } = await axios.get("products/stock", { withCredentials: true });
        return data;
    } catch (error) {
        handleError(error.message)
    }
})
const initialState = {
    products: {
        isLoading: false,
        isError: false,
        data: []
    },
    newProduct: {
        isLoading: false,
        isError: false,
    },
    singelProduct: {
        isLoading: false,
        isError: false,
        data: {}
    },
    stocks: {
        isLoading: false,
        isError: false,
        data: []
    }
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

    }
    , extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.products.isLoading = true;
        }).addCase(getProducts.fulfilled, (state, action) => {
            state.products.isLoading = false;
            state.products.data = action.payload;
        }).addCase(getProducts.rejected, (state) => {
            state.products.isError = true;
        });
        builder.addCase(addProduct.pending, (state) => {
            state.newProduct.isLoading = true;

        }).addCase(addProduct.fulfilled, (state) => {
            state.newProduct.isLoading = false;

        }).addCase(addProduct.rejected, (state) => {
            state.newProduct.isLoading = false;
            state.newProduct.isError = true;
        });
        builder.addCase(getSingleProduct.pending, (state) => {
            state.singelProduct.isLoading = true;
        }).addCase(getSingleProduct.fulfilled, (state, action) => {
            state.singelProduct.isLoading = false;
            state.singelProduct.data = action.payload;
        }).addCase(getSingleProduct.rejected, (state, action) => {
            state.singelProduct.isError = true;
        })
        builder.addCase(updateProduct.pending, (state, action) => {
            state.newProduct.isLoading = true;
        }).addCase(updateProduct.fulfilled, (state, action) => {
            state.newProduct.isLoading = false;
        })
        builder.addCase(getStocks.pending, (state, action) => {
            state.stocks.isLoading = true;
        }).addCase(getStocks.fulfilled, (state, action) => {
            state.stocks.isLoading = false;
            state.stocks.data = action.payload;
        })
    }
})

export default productSlice.reducer;