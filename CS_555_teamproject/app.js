import express from "express"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import routeMethod from "./routes/index.js";
import bodyParser from "body-parser";
import exphbs from 'express-handlebars';





const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()



const staticDir = express.static(__dirname + '/public');
app.use('/public', staticDir);
app.engine('handlebars', exphbs.engine({defaultLayout: 'main',
                                    partialsDir:`${__dirname}/views/partials/`,
                                    helpers: {
                                        eq: (a, b) => a === b,
                                      },
                                    }));

app.set('view engine', 'handlebars');
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({extended: true}));


routeMethod(app)

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



app.listen(3000,()=>console.log("server on and running"))