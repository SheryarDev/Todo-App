const express=require('express')
const router=express.Router();
const checkAuth=require('../middleware/checkAuth')

const  {
  createTask,
  getAllTasks,
  getTaskbyId,
  updateTask,
  deleteTask,
}=require("../controllers/Tasks")


// ============ POST ROUTES ========================

router.post("/", checkAuth, createTask);

// ============ Get ROUTES ========================
router.get("/", checkAuth, getAllTasks);
router.get("/:id", checkAuth, getTaskbyId);

//===============Delete Routes===================
router.delete("/:id", checkAuth, deleteTask);

//===============Update Routes===================
router.put("/:id", checkAuth, updateTask);




module.exports=router