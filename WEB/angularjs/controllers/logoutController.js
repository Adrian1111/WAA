/**
 * Created by apanczyk on 2017-04-04.
 */
var app = angular.module("usterkaAdmin")
    app.controller("logoutController", ['AuthUrl', '$rootScope', '$location', function (AuthUrl, $scope, $location) {

        AuthUrl.deleteCookie();

        $scope.loginPageRedirect = function(){
            $location.path("/login");
        };

    }]);