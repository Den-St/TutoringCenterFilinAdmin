'use client'
import { useAuth } from "../../hooks/auth.hook";
import { Spin } from "antd";
import React from "react"
import { Navigate, useLocation } from "react-router-dom";

type Props = {
    children:React.ReactNode
}

export const AuthProvider:React.FC<Props> = ({children}) => {
   const {loading, isSignedIn} = useAuth();
   const path = useLocation().pathname;
   
    if(loading) return <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#e7e7e74a'}}><Spin/></div>
    if(!loading && !isSignedIn && path !== '/login') {
        return <Navigate to={'/login'}/>
    }
    return <>
        {children}
    </>
}
