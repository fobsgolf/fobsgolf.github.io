var app = angular.module("golfApp", ["ngRoute", "ui.bootstrap", "ngGrid"]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login',
          {controller: 'loginCtrl',
          templateUrl: 'partials/controllers/login.html'
    })
    .when('/scores',
          {controller: 'scoreCtrl',
           templateUrl: 'partials/controllers/score.html'
    })
    .when('/rules',
          {controller: 'rulesCtrl',
           templateUrl: 'partials/controllers/rules.html'
    })
    .when('/dashboard/:name',
          {controller: 'dashboardCtrl',
           templateUrl: 'partials/controllers/dashboard.html'
    })
    .when('/dashboard/', {redirectTo: '/dashboard/iron'})
    .otherwise({redirectTo: '/'});
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