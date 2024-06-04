"use client"
// Sidebar for listing hostedzones
import React from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
// import { useMediaQuery } from "react-responsive";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
type props={
    items:{href:string,name:string}[]
}
function SidebarNav({ items }:props) {
//   const isSmallScreen = useMediaQuery({ maxWidth: 768 });

const {isSignedIn}=useUser();

const pname=usePathname();
  return (
    isSignedIn ? <nav
      className={cn(`flex space-x-0  lg:flex-col lg:space-x-0 lg:space-y-3 lg:m-2 md:m-1 m-0 scale-90 md:scale-100 ${isSignedIn?"":'hidden w-0'}`)}
    >
        <Image alt="logo" src={'/logo.png'} width={100} height={50} className="invert-0 dark:invert md:hidden block" />
        <Image alt="logo" src={'/logo.png'} width={200} height={100} className="invert-0 dark:invert md:block hidden" />
{/* when no hostedzones associated */}
      {items.length == 0 ? (
        <h5
          className={cn(
            buttonVariants({ variant: "ghost" }),

            "hover:bg-transparent hover:underline",
            "justify-center lg:hidden"
          )}
        >
          Your Pages will appear here
        </h5>
      ) : (
// when less than 4 domains in any device
        items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => {
              sessionStorage.removeItem("current");
              sessionStorage.setItem("current", item.name);
            }}
            className={cn(
              buttonVariants({ variant: "ghost" }),"justify-start",
              pname.split('?')[0] === item.href.split('?')[0]
                ? "hover:bg-muted hover:text-black dark:text-white font-bold  text-black "
                : " hover:bg-muted ",
              
            )}
          >
            {item.name}
          </Link>
        ))
      )}
    </nav>:<></>
  );
}

export default SidebarNav;