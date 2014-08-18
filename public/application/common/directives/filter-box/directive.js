define(['app', 'moment', 'common/directives/datepicker/directive'], function (app) {
    'use strict';

    var FilterBox = function () {
        return {
            restrict: 'E',

            scope: {
                query: '=',
                filter: '&'
            },

            link: function (scope, element) {

                var Form = function(query) {
                    var date = query.until ? moment(query.until) : moment();
                    var latlng = query.geocode ? query.geocode.replace(/,[0-9]+.[0-9]+km/, '') : '52.530844,13.3868664';

                    this.date =  date.format('YYYY-MM-DD');
                    this.time = date.format('HH:mm');
                    this.latlng = latlng;
                };

                var Query = function(form) {
                    this.query = [
                        {param: 'until', value: (form.date && form.time) ? (form.date + ' ' + form.time) : moment().format('YYYY-MM-DD HH:mm')},
                        {param: 'geocode', value: (form.latlng) ? form.latlng.replace(/,[0-9]+.[0-9]+km/, '') + ',0.2km' : '52.530844,13.3868664,0.2km'}
                    ];
                };

                scope.expanded = false;

                scope.form = {};

                scope.toggle = function() {
                    scope.expanded = !scope.expanded;
                };

                scope.submit = function() {
                    scope.filter({q: new Query(scope.form)});
                };

                scope.$watch('query', function(query) {
                    scope.form = new Form(query);
                });
            },

            templateUrl: 'application/common/directives/filter-box/template.html'
        };
    };

    angular.module('app').directive('filterBox', [FilterBox]);

});
