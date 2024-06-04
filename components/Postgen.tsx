import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { CircleChevronLeft, Download } from 'lucide-react'
import Sendmail from './Sendmail'
import { useUser } from '@clerk/nextjs'

type Props = {
    imageSrc:string,
    iName:string,
    setFileReceived:React.Dispatch<React.SetStateAction<boolean>>;
}

function Postgen({imageSrc,iName,setFileReceived}: Props) {
    const {user}=useUser();

    const[sending, setSending]=useState<boolean>(false)

const sendEmail=async(email:string)=>{
    setSending(true)
    const r= await fetch('/api/send',{
        method:"POST",
        body:JSON.stringify({email, sender:user?.fullName || "Someone",iName:'gen_'+iName})
    })
    const res= await r.json()
    // document.getElementById('dialog-close-button')?.click();
 
    setSending(false)

}
    const handleDownloadClick = () => {
        const link = document.createElement('a');
        link.download = 'desired_image_name'; // Set desired image name here
        link.href = imageSrc;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
  return (
    <>
      <Button onClick={()=>setFileReceived(false)} className='flex flex-row bg-transparent hover:bg-transparent dark:text-white  text-black mx-10'>
 <CircleChevronLeft className='hover:bg-black hover:text-white hover:dark:bg-white rounded-full hover:dark:text-black' /> &nbsp;Go Back
    </Button>
 
    <div className='px-10 md:space-y-0 space-y-12'>
<div className='text-center text-2xl font-semibold my-6' >
    The Results are Ready
    </div>
    <div className='w-full overflow-hidden'>
        <Image src={imageSrc} width={500} height={100} alt='gen image' className='w-full  rounded-lg hover:scale-[1.03] hover:cursor-pointer hover:transform transition-transform ' style={{ transition: 'transform 0.3s ease-in-out' }} />

    </div>
    <div className='mt-2  flex justify-end space-x-1'>
       

    <Button className='h-12 scale-90' onClick={handleDownloadClick}><Download /></Button>
   <Sendmail sendEmail={sendEmail} sending={sending}/>
      
    </div>

    </div>
    </>
  )
}

export default Postgen