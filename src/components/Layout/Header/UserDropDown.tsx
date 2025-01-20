"use client";
import { signOutAction } from "@/actions/auth.actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function UserDropDown() {
    const router = useRouter()
  return (
    <>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <p className="inline-flex px-2 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50 py-3 ">
              <User className="w-5 h-5 mr-2" />
              Account
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>Edit Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={async() =>{
                const res = await signOutAction()

                if(res.success){
                    toast.success(res.message)
                    router.refresh()
                }else{
                    toast.error(res.message)
                }
            }}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export default UserDropDown;
