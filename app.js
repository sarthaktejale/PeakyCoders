import express from "express"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()

app.use(express.static(path.join(__dirname,'public')))

app.use("/home",(req,res)=>{
    res.sendFile(path.join(__dirname,"/index.html"));
})
app.use("/customerLogin",(req,res)=>{
    
    res.sendFile(path.join(__dirname,"/custLogin.html"));
})
app.use("/retailerLogin",(req,res)=>{
    
    res.sendFile(path.join(__dirname,"/retailerLogin.html"));
})
app.use("/signup",(req,res)=>{
    
    res.sendFile(path.join(__dirname,"/signUp.html"));
})


app.listen(3000,()=>console.log("server on and running"))