require({
    paths: {
        'jquery': './libraries/jquery/dist/jquery.min',
        'jquery-ui': './libraries/jquery-ui/jquery-ui.min',
        'angular': './libraries/angular/angular.min',
        'angular-resource': './libraries/angular-resource/angular-resource.min',
        'angular-route': './libraries/angular-route/angular-route.min',
        'moment': './libraries/moment/min/moment.min'
    },

    shim: {
        'jquery-ui': {
            deps: ['jquery'],
            exports: '$'
        },
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-resource': {
            deps: ['angular'],
            exports: 'ngResource'
        },
        'angular-route': {
            deps: ['angular'],
            exports: 'ngRoute'
        }
    }
}, ['boot']);
