const mongoose=require("mongoose")

const Schema=mongoose.Schema

const ChatSchema=new Schema({
    message:{
        type:String
    },
    userId:{
        type:String
    },
    name:{
        type:String
    }
    
},{
    timestamps:true
})


const Chat=mongoose.model("chat",ChatSchema)

module.exports={
    Chat
}
