'use script'

app.controller('IndexCtrl',
    function IndexCtrl($scope, identity){
        $scope.identity = identity;
});