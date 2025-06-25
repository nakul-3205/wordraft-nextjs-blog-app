import { getServerSession } from "next-auth";
import connectToDBS from "@/lib/db";
import Blog from "@/models/Blog";
import { NextResponse,NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";
import slugify from "slugify";

export async function  GET(request:NextRequest,{params}:{params:{slug:string}}) {
    const session=await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({message:"Unauthorized acess"},{status:400})
    }
    let slug= params.slug
    if(!slug)return NextResponse.json({message:"Action not allowed"},{status:500})
    try {
        await connectToDBS()
        const blog=await Blog.findOne({slug}).populate("author");
        if(!blog)return NextResponse.json({message:"Blog not found"},{status:404})
        return NextResponse.json(blog,{status:200})
    } catch (error) {
        console.log('error fecthing single blog',error)
        return NextResponse.json({message:"Error fetching blog"},{status:500})
    }

}

export async function  DELETE(request:NextRequest,{params}:{params:{slug:string}}) {
    const session=await getServerSession(authOptions)
    if(!session)return NextResponse.json("Unauthorized acess",{status:400})
    
    const slug=params.slug
    if(!slug){
        return NextResponse.json("Unauthorized acess",{status:400})
    }
   try {
     await connectToDBS()
     const blog=await Blog.findOne({slug}).select("author");
     if(!blog)return NextResponse.json('Blog not found',{status:404})
     
     if(blog.author?.toString()!==session.user.id)return NextResponse.json('Action not allowed',{status:404})
        await Blog.deleteOne({slug})
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
   } catch (error) {
    console.log('erorr deleting blog',error)
    return NextResponse.json('Error deleting blog',{status:500})
   }

}

export async function PUT(request:NextRequest,{params}:{params:{slug:string}}) {
    const session=await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({message:"Unauthorized acess"},{status:400})
    }
    let slug= params.slug
    if(!slug)return NextResponse.json({message:"Action not allowed"},{status:500})
    try {
        await connectToDBS()
        const blog=await Blog.findOne({slug})
        if(!blog)return NextResponse.json({message:"Blog not found"},{status:400})
            if(blog.author.toString()!==session.user.id){
                return NextResponse.json({message:"Action not allowed"},{status:400})
            }
        const {title,content}=await request.json()
        if(!title||!content){
            return NextResponse.json({message:"Title and content are required*"},{status:500})
        }
         let finalSlug = blog.slug;
    if (title !== blog.title) {
      const rawSlug = slugify(title, { lower: true, strict: true });
      finalSlug = rawSlug;
      let existing = await Blog.findOne({ slug: finalSlug });
      let count = 1;
      while (existing && existing._id.toString() !== blog._id.toString()) {
        finalSlug = `${rawSlug}-${count}`;
        existing = await Blog.findOne({ slug: finalSlug });
        count++;
      }
    }
        blog.title=title
        blog.content=content
        blog.slug=finalSlug
        await blog.save()
        return NextResponse.json({message:"Blog updated Sucessfully"},{status:200})
    } catch (error) {
        console.log("erorr updating blog",error)
        return NextResponse.json({message:"Internal Server Error Couldnt update Blog"},{status:500})
    }
}