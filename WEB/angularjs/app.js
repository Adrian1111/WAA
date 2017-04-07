/**
 * Created by apanczyk on 2017-03-21.
 */
'use strict';

angular.module('usterkaAdmin', ["ngRoute", "ngResource", "ngCookies"])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/adminLogin.html',
                controller: 'authCtrl'
            })
            .when('/main', {
                templateUrl: 'views/adminMain.html'
            })
            .when('/register', {
                templateUrl: 'views/register.html'
            })
            .when('/main/:report*', {
                templateUrl: 'views/adminReportDetails.html'
            })
            .when('/logout', {
                templateUrl: 'views/logout.html',
                controller: "logoutController"
            })
            .otherwise({redirectTo: '/login'});
    }])
    .factory('authInterceptor', function($q) {
        var service = this;

        service.responseError = function(response) {
            if (response.status == 401){
                window.location = "/#!/login";
            }
            return $q.reject(response);
        };
        return service;

    })
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }]);