const { UserModel } = require("../models/UserModel")
const {jwtSign}=require("../config/config")
const jwt=require("jsonwebtoken")

class AuthController{

    registerView(req,res){
        let message=""
        res.render("register",{message:message})
    }
    async  registerNewUser(req,res){
      try{  
        console.log("->",req.body)
        let email=req.body.email
        let user= await UserModel.findOne({email:email})
        if(user){
            return res.render("register",{message:`Email ${user.email} is taken`})
        }
        let newUser=new UserModel({
             username:req.body.username,
             email:req.body.email,
             password:req.body.password,

        })
   

        let result=await newUser.save()
        res.redirect("/auth/login")
       }catch(err){
           console.log(err)
        return res.render("register",{message:err.message})
       } 
    }

    loginView(req,res){
        let message=""
        res.render("login",{message:message})
    }

    async  loginUser(req,res){
        try{  
         
          let user= await UserModel.findOne({email:req.body.email})
          if(!user){
              return res.render("login",{message:`Email or password is incorrect`})
          }
          console.log(req.body.password)

          let passwordOk=await user.comparePassword(req.body.password)
          
          if(!passwordOk){
            return res.render("login",{message:`Email or password is incorrect`})
          }
          
              //creating token
       let payload={
        id:user._id,
        username:user.username,
        email:user.email
      }
       let token=jwt.sign(payload,jwtSign,{expiresIn:"10m"})
       console.log("token",token)
       res.cookie("x-access-token",token,{
         httpOnly:true,
         maxAge:24*60*60*1000,
       })
         res.redirect("/admin")

         }catch(err){
             console.log(err)
          return res.render("register",{message:err.message})
         } 
      }
}

module.exports=new AuthController()