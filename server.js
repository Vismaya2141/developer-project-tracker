const express=require('express');
const path=require('path');
const app=express();
const authRoutes=require('./backend/routes/authRoutes');
const PORT=3000;

//Middleware
app.use(express.static('frontend'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//Routes
app.use('/api',authRoutes);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend','login.html'));
});
app.listen(PORT,()=>{
    console.log(`Server is successfully running on http://localhost:${PORT}`);
});