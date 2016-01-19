'use strict';

app.controller('LoginCtrl',
    function PracticeCtrl($scope, $location, notifier, identity, auth) {

        $scope.login = function(user) {
            auth.login(user).then(function(success) {
                if (success) {
                    $scope.identity = identity;
                    notifier.success('Successful login!');
                    $location.path('/profile');

                }
                else {
                    notifier.error('Username/Password combination is not valid!');
                }
            });
        }
    });
