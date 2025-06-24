import mongoose from "mongoose";
import  { Schema, model, models } from "mongoose";

export interface IBlog{
     title:string,
     content:string,
     slug:string,
     author:mongoose.Types.ObjectId
}


const blogSchema=new Schema<IBlog>({
    title:{type:String,required:true,minlength:10,maxlength:200},
    content:{type:String,required:true,minlength:50,maxlength:2000},
    slug:{type:String,required:true,unique:true},
    author:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},

},{timestamps:true})

const Blog = models.Blog || model<IBlog>('Blog',blogSchema)

export default Blog