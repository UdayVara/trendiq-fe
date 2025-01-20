import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, X } from 'lucide-react'

interface CartItemProps {
  item: {
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }
}

export default function CartItem({ item }: CartItemProps) {
  return (
    <li className="py-6 sm:py-10">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            width={120}
            height={120}
            className="object-cover object-center rounded-md"
          />
        </div>

        <div className="ml-4 flex-grow flex flex-col sm:flex-row sm:justify-between">
          <div className="sm:pr-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900">
              <a href="#" className="hover:text-gray-800">
                {item.name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">Unit Price: ${item.price.toFixed(2)}</p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center justify-between sm:space-x-6 sm:pl-6">
            <div className="flex items-center">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <Input
                id={`quantity-${item.id}`}
                name={`quantity-${item.id}`}
                type="number"
                className="h-8 w-16 mx-2 text-center"
                value={item.quantity}
                min={1}
              />
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-base font-medium text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <Button variant="ghost" size="sm" className="mt-2 text-sm text-red-600 hover:text-red-500">
                <X className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

