'use strict';

app.controller('AdminCtrl',
    function AdminCtrl($scope, $location,UsersResource, auth) {
        $scope.users = UsersResource.query();

        $scope.removeUser = function(user){
            auth.removeUser(user).then(function() {
                $scope.users = UsersResource.query();
                window.location.reload();
            });
        }
    });
