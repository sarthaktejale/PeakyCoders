import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import routeMethod from "./routes/index.js";

const app = express();
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const staticDir = express.static(__dirname + "/public");

app.use("/public", staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routeMethod(app);

// app.use("/home",(req,res)=>{
//     res.sendFile(path.join(__dirname,"/index.html"));

// })

// app.use("/customerLogin",(req,res)=>{

//     res.sendFile(path.join(__dirname,"/custLogin.html"));
// })
// app.use("/retailerLogin",(req,res)=>{

//     res.sendFile(path.join(__dirname,"/retailerLogin.html"));
// })
// app.use("/signup",(req,res)=>{

//     res.sendFile(path.join(__dirname,"/signUp.html"));
// })

app.listen(9000, () => console.log("server on and running"));
