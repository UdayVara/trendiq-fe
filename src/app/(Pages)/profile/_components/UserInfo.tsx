import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserInfo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src="/placeholder-user.jpg" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-semibold">John Doe</h2>
      <p className="text-muted-foreground">john.doe@example.com</p>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="font-semibold">Member Since</p>
          <p className="text-muted-foreground">Jan 1, 2023</p>
        </div>
        <div>
          <p className="font-semibold">Total Orders</p>
          <p className="text-muted-foreground">15</p>
        </div>
      </div>
    </div>
  )
}

