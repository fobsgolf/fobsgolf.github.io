app.controller("scoreCtrl", function($scope, scoreService) {
    $scope.scores = scoreService.getScore();
    $scope.playersList = scoreService.getPlayersList();

    console.info($scope.playersList);
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
            console.info("hole number " + JSON.stringify(score[hole].hole))
            return parseInt(score[hole].hole);
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
            return score[hole].hole;
        }

        return 0;
    }

    $scope.getPar = function(score) {
        for(var hole in score) {
            return score[hole].par;
        }

        return 0;
    }

    $scope.getIndex = function(score) {
        for(var hole in score) {
            return score[hole].index;
        }

        return 0;
    }

});
