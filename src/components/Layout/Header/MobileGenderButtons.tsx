"use client"

import { getCookie } from '@/lib/cookie';
import { usePathname } from 'next/navigation';
import React from 'react'

function MobileGenderButtons() {
     const defaultGender = getCookie("gender") || "male"
        const handleChange = (gender : "male" | "female") => { 
            if(gender == "male"){
                document.cookie = "gender=male";
                window.location.reload()
            }else{
                document.cookie = "gender=female";
                window.location.reload()
            }
         };
         const path = usePathname()
  return (
    <>
       {(path == "/" || path == "/products") && <div className="lg:hidden grid border-b-gray-700 border-b grid-cols-12  w-full ">
            <div className={`col-span-6 text-center text-lg py-1 transition-all duration-300 border-t border-t-gray-00 border-r-primary border-r ${defaultGender == "male" ? "bg-primary text-white":"bg-white text-primary"}`} onClick={()=>{handleChange("male")}}>Men</div>
            <div className={`col-span-6 text-center text-lg py-1 transition-all duration-300 border-t border-t-gray-00 ${defaultGender == "female" ? "bg-primary text-white":"bg-white text-primary"}`} onClick={()=>{handleChange("female")}}>Women</div>
        </div>}
    </>
  )
}

export default MobileGenderButtons