'use strict';

app.controller('RegisterCtrl',
    function PracticeCtrl($scope, $location, notifier, auth) {
        var err = 'ERROR!',
            ok = 'Password acetata!';

        $scope.signup = function(user) {

            if(user.password != user.confirmPassword){
                $scope.mesge = err;
                return;
            }else{
                $scope.mesge = ok;
                auth.signup(user).then(function(success) {
                    if (success) {
                        notifier.success('Registration successful!');
                        $location.path('/profile');
                    }else {
                        $scope.user.username = '';
                        notifier.error('Username existing!');
                    }

                })
            }
        }
    });