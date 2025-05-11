"use client"

import React from 'react'
import "./TimeLoader.css"
function TimeLoader() {
  return (
    <>
 <div className="hourglassBackground my-0">
      <div className="hourglassContainer">
        <div className="hourglassCurves"></div>
        <div className="hourglassCapTop"></div>
        <div className="hourglassGlassTop"></div>
        <div className="hourglassSand"></div>
        <div className="hourglassSandStream"></div>
        <div className="hourglassCapBottom"></div>
        <div className="hourglassGlass"></div>
      </div>
    </div>
    </>
  )
}

export default TimeLoader