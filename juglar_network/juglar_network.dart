
#import('dart:html');


class FsManager{
  
  DOMFileSystem _fs = null;
  
  static const int SINGLE = 1;
  static const int MULTIPLE = 2;
  
  FsManager(){
    /*window.webkitStorageInfo.requestQuota(Window.PERSISTENT, 1024 * 1024, 
    (int grantedBytes){
      window.webkitRequestFileSystem(Window.PERSISTENT, grantedBytes , _fileSystemCallback, _errorCallback);
    }, (DOMException ex)=>window.console.log(ex));*/
    
    window.webkitRequestFileSystem(Window.TEMPORARY, 1024*1024 , _fileSystemCallback, _errorCallback);
   
  }

  bool _fileSystemCallback(DOMFileSystem fs){
       _fs = fs; 
       _fs.root.getFile("logOpen.txt", {"create" : false}, _successEntryCallback, (event){
         window.console.log(event);
       });
  }
  
  bool _successEntryCallback(FileEntry entry){
    entry.createWriter((FileWriter writer){
      
      writer.on.writeEnd.add((event){
        window.console.log("Write File End $event");
      }, false);
      
      writer.on.writeStart.add((event){
        window.console.log("Write File Start $event");
      }, false);
      
      writer.on.error.add((event){
        window.console.log("Error Write File $event");
      }, false);
      
      writer.seek(writer.length);
      
      Blob blob = new Blob(["HOLA"], "text/plain");
      writer.write(blob);
      
    }, (event){
      
    });
  }
  
  bool addFile(files){
    int idx = 0;
    files.forEach((File file) {
      /*var li = new Element.tag("li");
      AnchorElement a = new AnchorElement(file.name);
      a.attributes["data-type"]  = file.type == "" ? 'directory' : file.type;
      a.attributes["data-index"] = idx;
      if ( file.type == '' )
        a.style.backgroundImage = "folfer17.png";
      else{
        a.style.backgroundImage = "file.png";
      }
      a.text = file.name;
      li.elements.add(a);
      root.elements.add(li);*/
      
      /*Create a File or Directory Entry*/
      if ( file.type == "" )
        _fs.root.getDirectory(file.name, {"create":true}, null, (FileError error) => window.console.log(error.code));
      else
        _fs.root.getFile(file.name, {"create":true}, (Entry entry){
          window.console.log(entry.fullPath);
        }, _errorCallback);
      idx++;
    });
  }
  
  /**
   * Create a representation of Tree files 
   **/
  void _createTreeView(){
    
  }
  
  bool _errorCallback(FileError error){
    var msg = '';
    switch (error.code) {
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
    }
  }
}


void main() {
  FsManager fsm = new FsManager();
  query("#files").on.change.add((e) => fsm.addFile(e.target.files), false);
  //query("#rm-button").on.click.add((e) => fsm.deleteFile(), false);
  
  
}



