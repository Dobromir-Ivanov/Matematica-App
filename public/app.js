'use strict';
var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ui.bootstrap']).value('toastr', toastr);

    app.config(function($routeProvider, $locationProvider){

        var routeUserChecks = {
            adminRole: {
                authenticate: function(auth) {
                    return auth.isAuthorizedForRole('admin');
                }
            },
            authenticated: {
                authenticate: function(auth) {
                    return auth.isAuthenticated();
                }
            }
        };

        $routeProvider
            .when('/',{
                templateUrl: 'view/pages/home'
            })
            .when('/pratica',{
                templateUrl: 'view/pages/practice',
                controller: 'PracticeCtrl'
            })
            .when('/profile',{
                templateUrl: 'view/pages/profile',
                controller: 'ProfileCtrl',
                resolve: routeUserChecks.authenticated
            })
            .when('/contatti',{
                templateUrl: 'view/pages/contacts'
            })
            .when('/users/details', {
                templateUrl: 'view/partials/users-details',
                controller: 'UsersDetailsCtrl',
                resolve: routeUserChecks.adminRole
            })
            .when('/user/edit/:id', {
                templateUrl: 'view/partials/user-details-id',
                controller: 'UserEditCtrl',
                resolve: routeUserChecks.adminRole
            })
            .when('/user/delete/:id', {
                templateUrl: 'view/partials/user-delete',
                controller: 'UserDeleteCtrl',
                resolve: routeUserChecks.adminRole
            });

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    });

    app.run(function($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/');
            }
        })
});