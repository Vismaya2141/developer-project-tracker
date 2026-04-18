const db=require('../config/db');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const JWT_SECRET="project_tracker_123";
exports.signup=async(req,res)=>{
    const{email,password,confirmPassword}=req.body;
    if(password!==confirmPassword){
        return res.status(400).json({success:false,message:"Passwords do not match"});
    }
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        await db.execute('Insert into users(email,password) values(?,?)',
            [email,hashedPassword]
        );
        res.status(201).json({success:true,message:"User registered successfully"});
    }
    catch(error){
        console.error("FULL DATABASE ERROR:", error);
        if(error.errno===1062){
            return res.status(400).json({success:false,message:"Email already exists!"});
        }
        res.status(500).json({success:false,message:"Database Error",error:error.message});
    }
};

exports.login=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const[users]=await db.execute('select * from users where email=?',
            [email]
        );
        if(users.length===0){
            return res.status(401).json({success:false,message:"Invalid Credentials"});
        }
        const user=users[0];
        const isMatch=await bcrypt.compare(password,user.Password);
        if(!isMatch){
            return res.status(401).json({success:false,message:"Invalid Credentials"})
        }
        const token=jwt.sign(
            {id:user.id,email:user.email},
            JWT_SECRET,
            {expiresIn:'1h'}
        );
        res.json({success:true,token,user:{id:user.Id,email:user.Email},message:"Login successful!"});
    }
    catch(error){
        console.error("Login Error:",error);
        res.status(500).json({success:false,message:"Server error"});
    }
};