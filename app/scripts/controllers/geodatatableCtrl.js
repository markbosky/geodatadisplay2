geodatadisplayModule
  .controller('Ctrl', ['$scope','$filter','geodatadisplayModel', 'datasetModel','geodatatable', function ($scope, $filter, geodatadisplayModel, datasetModel, geodatatable, scope) {

    var myDataset = new datasetModel();
  $scope.geodatadisplayModel = geodatadisplayModel;
    var columns;
    var dtData;

    /*console.log(myDataset.combine().then(function(data){
        dtData = data[0];
        columns = data[1];
       // console.log("DDAATA: " + data[0]);
       // console.log("columns :" + data[1]);
        console.dir(data);
    }))*/

        //geodatatable.add(options);
    
  //$scope.geodatadisplayModel = geodatadisplayModel;

        $scope.tblData = [
            ["Webber", "Adam"]
        ];

        // not mandatory, here as an example
        $scope.tblColumns = [
            { "sTitle": "Surname" },
            { "sTitle": "First Name" }
        ];

        // not mandatory, here as an example
        $scope.columnDefs = [{ "bSortable": false, "aTargets": [1] }];
    
        // not mandatory, you can use defaults in directive        
        $scope.overrideOptions = {
            "bStateSave": true,
            "iCookieDuration": 2419200, /* 1 month */
            "bJQueryUI": true,
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "bDestroy": true
        };
        
    
        // we pretend that we have received new data from somewhere (eg a search)        
        $scope.addData = function(){
            //$scope.tblData.push(["jones", "henry"]); // BUG? Angular doesn't pick this up
            $scope.counter = $scope.counter+1;
            var existing = $scope.tblData.slice();
            existing.push([$scope.counter, $scope.counter*2]);
            $scope.tblData = existing;
        }
        $scope.counter = 0
        
            
 

 /*   $scope.options = {
        aoColumns: [{
            "sTitle": "Surname"
        }, {
            "sTitle": "First Name"
        }],
        aoColumnDefs: [{
            "bSortable": false,
            "aTargets": [0, 1]
        }],
        bJQueryUI: true,
        bDestroy: true,
        aaData: [
            ["Webber", "Adam"]
        ]
    };



    $scope.displayDt = function() {
        $scope.options = geodatadisplayModel.geodatadisplayModel.displayDT;
    }

    $scope.addData = function () {

        $scope.counter = $scope.counter + 1;
        $scope.options.aaData.push([$scope.counter, $scope.counter * 2]);
    };

    $scope.counter = 0;*/
}]);