const mongoose=require("mongoose")

const Schema=mongoose.Schema

const ArticleSchema=new Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    content:{
        type:String
    },
    image:{
        type:String
    }  
   
},{
    timestamps:true
})

const Article=mongoose.model("article",ArticleSchema)

module.exports={
    Article
}


