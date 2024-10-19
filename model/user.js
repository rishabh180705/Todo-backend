import mongoose from "mongoose";

const UserSchema =new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    username:{
        type:String,
    },
    password:{
        type:String,
        require:true,
    },
    bio:{
        type:String,
        default:"user",
    },
    List:[
        {
            type:mongoose.Types.ObjectId,
            ref:"List",
        },
    ],
},{timestamps:true});

export const User=mongoose.model('User',UserSchema)