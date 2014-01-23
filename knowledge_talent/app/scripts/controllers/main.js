'use strict';

var app = angular.module('knowledgeTalentApp', []);

app.controller('MainController', function($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
    
    $scope.logedIn = false;
    
    console.log("Y siii")

    $scope.check = function() {
        console.log("Chek OK")
    }
});

app.controller('HeaderController', function($scope) {
    $scope.title = "Knowledge";
    console.log("HeaderController");
    $scope.logedIn = true;
});


app.controller('NavigationController', function($scope) {
    console.log("NavigationController");
    //TODO from server
});

app.controller('FooterController', function($scope) {
    console.log("FooterController");
    //TODO from server
});

app.controller('SocialController', function($scope) {
    console.log("SocialController");
    //TODO from server
});

