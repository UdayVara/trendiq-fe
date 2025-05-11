"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UserCircle,
  ShoppingBag,
  MapPin,
  Heart,
  LifeBuoy,
  FileText,
  Settings,
  EllipsisVertical,
} from "lucide-react";
import UserInfo from "./UserInfo";
import UpdateProfile from "./UpdateProfile";
import MyOrders from "./MyOrders/MyOrders";
import MyAddresses from "./Address/MyAddresses";
import Wishlist from "./WishList";
import Support from "./Support";
import TermsAndConditions from "./TermsAndConditions";
import PageContainer from "@/components/Layout/PageContainer";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [isOpen, setOpen] = useState(false);
  const [tab, setTab] = useState("info")
  const availableTabs = ["info","update", "addresses", "orders", "wishlist", "support", "terms"]
  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)

    if(!params.get("tab")){
      window.history.pushState("", "", `${window.location.pathname}?tab=info`)
      setTab("info")
    }else{
      if(!availableTabs.includes(params.get("tab") || "")){
        window.history.pushState("", "", `${window.location.pathname}?tab=info`)
        setTab("info")
      }else{
        window.history.pushState("", "", `${window.location.pathname}?tab=${params.get("tab")}`)
        setTab(params.get("tab") || "info")
      }
    }
  },[])

  const updateTab = (tab : string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState(null, "", url.toString());
    setTab(tab)
  }
  return (
    <PageContainer>
      <div className="mb-6 pb-20  bg-[#fafafa] mt-4">
        <div className=" text-white pb-12 pt-7 mb-6">
          <div className="container mx-auto flex flex-row items-center justify-between gap-x-14">
            <div>
              <h1 className="lg:text-4xl text-3xl text-black font-medium">
                My Profile
              </h1>
              <p className="mt-2 text-neutral-700 lg:text-base text-sm">
                Manage your account settings and preferences
              </p>
            </div>
            <EllipsisVertical
              onClick={() => setOpen(!isOpen)}
              className="lg:hidden block text-primary mr-4 text-3xl"
            />
          </div>
        </div>

        <div className="lg:block hidden container mx-auto  -mt-12">
          <Tabs
            defaultValue="info"
            className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-10rem)] items-stretch"
            value={tab || "info"}
          >
            <Card className="lg:w-64 shrink-0 min-h-full h-full border-none shadow-lg">
              <CardContent className="p-0 flex-grow min-h-full h-full bg-white rounded-b-lg">
                <TabsList className="flex flex-col w-full min-h-full highlighted-list h-full space-y-4 p-2 ">
                  <TabsTrigger
                    value="info"
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={()=>{updateTab("info")}}
                  >
                    <UserCircle className="h-5 w-5 mr-2" />
                    Info
                  </TabsTrigger>
                  <TabsTrigger
                    value="update"
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={()=>{updateTab("update")}}
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Update Password
                  </TabsTrigger>
                  <TabsTrigger
                    value="orders"
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={()=>{updateTab("orders")}}
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    My Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="addresses"
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={()=>{updateTab("addresses")}}
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    My Addresses
                  </TabsTrigger>
                  <TabsTrigger
                    value="wishlist"
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={()=>{updateTab("wishlist")}}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Wishlist
                  </TabsTrigger>
                  <TabsTrigger
                    value="support"
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={()=>{updateTab("support")}}
                  >
                    <LifeBuoy className="h-5 w-5 mr-2" />
                    Support
                  </TabsTrigger>
                  <TabsTrigger
                    value="terms"
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={()=>{updateTab("terms")}}
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Terms
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
            <div className="flex-grow h-full">
              <TabsContent value="info" className="h-full mt-0">
                <Card className="h-full border-none shadow-lg">
                  <CardHeader className="border-b bg-white rounded-t-lg">
                    <CardTitle>User Information</CardTitle>
                    <CardDescription>
                      View your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white rounded-b-lg">
                    <UserInfo />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="update" className="h-full mt-0">
                <Card className="h-full border-none shadow-lg">
                  <CardHeader className="border-b bg-white rounded-t-lg">
                    <CardTitle>Update Password</CardTitle>
                    <CardDescription>
                      Change your password
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white rounded-b-lg">
                    <UpdateProfile />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="orders" className="h-full mt-0">
                <Card className="h-full border-none shadow-lg">
                  <CardHeader className="border-b bg-white rounded-t-lg">
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>View your order history</CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white rounded-b-lg">
                    <MyOrders />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="addresses" className="h-full mt-0">
                <MyAddresses />
              </TabsContent>
              <TabsContent value="wishlist" className="h-full mt-0">
                <Card className="h-full border-none shadow-lg">
                  <CardHeader className="border-b bg-white rounded-t-lg">
                    <CardTitle>Wishlist</CardTitle>
                    <CardDescription>
                      View and manage your wishlist
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white rounded-b-lg pt-3">
                    <Wishlist />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="support" className="h-full mt-0">
                <Card className="h-full border-none shadow-lg">
                  <CardHeader className="border-b bg-white rounded-t-lg">
                    <CardTitle>Support</CardTitle>
                    <CardDescription>Get help and support</CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white rounded-b-lg">
                    <Support />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="terms" className="h-full mt-0">
                <Card className="h-full border-none shadow-lg">
                  <CardHeader className="border-b bg-white rounded-t-lg">
                    <CardTitle>Terms and Conditions</CardTitle>
                    <CardDescription>
                      Read our terms and conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white rounded-b-lg">
                    <TermsAndConditions />
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        <div className={` container border-t-2 lg:hidden block border-t-gray-400  mx-auto  -mt-10 pt-4`}>
          <Tabs
            defaultValue="info"
            className={`flex flex-col lg:flex-row ${
              isOpen ? "gap-6" : "gap-0"
            }  `}
          >
            <Card
              className={`lg:w-64 ${
                isOpen
                  ? "scale-y-100 opacity-100 max-h-[500px] "
                  : "scale-y-0 opacity-0 max-h-0"
              } origin-top transition-all duration-300 ease-in-out overflow-hidden border-none shadow-lg`}
            >
              <CardContent className="p-0 flex-grow min-h-full h-full bg-white rounded-b-lg">
                <TabsList
                  className={` flex flex-col w-full min-h-full highlighted-list h-full space-y-4 p-2 `}
                >
                  <TabsTrigger
                    value="info"
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={()=>{setOpen(false)}}
                  >
                    <UserCircle className="h-5 w-5 mr-2" />
                    Info
                  </TabsTrigger>
                  <TabsTrigger
                    value="update"
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={()=>{setOpen(false)}}
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Update Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="orders"
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={()=>{setOpen(false)}}
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    My Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="addresses"
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={()=>{setOpen(false)}}
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    My Addresses
                  </TabsTrigger>
                  <TabsTrigger
                    value="wishlist"
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={()=>{setOpen(false)}}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Wishlist
                  </TabsTrigger>
                  <TabsTrigger
                    value="support"
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={()=>{setOpen(false)}}
                  >
                    <LifeBuoy className="h-5 w-5 mr-2" />
                    Support
                  </TabsTrigger>
                  <TabsTrigger
                    value="terms"
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    onClick={()=>{setOpen(false)}}
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Terms
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
            <div className="flex-grow h-full mt-4">
              <TabsContent value="info" className="h-full bg-transparent mt-0">
                <Card className="h-full p-0 bg-transparent border-none shadow-lg">
                  <CardHeader className=" p-0 bg-transparent rounded-t-lg">
                    <CardTitle>User Information</CardTitle>
                    <CardDescription>
                      View your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="bg-transparent pt-2 rounded-b-lg">
                    <UserInfo />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="update" className="h-full mt-0">
                <Card className="h-full border-none bg-transparent shadow-lg">
                  <CardHeader className=" p-0 bg-transparent rounded-t-lg">
                    <CardTitle>Update Profile</CardTitle>
                    <CardDescription>
                      Modify your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="bg-transparent rounded-b-lg">
                    <UpdateProfile />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="orders" className="h-full mt-0">
                <Card className="h-full border-none bg-transparent shadow-lg">
                  <CardHeader className=" p-0 bg-transparent rounded-t-lg">
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>View your order history</CardDescription>
                  </CardHeader>
                  <CardContent className="bg-transparent p-0 rounded-b-lg">
                    <MyOrders />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="addresses" className="h-full mt-0">
                <MyAddresses />
              </TabsContent>
              <TabsContent value="wishlist" className="h-full mt-0">
                <Card className="h-full bg-transparent border-none shadow-lg">
                  <CardHeader className=" p-0 bg-transparent rounded-t-lg">
                    <CardTitle>Wishlist</CardTitle>
                    <CardDescription>
                      View and manage your wishlist
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="bg-transparent rounded-b-lg pt-3">
                    <Wishlist />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="support" className="h-full mt-0">
                <Card className="h-full bg-transparent border-none shadow-lg">
                  <CardHeader className=" p-0 bg-transparent rounded-t-lg">
                    <CardTitle>Support</CardTitle>
                    <CardDescription>Get help and support</CardDescription>
                  </CardHeader>
                  <CardContent className="bg-transparent rounded-b-lg">
                    <Support />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="terms" className="h-full mt-0">
                <Card className="h-full bg-transparent border-none shadow-lg">
                  <CardHeader className=" p-0 bg-transparent rounded-t-lg">
                    <CardTitle>Terms and Conditions</CardTitle>
                    <CardDescription>
                      Read our terms and conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="bg-transparent rounded-b-lg">
                    <TermsAndConditions />
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </PageContainer>
  );
}
