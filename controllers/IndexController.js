const {Article}=require("../models/ArticleModel")
const { Chat }=require("../models/ChatModel")
class IndexController{
    async home(req,res){
        let articles=await Article.find()
        res.render("index",{articles:articles})
    }
    async chatView(req,res){
        let user=req.user
        let chat= await Chat.find()
        res.render("chat",{user ,chat})
    }
}

module.exports=new IndexController()