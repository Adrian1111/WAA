/**
 * Created by apanczyk on 2017-03-21.
 */
'use strict';

angular.module('usterkaAdmin', ["ngRoute", "ngResource", "ngCookies"]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'views/adminLogin.html'
            //controller: 'adminControllers'
        })
        .when('/main', {
           // controller: '',
            templateUrl: 'views/adminMain.html'
        })
        .when('/register', {
            //controller: '',
            templateUrl: 'register/register.view.html'
        })
        .otherwise({redirectTo: '/login'});
}]);
