'use strict';

app.factory('options', function(){

    var operators = [
        {name: 'meno ( - )', operation:'-', check: true},
        {name: 'piu ( + )', operation:'+', check: true},
        {name: 'per ( x )', operation:'*', check: false},
        {name: 'deviso ( / )', operation:'/', check: false}
    ];

    var options = defaultOptions();

    function defaultOptions(){
        var operators = [
            {name: 'meno ( - )', operation:'-', check: true},
            {name: 'piu ( + )', operation:'+', check: true},
            {name: 'per ( x )', operation:'*', check: false},
            {name: 'deviso ( / )', operation:'/', check: false}],

            difficultyMode = [
            {name: 'Senza tempo', time: '--'},
            {name: '5 min.', time: 5},
            {name: '4 min.', time: 4},
            {name: '3 min.', time: 3},
            {name: '2 min.', time: 2},
            {name: '1 min.', time: 1}];

        var options = {
            operators: operators,
            setingValueForTask:{
                meno: {
                    operator: operators[0],
                    firstValue:{da:1, all:100},
                    secondValue:{da:0, all:100}
                },
                piu: {
                    operator: operators[1],
                    firstValue:{da:1, all:100},
                    secondValue:{da:0, all:100}
                },
                per: {
                    operator: operators[2],
                    firstValue:{da:1, all:10},
                    secondValue:{da:1, all:10}
                },
                deviso: {
                    operator: operators[3],
                    firstValue:{da:1, all:10},
                    secondValue:{da:1, all:10}
                }
            },
            objectivePoints: 200,
            difficulty: {
                mode: function () {
                    return difficultyMode;
                },
                selectedMode: difficultyMode[0]
            }
        };

        return options;
    }


    return {
        getOptions: function () {
            return options;
        },
        setOptions: function(newOptions){
            options = newOptions;
        },
        getDefaultOptions: function() {
            var defOptions = defaultOptions();
            return defOptions;
        }
    }
});