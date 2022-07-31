import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../helpers/axios'

export const login = createAsyncThunk(
    'userSlice/login',
    async (user, { rejectWithValue }) => {
        try{
            const res = await axios.post('/admin/signin', {
                ...user
            })
            const userData = res.data
            return userData
        }catch(err){
            return rejectWithValue(err.response.data)
        }
    }
)

export const isUserLoggedIn = createAsyncThunk(
    'userSlice/login',
    async() => {
        const token = localStorage.getItem('token')
        if(token)
        {
            const user = JSON.parse(localStorage.getItem('user'))
            return {token, user}
        }
        return token
    }
)


export const signup = createAsyncThunk(
    'userSlice/signup',
    async (user, { rejectWithValue }) => {
        try{
            const res = await axios.post('/admin/signup', {
                ...user
            })
            const {message} = res.data
            return message
        }catch(err){
            return rejectWithValue(err.response.data)
        }
    }
)

export const signout = createAsyncThunk(
    'userSlice/singout',
    async (_, { rejectWithValue }) => {
        try{
            const res = await axios.post('/admin/signout')
            const {message} = res.data
            return message
        }catch(err){
            return rejectWithValue(err.response.data)
        }
    }
)

const initialState = {
    token: null,
    user: {
        _id: '',
        firstName: '',
        lastName: '',
        fullName: '', 
        email:'', 
        role:'', 
        address:'', 
        phone:''
    },
    authenticate: false,
    authenticating: false,
    message: ''
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.authenticating = true
        })
        builder.addCase(login.fulfilled, (state,action) => {
            state.user =  action.payload.user
            state.token = action.payload.token
            state.authenticate = true
            state.authenticating = false
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.message = action.payload;
        })
        builder.addCase(signout.fulfilled, (state, action) => {
                state.user = initialState.user;
                state.token = initialState.token;
                state.authenticate = false;
                state.authenticating = false;
                localStorage.clear();
        })
    }
})

// export const {signout} = userSlice.actions
  
export default userSlice.reducer