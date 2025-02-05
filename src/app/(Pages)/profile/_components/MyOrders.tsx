import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function MyOrders() {
  const orders = [
    { id: "1234", date: "2023-05-01", total: "$99.99", status: "Delivered" },
    { id: "5678", date: "2023-04-15", total: "$149.99", status: "Shipped" },
    { id: "9012", date: "2023-03-30", total: "$79.99", status: "Processing" },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell>{order.total}</TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

