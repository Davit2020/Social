let table=document.querySelector("table")

table.addEventListener("click",(e)=>{
  
    if(e.target.className=="deleteButton"){
        e.preventDefault()
        let result=confirm("Are you Sure delete article")
        if(result){
            location.href=`/admin/articles/delete/${e.target.id}`
        }else{
            location.href="/admin/articles"
        }

    }
})