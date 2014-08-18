define(['app'], function () {
    'use strict';

    // TwitterService is used for interaction with back-end Twitter API
    // --------------------------------------------------------------------------
    // ->

    var TwitterService = function ($resource) {
        return $resource('/api/tweets');
    };

    angular.module('app').service('TwitterService', ['$resource', TwitterService]);
});