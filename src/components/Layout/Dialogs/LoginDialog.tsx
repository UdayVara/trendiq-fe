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
  
function LoginDialog({variant,text}:{variant:"link" | "default" | "destructive" | "outline" | "secondary" | "ghost",text:string}) {
  return (
    <Dialog >
        <DialogTrigger className='w-full'><Button variant={variant} className='w-full text-primary hover:text-primary'>{text}</Button></DialogTrigger>
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