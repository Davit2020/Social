
const {jwtSign}=require("../config/config")
const jwt=require("jsonwebtoken")
const verifyToken=(req,res,next)=>{
    try{
    let token=req.cookies["x-access-token"]

    if(!token) res.redirect("/auth/login")
 
    jwt.verify(token,jwtSign,(err,decoded)=>{
        if(err) throw err,
        console.log("decoded",decoded)
        req.user=decoded,
        next()
    })
  }catch(err){
      console.log(err)
      res.redirect("/auth/login")
  }

}

module.exports={
    verifyToken
}