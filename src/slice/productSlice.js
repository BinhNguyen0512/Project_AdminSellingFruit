import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../helpers/axios';

export const addProduct = createAsyncThunk(
    'productSlice/addProduct',
    async(form) => {
        const res = await axios.post(`/product/create`, form)
        return res.data
    }
)

const initialState =  {
    products: []
}

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        getAllProducts: (state, action) => {
            console.log(action.payload)
            state.products = action.payload.products
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(addProduct.fulfilled, (state,action) => {
        //     console.log(action.payload)
        //     state.products = action.payload.products
        // })
    }
})

export const {getAllProducts} = productSlice.actions
  
export default productSlice.reducer