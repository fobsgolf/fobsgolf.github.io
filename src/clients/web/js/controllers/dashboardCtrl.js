app.controller("dashboardCtrl", function($scope, $location, graphService) {
    $scope.graphTitle = "Par";
    $scope.series = graphService.getPieStats();
    $scope.collapsed = true;
    $scope.selectedDate = ($scope.series &&
                           ($scope.series.length > 0)) ?
        ($scope.series[0].data.length > 0 ? $scope.series[0].data[0].date : '') : '';
    $scope.selectedCourse = {name: ''};
    $scope.courseItem = {data: []};

    $scope.dateClicked = function(day) {
        $scope.collapsed = true;
        $scope.selectedDate = day.date;
    }

    $scope.$watch('series', function(newVal) {
        if(typeof newVal !== 'undefined') {
            $scope.selectedDate = ($scope.series &&
                                   ($scope.series.length > 0)) ?
                ($scope.series[0].data.length > 0 ? $scope.series[0].data[0].date : '') : '';
            $scope.selectedCourse.name = ($scope.series &&
                             ($scope.series.length > 0)) ? $scope.series[0].name : '';
            if($scope.selectedCourse.name !== "") {
                $scope.courseItem = $scope.series[0];
            }
        }
    });

    $scope.courseClicked = function(courseObj) {
        $scope.selectedCourse.name = courseObj.name;
        for(var course in $scope.series) {
            if($scope.series[course].name === $scope.selectedCourse.name) {
                $scope.courseItem = $scope.series[course];
                $scope.selectedDate = $scope.series[course].data[0].date;
            }
        }
    };

    $scope.getImageClass = function(course) {
        var cls = "image ";
        cls += course.name.toLowerCase();
        return cls;
    }
})
