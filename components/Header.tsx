"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React from 'react'
import { ModeToggle } from './ModeToggler';

type Props = {}

function Header({}: Props) {

    let {user}= useUser();

 
  return (
    user && <div className='w-full h-14 flex items-center justify-end overflow-x-hidden'>
       <div className='md:block hidden'>
        Welcome, {user?.fullName || "Guest"} &nbsp;
        </div>
<ModeToggle/>
            <div className='md:px-4 px-2 md:scale-125 mt-1 md:mt-2'>
        <UserButton />
            </div>
        
        </div>
  )
}

export default Header