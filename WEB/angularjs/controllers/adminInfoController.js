var prefix = 'http://tranquil-hamlet-1905.herokuapp.com';

angular.module("usterkaAdmin")
    .constant("infoUrl", prefix + "/info")
    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("infoCtrl", ['$q', '$scope', '$resource', 'infoUrl', '$http', function ($q, $scope, $resource, infoUrl, $http) {

        $scope.infoResource = $resource(infoUrl + ":id", {id: "@id"});

        $scope.listInfo = function () {
            $scope.info = $scope.infoResource.query();

        };

        $scope.headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp',
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        $scope.reloadPage = function () {
            window.location.reload();
        };

        $scope.deleteInfo = function (info) {

                $http.post(prefix + '/info/delete', 'id=' + info.id, {headers: $scope.headers});
                $http.get(prefix + '/reports?id=' + '%27' + info.id + '%27');


            setTimeout(function () {
                $scope.listInfo();
            }, 700);
        };

        $scope.createInfo = function (info) {
            setTimeout(function () {
                $http.post(prefix + '/info/add', 'title=' + info.title + '&' + 'description=' + info.description, {headers: $scope.headers});
                new $scope.infoResource(info).$save().then(function (newInfo) {
                    $scope.info.push(newInfo);
                    $scope.editedInfo = null;
                });
                $scope.editedInfo = null;
                $scope.listInfo();

            }, 700);
        };

        $scope.updateInfo = function (info) {
            $http.post(prefix + '/info', 'id=' + info.id + '&title=' + info.title + '&' + 'description=' + info.description, {headers: $scope.headers});

            $scope.editedInfo = null;
        };

        $scope.startEdit = function (info) {
            $scope.editedInfo = info;
        };

        $scope.cancelEdit = function () {
            $scope.editedInfo = null;
        };

        $scope.listInfo();

        $scope.selectEvent = function (event) {
            $scope.selectedEvent = event;
            javascript:scroll(0, 0);
        };

        $scope.predicate = 'enddate';
        $scope.reverse = true;
        $scope.order = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };

    }]);
