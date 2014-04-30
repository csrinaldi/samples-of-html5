'use strict';

var module = angular.module('knowledgeTalentApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'knowledgeTalentApp.Controllers',
    'knowledgeTalentApp.Services'
]);


module.config(function($routeProvider, $locationProvider) {
    /*$rootScope.inLogin = false;
     $rootScope.inRegister = false;*/
    $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainController'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .when('/account', {
                templateUrl: 'views/account',
                controller: 'AccountController'
            })
            .when('/courses', {
                templateUrl: 'views/courses',
                controller: 'CoursesController'
            })
            .when('/jobs', {
                templateUrl: 'views/jobs',
                controller: 'JobsController'
            })
            .when('/companies', {
                templateUrl: 'views/companies',
                controller: 'CompaniesController'
            })
            .when('/register', {
                templateUrl: 'views/comingsoon.html',
                controller: 'ComingSoonController'
            })
            .otherwise({
                redirectTo: '/'
            });

    //$locationProvider.html5Mode(true);
});

module.run(['$window', '$location', '$rootScope', 'AuthService', 'Storage', 'FileSystem', function($window, $location, $rootScope, authService, storage, fileSystem) {

        fileSystem.open($window.PERSISTENT, 5 * 1024 * 1024, function(fs) {
            console.log(fs);
        }).then(
                function(fileSystem) {
                    fileSystem.mkdir(fileSystem.pwd(), "dev", false)
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

        storage.use("knowledge_talen", 4,
                function(db) {
                    /**
                     * Create database estructure
                     */
                    console.log(db);
                    var store = db.createObjectStore("expert", {keyPath: 'id', autoIncrement: true});
                    store.createIndex('name', 'name', {unique: false});
                })
                .then(
                        function(storage) {
                            console.log("DataBase Created");
                            storage.query().insert("person", {"name": "Cristian", "surname": "Rinaldi"})
                                    .then(
                                            function(builder) {
                                                builder.insert("expert", {"name": "Expert"}).
                                                        then(
                                                                function(builder) {
                                                                    console.log("Result OK");
                                                                },
                                                                function(error) {
                                                                    console.log("Error");
                                                                });

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

        $rootScope.$on("$routeChangeStart", function(event, next, current) {

            authService.googleService().config(
                    {
                        clientID: "669828437303.apps.googleusercontent.com",
                        apiKey: "AIzaSyARWaMtarIjqPCTw8jgZ0rj9GgV2hAM9kY",
                        scopes: [
                            'https://www.googleapis.com/auth/plus.login',
                            'https://www.googleapis.com/auth/plus.me',
                            'https://www.googleapis.com/auth/userinfo.email',
                            'https://www.googleapis.com/auth/userinfo.profile'
                        ]
                    }).then(function() {
                        authService.googleService().login().then(function(auth){
                            console.log(auth);
                        });
                    });
            $rootScope.showLogin = (!authService.googleService().isLogged() && !(next.$$route.originalPath === "/login") && !next.$$route.originalPath === "/register");
        });

    }]);


