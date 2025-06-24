import NextAuth from "next-auth";
import User from "@/models/User";
import connectToDBS from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request:NextRequest) {
    try {
        const{email,password}= await request.json()
        if(!email||!password){
            return NextResponse.json({error:'Email and password are required'},{status:400})
        }
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         const isValid = emailRegex.test(email);
         
         if(!isValid) return NextResponse.json({error:'Wrong email entered'},{status:400})
        await connectToDBS()
        const existingUser= await User.findOne({email})
        if(existingUser){
             return NextResponse.json({error:'User already exists'},{status:400})
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
           password: hashedPassword
        })
         return NextResponse.json({
            message:'User registered Sucesfully'
           },{
            status:200
           })

     

    } catch (error) {
         console.log(error)
        return NextResponse.json({error:'Failed to register user'},{status:500})
       
    }
    
}