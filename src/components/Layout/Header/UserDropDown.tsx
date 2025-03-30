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
import { User, UserPlus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function UserDropDown() {
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
            <Link href="/cart"><DropdownMenuItem > <UserPlus className='w-5 h-5 mr-2'/>Cart</DropdownMenuItem></Link>
            <Link href="/cart"><DropdownMenuItem > <UserPlus className='w-5 h-5 mr-2'/>Profile</DropdownMenuItem></Link>
            <DropdownMenuItem onClick={async() =>{
                const res = await signOutAction()

                if(res.success){
                    toast.success(res.message)
                    window.location.reload()
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
