app.service("graphService", function($rootScope, scoreService) {
    var methods = {},
        pieStats = [];

    $rootScope.graphServiceTally = scoreService.getStrokeTally();

    $rootScope.$watch('graphServiceTally', function(newVal) {
        if(typeof newVal !== 'undefined') {
            parseTally();
        }
    }, true);

    /*
    Input:
    {
        scoreCards:
            [
                {
                    date: '1409367600',
                    name: 'magpies',
                    Tuan: {
                        par: {
                            value: 4,
                            display: 'Par'
                        },
                        birdie: {
                            value: 3,
                            display: 'Birdie'
                        }
                    },
                    Leir: {
                    },
                    Dat: {
                    }
                }
            ]
    }

    Output:
    {
        data: [
            {
                date: '1409367600',
                name: 'magpies',
                categories: ['Bogie','Double Bogie','Birdies'],
                series: [
                    {
                        name: 'Tuan',
                        data: [5,1,5]
                    },
                    {
                        name: 'Leir',
                        data: [3,5,7]
                    },
                    {
                        name: 'Dat',
                        data: [1,4,8]
                    }
                ]
            }
        ]
    }
    */
    function parseTally() {
        //pieStats.data.length = 0;
        var courses = $rootScope.graphServiceTally.scoreCards;

        for(var scoreCards in courses) {
            var course = courses[scoreCards];
            var courseTally = {
                name: course.name,
                data: []
            }
            // First get all the categories
            for(var scoreCard in course.data) {
                var entry = {
                    categories: [],
                    series: [],
                    date: course.data[scoreCard].date,
                    name: course.data[scoreCard].name
                };

                var categories = [];
                // Iterate over date, Tuan, Leir, Dat
                var prop, propRef, cat, catName, catDiff;
                for(prop in course.data[scoreCard]) {
                    propRef = course.data[scoreCard][prop];
                    if(typeof propRef === 'object') {
                        // Iterate over par, bogie, etc
                        for(cat in propRef) {
                            catName = propRef[cat].display;
                            catDiff = propRef[cat].diff;
                            var catItem = {
                                "name": catName,
                                "diff": catDiff
                            }

                            categories.push(catItem);
                        }
                    }
                }

                var tempCategories = categories.filter(onlyUnique);
                tempCategories.sort(sortBy('diff', true));
                for(var catIt in tempCategories) {
                    entry.categories.push(tempCategories[catIt].name);
                }
                // Now create the series
                // Iterate over date, Tuan, Leir, Dat
                for(prop in course.data[scoreCard]) {
                    propRef = course.data[scoreCard][prop];

                    if(typeof propRef === 'object') {
                        var playerEntry = {
                            name: prop,
                            data: []
                        };
                        // Iterate over par, bogie, etc
                        for(cat in entry.categories) {
                            var found = false;
                            var val = 0;

                            for(c in propRef) {
                                catName = propRef[c].display;
                                if(catName === entry.categories[cat]) {
                                    found = true;
                                    val = propRef[c].value;
                                    break;
                                }
                            }

                            playerEntry.data.push(val);
                        }

                        entry.series.push(playerEntry);
                    }
                }
                courseTally.data.push(entry);
            }
            pieStats.push(courseTally);
        }

    }

    function onlyUnique(value, index, self) {
        var pos = self.map(function(e) { return e.name; }).indexOf(value.name)
        return pos === index;
    }

    methods.getPieStats = function() {
        return pieStats;
    }

    var sortBy = function(field, reverse, primer){

        var key = primer ?
            function(x) {return primer(x[field])} :
        function(x) {return x[field]};

        reverse = [-1, 1][+!!reverse];

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }

    return methods;

});
