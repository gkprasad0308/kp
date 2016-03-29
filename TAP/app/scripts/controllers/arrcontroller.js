// Code goes here

// Code goes here

//'use strict';
app.controller("arrCtrl", function ($scope, $location, $routeParams, clientService) {

    var ctrl = this;
    this.name = clientService.getName();
    this.client = {};
    $scope.isActive = true;
    // $scope.selectid = true;
    this.clientId = $routeParams.id;

    $scope.chartType = 1; // 1- ARR, 2-Risk Distribution

    $scope.setSelected = function () {
        if ($scope.chartType === 1)
            $scope.isActive = true;
        else
            $scope.isActive = false;

    }
    this.backToClientDashBoard = function (id) {
        $location.path("/portfolio/" + id);
    };

    $scope.chartData = {};
    // Code goes here

    $scope.dateRange = [{
        value: 3,
        name: '3mo',
        series: 'ARR for the last 3 months'
  }, {
        value: 6,
        name: '6mo',
        series: 'ARR for  the last 6 months'

  }, {
        value: 9,
        name: '9mo',
        series: 'ARR for  the last 9 months'

  }, {
        value: 12,
        name: '1y',
        series: 'ARR for  the last 12 months '

  }, {
        value: 24,
        name: '2y',
        series: 'ARR for  the last 2 years'
  }, {
        value: 36,
        name: '3y',
        series: 'ARR for  the last 3 years'

  }]


    $scope.onClick = function (points, evt) {
        //console.log(points, evt);
    };


    this.init = function () {
        clientService.getClientById(this.clientId).promise.then(function (resp) {

            $scope.client = resp.data[0].value;


            /*this.clientdata=$scope.client;*/
            console.log($scope.client.assetsToInvest);
            $scope.changeChart($scope.dateRange[3]);
            $scope.createHistogramOfRiskDistribution();
        }, function (errReponse) {
            console.error('Error while getting the data table');
        });
    }

    function findProbablityCount() {
        var ds = [{
                min: -0.1,
                max: 0.0,
                name: "> -0.1 <= 0.0",
                count: 0
            },
            {
                min: 0.0,
                max: 0.1,
                name: "> 0.0 <= 0.1",
                count: 0
            },
            {
                min: 0.1,
                max: 0.2,
                name: "> 0.1 <= 0.2",
                count: 0
            },
            {
                min: 0.2,
                max: 0.3,
                name: "> 0.2 <= 0.3",
                count: 0
            },
            {
                min: 0.3,
                max: 0.4,
                name: "> 0.3 <= 0.4",
                count: 0
            },
            {
                min: 0.4,
                max: 0.5,
                name: "> 0.4 <= 0.5",
                count: 0
            },
            {
                min: 0.5,
                max: 0.6,
                name: "> 0.5 <= 0.6",
                count: 0
            },
            {
                min: 0.6,
                max: 0.7,
                name: "> 0.6 <= 0.7",
                count: 0
            },
            {
                min: 0.7,
                max: 0.8,
                name: "> 0.7 <= 0.8",
                count: 0
            },
            {
                min: 0.8,
                max: 0.9,
                name: "> 0.8 <= 0.9",
                count: 0
            },
     ];

      
        if ($scope.client.portfolio) { 
        for (var index = 0; index < $scope.client.portfolio.length; index++) {
          var loan = $scope.client.portfolio[index];
          if (ds) {
            for (var i = 0; i<ds.length; i++) {
                var obj = ds[i];
                if (loan.predictedDefault > obj.min && loan.predictedDefault <= obj.max) {
                    obj.count = obj.count + 1;
                }
            }
          }
        }
      }
        return ds;
    }

    $scope.changeChart = function (range) {
        $scope.selectedRange = range; // This is wierd. Temp fix 
        if ($scope.client.returns) {
            reloadChart($scope.client, range);
        }
    }

    function reloadChart(clientDoc, selectedRange) {
        var plotData = [];
        var dataPointCount = selectedRange.value;
        if (clientDoc.returns) {
            for (var index = clientDoc.returns.length; index > clientDoc.returns.length - dataPointCount; index--) {
                plotData.push(Math.round(clientDoc.returns[index - 1] * 100) / 100);
            }

            $scope.chartData.data = [plotData.reverse()];
            $scope.chartData.series = [selectedRange.series];
            $scope.chartData.labels = getDataPointLabels(dataPointCount);
        }
    }

    function getDataPointLabels(dataPointCount) {
        var labels = [];
        for (var point = 0; point < dataPointCount; point++) {
            var mon = moment().subtract(point, 'month');
            labels.push(moment().subtract(point, 'month').format('MMM YYYY'));
        }
        return labels.reverse();
    };


    function emptyChart() {
        return {
            data: [],
            series: [],
            labels: []
        };
    }

    $scope.createHistogramOfRiskDistribution = function (ds) {
        var ds = findProbablityCount();
        var x = [];
        var y = [];
        if (ds) {
        for (var index = 0; index < ds.length; index++) {
          var obj = ds[index];
            x.push(obj.name);
            y.push(obj.count);
          }
        }
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                defaultSeriesType: 'column',
                borderWidth: 0,
                backgroundColor: '#eee',
                borderWidth: 1,
                borderColor: '#ccc',
                plotBackgroundColor: '#fff',
                plotBorderWidth: 1,
                plotBorderColor: '#ccc'
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: 'Risk Distribution'
            },
            legend: {
                enabled: true
            },
            tooltip: {
                borderWidth: 1,
                formatter: function () {
                    return '<b>Range:</b><br/> ' + this.x + '<br/>' +
                        '<b>Count:</b> ' + this.y;
                }
            },
            plotOptions: {
                column: {
                    shadow: false,
                    borderWidth: .5,
                    borderColor: '#666',
                    pointPadding: 0,
                    groupPadding: 0,
                    color: 'rgba(204,204,204,.85)'
                },
                spline: {
                    shadow: false,
                    marker: {
                        radius: 1
                    }
                },
                areaspline: {
                    color: 'rgb(69, 114, 167)',
                    fillColor: 'rgba(69, 114, 167,.25)',
                    shadow: false,
                    marker: {
                        radius: 1
                    }
                }
            },
            xAxis: {
                title: {
                    text: 'Probablity of Default'
                },
                categories: x,
                labels: {
                    rotation: -90,
                    y: 40,
                    style: {
                        fontSize: '8px',
                        fontWeight: 'normal',
                        color: '#333'
                    },
                },
                lineWidth: 0,
                lineColor: '#999',
                tickLength: 70,
                tickColor: '#ccc',
            },
            yAxis: {
                title: {
                    text: 'Distribution [%]'
                },
                //maxPadding:0,
                gridLineColor: '#e9e9e9',
                tickWidth: 1,
                tickLength: 3,
                tickColor: '#ccc',
                lineColor: '#ccc',
                tickInterval: 25,
                //endOnTick:false,
            },
            series: [{
                name: 'Bins',
                data: y,
                visible: true,
      }, {
                name: 'Curve',
                type: 'spline',
                visible: false,
                data: y,
                //color: 'rgba(204,204,255,.85)'
      }, {
                name: 'Filled Curve',
                type: 'areaspline',
                visible: true,
                data: y,
                //color: 'rgba(204,204,255,.85)'
      }]
        });

    };

    this.init();

});
