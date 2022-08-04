import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../helpers/axios';

export const getAllCategory = createAsyncThunk(
    'categorySlice/getAllCategory',
    async () => {
        const res = await axios.get(`category/getcategory`)
        console.log(res)
        return res.data
    }
)

export const addCategory = createAsyncThunk(
    'categorySlice/addCategory',
    async(form) => {
        const res = await axios.post(`/category/create`, form)
        return res.data
    }
)

const buildNewCategories = (parentId, categories, category) => {
    let myCategories= []
    if(parentId == 'undefined')
    {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: [],
            }
        ]
    }
    
    for(let cat of categories)
    {
        if(cat._id == parentId){
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category) : []
            })
        }
        else
        {
            myCategories.push({
                ...cat,
                children: cat.children? buildNewCategories(parentId, cat.children, category) : []
            })
        }
       
    }
    return myCategories
}

const initialState= {
    categories: [],
    loading: false,
    error: null,
}



export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        getInitialCategory: (state, action) => {
            console.log(action.payload)
            console.log(state)
            state.categories = action.payload.categories
            // state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategory.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getAllCategory.fulfilled, (state,action) => {
            state.categories = [...action.payload.categoryList]
            state.loading = false
        })
        builder.addCase(addCategory.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(addCategory.fulfilled, (state,action) => {
            console.log(action.payload)
            const category = action.payload.category;
            console.log(category)
            const updatedCategories = buildNewCategories(category.parentId, state.categories, category)
            state.loading = false
            state.categories = updatedCategories
            
            console.log(state.categories)
            // state.categories = 
        })
    }
})

export const {getInitialCategory} = categorySlice.actions
  
export default categorySlice.reducer
