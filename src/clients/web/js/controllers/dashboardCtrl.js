app.controller("dashboardCtrl", function($scope, $location, graphService) {
    $scope.graphTitle = "Par";
    $scope.series = graphService.getPieStats();
    $scope.collapsed = true;
    $scope.selectedDate = ($scope.series &&
                           $scope.series.data &&
                           ($scope.series.data.length > 0)) ? $scope.series.data[0].date : '';

    $scope.dateClicked = function(day) {
        $scope.collapsed = true;
        $scope.selectedDate = day.date;
    }

    $scope.$watch('series', function(newVal) {
        if(typeof newVal !== 'undefined') {
            $scope.selectedDate =
                ($scope.series &&
                $scope.series.data &&
                ($scope.series.data.length > 0)) ? $scope.series.data[0].date : '';
        }
    });
})
