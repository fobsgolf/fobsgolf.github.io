app.controller("scoreCtrl", function($scope, scoreService) {
    $scope.scores = scoreService.getScore();
    $scope.summary = true;
    $scope.selectedCourse = 'Magpies';

    /*$scope.gridOptions = {data: 'registry.list',
                        columnDefs: [{field: "fname", displayName: "First Name"},
                                    {field: "lname", displayName: "Last Name"},
                                    {field: "message", displayName: "Message"},
                                    {field: "total", displayName: "Total"}],
                        showFooter: true,
                        enableSorting: true,
                        jqueryUITheme: true};*/

    $scope.getScoreOrder = function(score) {
        for(var hole in score) {
            return parseFloat(score[hole].hole);
        }
        return 0;
    }

    $scope.getPlayersScore = function(score, playersName) {
        for(var hole in score) {
            return score[hole].players[playersName];
        }

        return 0;
    }

    $scope.getHole = function(score) {
        for(var hole in score) {
            if((hole === 'Front 9') ||
               (hole === 'Back 9') ||
               (hole === 'Total') ||
               (hole === 'Par')) {
                return hole;
            }

            return score[hole].hole;
        }

        return '';
    }

    $scope.getPar = function(score) {
        for(var hole in score) {
            return score[hole].par;
        }

        return '';
    }

    $scope.getIndex = function(score) {
        for(var hole in score) {
            return score[hole].index;
        }

        return '';
    }

    $scope.viewSwitch = function(cardInfo) {
        cardInfo.summary = !cardInfo.summary;
    }

    $scope.getPlayerTotal = function(player, cardInfo) {
        console.info("get player total " + player)
        if(cardInfo && cardInfo.score && (cardInfo.score.length > 0)) {
            var totals = cardInfo.score[cardInfo.score.length - 1].Total;
            return totals.players[player];
        }

        return player + ": Not recorded";

    }

    $scope.courseClicked = function(courseObj) {
        $scope.selectedCourse = courseObj.name;
    };

    $scope.getImageClass = function(course) {
        var cls = "image ";
        cls += course.name.toLowerCase();
        console.info("course name " + cls)
        return cls;
    }

});
