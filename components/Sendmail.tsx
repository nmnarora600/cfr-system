"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@clerk/nextjs"
import { DialogClose } from "@radix-ui/react-dialog"
import { Send } from "lucide-react"
import { useState } from "react"

export default function Sendmail({sendEmail,sending}:{sendEmail:(email:string)=>void,sending:boolean}) {
    const {user}=useUser();
const[email,setEmail]=useState(user?.emailAddresses[0].emailAddress || '');

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <Button className='h-12 scale-90'><Send/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Email Address</DialogTitle>
          <DialogDescription>
            Make changes to receiver email here. Click send when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input
              id="name"
              value={email}
              className="col-span-3"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
        
        </div>
        <DialogFooter>
          <DialogClose>
          <Button disabled={sending==true}  onClick={()=>sendEmail(email)} className="disabled:bg-gray-500  disabled:cursor-not-allowed">Send Mail</Button>
          </DialogClose>
            
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
