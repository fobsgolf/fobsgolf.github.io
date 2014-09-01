app.controller("scoreCtrl", function($scope, scoreService) {
  $scope.scores = scoreService.getScore();
    console.info($scope.scores)
  /*$scope.gridOptions = {data: 'registry.list',
                        columnDefs: [{field: "fname", displayName: "First Name"},
                                    {field: "lname", displayName: "Last Name"},
                                    {field: "message", displayName: "Message"},
                                    {field: "total", displayName: "Total"}],
                        showFooter: true,
                        enableSorting: true,
                        jqueryUITheme: true};*/

})
