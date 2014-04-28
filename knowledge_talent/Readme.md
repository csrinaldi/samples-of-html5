#Knowledge

Knowledge is a prototype for a Social Network, that implement the last web technologies.

In this project, I use AngularJS how Client Framework and NodeJS for server implementation.
In the project there are several services for Angular for community use.

By Example:

##IndexedDB Service:

This service managed the IndexedDB DataBase. The service allow:

1. Open a particular database with a particular version, and using a particular callback for upgrade the struture of DataBase.
2. This service use a Angular promise support.
3. This service allow insert data, and consulting this, across a QueryBuilder component.

```javascript
storage.use("knowledge_talen", 3,
                function(db) {
                    /**
                     * Create database estructure
                     */
                    console.log(db);
                    var store = db.createObjectStore("person", {keyPath: 'id', autoIncrement: true});
                    store.createIndex('name', 'name', {unique: false});
                    store.createIndex('surname', 'surname', {unique: false});
                })
                .then(
                        function(storage) {
                            console.log("DataBase Created");
                            storage.query().insert("person", {"name": "Cristian", "surname": "Rinaldi"})
                                    .then(
                                            function(builder) {
                                                builder.count("person").then(
                                                        function(result) {
                                                            console.log("Result of Person " + result);
                                                        },
                                                        function(error) {
                                                            console.log("Error in count statement");
                                                            console.log(error);
                                                        }
                                                );
                                            },
                                            function(error) {
                                                console.log(error);
                                            });
                        }, function(error) {
                    console.log("Error creating DataBase");
                    console.log(error);
                });
```

##FileSystem Service:
  This service allows you to interact with the local FileSystem.
  
1. Open FileSystem
2. Create File
3. Create Directory
4. Read Directory
5. Write File

By Example:
List current directory
```javascript
fileSystem.open($window.PERSISTENT, 5 * 1024 * 1024, 
  function(fs) { //callback function
    console.log(fs); 
  }).then(
    function(fileSystem) {
      fileSystem.ls().then(function(result){ //list actual directory
        console.log(result);
      });
    },
    function(error) {
      console.log(error);
    });
```

Create directory, and list

```javascript
fileSystem.open($window.PERSISTENT, 5 * 1024 * 1024, function(fs) {
            console.log(fs);
}).then(
     function(fileSystem) {
        fileSystem.mkdir(fileSystem.pwd(), "dev", false) //Create a directory but not cd to directory
           .then(function(fileSystem) {
              fileSystem.ls({}).then(function(result) {
                console.log(result);
              }, function(e) {
                console.log(e);
              });
            }, function(e) {
              console.log(e);
        });
    },
      function(error) {
        console.log(error);
    });
```

Result of creation dev Directory and list
[DirectoryEntry, DirectoryEntry, DirectoryEntry]
0: DirectoryEntry
filesystem: DOMFileSystem
fullPath: "/dev"
isDirectory: true
isFile: false
name: "dev"
__proto__: DirectoryEntry
1: DirectoryEntry
filesystem: DOMFileSystem
fullPath: "/Document2"
isDirectory: true
isFile: false
name: "Document2"
__proto__: DirectoryEntry
2: DirectoryEntry
filesystem: DOMFileSystem
fullPath: "/Document"
isDirectory: true
isFile: false
name: "Document"
__proto__: DirectoryEntry
length: 3
__proto__: Array[0]


