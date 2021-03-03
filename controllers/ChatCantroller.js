const { Chat }=require("../models/ChatModel")
class ChatController{
    async addchat(req,res){
    
  
     let newChat=new Chat({
        message:req.body.message,
        userId:req.body.userId,
        name:req.body.userName,
    })

    let saveChat=await newChat.save()
    let newmessage = await Chat.find({}).sort({'updatedAt': -1}).limit(-1).exec(function(err, message) { 
        if(err) throw err
        res.json({message});
     });
    
    }
    async deleteMessage(req,res){
        let id = req.params.id
        let comm= await Chat.deleteOne({_id:id})
        res.json({id});
    }

}
module.exports=new ChatController()