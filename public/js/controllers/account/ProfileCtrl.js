'use strict';

app.controller('ProfileCtrl',
    function ProfileCtrl($scope, $location, $filter, identity, notifier, auth, UsersResource) {

        $scope.users = UsersResource.query();
        $scope.identity = identity;
        $scope.user = identity.currentUser;
        $scope.model = '-points';
        $scope.infoBlock = false;
        $scope.arrow = 'fa fa-angle-down';
        getPosition ();
        $scope.showInfo = showInfo;


        $scope.logout = function() {
            auth.logout().then(function() {
                notifier.success('Successful logout!');
                if ($scope.user) {
                    $scope.user.username = '';
                    $scope.user.password = '';
                }
                $location.path('/');
            })
        };

        function showInfo(){
            if($scope.infoBlock === false){
                $scope.infoBlock = true;
                $scope.arrow = 'fa fa-angle-up';
            }else{
                $scope.infoBlock = false;
                $scope.arrow = 'fa fa-angle-down';
            }
        }

        function getPosition (){
            UsersResource.query().$promise.then(function(collection) {
                var sortCollection = collection.sort(function(a, b) {
                    return parseFloat(a.points) - parseFloat(b.points);
                }).reverse();
                var position= sortCollection.map(function(e) { return e.points; }).indexOf(identity.currentUser.points);
                $scope.qualificPosition = position + 1;
            });
        }
    });
