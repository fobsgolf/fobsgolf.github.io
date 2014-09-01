app.directive('fobsGraph', function() {

    return {
        restrict: 'E',
        scope: {
            title: '@',
            id: '@',
            series: '='
        },
        controller: function($scope) {
            var options = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    renderTo: $scope.id,
                    type: 'pie'
                },
                title: {
                    text: ''
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

            $scope.chart = new Highcharts.Chart(options);
            $scope.chart.addSeries($scope.series);
        },
        template: "<div></div>",
        link: function($scope, element, attrs) {
            console.log("test successful");
        }
    };
});
