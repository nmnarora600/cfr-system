"use client"
import React from 'react'
import SideNav from './SideNav';
import Header from './Header';
import { usePathname } from 'next/navigation';

export default function LayoutComponent({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const pathname=usePathname();


  return (
    <div className="flex justify-between w-[100vw]">

          
      <SideNav/>
        
        <div className={`${(pathname=="/" || pathname=="/cloudremoval" || pathname=="/history")?"md:w-3/4":"md:w-[100vw] md:left-0"} w-[95vw] right-0 absolute mt-8 mr-3 md:mt-0 md:mr-0`}>
<Header/>{children}</div></div>
  )
}
