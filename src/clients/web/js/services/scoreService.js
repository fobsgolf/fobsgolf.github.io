app.service("scoreService", function($rootScope, $http) {
    var methods = {};
    var scoreCards = [];
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
    }

    function getScores(scoreCard, template) {
        for(var day in scoreCard) {
            var cardInfo = scoreCard[day];

            if((typeof cardInfo !== 'undefined') &&
               (typeof cardInfo.score !== 'undefined')) {
                cardInfo.name = template.name;
                cardInfo.in = template.in;
                cardInfo.out = template.out;
                cardInfo.par = template.par;
                var score = cardInfo.score;
                for(var hole in score) {
                    for(var holeKey in score[hole]) {
                        $.extend(true, score[hole][holeKey], template[holeKey]);
                    }

                }
                cardInfo.players = parseCoursePlayer(cardInfo);
                addTotals(score);
                cardInfo.summary = true;
            }
        }

        scoreCards.push({name: template.name, data: scoreCard});
    }

    function parseCoursePlayer(cardInfo) {
        var names = [];
        for(var hole in cardInfo.score) {
            for(var holeKey in cardInfo.score[hole]) {
                for(var player in cardInfo.score[hole][holeKey].players) {
                    names.push(player);
                }
                return names;
            }
        }

        return names;
    }

    function parsePlayers(course, date) {
        for(var day in course) {
            var cardInfo = course[day];
            if(date && (cardInfo.date === date)) {
                return parseCoursePlayer(cardInfo);
            }
            else {
                return parseCoursePlayer(cardInfo);
            }
        }

        return [];
    }

    function addTotals(scores) {
        var front9 = {hole:9.5, players: {}},
            back9 = {hole:19, players: {}},
            total = {hole:20, players: {}, par: 0};

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
                total.par += scores[hole][playersKey].par;
            }
        }

        scores.push({'Front 9': front9});
        scores.push({'Back 9': back9});
        for(var name in front9.players) {
            var tot = front9.players[name];
            total.players[name] = tot + back9.players[name];
        }
        scores.push({'Total': total});
    }

    function updateStrokeProperty(strokes, par, record) {
        var diff = strokes - par;

        if(diff === -3) {
            if(typeof record.albatross === 'undefined') {
                record.albatross= {
                    value: 1,
                    display: 'Albatross',
                    diff: diff
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
                    display: 'Eagle',
                    diff: diff
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
                    display: 'Birdie',
                    diff: diff
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
                    display: 'Par',
                    diff: diff
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
                    display: 'Bogie',
                    diff: diff
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
                    display: 'Double Bogie',
                    diff: diff
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
                    display: 'Triple Bogie',
                    diff: diff
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
                    display: 'Quad Bogie',
                    diff: diff
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
                    display: '5 Over',
                    diff: diff
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
                    display: '6 Over',
                    diff: diff
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
                    display: '7 Over',
                    diff: diff
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
                    display: '8 Over',
                    diff: diff
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
                    display: '9 Over',
                    diff: diff
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
                    display: '10 Over',
                    diff: diff
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

        for(var course in scoreCards) {
            var courseItem = scoreCards[course];
            var courseTally = {
                name: courseItem.name,
                data: []
            }
            for(var scoreCard in courseItem.data) {
                var entry = {};

                entry.date = courseItem.data[scoreCard].date;
                entry.name = courseItem.data[scoreCard].name;
                var scoreRef = courseItem.data[scoreCard].score;
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
                courseTally.data.push(entry);
            }
            strokeyTally.scoreCards.push(courseTally);
        }
    }

    methods.getScore = function() {
        return scoreCards;
    };

    methods.setData = function(data, url) {
        $http.post(url, JSON.stringify(data)).success(successCB).error(errorCB);
    };

    methods.getStrokeTally = function() {
        return strokeyTally;
    };

    getScores(magpiesScore, magpiesTemplate);
    getScores(mollymookHilltopScore, mollymookHilltopTemplate);
    parseStrokeTally();


    return methods;
});
