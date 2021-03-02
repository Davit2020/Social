const { Article }=require("../models/ArticleModel")

class AdminController{
    AdminView(req,res){
        res.render("admin")
    }

    async getAllArticles(req,res){
        let Articles=await Article.find()
        res.render("adminArticle",{articles:Articles})

    }

    createArticleView(req,res){
        res.render("ArticleCreator")
    }
    async addNewArticle(req,res){
        console.log("file",req.file)
        let newArticle=new Article({
            title:req.body.title,
            description:req.body.description,
            content:req.body.content,
            image:req.file.filename
        })

        let savedArticle=await newArticle.save()
        res.redirect("/admin/articles")


    }
    async deleteArticle(req,res){
  
        let Articles=await Article.deleteOne({_id:req.params.id})
        res.redirect("/admin/articles")

    }
    async editpage(req,res){
        let Articl=await Article.findOne({_id:req.params.id})
    
        res.render("EditArticle",{Articl:Articl})

    }

    async editArticle(req,res,){
   
            if (req.file==undefined) {
            
                 Article.findOne(
                    {_id:req.params.id},(err,post)=>{
                        if(err){
                            console.log(err);
                        }else{
                            
                            post.title=req.body.title;
                            post.description=req.body.description;
                            post.content=req.body.content;
                            post.save()
                            res.redirect("/admin/articles")
                        }
                    }
                );
                console.log('dd')
            }else{
                Article.findOne(
                    {_id:req.params.id},(err,post)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log(post)
                            post.title=req.body.title;
                            post.description=req.body.description;
                            post.content=req.body.content;
                            post.image=req.file.filename
                            post.save()
                            res.redirect("/admin/articles")
                        }
                    }
                );
            }
           
    }


}

module.exports=new AdminController()