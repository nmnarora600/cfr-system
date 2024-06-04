import { writeFile } from "fs/promises";

import {  NextRequest, NextResponse } from "next/server";
import path, { resolve } from "path";
import fs from 'fs/promises'
import User from "@/models/User";
import {exec} from "child_process"
const crypto= require('node:crypto')
export async function POST(req:NextRequest) {
    'use server';
    function getFileExtension(fileName:string) {
      // Split the file name by the dot (.)
      const parts = fileName.split('.');
      // If there's only one part or the last part is empty, return an empty string
      if (parts.length === 1 || parts[parts.length - 1] === '') {
          return '';
      }
      // Get the last part which represents the file extension
      const extension = parts[parts.length - 1];
      // Add the dot (.) back to the extension
      return '.' + extension;
  }
  async function pathToBase64(filePath:string) {
    try {
        // Read the file as a Buffer
        const buffer = await fs.readFile(filePath);
        // Convert the Buffer to base64 string
        const base64String = buffer.toString('base64');
        return base64String;
    } catch (error) {
        console.error("Error reading file:", error);
        throw error; // Forward the error to the caller
    }
}
   
    const hash = crypto.createHash('sha256');
   
    // Return the hexadecimal representation of the hash

    const dest:string=process.env.SAVEPATH as string;
    const fd= await req.formData();
  
  const file:File | null= fd.get('image') as unknown as File;
  const name:string=fd.get('name') as string;
  const method:string=fd.get('method') as string;
  const email:string=fd.get('email') as string;
  const ext=getFileExtension(file.name);
  hash.update(file.name+String(file.size));
  const newName=
  hash.digest('hex')+ext;
  if(!file)
    return NextResponse.json({success:false})
   const bytes= await file.arrayBuffer();
   
   const initial_buffer= Buffer.from(bytes).toString('base64');
const buffer="data:image/jpeg;base64,"+initial_buffer;

//check existance
const u2 = await User.findOne({original_image:buffer,name,method});
if(u2){
    return NextResponse.json({success:true, buffer, gen_image:u2.gen_image})
}


   const path2= path.join( process.cwd(),dest,newName)
try {await fs.access(path.join( process.cwd(),dest))}
catch (error){
console.log("got in error")
    await fs.mkdir(path.join( process.cwd(),dest))
}
await writeFile(path2, initial_buffer ,"base64")



// python

function executeCommand() {
  return new Promise((resolve, reject) => {
      exec(`cd present && conda activate torch && python ./demo.py --filename ${newName} --test_filepath ../${process.env.SAVEPATH}/${newName} --pretrained ./pretrained_models/RICE1/r1_200.pth --cuda `, async (error, stdout, stderr) => {
          if (error) {
              console.error('Error executing command:', error);
              reject(false);
              return;
          }
          console.log("===>Command executed successfully");
          resolve(true);
      });
  });
}
const r= await executeCommand();
if(r==false){
  return NextResponse.json({success:false, buffer})
}

const gen_image_name='gen_'+newName;
const outpath=process.env.OUTPATH || 'results'
const genPath= path.join( process.cwd(),outpath,gen_image_name);

const gen_image_save= await pathToBase64(genPath);
const gen_image="data:image/jpeg;base64,"+gen_image_save;





const u = await User.findOne({original_image:buffer,name, email, cipherName:newName, gen_image:gen_image_save, method:'fog'});

if (!u) {
    const newUser = new User({ original_image: buffer, name, email, cipherName: newName ,gen_image});
    await newUser.save();
    console.log('File created and saved successfully!');
} else {
    console.log('File already exists with the same data.');
}
console.log("sent iname",newName)
   return NextResponse.json({success:true, buffer, gen_image, iname:newName})

}