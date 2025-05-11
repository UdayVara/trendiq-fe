"use client"
import TimeLoader from '@/components/Loaders/TimeLoader/TimeLoader'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import CountUp from 'react-countup';

function ErroPage() {
    const [showButton,setShowButton] = useState(false)
  return (
    <div className='w-full h-full mt-20 flex flex-col items-center justify-center'>
        <div >
            <TimeLoader />
            <h5 className="text-center max-w-md text-lg mt-7">Server’s taking a coffee break ☕ — Render backend is starting up or momentarily down. Try again in  <CountUp onEnd={()=>setShowButton(true)} className='text-center text-xl ' end={0} start={60} duration={60}/> Seconds</h5>
            {
                showButton && (
                    <Button onClick={()=>window.location.reload()} className='block mx-auto mt-5 ' size={"lg"}>Try Again</Button>
                )
            }
        </div>
    </div>
  )
}

export default ErroPage