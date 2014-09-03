app.controller("dashboardCtrl", function($scope, $location, graphService) {
    $scope.graphTitle = "Par";
    $scope.series = graphService.getPieStats();

    $scope.selected = function(menuItem) {
        if(menuItem === $location.path()) {
            return true;
        }

        return false;
    }
})
