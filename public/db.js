function startIndexDB(){
  if(!('indexedDB' in window)){
    console.log("This browser doesn't support Indexed DB")
    return;
  }
  //Initialize Indexed db from window
  var indexeddb = window.indexedDB 
    //Open Indexded db, with 2 parameters (Data base name and version)
    indexeddb.open("shoppinglist",1)
    // One db can have many object stores, object stores are tables in SQL
    
  
}




// const indexedDB =
//   window.indexedDB ||
//   window.mozIndexedDB ||
//   window.webkitIndexedDB ||
//   window.msIndexedDB ||
//   window.shimIndexedDB;

// let db;
// const request = indexedDB.open("budget", 1);

// request.onupgradeneeded = ({ target }) => {
//   let db = target.result;
//   db.createObjectStore("pending", { autoIncrement: true });
// };

// request.onsuccess = ({ target }) => {
//   db = target.result;

//   // check if app is online before reading from db
//   if (navigator.onLine) {
//     checkDatabase();
//   }
// };

// request.onerror = function(event) {
//   console.log("Woops! " + event.target.errorCode);
// };

// function saveRecord(record) {
//   const transaction = db.transaction(["pending"], "readwrite");
//   const store = transaction.objectStore("pending");

//   store.add(record);
// }

// function checkDatabase() {
//   const transaction = db.transaction(["pending"], "readwrite");
//   const store = transaction.objectStore("pending");
//   const getAll = store.getAll();

//   getAll.onsuccess = function() {
//     if (getAll.result.length > 0) {
//       fetch("/api/transaction/bulk", {
//         method: "POST",
//         body: JSON.stringify(getAll.result),
//         headers: {
//           Accept: "application/json, text/plain, */*",
//           "Content-Type": "application/json"
//         }
//       })
//       .then(response => {        
//         return response.json();
//       })
//       .then(() => {
//         // delete records if successful
//         const transaction = db.transaction(["pending"], "readwrite");
//         const store = transaction.objectStore("pending");
//         store.clear();
//       });
//     }
//   };
// }

// // listen for app coming back online
// window.addEventListener("online", checkDatabase);