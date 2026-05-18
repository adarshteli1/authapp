import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/UserModel"
import { error } from "console";
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendMail } from '@/helpers/mailer'
import jwt from "jsonwebtoken"

connect()

export async function GET(request: NextRequest){
    try {
        const response = await NextResponse.json({
            message: "Logout Sucessfully",
            success: true
        })

        response.cookies.set("token","",{
            httpOnly: true,
            expires: new Date(0)
        },)

        return response
        
    } catch (error) {
        return NextResponse.json({error: (error as Error).message}),
                {status:500}
    }
}
