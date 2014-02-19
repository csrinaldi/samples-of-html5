/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var module = angular.module('knowledgeTalentApp.Services', []);

module.factory('AuthService', function($http) {

    return {
        isLoggedIn: function() {
            return false;
        }
    };
});