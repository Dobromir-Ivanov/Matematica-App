'use strict';

app.factory('user', function(){
    var user = {
        id: "1",
        name: "USER",
        points: 0,
        bonusPoints: 0,
        tasksRisolved: 0,
        answer: '',
        possibleAnswer:{
            correct: 'isTrue',
            errore: 'isFalse',
            notAnswer: ''
        },
        resaltOfTask: ''
    };


    return {
        getUser: function(){
            return user;
        },
        saveUser: function(){

        },
        deliteUser: function(){

        }
    }
});