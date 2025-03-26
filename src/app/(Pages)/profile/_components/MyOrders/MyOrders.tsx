
import { getMyOrders } from "@/api/order.actions"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { ExternalLink } from "lucide-react"
import moment from "moment"
import { useState } from "react"
import SingleOrder from "./SingleOrder"

export default function MyOrders() {
  const [selectedOrder,setSelectedOrder] = useState<null | any>(null)

  const {data,isLoading} = useQuery({
    queryKey:["my-orders"],
    queryFn: () => getMyOrders(),
  })

  return (
    <>
   {selectedOrder == null ? isLoading ?<Table className="animate-pulse">
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </TableHead>
          <TableHead>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </TableHead>
          <TableHead>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </TableHead>
          <TableHead>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table> : <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Shipping Address</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.map((order:any) => (
          <TableRow key={order.orderId} className="hover:bg-transparent">
            <TableCell>{order.orderId}</TableCell>
            <TableCell>{moment(order.date).format("DD-MM-YYYY")}</TableCell>
            <TableCell>{order.address?.address}</TableCell>
            <TableCell>{order.finalAmount}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell className="text-center"><Button variant={"ghost"} className="text-primary" onClick={()=>{setSelectedOrder(order)}}>Details <ExternalLink /></Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table> : <SingleOrder order={selectedOrder} setSelected={setSelectedOrder}/>}
    </>
  )
}

