import mongoose from "mongoose";

const listSchema =new mongoose.Schema({
    title:{
        type:String,
        require:[true, "tittle is required"],
    },
    body:{
        type:String,
        require:[true, "Description is required"],
    },
    completed:{
          type:Boolean,
          default:false,
    },
    user:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User",
        }
    ],
},{timestamps:true});

export const List=mongoose.model('List',listSchema)
