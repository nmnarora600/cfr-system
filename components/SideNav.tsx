"use client"
import React from 'react'
import SidebarNav from './Navbar'
import { useUser } from '@clerk/nextjs'

type Props = {}

function SideNav({}: Props) {
    const {isSignedIn}=useUser();
    const menuItems = [
        { href: "/", name: "Fog Removal" },
        { href: "/cloudremoval", name: "Cloud Removal" },
        { href: "/history?id=1", name: "History" },
      ];
  return (
    isSignedIn && <div className="md:w-1/4 scale-90 md:scale-100 left-0 md:border-r mt-1 md:mt-0 overflow-auto md:bottom-0 md:fixed md:h-screen  ">
    <SidebarNav items={menuItems} />
  </div>
  )
}

export default SideNav