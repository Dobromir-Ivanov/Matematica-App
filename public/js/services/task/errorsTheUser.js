'use strict';

app.factory('errorsTheUser', function(){
    var errors = 0,
        arrOfErr = [];

    return {
        addError: function(){
            errors += 1;
            return errors;
        },
        addTask: function(task){
            var corectTask = task.firstNum + ' ' + task.operator + ' ' + task.secondNum,
                errTask = {
                    task: {},
                    err: 0
                };

            if(arrOfErr.length == 0){
                errTask.task = corectTask;
                errTask.err = 1;
                arrOfErr.push(errTask)
            }else{
                for (var i = 0; i < arrOfErr.length; i++) {
                    if(arrOfErr[i].task == corectTask){
                        arrOfErr[i].err += 1;
                        return;
                    }
                }
                errTask.task = corectTask;
                errTask.err = 1;
                arrOfErr.push(errTask);
            }
        },
        getErrors: function(){

            return{
                cauntErr: errors,
                arrOfErr: arrOfErr
            }
        }
    }
});