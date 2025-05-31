"use client"

import * as React from "react"
import {  Search } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query"
import { getCookie } from "@/lib/cookie"
import { getSearchProducts } from "@/api/product.actions"
import { useRouter } from "next/navigation"
import Image from "next/image"



export function ProductSearchToggle() {
  const [open, setOpen] = React.useState(false)
  const gender = getCookie("gender") as "male" | "female"
    const {data} = useQuery({ queryKey: ["search-products", gender], queryFn: async () => getSearchProducts(gender || "male") ,staleTime:2*60*60*1000})
    const router = useRouter()
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Search size={20} color='#4b5563' className='text-gray-600 md:mx-0.5 mx-1.5 grow flex flex-row items-center justify-center' />
      </PopoverTrigger>
      <PopoverContent className="md:w-[400px] w-[100vw] top-20 mt-4 mr-1 p-0 md:max-w-[400px]">
        <Command>
          <CommandInput placeholder="Search Product" />
          <CommandList>
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup className="max-h-48 overflow-y-auto">
              {data && data.data.map((product:any) => (
                <CommandItem
                  key={product.id}
                  value={product.title + " | " + product.id}
                  onSelect={() => {
                    router.push("/product/" + product.id)
                    setOpen(false)
                  }}
                >
                  <Image width={1000} height={1000} src={product?.imageUrl} alt={product.title} className="w-8 h-8 rounded object-cover object-top" />
                  {product.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}