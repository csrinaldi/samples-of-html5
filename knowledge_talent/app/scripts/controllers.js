'use strict';

var app = angular.module('knowledgeTalentApp.Controllers', []);

app.controller('MainController', function($scope, $location) {
    console.log($scope);
    $scope.title = "Knowledge"
    
    $scope.goPlace = function(place){
        $location.path(place);
    }
});

app.controller('LoginController', function($scope) {
    console.log($scope);
});