"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='w-full h-[70vh] flex flex-col items-center justify-center p-5 lg:p-10'>
        
        <div className='flex justify-center  flex-col space-y-5'>
            <div className=' flex items-center justify-center '>
                <Image width={300} height={300} src={'/error.jpg'}  alt='page'/>
            </div>


          <div className=' flex flex-col justify-center items-center space-y-10 lg:space-y-6 '>


          <p className='lg:text-5xl text-3xl  text-center stroke-[9] text-owl font-extrabold'>
          Oops! Something went wrong.
          </p>


          <div className='space-y-1.5 lg:space-y-1'>
          <p className='text-xl text-muted-foreground font-bold text-center'> Don&apos;t worry, it&apos;s not you, it&apos;s us. </p>
          <p className='text-xl mt-6 text-muted-foreground font-semibold text-center'> Please try refreshing the page or go back to the home page.</p>
          </div>


          <div className=' mt-10 flex items-center lg:flex-row flex-col lg:space-x-3 space-x-0 lg:space-y-0 space-y-4'>
          <Button variant="secondary" onClick={()=>window.location.reload()}  className='px-8 font-bold'>Refresh</Button>
          <Link href={"/"}><Button variant="secondary"  className='px-8  font-bold'>Back to Home</Button></Link>
          </div>
          </div>
        </div>
        

    </div>
  )
}