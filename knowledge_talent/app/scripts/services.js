'use strict';

var module = angular.module('knowledgeTalentApp.Services', []);

module.factory('AuthService', function ($http) {

    return {
        isLoggedIn: function () {
            return false;
        }
    };
});

module.service("Storage", function ($q, $window, $rootScope) {

    var indexedDB = $window.indexedDB || $window.webkitIndexedDB || $window.mozIndexedDB;

    var READONLY = "readonly";
    var READWRITE = "readwrite";
    var VERSIONCHANGE = "versionchange";

    var NEXT = "next";
    var NEXTUNIQUE = "nextunique";
    var PREV = "prev";
    var PREVUNIQUE = "prevunique";

    var db = null;
    var name = "";
    var version = "";
    var callbackUpgrade = null;


    /**
     * Information of current Database
     */
    this.info = function () {
        if (this.db != null) {
            console.log("info");
            return this.db.name;
        }
    };

    /**
     * Close the current Database
     */
    this.close = function () {
        return;
    };

    this.insert = function (objectName, data) {
        var deferred = $q.defer();
        var self = this;
        if (this.db) {
            var tr;
            try {
                tr = self.db.transaction(objectName, READWRITE);
                tr.oncomplete = function (e) {
                    console.log("Error");
                };
                tr.onerror = function (e) {
                    console.log("Error");
                    deferred.reject(self);
                };
                var objectStore = tr.objectStore(objectName);

                if (angular.isArray(data)) {
                    angular.forEach(data, function (value, key) {
                        var request = objectStore.add(value);
                        request.onsuccess = function (e) {
                            deferred.resolve(self);
                        };
                        request.onerror = function (e) {
                            deferred.reject(e);
                        }
                    }, log);
                } else {
                    var request = objectStore.add(value);
                    request.onsuccess = function (e) {
                        deferred.resolve(self);
                    }
                    request.onerror = function (e) {
                        deferred.reject(e);
                    }
                }
            } catch (e) {
                deferred.reject(e);
            }
        }
        return deferred.promise;
    };

    /**
     * Use the name database with version and callback function
     * @param name
     * @param version
     * @param callback
     * @returns {*}
     */
    this.use = function (name, version, callback) {
        var deferred = $q.defer();
        var self = this;
        self.callbackUpgrade = callback;
        this.connect(name, version).then(function (db) {
            self.db = db;
            deferred.resolve(self);
        });

        return deferred.promise;
    };

    /**
     * Connect to Database
     */
    this.connect = function (name, version) {
        var deferred = $q.defer();
        var openReq = indexedDB.open(name, version);

        openReq.onupgradeneeded = function (e) {
            $rootScope.$apply(function () {
                deferred.resolve(e.target.result);
            });
        };

        openReq.onsuccess = function (e) {
            $rootScope.$apply(function () {
                deferred.resolve(e.target.result);
            });
        };

        openReq.onerror = function (e) {
            $rootScope.$apply(function () {
                deferred.resolve(e);
            });
        };

        return deferred.promise;
    };

    /**
     * Return a QueryBuilder for LocalStorage DB
     */
    this.query = function () {
        return;
    }
});