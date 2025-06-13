"use client"
import { getCartCount } from '@/api/cart.actions'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

function CartCount() {
    const cartCountData = useQuery({
        queryKey:['user-cart'],
        queryFn: () => getCartCount(),
        staleTime: 60 * 1000 * 60
    })
  return (
    <>
    {cartCountData.data?.count > 0 && <span className='absolute z-20  text-xs -top-5 rounded-full p-0.5  bg-primary w-5 h-5 text-center text-white -right-3'>{cartCountData.data?.count}</span>}
    </>
  )
}

export default CartCount