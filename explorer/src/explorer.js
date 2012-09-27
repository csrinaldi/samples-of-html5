window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var fs = null;
window.path = "/";

//TODO ver de hacer un historial del filesystem
window.mapPath = new Array();
window.mapPath[0] = "/";
      
function errorHandler(e) {
    var msg = '';
    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        default:
            msg = 'Unknown Error';
            break;
    };
    document.querySelector('#explorer-error').innerHTML = 'Error: ' + msg;
}
      
function initFS() {
    window.requestFileSystem(window.TEMPORARY, 5*1024*1024, function(filesystem) {
        fs = filesystem;
        loadFs();
    }, errorHandler);
}
            
/**
* Carga el Fs en el caso de existir.
* Genera el arbol de directorios y la vista en el explorador
**/
function loadFs(){
    console.log("fs");
    console.log(fs);

    var dirReader = fs.root.createReader();
    var dirs = [];
    dirReader.readEntries(function(dirs){
        addNode(dirs, $("#root_fs"));
        addNodeExplorer(dirs);
        updateBarLocation("/");
    }); 
}


/**
 * Realiza un CD (comando) al directorio indicado
 * @path ruta del directorio a realizar el cd
 * @op operacion si es -1 al path enviado se le deve restar el ultimo directorio
 **/

function cd(path, op){
    console.log(path);
    /*if ( op == -1 ){
        
    }
    window.path = path;
    updateBarLocation(path);
    fs.root.getDirectory(path, {
        create:false
    }, function(dir){
        var dirReader = dir.createReader();
        var dirs = [];
        dirReader.readEntries(function(dirs){
            addNodeExplorer(dirs);
        }, errorHandler);
    }, errorHandler);*/

}

function view(path){

}

function mv(path){

}

function rm(path){

}

function refresh(path){

}
      
/**
* Actualiza la barra de navegacion con el path del directorio
* @param path Path del directorio
**/
function updateBarLocation(path){
    document.querySelector('[id="location"]').setAttribute("placeholder", "filesystem:/"+path);
}
          

function drop(e){
    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }
    e.preventDefault();

    document.querySelector("[id='explorer']").className = "";
    document.querySelector("[id='explorer-container']").className = "";

    var length = e.dataTransfer.items.length;
    var entries = new Array();
                
    for (var i = 0; i < length; i++) {
        entries[i] = e.dataTransfer.items[i].webkitGetAsEntry();
    }
    createStructureFs(entries, path);

    addNode(entries, $("#root_fs"));

    return false;
}
            
/**
* Borra el contenido del explorer
**/
function deleteContentExplorer(){
    var childs = document.querySelector('[id="explorer-nav"]').childNodes;
    if ( childs.length > 0){
        document.querySelector('[id="explorer-nav"]').removeChild(childs[0]);
    }
}
            
/**
* Crea un documentFragment y lo agrega al explorer 
* con la representacion grafica de las entradas 
* @entries
**/
function addNodeExplorer(entries){
                
    deleteContentExplorer();
                
    var ul, li, fragment = document.createDocumentFragment();
    ul = document.createElement('ul');
    fragment.appendChild(ul);

    var length = entries.length;
    for (var i = 0; i < length; i++) {
        var entry = entries[i];
        var dataPath =  entry.fullPath;
        dataPath = dataPath.replace("//", "///");
        li = document.createElement('li');
        li.setAttribute("id", dataPath);
        li.setAttribute("data-path", dataPath);
        img = document.createElement('img');
        img.className = "folder";
        div = document.createElement('div');
        div.setAttribute("data-filename", "");
        div.innerHTML = entry.name;
        li.appendChild(img);
        li.appendChild(div);
        a  = document.createElement('a');
        a.className = "folfer";
                    
        if ( entry.isFile ){
            img.src = "img/mimetypes/text-plain.png";
            img.width = 32;
        }else{
            li.addEventListener("click", function(e){
                console.log(e);
                cd(dataPath, 0);
            }, false);
            img.src = "img/folder.png";
            img.width = 32;
        }
                    
        ul.appendChild(li);
    }

    document.querySelector('[id="explorer-nav"]').appendChild(fragment);
}

/**
* TODO: Ver el tema de los iconos en el jsTree
**/
function addNode(entries, element){
    var length = entries.length;
    for (var i = 0; i < length; i++) {
        var entry = entries[i];
          
        var dataPath =  entry.fullPath;
        dataPath = dataPath.replace("//", "///");
        if (entry.isFile) {
            $.jstree._reference('#nav-browser').create_node(element, {
                "type" : "file" ,
                "icon" : "/src/pepe.png", 
                "title" : entry.name, 
                "li_attr" : {
                    "data-type" : "file", 
                    "data-path" : entry.fullPath
                }
            }, "inside", function(e){
                console.log(entry);
            });
        }else{
            console.log(entry);
            $.jstree._reference('#nav-browser').create_node(element, {
                "type" : "folder", 
                "title" : entry.name, 
                "li_attr" : {
                    "data-type" : "file", 
                    "data-path" : entry.fullpath
                }
            }, "inside", function(e){
                var dirReader = entry.createReader();
                var dirs = [];
                dirReader.readEntries(function(dirs){
                    addNode(dirs, $(e));
                });
            });
        }
    }

}

/**
             * Crea la estructura de directorios a partir de las entradas que existen en 
             * entries
             **/
function createStructureFs(entries, pathRoot){
    var length = entries.length;
    for (var i = 0; i < length; i++) {
        var entry = entries[i];
          
        if (entry.isFile) {
            fs.root.getFile(entry.fullPath, {
                create:true
            }, function(e){
                console.log(entry.name + "created");
            },errorHandler);
        } else if (entry.isDirectory) {
            fs.root.getDirectory(entry.fullPath, {
                create:true
            }, function(e){
                var dirReader = entry.createReader();
                var dirs = [];
                dirReader.readEntries(function(dirs){
                    createStructureFs(dirs, null);
                }, function(e){
                    console.log(e)
                });
            }, errorHandler);
        }
    }
}

function dragOver(e){
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    return false;
}
      
function dragLeave(e){
    document.querySelector("[id='explorer']").className = "";
    document.querySelector("[id='explorer-container']").className = "";
}
      
function dragEnter(e){
    document.querySelector("[id='explorer']").className = "dropping";
    document.querySelector("[id='explorer-container']").className = "dropping_background";
}

function dragEnd(e){
    console.log("DRAG END");
        
}

/**
* Elimina el FileSystem y su representación gráfica.
*/
function clearFileSystem(){
    if ( clearLogicalFileSystem() )
        clearTree();
}
            
/**
* Clear Tree representation of FileSystem
*/
function clearTree(){
    var childrens = $.jstree._reference('#nav-browser').get_children($("#root_fs"));
    for (var i= 0; i<childrens.length; i++){
        $.jstree._reference('#nav-browser').delete_node(childrens[i]);
    }
}
            
/**
* Clear logical File System.
*/
function clearLogicalFileSystem(){
    if ( window.requestFileSystem ){
        var dirReader = fs.root.createReader();
        dirReader.readEntries(function(entries) {
            for (var i = 0, entry; entry = entries[i]; ++i) {
                if (entry.isDirectory) {
                    entry.removeRecursively(function() {}, errorHandler);
                } else {    
                    entry.remove(function() {}, errorHandler);
                }
            }

            return true;
        }, errorHandler);
    }
    return false;
}
            
/**
* Lista por consola el File Systema 
**/
function listFileSystem(dir){
    if ( window.requestFileSystem ){
        var dirReader = dir.createReader();
        dirReader.readEntries(function(entries) {
            for (var i = 0, entry; entry = entries[i]; ++i) {
                if (entry.isDirectory) {
                    console.log("Dir: " + entry.fullPath);
                    listFileSystem(entry);
                } else {    
                    console.log("File: " + entry.fullPath);
                }
            }
                       
        }, errorHandler);
    }
}

function loadFile(){
    
}
      
function initApp(){
    document.querySelector("#file_input").addEventListener('change', loadFile, false);

    $("#nav-browser").jstree({ 

        'ui' : {
            'select_limit' : 1
        },

        "types" : {
            /*"valid_children" : [ "folder_fs" ],*/
            "types" : {
                "folder_fs" : {
                    "icon" : { 
                        "image" : "http://static.jstree.com/v.1.0rc/_docs/_drive.png" 
                    },
                    "valid_children" : [ "folder" , "file" ],
                    "max_depth" : 2,
                    "hover_node" : false,
                    "select_node" : function () {
                        return false;
                    }
                },
                "default" : {
                    "valid_children" : [ "default" ]
                }
            }
        },
                    
        "dnd" : {
            "drop_finish" : function () { 
                alert("DROP"); 
            },
            "drag_check" : function (data) {
                if(data.r.attr("id") == "root_fs") {
                    return false;
                }
                return { 
                    after : false, 
                    before : false, 
                    inside : true 
                };
            },
            "drag_finish" : function (data) { 
                alert("DRAG OK"); 
                console.log(data);
            }
        },

        "core" : {
            "initially_open" : [ "root_fs" ]
        },
        "plugins" : ["themes","html_data","dnd","ui","types", "dnd"]                  
                
    }).bind("__ready.jstree.jstree", function (e, data) { 
        console.log("Loaded ...");
    }).bind("move_node.jstree", function (e, data) {
        //TODO MOVE File and Directories
    });
    
    var dropbox = document.querySelector("[id='explorer']");
    // init event handlers
    dropbox.addEventListener("dragenter", dragEnter, false);
    dropbox.addEventListener("dragleave", dragLeave, false);
    dropbox.addEventListener("dragover", dragOver, false);
    dropbox.addEventListener("dragover", dragOver, false);
    dropbox.addEventListener("drop", drop, false);
    dropbox.addEventListener('dragend', dragEnd, false);
    
    document.querySelector("[id='upFsButton']").addEventListener("click", function(e){cd(window.path, -1)}, false);

    //TODO revisar
    //gapi.plusone.render({"size":"medium", "annotation":"inline", "align":"left", "expandTo":"right"}, "plusone-div");
    

    initFS();
                
}

window.addEventListener('load', initApp, false);