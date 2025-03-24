import { getUser } from "@/api/user.actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useQuery } from "@tanstack/react-query"
import moment from "moment"
export default function UserInfo() {

  const {data} = useQuery({
    queryKey:["user"],
    queryFn : getUser,
    refetchOnMount: true
  })
  console.log("data",data)
  return (
    <div className="flex flex-col pt-4 items-center space-y-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src="/placeholder-user.jpg" alt="User" />
        <AvatarFallback>{data?.data?.username?.split(" ")[0]?.charAt(0)}{data?.data?.username?.split(" ")[1]?.charAt(0)}</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-semibold">{data?.data?.username}</h2>
      <p className="text-muted-foreground">{data?.data?.email}</p>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="font-semibold">Member Since</p>
          <p className="text-muted-foreground">{data?.data?.createdAt && moment(data?.data?.createdAt).format("MMM DD, YYYY")}</p>
        </div>
        <div>
          <p className="font-semibold">Total Orders</p>
          <p className="text-muted-foreground">{data?.data?.order?.length}</p>
        </div>
      </div>
    </div>
  )
}

