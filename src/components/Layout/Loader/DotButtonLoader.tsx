import React from 'react'
import "./DotButtonLoader.css"
function DotButtonLoader({isPrimary = false}:{isPrimary?:boolean}) {
  return (
<div className={isPrimary ? "loader-line-primary" : "loader-line"}></div>


  )
}

export default DotButtonLoader