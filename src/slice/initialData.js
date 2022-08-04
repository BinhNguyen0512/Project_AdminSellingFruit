import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../helpers/axios"
import {useDispatch} from 'react-redux'
import {getInitialCategory} from './categorySlice'


export const getInitialData =  createAsyncThunk(
    'initialData/getInitialData',
    async() => {
        const res = await axios.post(`/initialData`)
        const {categories, products} = res.data;
        // console.log(categories)
        // console.log(products)
        // const dispatch = useDispatch()
        // dispatch(getInitialCategory())
        // dispatch()
        // return res.data
    }
)
