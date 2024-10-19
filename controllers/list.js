import {List} from "../model/list.js";
import { User } from "../model/user.js";
import mongoose from "mongoose";

async function addTaskMethod(req,res){
    try{
    const{title,body,id}=req.body;
    const existingUser=await User.findById({_id:id})
    if(existingUser){
        const list=new List({title,body,user:existingUser});
        await list.save().then(()=>{
            res.status(200).json(list);
        })
        existingUser.List.push(list);
        existingUser.save();
    }} catch(err) {
        console.log(err);
    }
};


async function updatetaskMethod(req, res) {
  try {
    const { title, body, id } = req.body;

    // Check if the user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the task by ID and update it
    const updatedTask = await List.findByIdAndUpdate(
      req.params.id,   // Task ID comes from the request parameters
      { title, body }, // Fields to update
      { new: true }    // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Send a success response with the updated task
    return res.status(200).json({ message: "Task updated successfully", task: updatedTask });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
}



  async function deleteTaskMethod(req, res){
    try {
        const {id} = req.body;
    
        // Check if the user exists
        const existingUser = await User.findByIdAndUpdate({_id:id },{$pull:{List:req.params.id}});
        if (!existingUser) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Find the task by ID and delete it
         await List.findByIdAndDelete(
          req.params.id,
        ).then(()=> res.status(200).json({ message: "Task deleted successfully" }))
    
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error, please try again" });
      }
  };



  async function getAllTaskMethod(req, res) {
    try {
      // Check if the user exists
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const userId = req.params.id;

    // Validate that the provided user ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find tasks for the specified user
    const list = await List.find({ user: { $in: [userId] } }).sort({createdAt:-1});
  
      if (list.length === 0) {
        return res.status(404).json({ message: "No tasks found for this user" });
      }
  
      // Send a success response with the list of tasks
      res.status(200).json({ tasks: list });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error, please try again" });
    }
  }


  async function completedTask(req, res) {
    try {
      const { completed, id } = req.body; // User ID and completed status
  
      // Check if the user exists
      const existingUser = await User.findById(id);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Find the task by task ID and update its 'completed' status
      const updatedTask = await List.findByIdAndUpdate(
        req.params.id,   // Task ID from URL parameters
        { completed },    // Update the completed field
        { new: true }    // Return the updated task
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Send the updated task back to the client
      return res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error, please try again later" });
    }
  }
  
  
  async function profileMethod(req, res) {
    try {
      // Find the user by ID
      const existingUser = await User.findById(req.query.id);
  
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Remove the password from the user object
      const user = existingUser.toObject(); // Convert the Mongoose document to a plain JS object
      delete user.password; // Remove the password field
      delete user.List;
      delete user._id;
  
      // Send the user details without the password
  
      return res.status(200).json({ user: user });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error, please try again later" });
    }
  }
async function profileUpdateMethod(req,res){
  try {
    // Find the user by ID
   const {email,username,bio} =req.body
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,   // Task ID comes from the request parameters
      { email,username,bio }, // Fields to update
      { new: true }    // Return the updated task
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "user not update" });
    }
    const user = updatedUser.toObject(); // Convert the Mongoose document to a plain JS object
    delete user.password; // Remove the password field
    delete user.List;
    delete user._id;
    

    return res.status(200).json({user});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
}



 export {addTaskMethod,updatetaskMethod,deleteTaskMethod,
    getAllTaskMethod,completedTask,profileMethod,profileUpdateMethod};