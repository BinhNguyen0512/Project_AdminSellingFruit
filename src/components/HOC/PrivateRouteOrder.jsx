import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import Orders from '../../containers/Orders';
const PrivateRouteOrder = (props) => {
  const authenticate = useSelector(state => state.user.authenticate)
  return authenticate ? <Orders/> : <Navigate to="/signin"/>
}

export default PrivateRoute
