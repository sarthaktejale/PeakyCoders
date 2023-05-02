// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import express from "express"


import {customer,products} from "../data/index.js"
import {remove,getAll,get,create,update,getByEmail} from "../data/customer.js"
const router =  express.Router()






router
  .route('/home')
  .get(async (req, res) => {
    //code here for GET
    res.render("homePage",{title:"homepage"})
    // res.sendFile(path.join(__dirname,"../index.html"));
  })
  
  

router
  .route('/customerLogin')
  .get(async (req, res) => {
    res.render("customerLogin",{title:"customer login",lay1:"head1"})
  })
  .post(async (req,res)=>{
    const x = await customer.getByEmail(req.body.uname)
    console.log(x)
  })
  
router
  .route('/retailerLogin')
  .get(async (req, res) => {
    res.render("retailerLogin",{title:"customer login",layout:"header"})
  })
  
router
  .route('/signup')
  .get(async (req, res) => {
    res.render("signUp",{title:"sign up"})
  })
  .post(async (req,res)=>{
      const firstname = req.body.firstName
      const lastname = req.body.lastName
      const mailid = req.body.email
      const phoneNumber = req.body.phoneNumber
      
      const add = await customer.create(firstname, lastname, mailid, phoneNumber, 10)
      res.status(200).send(add)
  })

export default router