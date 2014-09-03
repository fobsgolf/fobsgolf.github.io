app.service("scoreService", function($rootScope, $http) {
    var methods = {};
    var scoreCards = [];
    var playersList = {names: []};
    var strokeyTally = {scoreCards: []};

    function successCB(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        var inData = JSON.parse(data);
    }

    function errorCB(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
    }

    function getMagpiesScores() {
        for(var day in magpiesScore) {
            var cardInfo = magpiesScore[day];

            if((typeof cardInfo !== 'undefined') &&
               (typeof cardInfo.score !== 'undefined')) {
                cardInfo.name = magpiesTemplate.name;
                cardInfo.in = magpiesTemplate.in;
                cardInfo.out = magpiesTemplate.out;
                var score = cardInfo.score;
                for(var hole in score) {
                    for(var holeKey in score[hole]) {
                        $.extend(true, score[hole][holeKey], magpiesTemplate[holeKey]);
                    }

                }
                addTotals(score);
            }
        }

        scoreCards = magpiesScore;
    }

    function parsePlayers() {
        for(var day in magpiesScore) {
            var cardInfo = magpiesScore[day];

            for(var hole in cardInfo.score) {
                for(var holeKey in cardInfo.score[hole]) {
                    for(var player in cardInfo.score[hole][holeKey].players) {
                        playersList.names.push(player);
                    }
                    return;
                }

            }
        }
    }

    function addTotals(scores) {
        var front9 = {hole:9.5, players: {}},
            back9 = {hole:19, players: {}};

        for(var hole in scores) {
            for(var playersKey in scores[hole]) {
                var players = scores[hole][playersKey].players;
                for(var player in players) {
                    if(scores[hole][playersKey].hole < 10) {
                        front9.players[player] = front9.players[player] || 0;
                        front9.players[player] += players[player];

                    }
                    else {
                        back9.players[player] = back9.players[player] || 0;
                        back9.players[player] += players[player];
                    }
                }
            }
        }

        scores.push({'Front 9': front9});
        scores.push({'Back 9': back9});

    }

    function updateStrokeProperty(strokes, par, record) {
        var diff = strokes - par;

        if(diff === -3) {
            if(typeof record.albatross === 'undefined') {
                record.albatross= {
                    value: 1,
                    display: 'Albatross'
                };
            }
            else {
                record.albatross.value++;
            }
        }
        else if(diff === -2) {
            if(typeof record.eagle === 'undefined') {
                record.eagle = {
                    value: 1,
                    display: 'Eagle'
                };
            }
            else {
                record.eagle.value++;
            }
        }
        else if(diff === -1) {
            if(typeof record.birdie === 'undefined') {
                record.birdie = {
                    value: 1,
                    display: 'Birdie'
                };
            }
            else {
                record.birdie.value++;
            }
        }
        else if(diff === 0) {
            if(typeof record.par === 'undefined') {
                record.par = {
                    value: 1,
                    display: 'Par'
                };
            }
            else {
                record.par.value++;
            }
        }
        else if(diff === 1) {
            if(typeof record.bogie === 'undefined') {
                record.bogie = {
                    value: 1,
                    display: 'Bogie'
                };
            }
            else {
                record.bogie.value++;
            }
        }
        else if(diff === 2) {
            if(typeof record.doublebogie === 'undefined') {
                record.doublebogie = {
                    value: 1,
                    display: 'Double Bogie'
                };
            }
            else {
                record.doublebogie.value++;
            }
        }
        else if(diff === 3) {
            if(typeof record.triplebogie === 'undefined') {
                record.triplebogie = {
                    value: 1,
                    display: 'Triple Bogie'
                };
            }
            else {
                record.triplebogie.value++;
            }
        }
        else if(diff === 4) {
            if(typeof record.quadbogie === 'undefined') {
                record.quadbogie = {
                    value: 1,
                    display: 'Quad Bogie'
                };
            }
            else {
                record.quadbogie.value++;
            }
        }
        else if(diff === 5) {
            if(typeof record.fiveover === 'undefined') {
                record.fiveover = {
                    value: 1,
                    display: '5 Over'
                };
            }
            else {
                record.fiveover.value++;
            }
        }
        else if(diff === 6) {
            if(typeof record.sixover === 'undefined') {
                record.sixover = {
                    value: 1,
                    display: '6 Over'
                };
            }
            else {
                record.sixover.value++;
            }
        }
        else if(diff === 7) {
            if(typeof record.sevenover === 'undefined') {
                record.sevenover = {
                    value: 1,
                    display: '7 Over'
                };
            }
            else {
                record.sevenover.value++;
            }
        }
        else if(diff === 8) {
            if(typeof record.eightover === 'undefined') {
                record.eightover = {
                    value: 1,
                    display: '8 Over'
                };
            }
            else {
                record.eightover.value++;
            }
        }
        else if(diff === 9) {
            if(typeof record.nineover === 'undefined') {
                record.nineover = {
                    value: 1,
                    display: '9 Over'
                };
            }
            else {
                record.nineover.value++;
            }
        }
        else if(diff === 10) {
            if(typeof record.tenover === 'undefined') {
                record.tenover = {
                    value: 1,
                    display: '10 Over'
                };
            }
            else {
                record.tenover.value++;
            }
        }
    }

    // Create model for bar graph showing
    // bogies, birdies, etc for a course on a given day
    /*
    [
        {
            date: '1409367600',
            name: 'Magpies',
            Tuan: {
                par: {
                    value: 4,
                    display: 'Par'
                },
                birdie: {
                    value: 3,
                    display: 'Birdie'
                }
            },
            Leir: {
            },
            Dat: {
            }
        }
    ]
    */
    function parseStrokeTally() {
        strokeyTally.scoreCards.length = 0;

        for(var scoreCard in scoreCards) {
            var entry = {};
            entry.date = scoreCards[scoreCard].date;
            entry.name = scoreCards[scoreCard].name;
            var scoreRef = scoreCards[scoreCard].score;
            for(var scores in scoreRef) {
                for(var hole in scoreRef[scores]) {
                    var holeItem = scoreRef[scores][hole];
                    // Create player record for each day played
                    // if the records doesn't exist

                    for(var player in holeItem.players) {
                        if(typeof entry[player] === 'undefined') {
                            entry[player] = {};
                        }
                        updateStrokeProperty(holeItem.players[player], holeItem.par, entry[player]);
                    }
                }
            }
            strokeyTally.scoreCards.push(entry);
        }
    }

    methods.getScore = function() {
        return scoreCards;
    };

    methods.setData = function(data, url) {
        $http.post(url, JSON.stringify(data)).success(successCB).error(errorCB);
    };

    methods.getPlayersList = function() {
        return playersList;
    };

    methods.getStrokeTally = function() {
        return strokeyTally;
    };

    getMagpiesScores();
    parsePlayers();
    parseStrokeTally();


    return methods;
});
