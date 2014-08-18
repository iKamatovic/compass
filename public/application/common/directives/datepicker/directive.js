define(['app', 'jquery-ui'], function () {
    'use strict';

    var Datepicker = function () {
        return {
            restrict: 'A',

            scope: {
                dateFormat: '@format',
                defaultDate: '=default',
                minDate: '=min',
                maxDate: '=max'
            },

            link: function (scope, element) {
                element.datepicker(scope);
            }
        };
    };

    angular.module('app').directive('datepicker', [Datepicker]);

});