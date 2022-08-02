import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn } from './slice/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import Home from './containers/Home';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import { getInitialCategory } from './slice/categorySlice'
import { getInitialData } from './slice/initialData'
import {getAllProducts} from './slice/productSlice'
import axios from './helpers/axios';

function App() {
  const authenticate = useSelector(state => state.user.authenticate)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!authenticate) {
      dispatch(isUserLoggedIn())
    }
    // dispatch(getInitialData())
    const handleGet = async () => {
      const res = await axios.post(`/initialData`)
      const { categories, products } = res.data;
      console.log(categories)
      console.log(products)
      dispatch(getInitialCategory({categories}))
      dispatch(getAllProducts({products}))
    }
    handleGet()

  }, [])
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<PrivateRoute />}>
        </Route>
        <Route exact path='/products' element={<Products />}>
        </Route>
        <Route exact path='/orders' element={<Orders />}>
        </Route>
        <Route exact path='/category' element={<Category />}>
        </Route>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
