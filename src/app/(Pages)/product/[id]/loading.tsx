"use client"
import React from 'react'
import "./loader.css"
function Loading() {
  if(window){

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  return (
   <div className='w-full h-[70vh] flex-col flex items-center justify-center'>
<div className="loader"></div>
   </div>
  )
}

export default Loading