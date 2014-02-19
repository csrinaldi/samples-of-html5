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

module.run(['$location', '$rootScope', 'AuthService', function($location, $rootScope, authService) {
        $rootScope.loguedIn = authService.isLoggedIn();
        
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            console.log(next.$$route.originalPath);
            $rootScope.inLogin = next.$$route.originalPath === "/login";
            $rootScope.inRegister = next.$$route.originalPath === "/register";
        });
    }]);


