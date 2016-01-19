'use strict';

app.controller('UserDeleteCtrl',
    function UserDeleteCtrl($scope, $location, auth, $routeParams, UsersResource) {

        UsersResource.query().$promise.then(function(collection) {
            collection.forEach(function(user) {
                if (user._id === $routeParams.id) {
                    $scope.user = user;
                }
            })
        });

        $scope.removeUser = function(user){
            var alert = confirm("Sei sicuro di voler cancellare " + user.username + "?");
            if (alert == true) {
                auth.removeUser(user).then(function() {
                    $location.path('/users/details');
                });
            }

        }
    });
