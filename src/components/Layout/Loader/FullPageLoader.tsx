import React from 'react'
import "./fullPage.css"
function FullPageLoader() {
  return (
    <>
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center flex-col items-center bg-neutral-300/70">
        <div className="loader"></div>
    </div>
    </>
  )
}

export default FullPageLoader