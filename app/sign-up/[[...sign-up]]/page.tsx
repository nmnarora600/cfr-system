
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SignUp } from "@clerk/nextjs"


export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <div className="h-screen overflow-y-hidden">
   
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-[100vh] flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900 "/>
          <Image
          src="/login-bg.jpg"
          width={1280}
          height={843}
          alt="Authentication"
          className=" dark:block absolute inset-0 h-full opacity-20"
        />
          <div className="relative z-20 flex items-center text-lg font-medium">
            
            <Image src='/logo.png' width={150} height={100} alt="logo" className="invert"/>
          </div>
          <div className="relative z-20 mt-auto">
          
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              
            <SignUp path="/sign-up" />
             </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen md:hidden">

            <SignUp path="/sign-up" />
         
</div>
    </div>
  )
}