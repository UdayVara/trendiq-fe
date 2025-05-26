"use client"

import { Button } from '@/components/ui/button';
import { getCookie } from '@/lib/cookie';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function MobileGenderButtons() {
    const [gender,setGender] = useState(getCookie("gender") || "male")

         const path = usePathname()
         useEffect(() => {
                setGender(getCookie("gender") || "male")
              },[window.document.cookie])
  return (
    <>
       {(path == "/" || path == "/products") && 
        <div className="relative bg-gray-100 md:hidden block rounded-2xl p-1">
            {/* Sliding background */}
            <div
              className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-xl shadow-sm transition-transform duration-300 ${
                gender === "female" ? "transform translate-x-full" : ""
              }`}
            />
            <div className="relative grid grid-cols-2">
              <Button
                variant="ghost"
                size={"sm"}
                className={`rounded-xl text-sm py-3 font-medium  z-10 ${gender == "male" ? "bg-red-700 text-white": "text-gray-700 hover:text-gray-900 bg-red-50"}`}
                onClick={() => {setGender("male"); document.cookie = "gender=male";
                window.location.reload()}}
              >
                Male
              </Button>
              <Button
                variant="ghost"
                size={"sm"}
                className={`rounded-xl text-sm py-3 font-medium  z-10 ${gender == "female" ? "bg-red-700 text-white": "text-gray-700 hover:text-gray-900 bg-red-50"}`}
                onClick={() => {setGender("female"); document.cookie = "gender=female";
                window.location.reload()}}
              >
                Female
              </Button>
            </div>
          </div>}
    </>
  )
}

export default MobileGenderButtons