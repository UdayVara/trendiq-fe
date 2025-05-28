"use client"
import React, {  useState } from 'react'
import "./GenderToggle.css"
import { getCookie, setCookie } from '@/lib/cookie';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
function GenderToggle() {
  const [gender,setGender] = useState(getCookie("gender") || "male")
    
     const path = usePathname()
     

  return (
    <>
    {(path == "/" || path == "/products") &&<div className="bg-gray-50">
      {/* Modern Desktop Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            
            {/* Modern Gender Selection - Style 1: Pill Toggle */}
            <div className=" md:flex hidden items-center space-x-8">
              <div className="bg-gray-200 rounded-full p-1 flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-full px-6 py-2 transition-all duration-300 font-medium ${
                    gender === "male" ? "bg-primary shadow-sm text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => {setGender("male");setCookie("gender","male");
            window.location.reload()}}
                >
                  Men
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-full px-6 py-2 transition-all duration-300 font-medium ${
                    gender === "female"
                      ? "bg-primary shadow-sm text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => {setGender("female");setCookie("gender","female");
            window.location.reload()}}
                >
                  Women
                </Button>
              </div>

              
              
            </div>
          </div>
        </div>
      </header>

      
    </div>}
    </>
  )
}

export default GenderToggle