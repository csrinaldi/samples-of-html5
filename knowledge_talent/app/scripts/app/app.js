'use strict';

var module = angular.module('knowledgeTalentApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'knowledgeTalentApp.Controllers'
]);


module.config(function($routeProvider, $rootScope) {
    $rootScope.inLogin = false;
    $rootScope.inRegister = false;
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
            .otherwise({
                redirectTo: '/'
            });
});

module.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        
    });
}]);


