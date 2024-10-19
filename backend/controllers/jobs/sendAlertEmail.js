"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config()

const sendAlertEmail=async(user,msg)=>{

    try{
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.OFFICIAL_EMAIL,
                pass: process.env.PASS
            }
        });

        const data = `From:
            Name: "Weather Alert system"
          Message:
            ${msg}`;

           
          async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: `${user.name}`, // sender address
              to: `${user.email}`, // list of receivers
              subject: `Weather Alert`, // Subject line
              text: `${data}`, // plain text body
            });
          
            console.log("Message sent: %s", msg);
            console.log({msg:"msg sent successfully"})
            
            
          }
          
          main().catch(console.error);
    }
    catch(error){
        console.log("message not sent :",error)
    }
    
}

module.exports=sendAlertEmail
