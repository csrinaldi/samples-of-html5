'use strict';

var module = angular.module('knowledgeTalentApp.Services', []);

module.factory('AuthService', function($http) {
    //TODO make a Google SignIn and Other provider
    return {
        isLoggedIn: function() {
            return false;
        }
    };
});

module.service("Storage", function($q, $window) {

    var indexedDB = $window.indexedDB || $window.webkitIndexedDB || $window.mozIndexedDB;

    var READONLY = "readonly";
    var READWRITE = "readwrite";
    var VERSIONCHANGE = "versionchange";

    var NEXT = "next";
    var NEXTUNIQUE = "nextunique";
    var PREV = "prev";
    var PREVUNIQUE = "prevunique";

    var db = null;
    var name = null;
    var version = null;
    var callbackUpgrade = null;

    /**
     * Function for transactions operation
     * @param {type} e
     * @returns {undefined}
     */
    this.onTransactionComplete = function(e) {
        console.log("Transaction Complete ");
        console.log(e);
    };

    /**
     * Function for transactions operation
     * @param {type} e
     * @returns {undefined}
     */
    this.onTransactionError = function(e) {
        console.log("Transaction Error");
        console.log(e);
    };


    /**
     * Object that represent a Builder of SQL Queries.
     */
    var QueryBuilder = function(owner) {
        this.owner = owner;
        this.tr = null;
    };

    QueryBuilder.prototype = {
        object: function(objectName, transactionMode) {
            var self = this;
            self.tr = self.owner.db.transaction(objectName, transactionMode || READONLY);
            self.tr.onerror = self.owner.onTransactionError;
            self.tr.oncomplete = self.owner.onTransactionComplete;
            return self.tr.objectStore(objectName);
        },
        /**
         * Return count instances for a ObjectName from local database
         * @param {type} objectName
         * @returns {$q@call;defer.promise}
         */
        "count": function(objectName) {
            var deferred = $q.defer();
            var self = this;
            if (self.owner.db) {
                try {
                    var req = self.object(objectName, READONLY).count();
                    req.onsuccess = function(e) {
                        deferred.resolve(e.target.result);
                    };
                    req.onerror = function(error) {
                        deferred.reject(error);
                    };
                } catch (error) {
                    deferred.reject(error);
                }

                return deferred.promise;
            }
        },
        /**
         * Insert data into DataBase in particular ObjectStore
         * @param {type} objectName
         * @param {type} data
         * @returns {undefined}
         */
        "insert": function(objectName, data) {
            var deferred = $q.defer();
            var self = this;
            if (self.owner.db) {
                try {
                    var objectStore = self.object(objectName, READWRITE);

                    if (angular.isArray(data)) {
                        angular.forEach(data, function(value, key) {
                            var request = objectStore.add(value);
                            request.onsuccess = function(e) {
                                deferred.resolve(self);
                            };
                            request.onerror = function(error) {
                                deferred.reject(error);
                            };
                        });
                    } else {
                        var request = objectStore.add(data);
                        request.onsuccess = function(e) {
                            deferred.resolve(self);
                        };
                        request.onerror = function(e) {
                            deferred.reject(e);
                        };
                    }
                } catch (error) {
                    deferred.reject(error);
                }
            } else {
                deferred.resolve(self);
            }
            return deferred.promise;
        }
    };

    /**
     * Information of current Database
     */
    this.info = function() {
        if (this.db !== null) {
            return this.db.name;
        }
    };

    /**
     * Close the current Database
     */
    this.close = function() {
        this.db = null;
        this.version = null;
        this.callbackUpgrade = null;
        this.name = null;
        return;
    };

    /**
     * Use the name database with version and callback function
     * 
     * 
     * 
     * @param name
     * @param version
     * @param callback
     * @returns {*}
     */
    this.use = function(name, version, callback) {
        var deferred = $q.defer();
        var self = this;
        self.callbackUpgrade = callback;
        this.connect(name, version, callback)
                .then(
                        function(db) {
                            self.db = db;
                            deferred.resolve(self);
                        },
                        function(error) {
                            deferred.reject(error);
                        });

        return deferred.promise;
    };

    /**
     * Connect to Database
     */
    this.connect = function(name, version, callback) {
        var deferred = $q.defer();
        var openReq = indexedDB.open(name, version);

        openReq.onupgradeneeded = function(e) {
            if (callback) {
                callback(e.target.result);
                deferred.resolve();
            }
        };
        openReq.onsuccess = function(e) {
            deferred.resolve(e.target.result);
        };

        openReq.onerror = function(error) {
            deferred.reject(error);
        };

        return deferred.promise;
    };

    /**
     * Return a QueryBuilder for LocalStorage DB
     */
    this.query = function() {
        return new QueryBuilder(this);
    };
});


module.service("FileSystem", function($q, $window, $location) {
    
    var directory = null;
    var fs = null;
    var type = null;
    
    this.open = function(type, bytes, callback) {
        var self = this;
        var deferred = $q.defer();
        if (
                angular.isDefined($window.navigator.webkitPersistentStorage) &&
                angular.isDefined($window.webkitRequestFileSystem)) {

            if (type === $window.PERSISTENT) {

                $window.navigator.webkitPersistentStorage.requestQuota(bytes,
                        function(grantedBytes) {
                            $window.webkitRequestFileSystem(type, grantedBytes,
                                    function(filesystem) {
                                        self.fs = filesystem;
                                        self.directory = self.fs.root;
                                        self.fileSystemPath = "filesystem:http://"+$location.host()+"/persistent";
                                        callback(self.fs);
                                        
                                        deferred.resolve(self);
                                    },
                                    function(error) {
                                        deferred.reject(error);
                                    });
                        },
                        function(error) {
                            deferred.reject(error);
                        });
            } else if (type === $window.TEMPORARY) {
                
                $window.requestFileSystem($window.TEMPORARY, bytes, function(filesystem) {
                    self.fs = filesystem;
                    self.directory = self.fs.root;
                    self.fileSystemPath = "filesystem:http://"+$location.host()+"/temporary";
                    callback(self.fs);
                    deferred.resolve(self);
                }, function(error) {
                    deferred.reject(error);
                });
                
            } else {
                deferred.reject();
            }
        }

        return deferred.promise;
    };

    this.requestQuota = function(byte) {
    };

    this.createFile = function(directory) {
        return;
    };

    //var fileSystemPath = "filesystem:http://samples-of-html5.appspot.com/persistent";
    /**
     * Create a new Directory in FileSystem
     * @param {type} entry DirectoryEntry parent
     * @param {type} name  
     * @param {type} cd navigate to directory
     * @returns {$q@call;defer.promise}
     */
    this.mkdir = function(entry, name, cd) {
        var self = this;
        cd = typeof cd !== 'undefined' ? cd : false;
        var deferred = $q.defer();

        if (entry.isDirectory) {
            entry.getDirectory(name, {
                create: true
            }, function(entry) {
                if (cd)
                    self.directory = entry;
                deferred.resolve(self);
            }, function(error) {
                deferred.reject(error);
            });
        }
        return deferred.promise;

    };

    /**
     * List content of actual directory
     * @param {type} options
     * @returns {Array}
     */
    this.ls = function(options) {
        var deferred = $q.defer();
        var self = this;
        var toReturn = [];
        if (self.directory) {
            var dirReader = self.directory.createReader();
            dirReader.readEntries(
                    function(entries) {
                        angular.forEach(entries, function(value, key) {
                            toReturn.push(value);
                        });
                        deferred.resolve(toReturn);
                    });
        }
        
        return deferred.promise;
    };

    this.pwd = function() {
        return this.directory;
    };

    this.cd = function(path) {
        
    };

    this.rm = function(path, options) {

    };

});