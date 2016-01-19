'use strict';

app.directive('timer',['$interval', 'options','user',
    function($interval, options, user){
        var user = user.getUser(),
            userAnswers = user.possibleAnswer,
            obetivoUser;



        function link(scope, element, attr){
            var difficultyMode, time, timeoutId, timer;

            timer = {
                start: function(){
                    difficultyMode = options.getOptions().difficulty.selectedMode;

                    time = {
                        minets: difficultyMode.time,
                        seconds: 60
                    };

                    initTimer();

                    function initTimer(){
                        // If difficulty mode is not set: folse
                        if(isNaN(time.minets)){
                            time.seconds = '--';
                            $interval.cancel(timeoutId);
                            timeoutId = undefined;
                            printTime(time.minets, time.seconds);

                        }else{
                            time.minets = time.minets - 1;
                            startTimer();
                        }
                    }

                    function updateTime() {

                        time.seconds--;

                        if (time.minets <= 0 && time.seconds <= -1) {
                            scope.user.points = scope.user.points - 5;

                            time.minets = difficultyMode.time - 1;
                            time.seconds = 59;
                        }

                        if (time.seconds <= -1) {
                            time.minets--;
                            time.seconds = 59
                        }

                        printTime(time.minets, time.seconds);
                    }

                    function printTime(m, s){
                        scope.minets = m;
                        scope.seconds = s;
                    }

                    function startTimer(){
                        timeoutId = $interval(function() {
                            updateTime(); // update DOM
                        }, 1000);
                    }

                    // Timer Options stop or start!
                    attr.$observe('userAnswer', function(value) {

                        obetivoUser = options.getOptions().objectivePoints;

                        if((user.points >= obetivoUser) && (user.points <= (obetivoUser + user.bonusPoints)+ 9)){ // 'isTrue'
                            timer.stop();
                        }else if(value === userAnswers.notAnswer) {

                            // Stop timer if not set timer!
                            if (isNaN(time.minets)) {
                                timer.stop();

                            } else {
                                timer.stop();
                                time.minets = difficultyMode.time - 1;
                                time.seconds = 60;
                                startTimer();

                            }
                        }
                    });
                },
                stop: function(){
                    $interval.cancel(timeoutId);
                    timeoutId = undefined;
                }
            };

            // If change difficulty mode
            scope.$watch('difficultyMode', function() {
                timer.stop();
                timer.start();
            });
        }

        return {
            template: '<p >{{ difficultyMode }} per la risposta <label>{{minets}}</label>:<label>{{seconds}}</label> <span class="icon-btn"><i class="fa fa-clock-o"></i></span></p>',
            link: link
        };
    }
]);