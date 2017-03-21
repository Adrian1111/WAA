angular.module("usterkaAdmin")
    .controller("authCtrl", ['$rootScope','$http','$location','AuthUrl', function ($scope, $http, $location, AuthUrl) {

        $scope.authenticate = function (user, pass) {
            $scope.showSpinner = true;
            AuthUrl.checkCredentials(user, pass).then( function ( result ) {
                if(result.data && result.data.indexOf("error") == -1){
                    $location.path("/main");
                } else{
                    $scope.authenticationError = result.data;
                    $scope.showSpinner = false;
                }
            }, function(error){
                $scope.authenticationError = error.data;
            });

        }
    }])
    .controller("mainCtrl", function ($scope) {
        $scope.screens = ["Zgłoszenia", "Informacje", "Użytkownicy"];
        $scope.current = $scope.screens[0];

        $scope.setScreen = function (index) {
            $scope.current = $scope.screens[index];
        };

        $scope.getScreen = function () {
            var ret;
            if ($scope.current == "Zgłoszenia") {
                ret = "/views/adminReports.html";
            }
            else if ($scope.current == "Informacje") {
                ret = "/views/adminInfo.html";
            }
            else {
                ret = "/views/adminUsers.html";
            }
            return ret;

        };
    });

