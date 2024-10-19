import {Router} from "express";
import {addTaskMethod,updatetaskMethod,deleteTaskMethod,
    getAllTaskMethod,completedTask,profileMethod,profileUpdateMethod} from '../controllers/list.js'
const router=Router();



//create
router.post('/addTask',addTaskMethod);
//update
router.put("/updateTask/:id",updatetaskMethod);
//delete
router.delete("/deleteTask/:id",deleteTaskMethod);

//get All Tasks
router.get("/getTasks/:id",getAllTaskMethod);

// completed tasks
router.put("/completedTasks/:id",completedTask);

//profile 
router.get("/profile",profileMethod);

router.put("/profileUpdate/:id",profileUpdateMethod);


export default router;