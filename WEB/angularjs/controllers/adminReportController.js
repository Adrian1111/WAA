angular.module("usterkaAdmin")
    .constant("statusUrl", "http://tranquil-hamlet-1905.herokuapp.com/status/")
    .constant("reportsUrl", "http://tranquil-hamlet-1905.herokuapp.com/reports3/")
    .constant("fullReportsUrl", "http://tranquil-hamlet-1905.herokuapp.com/reports/")
    .constant("usersUrl", "http://tranquil-hamlet-1905.herokuapp.com/users/")
    .constant("priorityUrl", "http://tranquil-hamlet-1905.herokuapp.com/priority")
    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .filter("statusName", function () {
        var statusName = ["Nowe", "Zaakceptowane", "Zakończone", "Odrzucone"];
        return function (input) {
            return statusName[input];
        };
    })
    .controller("reportCtrl", function ($scope, $interval, $window, $resource, reportsUrl, usersUrl, statusUrl, $http, priorityUrl, fullReportsUrl, $route, $location) {

        $scope.userResource = $resource(usersUrl + ":id", {id: "@id"});
        $scope.isExpanded = false;
        $scope.data = {};
        $http.get(statusUrl)
            .then(function (data) {

                $scope.data.status = [{
                    "id": "49fee73a-3cfe-43d1-b5ab-06e04ca6a0a8",
                    "name": "Zaakceptowane",
                    "value": 1
                }, {
                    "id": "7793574f-2c53-484d-ba46-533f6f23db6b",
                    "name": "Zakończone",
                    "value": 2
                }, {
                    "id": "148c2f2e-8067-4558-83a1-c9c56ffb3a02",
                    "name": "Odrzucone",
                    "value": 3
                }, {"id": "f12b89b4-cf1c-4191-b7b5-f30f31c97f5c", "name": "Nowe", "value": 0}];

            })
            .catch(function (error) {
                $scope.data.error = error;
            });

        $http.get(priorityUrl)
            .then(function (data) {
                $scope.data.priority = [{
                    "id": "53c958d8-5e3d-40c4-9740-d06219662b9b",
                    "name": "1. Sprawa może poczekać (do 7 dni)"
                }, {
                    "id": "f69fd435-f572-494e-b3e2-31ea4ea76b2c",
                    "name": "2. Usterka pilna (do 48 h)"
                }, {"id": "141ae6ac-5a6b-4b33-bf0e-c18632f7d9f9", "name": "3. Awaria (do 2-3 h)"}];

            })
            .catch(function (error) {
                $scope.data.error = error;
            });

        $scope.headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp',
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        $scope.user = [];
        $scope.status = statusName = ["Nowe", "Zaakceptowane", "Zakończone", "Odrzucone"];
        $scope.listUser = function () {
            $scope.user = $scope.userResource.query();
        };
        $scope.listUser();

        $scope.reloadPage = function () {
            window.location.reload();
        };
        $scope.reloadPage2 = function () {
            $route.reload();
        };
        $scope.reportResource = $resource(reportsUrl + ":id", {id: "@id"});

        $scope.listReport = function () {
            $scope.report = $scope.reportResource.query();
        };
        $scope.listReport2 = function () {
            $scope.report2 = $scope.reportResource.query();
        };
        $scope.deleteReport = function (report) {


            $http.post(prefix + '/reports/delete', 'id=' + report.id, {headers: $scope.headers});
        };

        $scope.superZmiennaFlaga = false;
        $scope.zmniejszObraz = function () {
            $scope.superZmiennaFlaga = !$scope.superZmiennaFlaga;
            if ($scope.superZmiennaFlaga) {
                $("#obrazek").css("width", "600px");
                $("#obrazek").css("height", "440px");
            }
            if (!$scope.superZmiennaFlaga) {
                $("#obrazek").css("width", "300px");
                $("#obrazek").css("height", "220px");
            }
        };

        $scope.createReport = function (report) {
            new $scope.reportResource(report).$save().then(function (newReport) {
                $scope.report.push(newReport);
                $scope.editedReport = null;
            });
        }

        $scope.updateReport = function (report) {
            $http.post(prefix + '/reports', 'id=' + report.id + '&title=' + report.title + '&priority=' + report.priority + '&status=' + report.status, {headers: $scope.headers});

            $scope.editedReport = null;
        }

        $scope.startEdit = function (report) {
            $scope.editedReport = report;
        }

        $scope.cancelEdit = function () {
            $scope.editedReport = null;
        }


        $scope.statusUp = function (report) {

            report["status"] = parseInt(report["status"]) + 1;
            $scope.updateReport(report);
            $scope.reloadPage();
        }

        $scope.visiblePlotw = true;
        $scope.visiblePlot = [];
        var c = 0;
        var timer = $interval(function () {
            $scope.message = "This DIV is refreshed " + c + " time.";
            $scope.refreshPlot();
            c++;
            if (c === 100) {
                $scope.message = "Restarting the timer again :-)";
                c = 0;
            }
        }, 100);

        $scope.getPlot = function () {

            $scope.visiblePlotw = !$scope.visiblePlotw;
            $scope.visiblePlot.sum = 0;
            $scope.visiblePlot.newed = 0;
            $scope.visiblePlot.accepted = 0;
            $scope.visiblePlot.ended = 0;
            $scope.visiblePlot.canceled = 0;
            $scope.visiblePlot.sum = $scope.report.length;

            for (var i = 0; i < $scope.visiblePlot.sum; i++) {
                if ($scope.report[i]["status"][0] == "0")
                    $scope.visiblePlot.newed = $scope.visiblePlot.newed + 1;
                if ($scope.report[i]["status"][0] == "1")
                    $scope.visiblePlot.accepted = $scope.visiblePlot.accepted + 1;
                if ($scope.report[i]["status"][0] == "2")
                    $scope.visiblePlot.ended = $scope.visiblePlot.ended + 1;
                if ($scope.report[i]["status"][0] == "3")
                    $scope.visiblePlot.canceled = $scope.visiblePlot.canceled + 1;
            }


        };


        $scope.refreshPlot = function () {
            $scope.getPlot();
            $scope.getPlot();
        };

        $scope.tmp = {};

        $scope.refleshData = function () {

            $scope.listReport2();
            if (!(JSON.stringify($scope.tmp.o) == JSON.stringify($scope.tmp.n))) {
                $scope.listReport();
            }
            $scope.tmp.o = $scope.tmp.n;
            $scope.tmp.n = $scope.report2;
        };

        $scope.sleep = function (milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++)
                if ((new Date().getTime() - start) > milliseconds)
                    break;
        };


        $scope.listReport();
        $scope.listReport2();
        console.log($scope.report2);

        console.log($scope.report);
        $scope.tmp.o = $scope.report2;
        $scope.tmp.n = $scope.report2;
        $scope.listUser();

        $scope.selectReport = function (report) {

            $location.path("/main/"+report.id);

            $http.get(prefix + '/reports?id=' + '%27' + report.id + '%27').then(function successCallback(response) {
                report = response.data[0];

                $scope.selectedReport = report;
                //alert(JSON.stringify($scope.selectedReport));

                $scope.$apply();

            }, function errorCallback(response) {

            });


        };

        $scope.predicate = 'status';
        $scope.reverse = false;
        $scope.order = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
            console.log('predicate: ' + $scope.predicate + ' reverse: ' + $scope.reverse);
        };
        $scope.format = 'd/M/yyyy H:mm';
        $scope.filter = {};
        $scope.getCategories = function () {
            return ($scope.report || []).map(function (w) {
                return w.status;
            }).filter(function (w, idx, arr) {
                return arr.indexOf(w) === idx;
            });
        };

        $scope.onEnterPress = function(item){
            $scope.changeState(item);
        };

        $scope.filterByCategory = function (w) {
            return $scope.filter[w.status] || noFilter($scope.filter);
        };

        function noFilter(filterObj) {
            for (var key in filterObj) {
                if (filterObj[key]) {
                    return false;
                }
            }
            //return 'No results';
        }

        $scope.changeState = function(active){
            if($scope.isExpanded == false) {
                $scope.isExpanded = true;
                $scope.hiddenRowState = active;
            } else if($scope.isExpanded == true && active == $scope.hiddenRowState){
                $scope.hiddenRowState = false;
                $scope.isExpanded = false
            } else {
                $scope.hiddenRowState = active;
            }
        };

///endplot
    })
    .filter("userName", function () {

        return function (input, userName) {

            for (i = 0; i < userName.length;) {
                var res = input;
                if (userName[i]["id"] == input) {
                    res = userName[i]["username"];
                    break;
                }
                else {
                    i++;
                }
            }
            return res;
        };
    });
