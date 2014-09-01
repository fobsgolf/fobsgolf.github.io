app.controller("dashboardCtrl", function($scope, $location) {
    $scope.graphTitle1 = "Par 5";
    $scope.graphTitle2 = "Par 4";
    $scope.graphTitle3 = "Par 3";

    $scope.series5 = {
                data: [['bogies', 4], ['birdies', 2], ['double bogies', 10]],
                name: 'boo'
            };
    $scope.series4 = {
                data: [['bogies', 2], ['birdies', 4], ['double bogies', 6]],
                name: 'boo'
            };
    $scope.series3 = {
                data: [['bogies', 1], ['birdies', 7], ['double bogies', 7]],
                name: 'boo'
            };

  $scope.selected = function(menuItem) {
    if(menuItem === $location.path()) {
      return true;
    }

    return false;
  }
})
