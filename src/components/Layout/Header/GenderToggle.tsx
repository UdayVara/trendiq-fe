"use client"
import React, { useEffect, useState } from 'react'
import "./GenderToggle.css"
import { getCookie } from '@/lib/cookie';
import { usePathname } from 'next/navigation';
function GenderToggle() {
  const [gender,setGender] = useState(getCookie("gender") || "male")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        if(!e.target.checked){
            document.cookie = "gender=male";
            window.location.reload()
        }else{
            document.cookie = "gender=female";
            window.location.reload()
        }
     };
     const path = usePathname()
     
     useEffect(() => {
       setGender(getCookie("gender") || "male")
     },[window.document.cookie])
  return (
    <>
    {(path == "/" || path == "/products") && <div className='hidden flex-row items-center gap-3 lg:flex'>
<h3 className='flex font-semibold gap-1 text-[#2e80f2]'>Him <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2e80f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mars-icon lucide-mars"><path d="M16 3h5v5"/><path d="m21 3-6.75 6.75"/><circle cx="10" cy="14" r="6"/></svg></h3>
  <input checked={(gender === "male" ? false : true)} className="switch" type="checkbox"  onChange={handleChange} />
  <h3 className='flex gap-1 font-semibold text-[#ec4899]'>Her <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-venus-icon lucide-venus"><path d="M12 15v7"/><path d="M9 19h6"/><circle cx="12" cy="9" r="6"/></svg></h3>
    </div>}
    </>
  )
}

export default GenderToggle