'use strict';

app.controller('UserEditCtrl',
    function UserEditCtrl ($scope, $location, auth, $routeParams, UsersResource) {

        UsersResource.query().$promise.then(function(collection) {
            collection.forEach(function(user) {
                if (user._id === $routeParams.id) {
                    $scope.user = user;
                }
            })
        });

        $scope.update = function(user) {
            auth.update(user).then(function() {
                $location.path('/users/details');
            });
        }
    });

