const addbtn = document.getElementById("addword");
const wordinput = document.getElementById("userword");

addbtn.addEventListener("click",addWordToDb)

function addWordToDb(){
   let word ={
     userword: wordinput.value
   }
   console.log("User entry",word)
   fetch("/api/word",{
     method:"POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(word),
   }).then(response => {
     console.log("Word added to List",response)
   }).catch(err => {
     console.log("Error in adding word to database",err)
   })
}