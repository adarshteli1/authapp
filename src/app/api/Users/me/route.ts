import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/UserModel"
import { error } from "console";
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendMail } from '@/helpers/mailer'
import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getFataFromToken";

connect()

export async function GET(request: NextRequest){
    const userid= await getDataFromToken(request)
    const user= await User.findOne({_id:userid}).select("-password")

    return NextResponse.json({
        message: "USer FOund",
        data: user
    })
}
