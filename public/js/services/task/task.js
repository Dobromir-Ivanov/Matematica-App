'use strict';

app.factory('task', function(options){
    var task;

    function crearTask(){
        var setingValue = options.getOptions().setingValueForTask;

        task = {
            firstNum: '',
            operator: getRandomOperator(options.getOptions().operators),
            secondNum: '',
            resaltOfTask: undefined
        };

        logicOnTheTask(task, setingValue);

        <!-- Set value on the task used logic -->
        function logicOnTheTask(task, setingValue){
            var modalita = {
                // operator = (-)
                subtraction: function(){
                    // firNum > secNum
                    task.firstNum = randum(setingValue.meno.firstValue.da, setingValue.meno.firstValue.all);
                    task.secondNum = randum(1, task.firstNum);
                },
                // operator = (+)
                assembly: function(){
                    var MIN_VALUE = 0,
                        MAX_VALUE = setingValue.piu.firstValue.all;
                    task.firstNum = randum(setingValue.piu.firstValue.da, setingValue.piu.firstValue.all);
                    task.secondNum = randum(MIN_VALUE, MAX_VALUE - task.firstNum);
                },
                // operator = (*)
                multiplication: function(){
                    task.firstNum = getRandumValue(setingValue.per.firstValue.da, setingValue.per.firstValue.all);
                    task.secondNum = randum(setingValue.per.secondValue.da, setingValue.per.secondValue.all);
                },
                // operator = (/)
                divided: function(){
                    var MIN_VALUE = 1,
                        MAX_VALUE = 10,
                        val1 = randum(MIN_VALUE, MAX_VALUE),
                        val2 = randum(MIN_VALUE, MAX_VALUE);

                    task.firstNum = val1 * val2;
                    task.secondNum = val2;
                }
            };

            // If operator (-)
            if(task.operator === '-'){
                modalita.subtraction();
            }

            // If operator (+)
            if(task.operator === '+'){
                modalita.assembly();
            }

            // If operator (*)
            if(task.operator === '*'){
                modalita.multiplication();
            }

            // If operator (/)
            if(task.operator === '/'){
                modalita.divided();
            }

            // Get result of new task
            task.resaltOfTask = resultOfTheTask();

            function getRandumValue(min, max) {
                var value = 0;
                if(min === max){
                    value = min;
                }else{
                    value = randum(min, max)
                }

                return value;
            }
        }

        function resultOfTheTask(){
            var resaltOfTask = 0;

            switch(task.operator){
                case '+':
                    resaltOfTask = task.firstNum + task.secondNum;
                    break;
                case '-':
                    resaltOfTask = task.firstNum - task.secondNum;
                    break;
                case '*':
                    resaltOfTask = task.firstNum * task.secondNum;
                    break;
                case '/':
                    resaltOfTask = task.firstNum / task.secondNum;
                    break;
                default: alert('Erorr of operator!');
                    break;
            }

            return resaltOfTask;
        }

        return task;
    }

    /* Randum Fun. */
    function randum(minNum, maxNum) {

        return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    }

    <!-- Get operator of task -->
    function getRandomOperator(arrOfOpertors){
        var checkedOperators = [];

        for (var i = 0; i < arrOfOpertors.length; i++) {
            if(arrOfOpertors[i].check){
                checkedOperators.push(arrOfOpertors[i].operation);
            }
        }

        var index = randum(0, checkedOperators.length - 1),
            operator = checkedOperators[index];

        return operator;
    }

    return {
        getTask: function () {
            return crearTask();
        },
        help: function(){
            var answers = 5,
                posibleAnswer = [],
                positionForTaskResalt = randum(0,answers - 1);

            for (var i = 0; i < answers; i++) {
                posibleAnswer[i] = randum(0, 100);
                if(posibleAnswer[i] === task.resaltOfTask){
                    posibleAnswer[i] ++;
                }
            }

            posibleAnswer[positionForTaskResalt] = task.resaltOfTask;

            return posibleAnswer;
        }
    }
});