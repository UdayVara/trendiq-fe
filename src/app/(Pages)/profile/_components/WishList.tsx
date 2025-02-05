import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function Wishlist() {
  const wishlistItems = [
    { id: 1, name: "Product 1", price: "$19.99", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Product 2", price: "$29.99", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Product 3", price: "$39.99", image: "/placeholder.svg?height=100&width=100" },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {wishlistItems.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={100}
              height={100}
              className="mx-auto"
            />
            <p className="text-center mt-2">{item.price}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Remove</Button>
            <Button>Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

