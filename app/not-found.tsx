"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='w-full h-[70vh] relative z-50  flex flex-col items-center justify-center p-5 lg:p-10'>
        
            <div className=' flex items-center justify-center'>
                <Image width={300} height={300} src={'/notfound.jpg'}  alt='page'/>
            </div>
          <div className=' flex flex-col  justify-center items-center space-y-5 '> 
          <p className='text-5xl stroke-[9] text-owl font-extrabold'>
          Error 404 !
          </p>
          <p className='text-xl text-muted-foreground font-semibold text-center'>Sorry, The page you were looking for does not exist.</p>
          <Link href={"/"}><Button variant="secondary"  className='px-8 my-5 font-bold'>Back to Home</Button></Link>
          </div>
        
        

    </div>
  )
}