#import ('dart:html', prefix: 'html');

html.DOMFileSystem fs;
html.DirectoryEntry actualDirectory;
var path;
var fileSystemPath = "filesystem:http://samples-of-html5.appspot.com/persistent";

void main() {
  
  var dropbox = html.window.document.query("[id='explorer']");
  dropbox.on.dragEnter.add(onDragEnter, false);
  dropbox.on.dragOver.add(onDragOver, false);
  dropbox.on.drop.add(onDrop, false);
  dropbox.on.dragEnd.add(onDragEnd, false);

  var input = html.window.document.query('#file_input');
  input.on.change.add(onChange, false);
  
  initFileSystem();

}

void onChange(evt){
  html.EntryArray entries = evt.target.webkitEntries;
  entries.forEach((html.DirectoryEntry entry) {
    entry.copyTo(actualDirectory, entry.name, (copyEntry){
      updateExplorer();
    }, (e) => errorHandler(e));
  });
}

void onDragEnter(e){
  
}

void onDragOver(e){
}

void onDragEnd(e){
}

void onDrop(html.MouseEvent e){
  e.stopPropagation();
  e.preventDefault();
  
  html.window.console.log(e);

  var length  = e.dataTransfer.items.length;
  var entries = new List<html.Entry>();
  
  for (var i = 0; i < length; i++) {
    html.Entry entry = e.dataTransfer.items.item(i).webkitGetAsEntry();
    entries.add(entry);
    if (entry.isDirectory) {
      entry.copyTo(actualDirectory, entry.name, (copiedEntry) {
        html.window.console.log("Directory Entry ${copiedEntry.name} load Success!!");
        updateExplorer();
      }, (e) => errorHandler(e)); 
    }else{
      entry.copyTo(actualDirectory, entry.name, (copiedEntry) {
        html.window.console.log("File Entry ${copiedEntry.name} load Success!!");
        updateExplorer();
      }, (e) => errorHandler(e));
    }
  }
}

void errorHandler(e){
}


/**
 * Elimina el contenido del explorador 
 **/

void deleteContentExplorer(){
  var childs = html.document.query('[id="explorer-nav"]').nodes;
  if ( childs.length > 0){
    childs.clear();
    //html.window.console.log(childs);
  }
}

/**
* Crea un documentFragment y lo agrega al explorer 
* con la representacion grafica de las entradas 
* @entries
**/
void addNodeExplorer(entries){
                
    html.window.console.log(entries);
    deleteContentExplorer();
                
    var li;
    html.UListElement ul;
    
    html.DocumentFragment fragment = html.document.createDocumentFragment();
    ul = new html.Element.tag("ul");
    fragment.elements.add(ul);

    var length = entries.length;
    for (var i = 0; i < length; i++) {
        html.Entry entry = entries[i];
        var dataPath =  entry.fullPath;
        dataPath = dataPath.replaceAll("//", "///");
        html.LIElement li = new html.LIElement();
        li.attributes["id"] = dataPath;
        li.attributes["data-path"] = dataPath;
        html.ImageElement img = new html.Element.tag("img");
        img.classes.add("folder");
        html.DivElement div = new html.Element.tag('div');
        div.attributes["data-filename"] = "";
        div.innerHTML = entry.name;
        li.nodes.add(img);
        li.nodes.add(div);
        html.AnchorElement a  = new html.AnchorElement();
        a.classes.add("folfer");

        
        /*delAction = document.createElement('a');
        delAction.addEventListener("click", function(e){
            rm(this.getAttribute('data-remove-link'));
            e.stopPropagation();
        });
        delAction.setAttribute('data-remove-link', dataPath);
        delImg = document.createElement("img");
        delImg.src = "img/trash.png";
        delImg.className = "icon";
        delAction.appendChild(delImg);

        saveAction = document.createElement('a');
        saveAction.href = fileSystemPath+entry.fullPath;
        saveAction.setAttribute('download', entry.name);
        saveImg = document.createElement("img");
        saveImg.src = "img/download.png";
        saveImg.className = "icon";
        saveAction.appendChild(saveImg);

        appendAction = document.createElement('a');
        appendAction.setAttribute('data-append-link', dataPath);
        appendImg = document.createElement("img");
        appendImg.src = "img/append.png";
        appendImg.className = "icon";
        appendAction.appendChild(appendImg);
        appendAction.addEventListener("click", function(e){
            append(this.getAttribute('data-append-link'));
            e.stopPropagation();
        }, false);*/

        if ( entry.isFile ){
            img.src = "img/mimetypes/text-plain.png";
            img.width = 32;
            /*li.addEventListener("click", function(e){
                view(this.getAttribute('data-path'), 0);
            }, false);
            li.appendChild(saveAction);
            li.appendChild(delAction);
            entry.file(function(file){
                console.log(file.type);
                /*(function (root, element, file){
                    switch(file.type){
                        case 'text/html': 
                        case 'application/x-javascript':
                        case 'text/plain':
                            root.appendChild(element);
                            break;
                        default:
                            break;
                    }
                })(li, appendAction, file)   */
            });*/

        }else{
            /*li.addEventListener("click", function(e){
                cd(this.getAttribute('data-path'), 0);
            }, false);*/
            img.src = "img/folder.png";
            img.width = 32;
            //li.appendChild(delAction);
        }
                    
        ul.nodes.add(li);
    }

    html.document.query('[id="explorer-nav"]').nodes.add(fragment);
}


/**
 * Lee el directorio actual, lista sus tentradas y hace uso de 
 * @link addNodeExplorer para actualizar la visualizacion del 
 * explorer.
 **/ 
void updateExplorer(){
    html.DirectoryReader dirReader = actualDirectory.createReader();
    var dirs = [];
    dirReader.readEntries((dirs){
      addNodeExplorer(dirs);
    }, (e) => errorHandler(e));
}


void cd(path, op){
  if ( op == -1 ){
    var paths = path.split("/");
    var auxPath = "";
    for (var i=1; i<(paths.length-1); i++){
      auxPath.concat("/".concat(paths[i]));
    } 
    path = auxPath;
  }
  path = path;

  html.window.webkitResolveLocalFileSystemURL(fileSystemPath.concat(path), (html.DirectoryEntry entry) {
    actualDirectory = entry;
    updateBarLocation(entry.fullPath);
    var dirReader;
    dirReader = entry.createReader();
    var dirs = [];
    dirReader.readEntries(function(dirs){
      addNodeExplorer(dirs);
    }, (e) => errorHandler(e));
  }, (e) => errorHandler(e));
}

void updateBarLocation(path) {
  html.document.query('[id="location"]').attributes["placeholder"] =  fileSystemPath.concat(path);
}

void loadFileSystem(){
  html.DirectoryReader reader = actualDirectory.createReader();
  reader.readEntries((entries) => updateExplorer(), (e) => errorHandler(e));
}

void initFileSystem(){
  html.window.webkitStorageInfo.requestQuota(html.Window.PERSISTENT, 5*1024*1024, (grantedBytes) {
    html.window.webkitRequestFileSystem(html.Window.PERSISTENT, grantedBytes, (html.DOMFileSystem filesystem){
      fs = filesystem;
      actualDirectory = fs.root;
      html.window.console.log(fs);
      loadFileSystem();
    }, (e) => errorHandler(e));
  }, (e) => errorHandler(e));
  
}
