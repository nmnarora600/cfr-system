"use client"
import React, { useState } from 'react'



function Upload() { 
   const[img, setImg]=useState<File>();
const[buffer, setBuffer]=useState('');
   const handleFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files)
setImg(e.target.files[0])
   }

   async function create() {


    
    const fd= new FormData();
    if(img)
    fd.set("image",img)
    const f= await fetch('/api/upload',{
        method:"POST",
        body:fd
    })
    const r= await f.json();
    setBuffer(r.buffer)

  
   }
  return (
    <div>
        <form action={create}>

        <input type='file' onChange={handleFileChange}/>
        <button type='submit'>Click me</button>
        </form>
     

<img src={`${buffer}`}/>
    </div>
  )
}

export default Upload