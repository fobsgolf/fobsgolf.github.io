app.service("graphService", function($rootScope, scoreService) {
    var methods = {},
        pieStats = {data: []};

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
        pieStats.data.length = 0;
        var scoreCards = $rootScope.graphServiceTally.scoreCards;

        // First get all the categories
        for(var scoreCard in scoreCards) {
            var entry = {
                categories: [],
                series: [],
                date: scoreCards[scoreCard].date,
                name: scoreCards[scoreCard].name
            };

            var categories = [];
            // Iterate over date, Tuan, Leir, Dat
            var prop, propRef, cat, catName;
            for(prop in scoreCards[scoreCard]) {
                propRef = scoreCards[scoreCard][prop];
                if(typeof propRef === 'object') {
                    // Iterate over par, bogie, etc
                    for(cat in propRef) {
                        catName = propRef[cat].display;
                        categories.push(catName);
                    }
                }
            }

            entry.categories = categories.filter(onlyUnique);
            // Now create the series
            // Iterate over date, Tuan, Leir, Dat
            for(prop in scoreCards[scoreCard]) {
                propRef = scoreCards[scoreCard][prop];

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
            pieStats.data.push(entry);
        }
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    methods.getPieStats = function() {
        return pieStats;
    }

    return methods;

});
