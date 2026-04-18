const db=require('./backend/config/db');
const express=require('express');
const path=require('path');
const app=express();
const mainRouter=require('./backend/routes/index');
const PORT=3000;

//Middleware
app.use(express.static('frontend'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//Routes
app.use('/api',mainRouter);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend','login.html'));
});
app.listen(PORT,()=>{
    console.log(`Server is successfully running on http://localhost:${PORT}`);
});