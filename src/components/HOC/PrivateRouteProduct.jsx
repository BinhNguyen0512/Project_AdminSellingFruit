import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import Home from '../../containers/Home';
const PrivateRouteProduct = (props) => {
  const authenticate = useSelector(state => state.user.authenticate)
  return authenticate ? <Products/> : <Navigate to="/signin"/>
}

export default PrivateRoute
