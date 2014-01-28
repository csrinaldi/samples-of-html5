'use strict';

var app = angular.module('knowledgeTalentApp.Controllers', []);

app.controller('MainController', function($scope) {
    console.log($scope);
    $scope.title = "Knowledge"
});