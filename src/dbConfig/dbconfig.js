import { log } from "console";
import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI)
        const connection=mongoose.connection

        connection.on('connected', () => {
            console.log('MongodDB connected');
        })

        connection.on('error', (err) =>{
            console.log('MOngoDB connection error, please make sure DB is up and running' + err)
        } )

    }
    catch(error){
        console.log('Something Went Wrong in Connecting to DB');
        console.log(error);
    }
    
}