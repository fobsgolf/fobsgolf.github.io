app.service("scoreService", function($rootScope, $http) {
    var methods = {};
    var scoreCards = [];
    var playersList = {names: []};

    function successCB(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        var inData = JSON.parse(data);
        console.log("successfull set data. Response " + data());
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
                console.info(score);
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
                    console.info("players names " + JSON.stringify(playersList));
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
                    console.info(player + " score " + players[player])
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

    methods.getScore = function() {
        return scoreCards;
    };

    methods.setData = function(data, url) {
        $http.post(url, JSON.stringify(data)).success(successCB).error(errorCB);
    };

    methods.getPlayersList = function() {
        return playersList;
    };

    getMagpiesScores();
    parsePlayers();


    return methods;
});
