"use client"
import Image from 'next/image'
import React, { useState } from 'react'

 function FilePreview({file}:{file:File}) {

    const[fileUrl, setFileUrl]=useState('');
  
   const getBuffer=async(file:File | null)=>{

  
    if(file){
      const bytes= await file.arrayBuffer();
      const initial_buffer= Buffer.from(bytes).toString('base64');
   const buffer="data:image/jpeg;base64,"+initial_buffer;

   setFileUrl(buffer)
    }
      
  }
getBuffer(file)
  return (
    <div className='flex items-center justify-center space-x-3 '>
        <div className='object-cover md:w-64 h-32 overflow-hidden flex justify-center items-center bg-black mix-blend-multiply w-40'> 

        <Image src={fileUrl} width={200} height={150} alt='file'/>
        </div>
        <div className='flex-col items-center '>
        <h2 className='text-left'>{file.name}</h2>
        <h2 className='text-left '><div>{file?.type.slice(0,25)}</div> </h2>
        <h2 className='text-left'><div>{(file.size/1024/1024).toFixed(2)}MB</div></h2>
        </div>
    </div>
  )
}

export default FilePreview