"use client"
import React from 'react'

function ButtonLoader({isPrimary = false}:{isPrimary?:boolean}) {
  return (
    <div className='flex justify-center items-center'>
        <div className={`animate-spin rounded-full h-4 w-4 border-t-2  ${isPrimary ? "border-primary" : "border-white"}`}></div>
    </div>
  )
}

export default ButtonLoader