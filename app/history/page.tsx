import {Gentable} from '@/components/Gentable'

import User from '@/models/User';

import { currentUser } from '@clerk/nextjs/server';

import mongoose, { ObjectId } from 'mongoose';
import React from 'react'

type Props = {}
export type Dtype = {
  _id: ObjectId,
  name: string,
  method: "fog" | "cloud" 
  email: string,
  cipherName:string,
  original_image:string,
  gen_image:string,
  createdAt:Date,
  updatedAt:Date
}
async function History({}: Props) {
  const person = await currentUser();

  async function connectToDb() {
    if (mongoose.connections[0].readyState!==1)
      await mongoose.connect(
        process.env.MONGOURI || "mongodb://localhost:27017/demistify",
     
      );
   
  }
  
  await connectToDb();
  let x:Dtype[]=await User.find({email:person?.emailAddresses[0].emailAddress})


  return (
    <div>
    
      <Gentable data={x}/>
      
      </div>
  )
}

export default History