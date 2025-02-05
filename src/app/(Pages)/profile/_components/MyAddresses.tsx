import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function MyAddresses() {
  const addresses = [
    {
      id: 1,
      name: "Home",
      address: "123 Main St, Anytown, ST 12345",
    },
    {
      id: 2,
      name: "Work",
      address: "456 Office Blvd, Workville, ST 67890",
    },
  ]

  return (
    <div className=" gap-3 grid  lg:grid-cols-2 grid-cols-1">
      {addresses.map((address) => (
        <Card key={address.id}>
          <CardHeader>
            <CardTitle>{address.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{address.address}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Edit</Button>
            <Button variant="destructive">Delete</Button>
          </CardFooter>
        </Card>
      ))}
     
    </div>
  )
}

