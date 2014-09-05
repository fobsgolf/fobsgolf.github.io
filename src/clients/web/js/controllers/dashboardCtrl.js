app.controller("dashboardCtrl", function($scope, $location, graphService) {
    $scope.graphTitle = "Par";
    $scope.series = graphService.getPieStats();
    $scope.collapsed = true;
})
