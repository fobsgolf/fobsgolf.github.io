app.directive('fobsGraph', function() {

    return {
        restrict: 'E',
        scope: {
            title: '@',
            id: '@',
            series: '=',
            type: '@'
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



            $scope.$watch('series', function(newVal) {
                if(typeof newVal !== 'undefined') {
                    if($scope.series.length > 0) {
                        var series = $scope.series[0].series;
                        options.xAxis = {
                            categories: $scope.series[0].categories
                        }
                        options.title.text = $scope.series[0].name;
                        $scope.chart = new Highcharts.Chart(options);

                        for(var s in series) {
                            $scope.chart.addSeries(series[s]);
                        }

                    }
                }
            });
        },
        template: "<div></div>",
        link: function($scope, element, attrs) {
            console.log("test successful");
        }
    };
});
