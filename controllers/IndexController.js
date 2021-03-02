const {Article}=require("../models/ArticleModel")

class IndexController{
    async home(req,res){
        let articles=await Article.find()
        res.render("index",{articles:articles})
    }
    chatView(req,res){
        let user=req.user
        res.render("chat",{user})
    }
}

module.exports=new IndexController()