define(['app', 'map/controller'],
    function (app) {
        'use strict';

        app.config(function ($routeProvider) {
            $routeProvider
                .when('/tweets', {
                    controller: 'MapController',
                    templateUrl: 'application/map/template.html',
                    reloadOnSearch: false
                }).otherwise({
                    redirectTo: '/tweets'
                });
        });
    });
