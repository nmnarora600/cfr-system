import { NextRequest, NextResponse } from "next/server";
import {render} from "@react-email/render"
import { EmailTemplate } from "@/components/EmailTemplate";
import path from "path";
const nodemailer= require('nodemailer')
export async function POST(Request:NextRequest) {


    try {
      const details=await Request.json();
      
  const mail= render(EmailTemplate({ senderName:details.sender}))
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 587,
        secure: false,
         // true for 465, false for other ports
        auth: {
          user: 'k1vikky@gmail.com', // generated ethereal user
          pass: process.env.NODE_PASS, // generated ethereal password
        },
      });
      const folder=process.env.OUTPATH || "results";
      console.log("file=",details.iName)
      console.log("path=",path.join(process.cwd(),folder,details.iName))
      const mailOptions = {
        from:"k1vikky@gmail.com",
        to: details.email,
        subject: 'Demistify - One File Received',
        html: mail,
        attachments: [
           
            {
              filename: details.iName,
              path: path.join(process.cwd(),folder,details.iName), // Replace with the actual path to your image file
              contentType: 'image/*',
            },
          ],
      
      };
  const p= new Promise( (resolve, reject)=>{transporter.sendMail(mailOptions, (error:Error, info:any) => {
    if (error) {
  
     
      return reject(false)
    } else { 
      
      return resolve(true )
  
    }
  })})
     
     const mailresp=await p;
    
   
      return Response.json({success: mailresp})
  
    } catch (error) {
      console.log("got error",error)
      return Response.json({ error });
    }
  }