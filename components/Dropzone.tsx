"use client"
import React, {  useEffect, useState } from 'react'
import AlertMsg from './AlertMsg';
import FilePreview from './Filepreview';
import { X } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import Postgen from './Postgen';
import { usePathname } from 'next/navigation';

// import ProgressBar from './ProgressBar';

function UploadForm() {
const pathname=usePathname();
const method=(pathname==='/')?"fog":"cloud";
    const[file, setFile]=useState<File | null>(null);
    const[showError, setShowError]=useState(false);
    const[fileReceived, setFileReceived]=useState(false);
    const[sending, setSending]=useState(false);
    const[imageSrc, setImageSrc]=useState('');
    const[iName, setIname]=useState('');
    const[index, setIndex]=useState(0);
    const terms = ['Sending to server','Reached to server','Processing Image','Preparing Response', 'Got the response', 'Sending Back data',"Got data"];
const{user}=useUser();
let name:string
let email:string
if(user){
    if(user.fullName)
name=user?.fullName
    if(user.emailAddresses)
email=user?.emailAddresses[0].emailAddress}

    useEffect(() => {
        let timeoutId:NodeJS.Timeout;
        if (sending) {
            timeoutId = setTimeout(() => {
                // Increment index to display the next term
                setIndex(prevIndex => (prevIndex + 1) % terms.length);
            }, 1500); // Delay of 1 second between each term
        } else {
            // Reset index when sending becomes false
            setIndex(0);
        }
        // Clear the timeout when component unmounts or when sending becomes false
        return () => clearTimeout(timeoutId);
    }, [sending, terms]);

    const OnFileSelect=(file:File)=>{

if(file && file.size>(1024*5*1024)){
    setShowError(true);
    return
}
setShowError(false)
setFile(file)


    }
  const{isSignedIn}=useUser()

    const handleUpload=async()=>{
        setSending(true)
        // if(pathname==='/'){
         
      
        const fd= new FormData();
        if(file && user)
        fd.set("image",file)
    if(name && email){
        fd.set("name",name )
        fd.set("email",email  )
        fd.set("method",method  )
    }
  
        let x:number= Date.now()
        const f= await fetch('/api/upload',{
            method:"POST",
            body:fd,
            cache:'no-cache',
           
        })
        const r= await f.json();
     let y:number= Date.now()
    //  console.log("time taken=",(y-x))
      
        setImageSrc(r.gen_image)
        setIname(r.iname)
        setFileReceived(true)
        setFile(null)
        setSending(false)
   
    }
  return (
  fileReceived==false?  isSignedIn && <div className='text-center w-full flex justify-start items-center flex-col p-12 h-screen'>
     
    <div className="flex items-center justify-center w-full">
       {!file &&  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:bg-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 bg-gray-50 relative">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-12 h-12 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <div className="mb-2 text-sm flex-col justify-center md:text-xl text-gray-500 dark:text-gray-400">
                    <div className="font-semibold text-primary">Click to upload </div> 
                    <div className='text-center'>or</div> 
                    <div><strong className='text-primary'>drag</strong> and <strong className='text-primary'>drop</strong></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. Size: 5 MB)</p>
            </div>
            <input id="dropzone-file"  type="file" className="hidden" onChange={(e)=>{if(e.target.files)OnFileSelect(e.target.files[0])}}/>
        </label>}
            {file && <div className=' flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg  dark:bg-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 bg-blue-50 relative '>  <X onClick={(e)=>{e.stopPropagation();setFile(null)}} className='cursor-pointer absolute z-50 top-4 right-4'/><FilePreview file={file}/></div>}
    </div> 
    {!showError && <div className='h-5'/>}
    <div className={ `h-10 ${showError?'visible':'invisible'}`}>
{showError && <AlertMsg msg={"Max file size is 5MB"}/>}

    </div>
  
    {<button disabled={file==null || sending==true} className='p-2 dark:bg-muted bg-primary  text-white hover:bg-gray-900 hover:border-white border md:w-[20%] w-[40%] disabled:text-black disabled:cursor-not-allowed rounded-lg mt-5 disabled:bg-gray-300 dark:disabled:opacity-45 dark:text-white' onClick={handleUpload}> {sending ? terms[index] : 'Upload'}</button>}
    

    
    </div>:<Postgen imageSrc={imageSrc} iName={iName} setFileReceived={setFileReceived}/>
  )
}

export default UploadForm