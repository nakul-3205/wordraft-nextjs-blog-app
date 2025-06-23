import mongoose from "mongoose";
import  { Schema, model, models } from "mongoose";

export interface IUser{
    name:string,
    email:string,
    password:string                                              
    
}

const userSchema= new Schema<IUser>({
          name:{type:String,required:true},
          email:{type:String,required:true,unique:true},
          password:{type:String,required:true,unique:true},
         

},{timestamps:true})

const User= models.User||model<IUser>('User',userSchema);

export default User

