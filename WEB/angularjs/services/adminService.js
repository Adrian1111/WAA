/**
 * Created by apanczyk on 2017-03-15.
 */
angular.module("usterkaAdmin")
.factory("AuthUrl", ['$http', '$cookies', '$q',  function ($http, $cookies, $q) {


        return {
            checkCredentials: function (user, pass) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: 'http://tranquil-hamlet-1905.herokuapp.com/users/login',
                    data: $.param({username: user, password: pass})
                }).then(function (response) {
                    //$cookies.put('authCookie', response);
                    deferred.resolve( response );
                }).catch(function (response) {
                    deferred.resolve( response );
                });

                return deferred.promise;
            },
            isUserLoggedIn: function(){
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: 'http://tranquil-hamlet-1905.herokuapp.com/'
                }).then(function (response) {
                    //$cookies.put('authCookie', response);
                    deferred.resolve( response );
                }).catch(function (response) {
                    deferred.resolve( response );
                });

                return deferred.promise;
            },
            deleteCookie: function(){

                $http({
                    method: "GET",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: 'http://tranquil-hamlet-1905.herokuapp.com/logout'
                }).then(function (response) {
                    console.log('success')
                }).catch(function (response) {
                    console.log('failure')
                });

            }
        };


}]);