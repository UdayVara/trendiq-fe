"use client"
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
  
function CustomConfirmDialog({title,description,btnText,action,btnClassName}:{title:string,description?:string,btnText:string,action:()=>void,btnClassName?:string}) {
  return (
    <AlertDialog>
  <AlertDialogTrigger className={btnClassName || ""}> <Button>{btnText}</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      {description && <AlertDialogDescription>
        {description}
      </AlertDialogDescription>}
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={action}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default CustomConfirmDialog