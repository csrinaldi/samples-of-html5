window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL || window.webkitResolveLocalFileSystemURL;

var fs = null;
window.path = "/";
window.directoryEntry = null;

//TODO ver de hacer un historial del filesystem
window.mapPath = new Array();
window.mapPath[0] = "/";
     
/**
* Maneja los error en las operaciones de FileSystem
**/ 
function errorHandler(e) {
    console.log(e);
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
    alert(msg);
    document.querySelector('#explorer-error').innerHTML = 'Error: ' + msg;
}
      
/**
* Inicializa el FileSystem
**/
function initFS() {
    window.webkitStorageInfo.requestQuota(PERSISTENT, 5*1024*1024, function(grantedBytes) {
        window.requestFileSystem(PERSISTENT, grantedBytes, function(filesystem){
            fs = filesystem;
            loadFs();
        }, errorHandler);
    }, errorHandler);
    /*window.requestFileSystem(window.TEMPORARY, 5*1024*1024, function(filesystem) {
        fs = filesystem;
        loadFs();
    }, errorHandler);*/
}
            
/**
* Carga el Fs en el caso de existir.
* Genera el arbol de directorios y la vista en el explorador
**/
function loadFs(){
    var dirReader = fs.root.createReader();
    var dirs = [];
    dirReader.readEntries(function(dirs){
        addNode(dirs, $("#root_fs"));
        addNodeExplorer(dirs);
        updateBarLocation(fs.root.fullPath); // fs.root.fullPath == / 
    }); 
}


/**
 * Realiza un CD (comando) al directorio indicado
 * @path ruta del directorio a realizar el cd
 * @op operacion si es -1 al path enviado se le deve restar el ultimo directorio
 **/

function cd(path, op){
    if ( op == -1 ){
        console.log(path);
        //path = "/1/2/4";
        var paths = path.split("/");
        console.log(paths.length);
        var auxPath = "";
        for (var i=1; i<(paths.length-1); i++){
            auxPath+="/"+paths[i];
        } 
        path = auxPath;
    }
    window.path = path;
    updateBarLocation(path);

    //TODO Ver error SECURITY_ERROR
    /*window.resolveLocalFileSystemURL("filesystem:http:/"+path, function(fileEntry) {
        var dirReader = dir.createReader();
        var dirs = [];
        dirReader.readEntries(function(dirs){
            addNodeExplorer(dirs);
        }, errorHandler);
    }, errorHandler);*/

    fs.root.getDirectory(path, {
        create:false
    }, function(dir){
        console.log(dir.toURL());
        var dirReader = dir.createReader();
        var dirs = [];
        dirReader.readEntries(function(dirs){
            addNodeExplorer(dirs);
        }, errorHandler);
    }, errorHandler);

}

function imgViewer(fileEntry){

    /*fs.root.getFile('/log.txt', {"create":true}, function(fileEntry){

        fileEntry.createWriter(function(fileWriter) {

            fileWriter.onwriteend = function(e) {
                console.log('Write completed.');
                console.log('Write completed.');

                filesystem:http://localhost/persistent/explorer/src/img/next.png

                window.resolveLocalFileSystemURL("filesystem:http://localhost/persistent/explorer/src/explorer.html", function(fE) {
                    fE.file(function(file) {
                        console.log("que pasa");

                        var reader = new FileReader();

                        reader.onloadstart = function(e) {
                            console.log("onloadstart");
                        }

                        reader.onloadend = function(e) {
                            console.log("onloadend");
                            console.log(this.result);
                            console.log("onloadend");
                        };
                        reader.readAsText(file);
                    }, errorHandler);
                }, errorHandler);
            };

            fileWriter.onerror = function(e) {
                console.log('Write failed: ' + e.toString());
            };

            // Create a new Blob and write it to log.txt.
            var bb = new window.WebKitBlobBuilder(); // Note: window.WebKitBlobBuilder in Chrome 12.
            bb.append('Lorem Ipsum');
            fileWriter.write(bb.getBlob('text/plain'));

            


        }, errorHandler);



    }, errorHandler );*/

    






    var img = document.createElement('img');
    img.src = fileEntry.toURL();
    return img;
}

function viewer(fileEntry){
    var fileInfo = document.querySelector('[id="file-info"]');
    
    var childs = document.querySelector('[id="file-info"]').childNodes;
    if ( childs.length > 0){
        document.querySelector('[id="file-info"]').removeChild(childs[0]);
    }

    var fragment = document.createDocumentFragment();
    var container = document.createElement('div');

    var meta = document.createElement('div');
    var metadata = fileEntry.getMetadata(function(e){
        p1 = document.createElement('p');
        p1.innerHTML = "<b>"+fileEntry.name+"</b>";
        p2 = document.createElement('p');
        p2.innerHTML = "Fecha de Modificación "+e.modificationTime;
        meta.appendChild(p1);
        meta.appendChild(p2);
    }, errorHandler);
    container.appendChild(meta)

    fileEntry.file(function(file){

        switch(file.type){
           case 'text/html': 
                htmlViewer(fileEntry, file, meta);
            break;
            case 'image/x-icon':
            case 'image/svg+xml':
            case 'image/png':
            case 'image/jpeg':
                meta.appendChild(imgViewer(fileEntry));
            break;
            case '': 
            break;
            default:
        }

        fragment.appendChild(container);
        fileInfo.appendChild(fragment);
        fileInfo.className = 'show';
    });

}

function view(path){
    fs.root.getFile(path, {}, function(fileEntry) {
        
        viewer(fileEntry);
        

        //fileEntry.file(function(file) {

            

            /*var reader = new FileReader();

            reader.onloadend = function(e) {
                var txtArea = document.createElement('textarea');
                txtArea.value = this.result;
                document.body.appendChild(txtArea);
            };*/

            //reader.readAsText(file);
        //}, errorHandler);

  }, errorHandler);
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
          
/**
* Gestiona la acción de drop (soltado del archivo o directorio)
**/
function drop(e){
    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }
    e.preventDefault();

    document.querySelector("[id='explorer']").className = "";
    document.querySelector("[id='explorer-container']").className = "";

    var length = e.dataTransfer.items.length;
    var entries = new Array();
    var files = new Array();

    function(dataTransfer){
        window.resolveLocalFileSystemURL(fs.root.toURL()+window.path, function(rootEntry) {
            for (var i = 0; i < length; i++) {

                //entries[i] = e.dataTransfer.items[i].webkitGetAsEntry();
                entry = dataTransfer.items[i].webkitGetAsEntry();
                if (entry.isDirectory) {
                    entry.copyTo(rootEntry, null, function(copiedEntry) {
                        console.log("Directory Entry "+copiedEntry.name+" load Success!!");      
                    }, errorHandler);
                }else{
                    entry.copyTo(rootEntry, null, function(copiedEntry) {
                        console.log("File Entry "+copiedEntry.name+" load Success!!");      
                    }, errorHandler);
                }
            }

            //Deprecated
            //createStructureFs(entries, path);

            addNode(entries, $("#root_fs"));
        }, errorHandler);
    }(e.dataTransfer);
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
            li.addEventListener("click", function(e){
                view(this.getAttribute('data-path'), 0);
            }, false);
        }else{
            li.addEventListener("click", function(e){
                cd(this.getAttribute('data-path'), 0);
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
                //TODO agregado del nodo al arbol
            });
        }else{
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
            }, function(fileEntry){
                console.log(fileEntry);
                //TODO ver que hacer, interactuar con la DB
            },errorHandler);
        } else if (entry.isDirectory) {
            fs.root.getDirectory(entry.fullPath, {
                create:true
            }, function(e){
                var dirReader = entry.createReader();
                var dirs = [];
                dirReader.readEntries(function(dirs){
                    createStructureFs(dirs, null);
                }, errorHandler);
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

/**
* Habilita la consola para el filesystem
**/
function consoleFs(event){
    if ( this.checked ){
        this.className = "show";
    }else{
        this.className = "";
    }
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
    document.querySelector("[id='console']").addEventListener("click", consoleFs, false);
    
    document.addEventListener("keyup", function(e){
        document.querySelector('[id="file-info"]').className="";
    }, false);

    //TODO revisar
    //gapi.plusone.render({"size":"medium", "annotation":"inline", "align":"left", "expandTo":"right"}, "plusone-div");
    

    initFS();
                
}

window.addEventListener('load', initApp, false);