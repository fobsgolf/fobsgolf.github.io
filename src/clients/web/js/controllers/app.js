var app = angular.module("golfApp", ["ngRoute", "ui.bootstrap", "ngGrid"]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login',
          {controller: 'loginCtrl',
          templateUrl: 'src/clients/web/partials/controllers/login.html'
    })
    .when('/scores',
          {controller: 'scoreCtrl',
           templateUrl: 'src/clients/web/partials/controllers/score.html'
    })
    .when('/rules',
          {controller: 'rulesCtrl',
           templateUrl: 'src/clients/web/partials/controllers/rules.html'
    })
    .when('/dashboard',
          {controller: 'dashboardCtrl',
           templateUrl: 'src/clients/web/partials/controllers/dashboard.html'
    })
    .otherwise({redirectTo: '/dashboard'});
}]);

app.controller("appCtrl", function($scope, $location, scoreService) {
  $scope.isCollapsed = true;

  $scope.selected = function(menuItem) {
    console.log("location url " + $location.path())
    if(menuItem === $location.path()) {
      return true;
    }

    return false;
  }
})
