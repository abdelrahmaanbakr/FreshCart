import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { TokenContext } from '../Context/Token.context'




export default function GardRoute({children}) {

    const{token}=useContext(TokenContext)

    if (token){
         
           return  <Navigate to={'/home'}/>
    
       
    }else{
           return children
    }
 
}
