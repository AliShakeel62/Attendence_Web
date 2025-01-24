import React from 'react'
import Navbar from '../Component/Navbar'

function Error() {
  return (
    <>
    <Navbar/>
   <div style={{display:"flex",justifyContent:"center",alignItems:"center" , marginTop:"25vh"}}>
    <p style={{fontSize:100 , fontFamily:"sans-serif" , fontWeight:"bold"}}>404 NOT FOUND</p>
    </div>
    </>
   
  )
}

export default Error
