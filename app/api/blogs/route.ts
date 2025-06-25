import { getServerSession } from "next-auth";
import connectToDBS from "@/lib/db";
import Blog from "@/models/Blog";
import slugify from "slugify";
import { NextResponse,NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";

export async function  POST(request:NextRequest) {
    const session=await getServerSession(authOptions)
    if(!session||!session.user){
        return NextResponse.json({message:"Unauthorized acess"},{status:400})
    }
    const {title,content}=await request.json()
    if(!title||!content){
        return NextResponse.json({message:"Title and content are required *"},{status:404})

    }
    try {
        await connectToDBS()
        const sluggedValue=slugify(title,{lower:true,strict:true})
        let finalslug=sluggedValue
        let existing = await Blog.findOne({slug:finalslug})
        let count=1
        while(existing){
            
            finalslug=`${sluggedValue}-${count}`
             existing = await Blog.findOne({slug:finalslug})
            count++

        }
        const created=await Blog.create({
                title:title,
                content:content,
                slug:finalslug,

        })
        return NextResponse.json({message:"Blog created Sucessfully"},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Error creating Blog"},{status:500})

    }
}

export async function  GET() {
    try {
         const session=await getServerSession(authOptions)
    if(!session||!session.user){
        return NextResponse.json({message:"Unauthorized acess"},{status:400})
    }
        await connectToDBS()
        const blogs=Blog.find({}).sort({createdAt:-1}).populate("author")
        return NextResponse.json(blogs,{status:200})
    } catch (error) {
        console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
   
        
    
}