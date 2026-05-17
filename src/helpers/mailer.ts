import User from '@/models/UserModel';
import bcrypt from 'bcryptjs';
import { verify } from 'crypto';
import nodemailer from 'nodemailer'

export const sendMail =  async({email,emailType,userId} ) => {
    try {

        const hashedToken= await bcrypt.hash(userId.toString(),10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry: Date.now()+3600000}
            )
        }
        else if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {verifyToken:hashedToken,verifyTokenExpiry: Date.now()+3600000}
            )
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "550e76bb4730f1",
              pass: "****9390"
            }
          });

        const mailOptions= {
            from: 'adarsh@teli.in', 
            to: email,
            subject: emailType === 'VERIFY' ? 'VErify Your Email' : "Reset Your PassWord",
            html: `<p>Click<a href="${process.env.DOMAIN}/berifyemail?token=${hashedToken} ">here</a> to ${emailType==="VERIFY" ? "verify your email ": "reset your passssword"}
            or copy paste the link below in your browser.
            <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p> ` 
        }

        const mailResponse=await transport.sendMail(mailOptions);

        return mailResponse    
    }
    catch (error) {
        throw new Error((error as Error).message)
    }
}