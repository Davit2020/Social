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
function newPost(info){

    let p=document.createElement("p")
    p.innerHTML=info.message
    let h1=document.createElement("h1")
    h1.innerHTML=info.userName
    let t=document.createElement("p")
    t.innerHTML=new Date()
    main.append(p)
    main.append(h1)
    main.append(t)

}

 socket.on("new chat",(data)=>{
    newPost(data)

 })