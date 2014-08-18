define(['app', 'moment', 'common/services/twitter', 'common/directives/filter-box/directive', 'common/directives/here-maps/directive'],
    function () {
    'use strict';

    var MapController = function ($scope, $location, TwitterService) {

        $scope.pageLabel = 'Role Overview';

        $scope.path = $location.path();
        $scope.query = $location.search();
        $scope.data = [];

        // Query observing and data fetching
        // --------------------------------------------------------------------------
        // ->

        $scope.$watch('query', function (query) {

            if (Object.keys(query).length === 0) {
                $scope.url({
                    query: [
                        {param: 'until', value: moment().format('YYYY-MM-DD HH:mm')},
                        {param: 'geocode', value: '52.530844,13.3868664,0.2km'}
                    ]
                });

                return;
            }

            if (query && Object.keys(query).length > 0) {

                TwitterService.query(query).$promise.then(function (response) {
                    $scope.data = response;
                });
            }
        });

        // Route observers
        // --------------------------------------------------------------------------
        // ->

        $scope.$on('$routeUpdate', function () {
            $scope.path = $location.path();
            $scope.query = $location.search();
        });

        $scope.url = function (url) {

            var search = url.copy ? angular.copy($scope.query) : {};
            var query = url.query ? url.query : [];
            var path = url.path;

            query.forEach(function (q) {
                if (typeof q.value !== 'undefined' && q.value !== null) {
                    search[q.param] = q.value;
                } else {
                    delete search[q.param];
                }
            });

            $location.search(search);

            if (path) {
                $location.path(path);
            }
        };
    };

    angular.module('app').controller('MapController', ['$scope', '$location', 'TwitterService', MapController]);
});
