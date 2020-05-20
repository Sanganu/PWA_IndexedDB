const addbtn = document.getElementById("addword");
const wordinput = document.getElementById("userword");

addbtn.addEventListener("click",addWordToDb)

function addWordToDb(){
   let word = wordinput.innerText;
   fetch("/api/word",{
     method:"POST",
     body: word,
   }).then(response => {
     console.log("Word added to List",response)
   }).catch(err => {
     console.log("Error in adding word to database",err)
   })
}