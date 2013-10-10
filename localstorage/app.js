window.version = "3";
window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
window.db = null;

function init(){
    //Abriendo la Base de datos, donde explicitamos la version
    var openDBRequest = window.indexedDB.open("myDatabase", window.version);
			
    //Este evento es disparado cuando la version cambia y es necesario
    //hacer un cambio en la estructura de la base de datos
    openDBRequest.onupgradeneeded = function(e){
        window.db = e.target.result;
        //Creamos la Persona
        if(!window.db.objectStoreNames.contains("person")) {
            var objectStore = window.db.createObjectStore("person", {
                keyPath: "timeStamp"
            });
            objectStore.createIndex("name", "name", {
                unique: false
            });
            objectStore.createIndex("email", "email", {
                unique: true
            });
            console.log("ObjectStore create: Success");
        }
    }

    //Este evento es disparado cuando la base de datos es abierta sin errores
    openDBRequest.onsuccess = function(e){
        try{
            window.db = e.target.result;
                        
            //Si no esta creado es porque no se ejecuto el evento "onupgradeneeded"
            if(!window.db.objectStoreNames.contains("person")){
                var versionRequest = window.db.setVersion(window.version);
                versionRequest.onsuccess = function(e) {
                    var objectStore = window.db.createObjectStore("person", {
                        keyPath: "timeStamp"
                    });
                    objectStore.createIndex("name", "name", {
                        unique: false
                    });
                    objectStore.createIndex("email", "email", {
                        unique: true
                    });
                    e.target.transaction.oncomplete = function(e){
                        console.log("ObjectStore create: Success");
                        loadAllData();
                    }
                                
                                
                }
                versionRequest.onerror = function(e){
                    console.log("Setting version: Error");
                }
            }else{
                loadAllData();
            }
        }catch(e){
            console.log(e);
        }
    }
                
    openDBRequest.onerror = function(e){
        console.log("Error opening Data Base");
        console.log(e);
    }

    document.querySelector("#add").addEventListener("click", handlePreSave, false);
    document.querySelector("#clear").addEventListener("click", handleClear, false);
}
            
function loadAllData(){
    console.log("Data Base open: Success");
    console.log("Load data: Running ...");
        var tran = window.db.transaction(["person"], "readonly");
        var obj = tran.objectStore("person");

        var cursorRequest = obj.openCursor();
        cursorRequest.onsuccess = function(e){
            var cursor = e.target.result;
            if(cursor == false)
                return;
            addRow(cursor.value);
            cursor.continue();
        };
        console.log("Load data: Success");
}

function handleClear(e){
    var transaction = window.db.transaction(["person"], "readwrite");
    var person = transaction.objectStore("person");
    var request = person.clear();
                
    transaction.oncomplete = function(){
        console.log("Clear Database: Success");
        clearTable();
    }
}

function clearTable(){
    for(var i = document.querySelector("table").rows.length; i > 0;i--){
        document.querySelector("table").deleteRow(i -1);
    }           
}

function handlePreSave(e){
    console.log("Manage localstorage from input values");
    var transaction = window.db.transaction(["person"], "readwrite");

    var person = transaction.objectStore("person");
    var obj = requestValues();
    var request = person.add({
        "timeStamp":obj.timeStamp,
        "name" : obj.name, 
        "email" : obj.email
        });

    request.onsuccess = function(e){
        console.log("Request is complete: Success ");
                    
    }

    request.onerror = function(e){
        console.log("Request is complete: Error ");
    }

    transaction.oncomplete = function(e) {
        addRow(obj);
    };

    transaction.onerror = function(e){
        console.log(e);
        console.log("Transaction is complete: Error");
    }
}
            
function deleteRow(id){
    console.log("Delete id: "+id);
    var trxDelete = window.db.transaction(["person"], "readwrite");
    var person = trxDelete.objectStore("person");

    var requestDelete = person.delete(id);
    requestDelete.onsuccess = function(e){
        //row = document.querySelector("tr[id^='"+obj.id+"']" );
        var table = document.querySelector("table");
        var rowCount = table.rows.length;
        var idx = 0;
        var flag = false;
        while(idx<rowCount && !flag) {
            var row = table.rows[idx];
            if ( row.id == id ){
                table.deleteRow(idx);
                flag = true;
            }
            idx++;
        }
    }

    requestDelete.onerror = function(e){
        console.log("Error in requestDelete");
    }

    trxDelete.oncomplete = function(e){
        console.log("Transaction is complete: Success");
        var trxDelete = window.db.transaction(["person"], "readonly");
        var person = trxDelete.objectStore("person");
        var countRequest = person.count();
        countRequest.onsuccess = function(e){
            var result = e.target.result;
            console.log(result + "deleted");
        }
    }
}
            
function addRow(obj){
    var table = document.querySelector("table");
    var row = table.insertRow(table.rows);
    row.id = obj.timeStamp;
    row.insertCell(0).innerHTML = obj.name;
    row.insertCell(1).innerHTML = obj.email;
    var rowdelete = row.insertCell(2);
    var button = document.createElement("button");
    button.textContent = "Delete";

    button.addEventListener("click", function(){
        deleteRow(obj.timeStamp);
    }, false);

    rowdelete.appendChild(button);
}

function requestValues(){
    var obj = new Object();
    obj.name  = document.querySelector("#name").value;
    obj.email = document.querySelector("#email").value;
    obj.timeStamp = new Date().getTime();
    return obj;
}

function drawUnsupported(){
    document.querySelector("span").className = "no";
}