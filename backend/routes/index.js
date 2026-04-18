const express=require('express');
const router=express.Router();
const testController=require('../controllers/testController');
const authRoutes=require('./authRoutes');
router.get('/test',testController.testRoute);
router.use('/auth',authRoutes);
module.exports=router;