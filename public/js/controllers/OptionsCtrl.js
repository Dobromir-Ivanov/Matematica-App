'use strict';

app.controller('OptionsCtrl',
    function OptionsCtrl($scope, options, user){
        var optional = options.getOptions();
        $scope.options = optional;
        $scope.difficulties = optional.difficulty.mode();
        $scope.ok = ok;
        $scope.cancela = cancela;
        $scope.reset = reset;

        function ok () {
            options.setOptions($scope.options);
            user.getUser().points = 0;
            $('#showOptionsPanel').modal('toggle');
            $scope.$parent.refresh();
        }

        function cancela(){
            $scope.options = options.getDefaultOptions;
            $scope.$parent.refresh();
        }

        function reset(){
            $scope.options = options.getDefaultOptions();

            /* Reset Difficulty*/
            $scope.options.difficulty.selectedMode = options.getDefaultOptions().difficulty.selectedMode;
        }
    });