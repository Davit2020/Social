const socket=io()

const messageForm=document.querySelector("#messageForm");
const main=document.querySelector("main");
const userId=messageForm.elements["id"].value;

const userName=messageForm.elements["username"].value;

const newUser=(userId,userName)=>{
  
    let user={
        userId:userId,
        userName:userName
    }
  
    socket.emit("new user",user)
}
newUser(userId,userName)

messageForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const message=messageForm.elements["message"].value;
    const newChat={
        message:message,
        userId:userId,
        userName:userName
    }

    socket.emit("new chat",newChat)
    
    messageForm.elements["message"].value=""

})
function newPost(info,newMessage){
    let p=document.createElement("p")
    p.className=newMessage._id
    p.innerHTML=info.message
    let h1=document.createElement("h1")
    h1.className=newMessage._id
    h1.innerHTML=info.userName
    let t=document.createElement("p")
    t.className=newMessage._id
    t.innerHTML=new Date()
    main.append(p)
    main.append(h1)
    main.append(t)
    if(newMessage.userId==info.userId){
        let button=document.createElement("button")
        button.id=newMessage._id
        button.className='deleteComment'
        button.innerHTML='Delete'
        main.append(button)
    }

}

 socket.on("new chat",(data)=>{
    addmessage(data)
 })

 function addmessage(info){
    
    fetch("admin/chat/addchat",{
        method:"POST",
        headers:{
            "Content-Type":"application/JSON",
            "Accept":"application/JSON"
        },
        
        body:JSON.stringify(info)
        
    }).then(res=>res.json())
    .then(data=>{
        let newMessage=data.message[0]
        console.log(newMessage)
        newPost(info,newMessage)
      
    })
    
 }


 
 
 main.addEventListener("click",(e)=>{
    console.log(e.target.className)
    if(e.target.className=="deleteComment"){
        e.preventDefault()
        let result=confirm("Are you Sure delete comment")
        if(result){
            console.log('result',e.target.id)

            fetch(`admin/chat/delete/${e.target.id}`,{
                method:"get",
                headers:{
                    "Content-Type":"application/JSON",
                    "Accept":"application/JSON"
                },
             }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                let elem = document.getElementsByClassName(data.id)
                console('test',elem)
                elem[2].remove()
                elem[1].remove()
                elem[0].remove()
                e.target.remove()
              
            })
        }else{
            location.href="/chat"
        }

    }
})