'use strict';

app.factory('logicReply',['user', 'options', '$timeout','errorsTheUser', 'identity', 'auth',
    function(user, options, $timeout, errorsTheUser, identity, auth){

    var user = user.getUser(),// this user is guest
        taskOptions = options.getOptions(),
        givenBonus = 0,
        setOnlyBonus = 500,
        tasksRisolved = 0,
        loggedUser,
        bonus = {
            bonusOnlyFiveHundredPoints : function(){
                if(user.points >= setOnlyBonus + givenBonus && user.points <= setOnlyBonus + givenBonus + 9){
                    user.bonusPoints += 50;
                    givenBonus += setOnlyBonus;
                    toastr.success('Bonus: ' + 50);
                }
            },
            getBonusPointsOfOptions:  function(options){
                var bonusOfOptions = 0;
                if(user.target >= setOnlyBonus && user.points >= user.target && user.points <= user.target + 9){
                    var arrOperators = options.operators,
                        time = options.difficulty.selectedMode.time;

                    // bonus for time (0-50)
                    if (time != '--') {
                        bonusOfOptions += Math.abs(time - 6) * 10;
                    }

                    //bonus for modaly tasks ( -, +, *, /)
                    if (arrOperators[0].check) {
                        bonusOfOptions += 25;
                    }
                    if (arrOperators[1].check) {
                        bonusOfOptions += 25;
                    }
                    if (arrOperators[2].check) {
                        bonusOfOptions += 50;
                    }
                    if (arrOperators[3].check) {
                        bonusOfOptions += 50;
                    }
                    if(arrOperators[0].check && arrOperators[1].check &&
                        arrOperators[2].check && arrOperators[3].check){
                        bonusOfOptions += 75;
                    }

                    toastr.success('Bonus: ' + bonusOfOptions);
                    user.bonusPoints += bonusOfOptions;
                    user.points += user.bonusPoints;
                }
            }
        };

    function logicReply(task, userRrsponse, taskRequest, $scope, refresh){
        if(isNaN(userRrsponse)){
            $scope.user.resaltOfTask = '';
            toastr.warning('Inserisci numero!');
            return
        }

        if(userRrsponse=== taskRequest){
            answerCorrect($scope, refresh);
        }else{
            answerError(task, $scope);
        }

        $scope.dynamic = user.points;
        $scope.countTo = $scope.user.points;
        $scope.countFrom = 0;

    }

    function answerCorrect($scope, refresh){
        loggedUser = identity.currentUser;
        user.answer = user.possibleAnswer.correct;
        $scope.hideBtnHelp = false;
        $scope.showHelpBox = false;
        $scope.resultBtn = refresh;
        $scope.dynamic = $scope.user.points;
        $scope.user.points = $scope.user.points + 10;
        $scope.type = 'success';
        $scope.button = 'Nuovo compito';
        toastr.success('Giusto');
        user.tasksRisolved += 1;
        updateProgressBarr($scope);
        addBonusPoints();
        addUserTaskRisolved();
    }

    function addBonusPoints(){
         bonus.bonusOnlyFiveHundredPoints();
         bonus.getBonusPointsOfOptions(taskOptions);
         if(loggedUser && user.points >= user.target && user.points <= user.target + user.bonusPoints + 9){
             loggedUser.points += user.points;
             loggedUser.bonusPoints += user.bonusPoints;
             auth.update(loggedUser);
         }
     }

    function addUserTaskRisolved(){
        if(loggedUser && user.points >= user.target && user.points <= user.target + user.bonusPoints + 9){
            loggedUser.tasksResolved += user.tasksRisolved;
            auth.update(loggedUser);
        }
    }

    function answerError(task, $scope){
        user.answer = user.possibleAnswer.errore;
        $scope.dynamic = user.points;
        $scope.user.points = $scope.user.points - 10;
        $scope.type = 'danger';
        $scope.user.resaltOfTask = '';
        toastr.error('Sbagliato, prova di nuovo');
        errorsTheUser.addError();
        errorsTheUser.addTask(task);

        updateProgressBarr($scope);
    }

    function updateProgressBarr($scope){
        $timeout(function(){
            $scope.progressValue = $scope.user.points;
        }, 200);
    }



    return {
        compareAnswers: logicReply
    }
}]);