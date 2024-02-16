const express=require('express')
const router=express.Router();
const checkAuth=require('../middleware/checkAuth')

const  {
  register,
  login,
  me,
  DeleteUser,
}=require("../controllers/User")


// ============ POST ROUTES ========================

router.post("/register",register);
router.post("/login", login);
// ============ Get ROUTES ========================
router.get("/me", checkAuth, me);

//===============Delete Routes===================
router.delete("/delete",DeleteUser)




module.exports=router