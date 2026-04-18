const mysql=require('mysql2');
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'project_tracker',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});
pool.getConnection((err,connection)=>{
    if(err){
        console.error('Database connection failed:'+ err.stack);
        return;
    }
    console.log('Connected to MySQL Database');
    connection.release();
});
module.exports=pool.promise();