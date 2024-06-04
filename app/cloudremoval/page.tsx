import mongoose from "mongoose";

import UploadForm from "@/components/Dropzone";




export default async function Home() {
  async function connectToDb() {
    if (mongoose.connections[0].readyState!==1)
      await mongoose.connect(
        process.env.MONGOURI || "mongodb://localhost:27017/demistify"
      );
  
  }
  await connectToDb();

 
  return (
    <>

   <UploadForm />

    </>
  );
}
