"use client"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Loading() {
  const path=usePathname();

  return (
    <div className='absolute left-0 right-0 mx-auto'>

    
    <div className={`${(path=="/sign-up" || path=="/sign-in")?" ":"md:w-[74vw]  md:h-[70vh]"} w-[100vw] h-[90vh] flex dark:invert items-center justify-center opacity-80 p-5 lg:p-10 animate-pulse`}>
    
  
     
           <Image width={400} height={400} src={'/logo.png'} className='opacity-80' alt='page'/>
           
    {/* <Loader/> */}


   
    </div>

</div>
  )
}