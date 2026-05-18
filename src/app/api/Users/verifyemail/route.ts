import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/UserModel"
import { error } from "console";
import { verify } from "crypto";
import { NextRequest,NextResponse } from "next/server";
import { json } from "stream/consumers";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(reqBody);

        const user = await User.findOne({verifyToken: token,
            verifyTokenExpiry:{$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({error : "Invalid token"},
               {status:400})
        }
        console.log(user);

        user.isVerified=true
        user.verifyToken=undefined
        user.verifyTokenExpiry= undefined

        await user.save()
        
        return NextResponse.json({
            message: "Email verified Sucessfully",
            success: true
        },
        {status:500})

    } 
    
    catch (error) {
        return NextResponse.json({error: (error as Error).message}),
        {status:500}
    }

}
