import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../helpers/axios';

export const getAllCategory = createAsyncThunk(
    'categorySlice/getAllCategory',
    async () => {
        const res = await axios.get(`category/getcategory`)

        return res.data
    }
)

export const addCategory = createAsyncThunk(
    'categorySlice/addCategory',
    async(form) => {
        const res = await axios.post(`/category/create`, form)
        console.log(res)
    }
)

const initialState= {
    categories: [],
    loading: false,
    error: null,
}



export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategory.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getAllCategory.fulfilled, (state,action) => {
            console.log(action.payload)
            state.categories = [...action.payload.categoryList]
            state.loading = false
            // state = {
            //     ...state,
            //     categories: [...action.payload.categoryList],
            //     loading: false
            // }
            // console.log(state)
        })
    }
})

// export const {signout} = userSlice.actions
  
export default categorySlice.reducer
