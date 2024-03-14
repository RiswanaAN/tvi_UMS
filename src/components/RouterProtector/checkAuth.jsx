import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export const checkAuth = (Component) => {
  function Wrapper(props){
    // var token= useSelector()
    const adminToken = useSelector((state) => state.auth.adminToken);
    const navigate= useNavigate();
    useEffect(()=> {
        if(!adminToken){
            navigate('/login');
        };
    }, [adminToken]);
    return <Component {...props}/>
  }
  return Wrapper;
}
