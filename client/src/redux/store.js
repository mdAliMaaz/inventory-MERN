import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import productReducer from './features/productSlice';
import salesReducer from './features/salesSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        sales: salesReducer
    }
})

export default store;