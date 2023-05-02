import Router from "express"

const router = Router()

router.route("/")
.get((req,res)=>{
  const imgPath = "/public/images"
  let img = []
  for(let i =1;i<=6;i++){
    img = [...img,imgPath+"/A"+i+".jpg"]
  }
  console.log(img)
  res.render("products",{title:"our products",pics:img})
})



export { router}