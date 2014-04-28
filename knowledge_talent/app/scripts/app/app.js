'use strict';

var module = angular.module('knowledgeTalentApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'knowledgeTalentApp.Controllers',
    'knowledgeTalentApp.Services'
]);


module.config(function ($routeProvider, $locationProvider) {
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

module.run(['$location', '$rootScope', 'AuthService', 'Storage', function ($location, $rootScope, authService, storage) {

    storage.use("knowledge_talen", 2, function () {
    }).then(
        function (s) {
            console.log(s.info());
            s.insert({id: 1, name:"cristian"}).then(function(s){
               console.log(s.info);
            }, function(error){
                console.log(error);
            });
        });


    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        $rootScope.showLogin = (!authService.isLoggedIn() && !(next.$$route.originalPath === "/login") && !next.$$route.originalPath === "/register");
    });

}]);


