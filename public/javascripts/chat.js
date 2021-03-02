const socket=io()

const messageForm=document.querySelector("#messageForm");
const userId=messageForm.elements["id"].value;
const message=messageForm.elements["message"].value;
const userName=messageForm.elements["username"].value;

const newUser=(userId,userName)=>{
  
    let user={
        userId:userId,
        userName:userName
    }
  
    socket.emit("new user",user)
}
newUser(userId,userName)
