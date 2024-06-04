// import React from 'react'

// type Props = {}

// export default function Gentable({}: Props) {
//   return (
//     <div className='px-10'>
//         

//     </div>
//   )
// }
"use client"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { Dtype } from "@/app/history/page"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Share2, SquareArrowOutUpRight } from "lucide-react"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import ShareMail from "./sharemail"
import { useParams, useRouter, useSearchParams } from "next/navigation"
  
 
  
  export function Gentable({data}:{data:Dtype[]}) {
      const {user}=useUser();
      const searchParams = useSearchParams();
      const idString = searchParams.get('id'); // Get the value of 'id' parameter (string or null)
      let id: number | undefined = idString !== null ? parseInt(idString) : undefined;
      if(!id) id=1;
   
    const[sending, setSending]=useState<boolean>(false)
    
    const sendEmail=async(email:string,index:number)=>{
     
        setSending(true)
        const iName=data[index].cipherName;
        const r= await fetch('/api/send',{
            method:"POST",
            body:JSON.stringify({email:email, sender:user?.fullName || "Someone",iName:'gen_'+iName})
        })
        const res= await r.json()
        // document.getElementById('dialog-close-button')?.click();
     
        setSending(false)
    console.log("receiver is",res)
    }

    const router=useRouter();
    const handlePageChange = (newPage: number) => {
      router.push(`/history?id=${newPage}`);
    }
    return (
        <div className="md:px-10 px-2 md:mx-10">
       <div className='px-10 text-center text-2xl font-semibold my-6' >
        Your Generated Image History
   </div>
      <Table className=" border border-muted shadow-lg px-10 ">
        
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Method</TableHead>
            <TableHead  className="text-center">Created By</TableHead>
            <TableHead  className="text-center">Original</TableHead>
            <TableHead  className="text-center">Created Date</TableHead>
            <TableHead  className="text-center" >Generated</TableHead>
            <TableHead className="w-[100px]">Share</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-auto">
          {data.slice(((id-1)*5),id*5).map((row,index ) => (
            <TableRow key={row._id.toString()}>
              <TableCell className="font-medium w-[100px]">{row.method.slice(0,1).toUpperCase()+row.method.slice(1,)}</TableCell>
              <TableCell   className="text-center">{row.name===user?.fullName?"You":row.name}</TableCell>
              <TableCell >
              <a href={row.original_image} rel="noopener noreferrer" target="_blank" className="flex items-center justify-center h-20">
                <SquareArrowOutUpRight className="h-5 w-5 text-center hover:text-blue-400" />
              </a>
              </TableCell>
              <TableCell className="text-center">{new Date(row.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <a href={row.gen_image} rel="noopener noreferrer" target="_blank" className="flex items-center justify-center h-20">
                    <SquareArrowOutUpRight className="h-5 w-5  text-center hover:text-blue-400" />
                </a>
              </TableCell>
              <TableCell className="w-[100px] "><ShareMail sendEmail={sendEmail} index={index} sending={sending}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="w-full">
            <TableCell colSpan={5}>Total Generated Images</TableCell>
            <TableCell className="text-right">{data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>





      <Pagination className="mt-16">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={()=>handlePageChange(id-1)} className={`${id!=1 && id>1 ?"cursor-pointer":"cursor-not-allowed opacity-60"}`} />
        </PaginationItem>

      
        
        <PaginationItem>
          <PaginationLink onClick={()=>handlePageChange(id)} className="font-bold cursor-pointer">{id}</PaginationLink>
        </PaginationItem>
      
     
      
       {<PaginationItem>
          <PaginationNext onClick={()=>handlePageChange(id+1)} className={`${(data.length+4)/5!=id  ?"cursor-pointer":"cursor-not-allowed opacity-60"}`}/>
        </PaginationItem>}
      </PaginationContent>
    </Pagination>

      </div>
    )
  }
  