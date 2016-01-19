'use strict';

app.controller('PracticeCtrl',
    function PracticeCtrl($scope, $timeout, task, options, user, logicReply){
        var user = user.getUser(),
            optionsCtrl = options.getOptions(),
            corentTask = task.getTask();

        $scope.user = user;

        $scope.task = corentTask;
        $scope.helpBtn = help;
        $scope.resultOfHelpBtn = resultOfHelp;

        $scope.difficultyMode = optionsCtrl.difficulty.selectedMode.name;
        $scope.resultBtn = result;

        $scope.button = 'Risultato';
        $scope.inputDisabled = false;
        $scope.refresh = refresh;

        toastr.options.positionClass = "toast-top-center";


        $(document).keypress(function(e) {
            if(e.which == 13) {
                if(!$scope.hideBtnHelp){
                    $("#resultBtn").click();
                }
            }
        });


        defaultSettings();

        function help(){
            $scope.hideBtnHelp = true;
            $scope.arrAnswers = task.help();
            $scope.showHelpBox = true;
        }

        function resultOfHelp(answer){
            var resultOfUser = answer,
                resultOnTask = $scope.task.resaltOfTask;

            if(resultOfUser === resultOnTask){
                $scope.user.points = $scope.user.points - 5;
            }

            $scope.user.resaltOfTask = resultOfUser;
            logicReply.compareAnswers(corentTask,resultOfUser, resultOnTask, $scope, refresh);
        }

        function result(){
            var resultOfUser = parseInt($scope.user.resaltOfTask),
                resultOnTask = $scope.task.resaltOfTask;

            logicReply.compareAnswers(corentTask, resultOfUser, resultOnTask, $scope, refresh);
        }

        function refresh(){
            optionsCtrl = options.getOptions();
            $scope.user.target = optionsCtrl.objectivePoints;
            $scope.max = $scope.user.target;
            $scope.difficultyMode = optionsCtrl.difficulty.selectedMode.name;
            $scope.resultBtn = result;
            $scope.button = 'Risultato';

            corentTask = task.getTask();
            $scope.task = corentTask;

            defaultSettings();
        }

        function defaultSettings(){

            $scope.showHelpBox = false;
            $scope.user.resaltOfTask = '';
            $scope.printResultOfAnswer = '';
            user.answer = user.possibleAnswer.notAnswer;
            $scope.dynamic = user.points;
            $scope.user.target = optionsCtrl.objectivePoints;
            $scope.max = $scope.user.target;

        }
    });