angular.module("usterkaAdmin")
    .controller("authCtrl", ['$rootScope','$http','$location','AuthUrl', function ($scope, $http, $location, AuthUrl) {

        $scope.authenticate = function (user, pass) {
            $scope.showSpinner = true;
            AuthUrl.checkCredentials(user, pass).then( function ( result ) {
                if(result.data && result.data.indexOf("error") == -1){
                    $location.path("/main");
                    $scope.showSpinner = false;
                    $scope.authenticationError = false;
                } else{
                    $scope.authenticationError = result.data;
                    $scope.showSpinner = false;
                }
            }, function(error){
                $scope.authenticationError = error.data;
            });

        };

    }])
    .controller("mainCtrl",  function ($location, $scope) {
        $scope.screens = ["Reports", "Informations", "Users", "Logout"];
        $scope.current = $scope.screens[0];

        $scope.setScreen = function (index) {
            $scope.current = $scope.screens[index];
        };

        $scope.getScreen = function () {
            var ret;
            if ($scope.current == $scope.screens[0]) {
                ret = "/views/adminReports.html";
            }
            else if ($scope.current == $scope.screens[1]) {
                ret = "/views/adminInfo.html";
            }
            else if($scope.current == $scope.screens[2]){
                ret = "/views/adminUsers.html";
            } else{
                $location.path("/logout");
                //ret = "views/logout.html";
            }
            return ret;

        };
    });

