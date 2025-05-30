"use client"

import * as React from "react"
import { CheckIcon,  Search } from "lucide-react"

import { cn } from "@/lib/utils"
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
            <CommandGroup className="max-h-40 overflow-y-auto">
              {data && data.data.map((product:any) => (
                <CommandItem
                  key={product.id}
                  value={product.title + " | " + product.id}
                  onSelect={() => {
                    router.push("/product/" + product.id)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4 opacity-0",
                      
                    )}
                  />
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