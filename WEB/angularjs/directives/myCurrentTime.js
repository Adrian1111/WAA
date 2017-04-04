/**
 * Created by apanczyk on 2017-04-04.
 */

angular.module("usterkaAdmin")

.directive('myCurrentTime', ['$interval', 'dateFilter',
    function ($interval, dateFilter) {
        return function (scope, element, attrs) {
            var format,  // date format
                stopTime;

            function updateTime() {
                element.text(dateFilter(new Date(), format));
                scope.refleshData();
            }

            scope.$watch(attrs.myCurrentTime, function (value) {
                format = value;
                updateTime();

            });
            //auto reflesh 10s = 10000!
            stopTime = $interval(updateTime, 10000);

        }
    }]);