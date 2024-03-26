const express = require("express")
const userModel=require("../Models/UserModel")
const bcrypt=require("bcryptjs")

const router=express.Router()

hashPasswordGenerator = async(pass)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
}

router.post("/signup",async(req,res)=>{
    
    let {data}={"data":req.body}
    let Password=data.Password
    
    // hashPasswordGenerator(Password).then(
    //     (hashedPassword)=>{
    //         console.log(hashedPassword)
    //         data.Password=hashedPassword
    //         console.log(data)
    //          let user = new userModel(data)
    //         let result = user.save()
    //         res.json({
    //             status:"success"
    //         })
    //     })


        const hashedPassword=await hashPasswordGenerator(Password)
        data.Password=hashedPassword
            let user = new userModel(data)
             let result = await user.save()
                res.json({
               status:"success"
                 })


        }
    )



    router.post("/signin",async(req,res)=>{
        let input=req.body
        let Email=req.body.Email
        let data=await userModel.findOne({"Email":Email})
        if (!data) {
            return  res.json({
                status:"Invalid User"
                  })
        }
        console.log(data)
        let dbPassword=data.Password
        let inputPassword=req.body.Password
        console.log(dbPassword)
        console.log(inputPassword)
        const match=await bcrypt.compare(inputPassword,dbPassword)
        if (!match) {
            return  res.json({
                status:"Incorrect Password"
                  })
        }

        res.json({
            status:"success","userData":data
              })
   
    })



module.exports=router