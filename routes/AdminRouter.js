const express = require('express');
const path=require("path")
const multer=require("multer")
const bodyParser = require('body-parser')
const { AdminView, getAllArticles,createArticleView,  addNewArticle,deleteArticle,editpage, editArticle} =require("../controllers/AdminController")
const router = express.Router();

let jsonParser = bodyParser.json()
const Storage=multer.diskStorage({
    destination:function(req,file, cb){
        cb(null,path.join(__dirname,"..","/public/images") )
    },
    filename:function(req,file, cb){
        cb(null,Date.now()+file.originalname) 
    }
})


const upload=multer({
    storage:Storage,
    limit:4*1024*1024,
  
})
/* admin view */
router.get('/',AdminView);

router.get('/articles',getAllArticles);

router.get("/articles/articleCreate", createArticleView)

router.post("/articles/articleCreate",upload.single("articleImg"), addNewArticle)
router.get("/articles/delete/:id", deleteArticle)
router.get("/articles/edit/:id", editpage)
router.post("/articles/articleedit/:id",upload.single("articleImg"),editArticle )

module.exports = router;
