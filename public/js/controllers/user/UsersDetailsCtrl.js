'use strict';

app.controller('UsersDetailsCtrl',
    function UsersDetailsCtrl ($scope, $location, auth, $routeParams, UsersResource) {
        $scope.users = UsersResource.query();

        UsersResource.query().$promise.then(function(collection) {
            collection.forEach(function(user) {
                if (user._id === $routeParams.id) {
                    $scope.user = user;
                }
            })
        });

        $scope.update = function(user) {
            auth.update(user).then(function() {
                $location.path('/profile/admin');
            });
        }
    });

