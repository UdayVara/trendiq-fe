"use client"

import { usePathname } from 'next/navigation'
import React from 'react'

function RightSideNavbar({children}:{children:React.ReactNode}) {
    const path = usePathname()
  return (
    <nav className={`flex items-center gap-2 lg:gap-4 ${path == "/" || path == "/products" ? "items-center" : "items-end pt-2"}  lg:gap-4`}>
{children}
    </nav>
  )
}

export default RightSideNavbar