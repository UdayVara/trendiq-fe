"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import Link from 'next/link'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
  
function LoginDialog() {
  return (
    <Dialog >
        <DialogTrigger className='w-full'><Button
                className=" opacity-80 text-sm bg-none text-primary hover:text-primary w-7 h-7 rounded-full bg-white"
                size="sm"
                variant="ghost"
              >
                
                 <Heart className="w-5 h-5 rounded transition-all"  color="#000000" />
              </Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Login Required</DialogTitle>
      <DialogDescription>
        Looks like you are not logged in.
        <Link href="/signin" className="text-red-600 hover:text-red-700 hover:bg-red-50">Sign </Link>in to your account or <Link href="/signin" className="text-red-600 hover:text-red-700 hover:bg-red-50">Create One</Link>.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default LoginDialog