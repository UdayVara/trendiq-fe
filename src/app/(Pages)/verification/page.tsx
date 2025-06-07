"use client"
import React, { useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner';
import axiosInstance from '@/lib/axios';

function Page() {
  const queryParams = new URLSearchParams(window.location.search);

  const verifyPayment = async() => {
    try {
      
   
    const res = await axiosInstance.post("/stripe/complete-payment",{
        transactionId:queryParams.get("token"),
      }); 

      if(res.data?.statusCode == 201){
        toast.success("Order Placed Successfully")
        window.location.href = "/"
      }else{
        toast.error(res?.data?.message || "Failed to Record Payment")
        window.location.href = "/"
      }
    } catch (error:any) {
      toast.error(error?.message || "Failed to Verify Payment")
      window.location.href = "/"
    }
  }
  useEffect(() => {
    if(!queryParams.get("token")){
      toast.error("Payment Token Not Found")
      window.location.href = "/"
    }else{
      verifyPayment()
    }
  },[queryParams])
  return (
    <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-rose-50 to-rose-100 pb-8 pt-8 flex flex-col items-center">
            <div className="relative h-20 w-20 mb-4">
              <div className="absolute inset-0 animate-pulse">
                <div className="h-full w-full bg-gradient-to-r from-rose-400 to-rose-500 opacity-20 rounded-xl"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-12 w-12 text-rose-500 animate-spin" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">Payment Verification</h2>
            <p className="text-muted-foreground text-center mt-2">We're processing your payment</p>
          </CardHeader>
          <CardContent className="pt-6 pb-6">
            <div className="space-y-6">
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    className="animate-progress-indeterminate bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300 h-full rounded"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-rose-50">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Payment received</h3>
                    <p className="text-sm text-muted-foreground">We've received your payment request</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-rose-50">
                  <div className="h-5 w-5 rounded-full border-2 border-rose-500 flex items-center justify-center">
                    <Loader2 className="h-3 w-3 text-rose-500 animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-medium">Verification in progress</h3>
                    <p className="text-sm text-muted-foreground">This usually takes less than a minute</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg">
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground">Confirmation</h3>
                    <p className="text-sm text-muted-foreground">You'll be redirected when complete</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <p className="text-sm">Please don't refresh the page or press the back button.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 flex justify-center border-t">
            <p className="text-sm text-muted-foreground">Transaction ID: TRX-29845721</p>
          </CardFooter>
        </Card>
      </main>

  )
}

export default Page