import connectToDBS from "@/lib/db";
import User from "@/models/User";
import Blog from "@/models/Blog";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
        const session=await getServerSession(authOptions)
        if(!session )return NextResponse.json({message:'Unauthorized acess'},{status:400})
        try {
            await connectToDBS()
            const user=await User.findOne({email:session.user.email})
            if(!user){
                return NextResponse.json({message:'Unauthorized acess'},{status:400})
            }
            let blogs=await Blog.find({author:user._id}).sort({createdAt:-1})
            const userData={
                email:user.email
            }
            return NextResponse.json({
                user:userData,
                blogs:blogs
            },
                {status:200}
            )

        } catch (error) {
            console.log('Failed to fetch Profile',error)
            return NextResponse.json({message:'Failed to fetch profile'},{status:500})
        }
}