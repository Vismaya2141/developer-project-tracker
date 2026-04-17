const express=require('express');
const router=express.Router();
router.post('/login',(req,res)=>{
    const{email,password}=req.body;
    console.log(`Login attempt for:${email}`);
    if(email&&password){
        res.json({success:true,message:"Login Successful"});
    }
    else{
        res.status(400).json({success:false,message:"Missing credentials"});
    }
});
router.post('/signup',(req,res)=>{
    const{email,password,confirmPassword}=req.body;
    console.log(`Signup attempt for:${email}`);
    if(password!==confirmPassword){
        return res.status(400).json({success:false,message:"Passwords do not match"});
    }
    else{
        res.status(200).json({success:true,message:"User Registered successfully"});
    }
        
});
module.exports=router;