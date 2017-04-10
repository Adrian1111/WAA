/**
 * Created by apanczyk on 2017-03-15.
 */
angular.module("usterkaAdmin")
.factory("ReportService", ['$http', '$cookies', '$q',  function ($http, $cookies, $q) {


        return {
            /*checkCredentials: function (user, pass) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: 'http://tranquil-hamlet-1905.herokuapp.com/reports?id=',
                    data: $.param({username: user, password: pass})
                }).then(function (response) {
                    //$cookies.put('authCookie', response);
                    deferred.resolve( response );
                }).catch(function (response) {
                    deferred.resolve( response );
                });

                return deferred.promise;
            }*/
        };


}]);