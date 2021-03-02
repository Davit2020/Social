const {Article}=require("../models/ArticleModel")

class IndexController{
    async home(req,res){
        let articles=await Article.find()
        res.render("index",{articles:articles})
    }
}

module.exports=new IndexController()