app.directive('fobsGraph', function() {

    return {
        restrict: 'E',
        scope: {
            title: '@',
            id: '@',
            series: '=',
            type: '@',
            filterDate: '=',
            filterCourse: '='
        },
        controller: function($scope) {
            var options = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    renderTo: $scope.id,
                    type: $scope.type
                },
                title: {
                    text: 'massive'
                },
                tooltip: {
                    //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                        //showInLegend: true
                    }
                }
            };

            if($scope.type === 'bar') {
                options.legend = {
                    reversed: true
                };

                options.plotOptions.series = {
                    stacking: 'normal'
                };
            }

            // todo choose selected course (filterCourse)
            function updateGraph() {
                if($scope.series.length > 0) {
                    for(var course in $scope.series) {
                        console.info("graph widget")
                        console.info($scope.series[course])
                        console.info("filter course " + $scope.filterCourse.name)
                        if($scope.series[course].name === $scope.filterCourse.name) {
                            var courseData = $scope.series[course].data;
                            for(var card in courseData) {
                                if(courseData[card].date === $scope.filterDate) {
                                    var series = courseData[card].series;
                                    options.xAxis = {
                                        categories: courseData[card].categories
                                    }
                                    options.title.text = courseData[card].name;
                                    $scope.chart = new Highcharts.Chart(options);

                                    for(var s in series) {
                                        $scope.chart.addSeries(series[s]);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            $scope.$watch('series', function(newVal) {
                if(typeof newVal !== 'undefined') {
                    updateGraph();
                }
            });

            $scope.$watch('filterDate', function(newVal, oldVal) {
                if((typeof newVal !== 'undefined') &&
                   (newVal !== oldVal)) {
                    console.info("filter date changed")
                    updateGraph();
                }
            });

            $scope.$watch('filterCourse', function(newVal, oldVal) {
                if((typeof newVal !== 'undefined') ) {
                    console.info("graph widget course " + newVal.name)
                    updateGraph();
                }
            }, true);
        },
        template: "<div></div>",
        link: function($scope, element, attrs) {
            console.log("test successful");
        }
    };
});
