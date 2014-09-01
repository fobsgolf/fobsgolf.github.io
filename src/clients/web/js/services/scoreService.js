app.service("scoreService", function($rootScope, $http) {
    var methods = {};
    var scoreCards = [];

    function successCB(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        var inData = JSON.parse(data);
        console.log("successfull set data. Response " + data())
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
                $.extend(true, score, magpiesTemplate);
                console.info(score)
            }
        }

        scoreCards = magpiesScore;
    }

    methods.getScore = function() {
        return scoreCards;
    }

    methods.setData = function(data, url) {
        $http.post(url, JSON.stringify(data)).success(successCB).error(errorCB);
    }

    getMagpiesScores();


    return methods;
})
