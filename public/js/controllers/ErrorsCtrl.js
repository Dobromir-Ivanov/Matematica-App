'use strict';

app.controller('ErrorsCtrl',
    function ErrorsCtrl($scope, errorsTheUser){

        $scope.listErrors = function(){
            $scope.caountErrors = errorsTheUser.getErrors().cauntErr;
            $scope.errors = errorsTheUser.getErrors().arrOfErr;
        }
    });